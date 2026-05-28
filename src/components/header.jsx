import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {logout} from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {LinkIcon, LogOut} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {BarLoader} from "react-spinners";
import {Button} from "./ui/button";
import {UrlState} from "@/context";



const Header = () => {
  const {loading, fn: fnLogout} = useFetch(logout);
  const navigate = useNavigate();

  const {user, fetchUser} = UrlState();

    const handleSectionClick = (sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  return (
    <header className="w-full border-b border-border/60 bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src="/logo.svg" alt="Trimylink logo" className="h-12 w-12 object-contain" />
          <span className="text-2xl font-bold tracking-wide text-foreground" style={{ fontFamily: '"Cabin Sketch", "Rubik Scribble", cursive' }}>
            Trimylink
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-14 md:flex">
          <a href="#services" onClick={() => handleSectionClick("services")} className="text-sm font-medium text-white transition-colors hover:text-[#00ffcc] md:text-lg">
            Services
          </a>
          <a href="#about" onClick={() => handleSectionClick("about")} className="text-sm font-medium text-white transition-colors hover:text-[#00ffcc] md:text-lg">
            About
          </a>
          <a href="#contact" onClick={() => handleSectionClick("contact")} className="text-sm font-medium text-white transition-colors hover:text-[#00ffcc] md:text-lg">
            Contact
          </a>
        </div>
<div>
    {!user ? (
        <Button
          onClick={() => navigate("/auth")}
          size="lg"
          variant="outline"
          className="cursor-pointer rounded-full border-white bg-white px-10 text-black hover:border-[#00ffcc] hover:bg-[#00ffcc] hover:text-black"
        >
          Login
        </Button>
        ) : (
 <DropdownMenu>
              <DropdownMenuTrigger className="w-10 cursor-pointer rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profile_pic} />
                  <AvatarFallback>
                    {(user?.user_metadata?.name || user?.email || "U")
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part[0]?.toUpperCase())
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="text-lg font-bold text-white">
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/dashboard" className="flex w-full cursor-pointer">
                    <LinkIcon className="mr-2 h-4 w-4 cursor-pointer" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate("/");
                    });
                  }}
                  className="text-red-400 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4 cursor-pointer" />
                  <span className="cursor-pointer">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        )    
}

</div>

      </nav>
            {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}

    </header>
  )
}

export default Header