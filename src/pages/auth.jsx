import Login from "@/components/login";
import Signup from "@/components/signup";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UrlState} from "@/context";
import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

function Auth() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {isAuthenticated, loading} = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard${longLink ? `?createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate, longLink]);

  return (
    <div className="mx-auto my-4 flex w-full max-w-xl flex-col gap-6 rounded-2xl border border-[#00ffcc] bg-background p-6 shadow-lg sm:p-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">
          {searchParams.get("createNew")
            ? "Hold up! Let's login first."
            : "Login / Signup"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access your links and analytics in seconds.
        </p>
      </div>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="login"
            className="cursor-pointer text-[#00ffcc] data-[state=active]:bg-[#00ffcc] data-[state=active]:text-black hover:bg-[#00ffcc] hover:text-black"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="cursor-pointer text-[#00ffcc] data-[state=active]:bg-[#00ffcc] data-[state=active]:text-black hover:bg-[#00ffcc] hover:text-black"
          >
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="mt-6">
          <Login />
        </TabsContent>
        <TabsContent value="signup" className="mt-6">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;