import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import MaterialIcon from "../components/ui/MaterialIcon";
import Button from "../components/ui/Button";
import { NavBack } from "../components/layout/Navbar";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectsGallery from "../components/projects/ProjectsGallery";
import { createSlug } from "../lib/utils";

const AllProjectsPage = ({
  projects,
  lang,
  buttons,
  gallery,
  nav,
  personal,
}) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      gsap.fromTo(
        ".mobile-project-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2,
        },
      );
    }
  }, [isMobile]);

  if (isMobile) {
    return (
      <div
        className="w-full min-h-screen bg-slate-50 flex flex-col"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <NavBack
          onBack={() => navigate(-1)}
          backText={buttons.backToHome}
          lang={lang}
          personal={personal}
        />

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
            <MaterialIcon icon="desktop_windows" size={40} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 leading-tight">
            {lang === "ar"
              ? "نأسف، هذه الصفحة غير متوفرة"
              : "Sorry, Page Not Available"}
          </h1>

          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm mb-10">
            {lang === "ar"
              ? "عذراً، معرض المشاريع التفاعلي مصمم خصيصاً للشاشات الكبيرة. يرجى زيارة الصفحة من جهاز كمبيوتر للاستمتاع بالتجربة الكاملة."
              : "Sorry, the interactive projects gallery is specially designed for large screens. Please visit from a desktop device to enjoy the full experience."}
          </p>

          <Button
            onClick={() => navigate(-1)}
            variant="primary"
            className="px-8"
          >
            {buttons.backToHome}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative bg-white overflow-hidden">
      {/* Floating Back Button (Desktop) */}
      <div className="fixed top-6 left-6 md:top-10 md:left-12 z-100 pointer-events-auto rtl:left-auto rtl:right-6 rtl:md:right-12">
        <Button
          onClick={() => navigate(-1)}
          variant="secondary"
          icon={({ size, className }) => (
            <MaterialIcon
              icon="arrow_back"
              size={18}
              className={`rtl:rotate-180 ${className}`}
            />
          )}
          iconPosition="start"
          className="uppercase shadow-2xl bg-white/80 backdrop-blur-md"
        >
          {buttons.backToHome}
        </Button>
      </div>

      <main className="w-full h-full">
        <ProjectsGallery
          projects={projects}
          onSelectProject={(p) => navigate(`/projects/${createSlug(p.title)}`)}
          lang={lang}
          gallery={gallery}
        />
      </main>
    </div>
  );
};

export default AllProjectsPage;
