import { useEffect, useState } from "react";
import SourceAccessModal from "./components/SourceAccessModal";
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
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const isHomePage = window.location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [isHomePage]);

  useEffect(() => {
    if (!isHomePage) return;

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, [isHomePage]);

  if (!isHomePage) {
    return (
      <>
        <EnergyCursor />
        <NotFound />
      </>
    );
  }

  const openSourceModal = () => setIsSourceModalOpen(true);
  const closeSourceModal = () => setIsSourceModalOpen(false);

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
        <Contact onGitHubClick={openSourceModal} />
      </main>

      <Footer onGitHubClick={openSourceModal} />

      <SourceAccessModal
        open={isSourceModalOpen}
        onClose={closeSourceModal}
      />
    </>
  );
}