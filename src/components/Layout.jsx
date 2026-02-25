import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PageViewTracker } from '@/components/PageViewTracker'

export function Layout({ children }) {
  return (
    <>
      <PageViewTracker />
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  )
}
