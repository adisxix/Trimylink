import { useRef, useState } from "react"

import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const messageTimer = useRef(null)

  const handleSubscribe = () => {
    if (!email.trim()) {
      setMessage("")
      return
    }

    if (messageTimer.current) {
      clearTimeout(messageTimer.current)
    }

    setMessage("Thanks for subscribing to our newsletter")
    setEmail("")
    messageTimer.current = setTimeout(() => {
      setMessage("")
    }, 2000)
  }

  return (
    <footer className="border-t-2 border-[#00ffcc] bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[auto_1fr_auto] md:items-start">
          <Link to="/" className="flex items-center gap-3 self-start">
            <img src="/logo.svg" alt="Trimylink logo" className="h-11 w-11 object-contain" />
            <span
              className="text-2xl font-bold tracking-wide text-foreground"
              style={{ fontFamily: '"Cabin Sketch", "Rubik Scribble", cursive' }}
            >
              Trimylink
            </span>
          </Link>

          <div className="flex items-center justify-center">
            <ul className="flex items-center gap-8 text-lg">
              <li>
                <Link to="/" className="text-white/70 hover:text-[#00ffcc] transition-colors">Privacy</Link>
              </li>
              <li>
                <Link to="/" className="text-white/70 hover:text-[#00ffcc] transition-colors">Terms</Link>
              </li>
              <li>
                <Link to="/" className="text-white/70 hover:text-[#00ffcc] transition-colors">Support</Link>
              </li>
            </ul>
          </div>

          <div className="max-w-md md:justify-self-end">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
              Subscribe to our newsletter
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 w-full rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-[#00ffcc]"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleSubscribe}
                className="h-11 cursor-pointer rounded-full border-white bg-white px-6 text-black hover:border-[#00ffcc] hover:bg-[#00ffcc] hover:text-black"
              >
                Subscribe
              </Button>
            </div>
            {message ? (
              <p className="mt-3 text-sm text-[#00ffcc]">
                {message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-5 text-center text-sm text-white/60">
          2026 @ Trimylink all rights reserved
        </div>
      </div>
    </footer>
  )
}

export default Footer