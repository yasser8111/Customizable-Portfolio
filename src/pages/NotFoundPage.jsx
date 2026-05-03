import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import { TextBlock } from "../components/ui/TextBlockEffect";
import MaterialIcon from "../components/ui/MaterialIcon";
import portfolioData from "../data.json";

const NotFoundPage = ({ lang, setLang, personal, nav, footer, buttons }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const backgroundRef = useRef(null);

  const { notFound } = portfolioData[lang];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.4 }
      );

      gsap.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.6 }
      );

      // Subtle floating background effect
      gsap.to(backgroundRef.current, {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white"
    >
      <div className="max-w-[1400px] mx-auto w-full min-h-screen flex flex-col">
        <Navbar
          personal={personal}
          nav={nav}
          lang={lang}
          setLang={setLang}
          isMenuOpen={false}
          setIsMenuOpen={() => {}}
          scrollToSection={() => {}}
        />

        <main className="flex-1 flex items-center justify-center relative overflow-hidden px-6">
          {/* Abstract Background Element */}
          <div 
            ref={backgroundRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-50"
          />

          <div className="text-center max-w-2xl relative z-10">
            <div ref={titleRef} className="mb-6">
              <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-slate-900 flex justify-center">
                <TextBlock blockColor="#2563eb">{notFound.title}</TextBlock>
              </h1>
            </div>

            <div ref={textRef} className="mb-10 space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight">
                <TextBlock blockColor="#cbd5e1">{notFound.subtitle}</TextBlock>
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                <TextBlock blockColor="#cbd5e1" className="block">
                  {notFound.message}
                </TextBlock>
              </p>
            </div>

            <div ref={buttonRef} className="flex justify-center">
              <Link to="/">
                <Button
                  variant="primary"
                  size="lg"
                  className="px-12 py-5 text-xl uppercase tracking-wider"
                  icon={({ className }) => (
                    <MaterialIcon icon="home" className={className} size={24} />
                  )}
                  iconPosition="start"
                >
                  {notFound.button}
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer text={footer.text} />
      </div>
    </div>
  );
};

export default NotFoundPage;
