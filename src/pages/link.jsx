import DeviceStats from "@/components/device-stats";
import Location from "@/components/location-stats";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {UrlState} from "@/context";
import {getClicksForUrl} from "@/db/apiClicks";
import {deleteUrl, getUrl} from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import {Copy, Download, LinkIcon, Trash, Calendar} from "lucide-react";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {BarLoader, BeatLoader} from "react-spinners";

const LinkPage = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };
  const navigate = useNavigate();
  const {user} = UrlState();
  const {id} = useParams();
  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, {id, user_id: user?.id});

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  useEffect(() => {
    if (error) navigate("/dashboard");
  }, [error, navigate]);

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <div className="max-w-6xl mx-auto px-1 sm:px-4 flex flex-col gap-6">
      {(loading || loadingStats) && (
        <div className="w-full h-1 overflow-hidden bg-slate-950 rounded-full mb-4">
          <BarLoader width={"100%"} color="#00ffcc" />
        </div>
      )}
      
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-6 border border-slate-800 bg-black hover:border-[#00ffcc] rounded-2xl p-6 transition-all duration-300 sm:w-2/5 group shadow-lg">
          <span className="text-4xl sm:text-5xl font-black text-white tracking-tight break-words max-w-full">
            {url?.title}
          </span>
          <a
            href={`https://trimylink.vercel.app/${link}`}
            target="_blank"
            className="text-2xl font-bold text-[#00ffcc] hover:text-[#00ffcc]/80 transition-colors cursor-pointer break-all"
          >
            https://trimylink.vercel.app/{link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer text-sm break-all"
          >
            <LinkIcon className="h-4 w-4 shrink-0 cursor-pointer" />
            {url?.original_url}
          </a>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            Created {new Date(url?.created_at).toLocaleString()}
          </span>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              title="Copy Link"
              className="text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 hover:border-teal-500/20 border border-transparent rounded-lg transition-all cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(`https://trimylink.vercel.app/${link}`)
              }
            >
              <Copy className="h-4 w-4 cursor-pointer" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              title="Download QR Code"
              className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/20 border border-transparent rounded-lg transition-all cursor-pointer"
              onClick={downloadImage}
            >
              <Download className="h-4 w-4 cursor-pointer" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="Delete Link"
              className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent rounded-lg transition-all cursor-pointer"
              onClick={() =>
                fnDelete().then(() => {
                  navigate("/dashboard");
                })
              }
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={4} color="white" />
              ) : (
                <Trash className="h-4 w-4 cursor-pointer" />
              )}
            </Button>
          </div>

          <div className="flex items-center justify-center bg-white p-3 rounded-2xl border border-slate-800 shadow-md max-w-[200px] w-full self-center sm:self-start aspect-square">
            <img
              src={url?.qr}
              className="w-full h-full object-contain"
              alt="qr code"
            />
          </div>
        </div>

        <div className="flex-1 border border-slate-800 bg-black hover:border-[#00ffcc] rounded-2xl p-6 transition-all duration-300 shadow-lg sm:w-3/5">
          <h2 className="text-3xl font-black tracking-tight text-[#00ffcc] mb-6">Stats</h2>
          
          {stats && stats.length ? (
            <div className="flex flex-col gap-6">
              <div className="group relative overflow-hidden rounded-xl border border-slate-800/80 bg-black p-5 transition-all duration-300 hover:border-[#00ffcc] hover:shadow-[0_0_20px_rgba(0,255,204,0.05)]">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#00ffcc]/5 blur-2xl" />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Total Clicks
                    </span>
                    <h3 className="text-3xl font-black tracking-tight text-white">
                      {stats?.length}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mt-2">
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white">Location Data</h4>
                  <div className="border border-slate-800/80 bg-black rounded-xl p-4 overflow-hidden">
                    <Location stats={stats} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white">Device Info</h4>
                  <div className="border border-slate-800/80 bg-black rounded-xl p-4 overflow-hidden">
                    <DeviceStats stats={stats} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-slate-400 py-12 text-center border border-dashed border-slate-800 rounded-xl bg-slate-950/10">
              {loadingStats === false
                ? "No Statistics yet"
                : "Loading Statistics..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkPage;