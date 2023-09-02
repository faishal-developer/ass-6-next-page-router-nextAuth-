// import Footer from './footer'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface Iprops{
    children:ReactNode
}
 
export default function Layout(props:Iprops) {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </>
  )
}