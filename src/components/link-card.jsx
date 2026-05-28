import {Copy, Download, LinkIcon, Trash, Calendar} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import {deleteUrl} from "@/db/apiUrls";
import {BeatLoader} from "react-spinners";

const LinkCard = ({url = {}, fetchUrls}) => {
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

  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl, url.id);

  return (
    <div className="flex flex-col sm:flex-row gap-5 border border-slate-800 bg-black hover:border-[#00ffcc] rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,204,0.04)] hover:-translate-y-0.5 group">
      <div className="flex items-center justify-center bg-white p-2.5 rounded-xl border border-slate-800 shadow-md self-start shrink-0">
        <img
          src={url?.qr}
          className="h-24 w-24 object-contain"
          alt="qr code"
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0 justify-between gap-2.5">
        <Link to={`/link/${url?.id}`} className="flex flex-col gap-1.5 min-w-0">
          <span className="text-2xl font-bold text-white hover:text-[#00ffcc] cursor-pointer transition-colors line-clamp-1">
            {url?.title}
          </span>
          <span className="text-lg font-bold text-[#00ffcc] hover:text-[#00ffcc]/80 cursor-pointer transition-colors truncate">
            https://trimylink.vercel.app/{url?.custom_url ? url?.custom_url : url.short_url}
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 hover:text-slate-300 cursor-pointer transition-colors text-sm truncate">
            <LinkIcon className="h-3.5 w-3.5 shrink-0 cursor-pointer" />
            {url?.original_url}
          </span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span>Created {new Date(url?.created_at).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex sm:flex-col justify-end sm:justify-start gap-2 self-end sm:self-center mt-2 sm:mt-0">
        <Button
          variant="ghost"
          size="icon"
          title="Copy Link"
          className="text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 hover:border-teal-500/20 border border-transparent rounded-lg transition-all cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://trimylink.vercel.app/${
                url?.custom_url ? url?.custom_url : url?.short_url
              }`
            );
          }}
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
          onClick={() => fnDelete().then(() => fetchUrls())}
          disabled={loadingDelete}
        >
          {loadingDelete ? <BeatLoader size={4} color="white" /> : <Trash className="h-4 w-4 cursor-pointer" />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;