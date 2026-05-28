import Header from "@/components/header"
import Footer from "@/components/footer"
import { Outlet } from "react-router-dom"


const AppLayout = () => {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <div className="flex-1 px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

export default AppLayout