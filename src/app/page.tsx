import Backdrop from "@/components/three/Backdrop";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import ScrollProvider from "@/components/layout/ScrollProvider";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import PersonJsonLd from "@/components/seo/PersonJsonLd";

/**
 * Home — a server component. Only the backdrop, nav, progress
 * indicator and scroll provider hydrate; every section is static HTML.
 */
export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <ScrollProvider />
      <Backdrop />
      <ScrollProgress />
      <Nav variant="home" />

      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
