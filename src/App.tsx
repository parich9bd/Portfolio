import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import {
  About,
  Projects,
  Skills,
  Experience,
  Process,
  Contact,
} from "./sections/Sections";
import EnergyCursor from "./components/EnergyCursor";
import CodeSpotlight from "./components/CodeSpotlight";
import NotFound from "./pages/NotFound";

export default function App() {
  // One shared observer reveals every .reveal element (CSS handles the motion).
  if (window.location.pathname !== "/") {
    return (
      <>
        <EnergyCursor />

        <NotFound />
      </>
    );
  }
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <EnergyCursor />
      <CodeSpotlight />

      <a className="skip" href="#about">
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Process />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
