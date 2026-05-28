import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Plus} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Card} from "./ui/card";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Error from "./error";
import * as yup from "yup";
import useFetch from "@/hooks/use-fetch";
import {createUrl} from "@/db/apiUrls";
import {BeatLoader} from "react-spinners";
import {UrlState} from "@/context";
import {QRCode} from "react-qrcode-logo";

export function CreateLink() {
  const {user} = UrlState();

  const navigate = useNavigate();
  const ref = useRef();

  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, {...formValues, user_id: user?.id});
  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  const createNewLink = async () => {
    setErrors({});
    try {
      await schema.validate(formValues, {abortEarly: false});

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-white hover:bg-[#00ffcc] text-black font-bold transition-all border-0 rounded-xl px-4 h-10 flex items-center gap-2 text-sm cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,255,204,0.3)]">
          <Plus className="h-4.5 w-4.5 text-black" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black border-slate-800">
        <DialogHeader>
          <DialogTitle className="font-extrabold text-2xl text-white">Create New Short Link</DialogTitle>
        </DialogHeader>
        {formValues?.longUrl && (
          <div className="flex items-center justify-center bg-white p-4 rounded-2xl border border-slate-800 shadow-md max-w-[180px] mx-auto aspect-square">
            <QRCode ref={ref} size={150} value={formValues?.longUrl} />
          </div>
        )}

        <div className="space-y-4 my-2">
          <div className="space-y-1.5">
            <Input
              id="title"
              placeholder="Short Link's Title"
              value={formValues.title}
              onChange={handleChange}
              className="bg-slate-950/40 border-slate-800 focus-visible:border-[#00ffcc] focus-visible:ring-[#00ffcc]/15 py-5 rounded-xl placeholder:text-slate-500 text-slate-200"
            />
            {errors.title && <Error message={errors.title} />}
          </div>

          <div className="space-y-1.5">
            <Input
              id="longUrl"
              placeholder="Enter your Loooong URL"
              value={formValues.longUrl}
              onChange={handleChange}
              className="bg-slate-950/40 border-slate-800 focus-visible:border-[#00ffcc] focus-visible:ring-[#00ffcc]/15 py-5 rounded-xl placeholder:text-slate-500 text-slate-200"
            />
            {errors.longUrl && <Error message={errors.longUrl} />}
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3.5 py-2.5 border border-slate-800 bg-black rounded-xl text-slate-400 text-sm font-semibold shrink-0">
              trimylink.vercel.app
            </div>
            <span className="text-slate-700 font-light">/</span>
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
              className="bg-slate-950/40 border-slate-800 focus-visible:border-[#00ffcc] focus-visible:ring-[#00ffcc]/15 py-5 rounded-xl placeholder:text-slate-500 text-slate-200"
            />
          </div>
          {error && <Error message={error.message} />}
        </div>

        <DialogFooter className="flex justify-center sm:justify-center w-full mt-4 bg-transparent border-0 p-0 mb-0 pb-4">
          <Button
            type="button"
            className="w-auto bg-white hover:bg-[#00ffcc] text-black font-bold transition-all border-0 rounded-xl px-4 h-10 cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,204,0.3)]"
            onClick={createNewLink}
            disabled={loading}
          >
            {loading ? <BeatLoader size={8} color="black" /> : "Create Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}