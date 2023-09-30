import { Inter } from 'next/font/google'
 import "../styles/globals.css"
import Navbar from '@/components/Navbar'
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })
 
export default function MyApp({ Component, pageProps }) {
  return (
    <>
     <main className={inter.className}>
      <Navbar/>
      <Component {...pageProps} className={inter.className} />
     </main>
    </>
  )
}