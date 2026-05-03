import React, { useState, Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";
import portfolioData from "./data.json";
import SmoothScroll from "./components/layout/SmoothScroll";
import Preloader from "./components/layout/Preloader";
import { createSlug } from "./lib/utils";

// Lazy Load Pages for Performance
const HomePage = lazy(() => import("./pages/HomePage"));
const AllProjectsPage = lazy(() => import("./pages/AllProjectsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProjectDetailsPage = lazy(() => import("./pages/ProjectDetailsPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Wrapper for Project Details to handle URL params
const ProjectDetailsWrapper = ({ projects, lang, footerText, buttons, personal }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = projects.find((p) => createSlug(p.title) === projectId);

  useEffect(() => {
    if (!project) {
      navigate("/projects", { replace: true });
    }
  }, [project, navigate]);

  if (!project) {
    return null;
  }

  return (
    <ProjectDetailsPage
      project={project}
      onBack={() => navigate(-1)}
      lang={lang}
      footerText={footerText}
      buttons={buttons}
      personal={personal}
    />
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("portfolio_lang") || portfolioData.lang || "en";
  });

  useEffect(() => {
    localStorage.setItem("portfolio_lang", lang);
  }, [lang]);
  const {
    personal,
    hero,
    about,
    projects,
    expertise,
    services,
    footer,
    nav,
    buttons,
    sections,
    gallery,
    philosophy,
    certificates,
  } = portfolioData[lang];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Disable DevTools
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: id === "projects" ? "start" : "center",
      });
    }
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <SmoothScroll>
        <div
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white relative"
        >


          <Preloader 
            isLoading={isLoading} 
            text={personal.name} 
            onComplete={handleLoadingComplete} 
          />
          <Suspense fallback={<Preloader isLoading={true} />}>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    lang={lang}
                    setLang={setLang}
                    personal={personal}
                    hero={hero}
                    about={about}
                    projects={projects}
                    expertise={expertise}
                    services={services}
                    footer={footer}
                    nav={nav}
                    buttons={buttons}
                    sections={sections}
                    isUnderConstruction={portfolioData.isUnderConstruction}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    scrollToSection={scrollToSection}
                  />
                }
              />
              <Route
                path="/about"
                element={
                  <AboutPage
                    lang={lang}
                    setLang={setLang}
                    personal={personal}
                    about={about}
                    philosophy={philosophy}
                    certificates={certificates}
                    expertise={expertise}
                    nav={nav}
                    footer={footer}
                    buttons={buttons}
                    sections={sections}
                  />
                }
              />
              <Route
                path="/projects"
                element={
                  <AllProjectsPage
                    projects={projects}
                    lang={lang}
                    personal={personal}
                    footerText={footer.text}
                    buttons={buttons}
                    nav={nav}
                    gallery={gallery}
                  />
                }
              />
              <Route
                path="/services"
                element={
                  <ServicesPage
                    lang={lang}
                    personal={personal}
                    services={services}
                    nav={nav}
                    footer={footer}
                    buttons={buttons}
                    sections={sections}
                  />
                }
              />
              <Route
                path="/projects/:projectId"
                element={
                  <ProjectDetailsWrapper
                    projects={projects}
                    lang={lang}
                    personal={personal}
                    footerText={footer.text}
                    buttons={buttons}
                  />
                }
              />
              <Route
                path="*"
                element={
                  <NotFoundPage
                    lang={lang}
                    setLang={setLang}
                    personal={personal}
                    nav={nav}
                    footer={footer}
                    buttons={buttons}
                  />
                }
              />
            </Routes>
          </Suspense>
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}
