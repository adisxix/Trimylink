import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("")
  const navigate = useNavigate()

  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [contactResponse, setContactResponse] = useState("")
  const [contactResponseType, setContactResponseType] = useState("")
  const contactTimer = useRef(null)

  const handleShorten = (e) => {
    e.preventDefault()
    if (longUrl) navigate(`/auth?createNew=${longUrl}`)
  }

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-[10px] min-h-[70vh] border border-white/10 bg-black/70">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          src="/bgvid.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center text-white sm:px-10 lg:px-16">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            The only <span className="text-[#00ffcc]">URL</span> shortener you'll ever need
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg lg:text-xl">
            What are you waiting for? Start shortening your links today 👇
          </p>

          <form onSubmit={handleShorten} className="mt-8 w-full max-w-2xl rounded-2xl bg-white/5 p-3 backdrop-blur-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                type="url"
                placeholder="Enter a URL to shorten"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="h-12 flex-1 border-0 bg-transparent text-lg text-red-500 placeholder:text-white/50 focus-visible:border-0 focus-visible:ring-0"
              />
              <Button
                type="submit"
                className="mx-auto sm:mx-0 whitespace-nowrap bg-red-600 hover:bg-red-700 text-white px-6 py-5 text-lg font-semibold rounded-md cursor-pointer transition transform hover:scale-105"
              >
                Trim it
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section id="services" className="mx-auto mt-12 max-w-6xl px-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white text-center">Services</h2>
        <p className="mt-3 text-center text-white/70">Powerful link management and analytics.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="group rounded-lg border border-transparent bg-white/5 p-5 transition hover:-translate-y-1 hover:border-[#00ffcc] cursor-pointer">
            <h3 className="font-semibold text-white">Fast Shortening</h3>
            <p className="mt-2 text-sm text-white/70">Create short links instantly with one click.</p>
          </div>
          <div className="group rounded-lg border border-transparent bg-white/5 p-5 transition hover:-translate-y-1 hover:border-[#00ffcc] cursor-pointer">
            <h3 className="font-semibold text-white">Custom Aliases</h3>
            <p className="mt-2 text-sm text-white/70">Choose memorable slugs for your links.</p>
          </div>
          <div className="group rounded-lg border border-transparent bg-white/5 p-5 transition hover:-translate-y-1 hover:border-[#00ffcc] cursor-pointer">
            <h3 className="font-semibold text-white">Analytics</h3>
            <p className="mt-2 text-sm text-white/70">Track clicks, referrers, and countries.</p>
          </div>
          <div className="group rounded-lg border border-transparent bg-white/5 p-5 transition hover:-translate-y-1 hover:border-[#00ffcc] cursor-pointer">
            <h3 className="font-semibold text-white">Manage Your Links</h3>
            <p className="mt-2 text-sm text-white/70">Keep all your short links organized, updated, and under control.</p>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto mt-12 max-w-4xl px-4 text-center scroll-mt-24">
        <h2 className="text-2xl font-bold text-white">FAQ</h2>
        <p className="mt-3 text-white/70">Common questions about Trimylink</p>

        <div className="mt-6">
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="item-1" className="w-full">
              <AccordionTrigger className="w-full cursor-pointer justify-center text-center text-white hover:no-underline">
                How do I create a short link?
              </AccordionTrigger>
              <AccordionContent className="text-center text-[#00ffcc]">
                Paste your long URL into the box above and click Trim it to create a short link.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="w-full">
              <AccordionTrigger className="w-full cursor-pointer justify-center text-center text-white hover:no-underline">
                Can I customize my short link?
              </AccordionTrigger>
              <AccordionContent className="text-center text-[#00ffcc]">
                Yes — when creating a link you can choose a custom alias if available.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="w-full">
              <AccordionTrigger className="w-full cursor-pointer justify-center text-center text-white hover:no-underline">
                Where can I view my links?
              </AccordionTrigger>
              <AccordionContent className="text-center text-[#00ffcc]">
                Log in to your dashboard to view and manage all your shortened links.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="w-full">
              <AccordionTrigger className="w-full cursor-pointer justify-center text-center text-white hover:no-underline">
                Is Trimylink free to use?
              </AccordionTrigger>
              <AccordionContent className="text-center text-[#00ffcc]">
                Trimylink offers a simple free experience for shortening and sharing links.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="w-full">
              <AccordionTrigger className="w-full cursor-pointer justify-center text-center text-white hover:no-underline">
                Does it work on mobile devices?
              </AccordionTrigger>
              <AccordionContent className="text-center text-[#00ffcc]">
                Yes. Trimylink is fully responsive and works smoothly on mobile and desktop.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contact" className="mx-auto mt-16 max-w-4xl px-2 text-center sm:px-4 scroll-mt-24">
        <h2 className="text-2xl font-bold text-white">Got a query?</h2>
        <p className=" mt-5 text-white/60">Have a question or need assistance? Our team is here to help!</p>

          <form
          className="mx-auto mt-6 w-full max-w-xl rounded-lg border-2 border-[#00ffcc] bg-background/60 p-6 text-left"
          onSubmit={(e) => {
            e.preventDefault()
            if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
              setContactResponse("Please fill all fields")
              setContactResponseType("error")
              return
            }
            setContactResponse("Thanks — we'll reach out to you shortly.")
            setContactResponseType("success")
            setContactName("")
            setContactEmail("")
            setContactMessage("")

            if (contactTimer.current) clearTimeout(contactTimer.current)
            contactTimer.current = setTimeout(() => {
              setContactResponse("")
              setContactResponseType("")
            }, 2000)
          }}
        >
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Name"
              value={contactName}
              onChange={(e) => { setContactName(e.target.value); setContactResponse("") }}
              className="h-10 w-full rounded-md border border-white/10 bg-transparent px-3 text-white placeholder:text-white/50"
            />
            <Input
              type="email"
              placeholder="Email"
              value={contactEmail}
              onChange={(e) => { setContactEmail(e.target.value); setContactResponse("") }}
              className="h-10 w-full rounded-md border border-white/10 bg-transparent px-3 text-white placeholder:text-white/50"
            />
            <textarea
              placeholder="Message"
              value={contactMessage}
              onChange={(e) => { setContactMessage(e.target.value); setContactResponse("") }}
              className="h-28 w-full rounded-md border border-white/10 bg-transparent p-3 text-white placeholder:text-white/50"
            />

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="rounded-md bg-white px-8 py-2 min-w-40 text-black transition-colors hover:bg-[#00ffcc] hover:text-black cursor-pointer"
              >
                Submit
              </button>
            </div>

            <p className={`mt-2 text-center text-sm ${contactResponseType === 'error' ? 'text-red-400' : 'text-[#00ffcc]'}`} aria-live="polite">{contactResponse}</p>
          </div>
        </form>
      </section>
    </main>
  )
}

export default LandingPage