import {useEffect, useState} from "react";
import {BarLoader} from "react-spinners";
import {Filter, Link2, TrendingUp, Search, X} from "lucide-react";

import {Input} from "@/components/ui/input";
import {CreateLink} from "@/components/create-link";
import LinkCard from "@/components/link-card";
import Error from "@/components/error";

import useFetch from "@/hooks/use-fetch";

import {getUrls} from "@/db/apiUrls";
import {getClicksForUrls} from "@/db/apiClicks";
import {UrlState} from "@/context";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {user} = UrlState();
  const {loading, error, data: urls, fn: fnUrls} = useFetch(getUrls, user?.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    if (user?.id) fnUrls();
  }, [user?.id]);

  const filteredUrls = urls?.filter((url) =>
    (url.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto px-1 sm:px-4">
      {(loading || loadingClicks) && (
        <div className="w-full h-1 overflow-hidden bg-slate-950 rounded-full">
          <BarLoader width={"100%"} color="#22d3ee" />
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-black p-6 transition-all duration-300 hover:border-[#00ffcc] hover:shadow-[0_0_30px_rgba(0,255,204,0.08)]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00ffcc]/5 blur-3xl transition-all duration-300 group-hover:bg-[#00ffcc]/10" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Links Created
              </span>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                {urls?.length || 0}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/20 shadow-[0_0_15px_rgba(0,255,204,0.1)] group-hover:scale-110 transition-transform duration-300">
              <Link2 className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-500">
            <span>Total short links active</span>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-black p-6 transition-all duration-300 hover:border-[#00ffcc] hover:shadow-[0_0_30px_rgba(0,255,204,0.08)]">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#00ffcc]/5 blur-3xl transition-all duration-300 group-hover:bg-[#00ffcc]/10" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Total Clicks
              </span>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                {clicks?.length || 0}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/20 shadow-[0_0_15px_rgba(0,255,204,0.1)] group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-500">
            <span>Total redirections tracked</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#00ffcc]">
          My Links
        </h1>
        <CreateLink />
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#00ffcc] transition-colors">
          <Search className="h-5 w-5" />
        </div>
        <Input
          type="text"
          placeholder="Filter links by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 pr-10 py-5 bg-slate-950/20 border-slate-800 focus-visible:border-[#00ffcc] focus-visible:ring-[#00ffcc]/15 text-slate-200 placeholder:text-slate-500 rounded-xl transition-all"
        />
        {searchQuery ? (
          <button 
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        ) : (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
            <Filter className="h-4 w-4" />
          </div>
        )}
      </div>

      {error && <Error message={error?.message} />}

      {filteredUrls?.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-800 rounded-2xl bg-slate-950/10 text-center">
          <div className="h-16 w-16 bg-slate-900/60 rounded-full flex items-center justify-center border border-slate-800 text-slate-500 mb-4">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-300">No links found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            {searchQuery 
              ? `We couldn't find any links matching "${searchQuery}". Try searching for something else.`
              : "You haven't created any links yet. Click 'Create New Link' to get started!"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {(filteredUrls || []).map((url, i) => (
            <LinkCard key={url.id || i} url={url} fetchUrls={fnUrls} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;