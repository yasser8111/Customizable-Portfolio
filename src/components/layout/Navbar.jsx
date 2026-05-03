import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { TextBlock } from "../ui/TextBlockEffect";
import MaterialIcon from "../ui/MaterialIcon";
import Button from "../ui/Button";

const MenuIcon = ({ isOpen }) => (
  <div className="relative w-6 h-5 flex flex-col justify-center items-center">
    <span
      className={`h-[2px] w-full bg-slate-900 transition-all duration-300 absolute ${
        isOpen ? "rotate-45" : "-translate-y-1.5"
      }`}
    ></span>
    <span
      className={`h-[2px] w-full bg-slate-900 transition-all duration-300 absolute ${
        isOpen ? "-rotate-45" : "translate-y-1.5"
      }`}
    ></span>
  </div>
);

const Navbar = ({
  personal,
  nav,
  lang,
  setLang,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
  backMode = false,
  onBack,
  backText,
}) => {
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-[60] bg-white py-2 md:py-4 px-4 md:px-12">
        <div className="flex justify-between items-center" dir="ltr">
          <div>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <h1 className="cursor-pointer flex items-center gap-3">
                <span className="w-4 h-4 md:w-5 md:h-5 bg-blue-600 shadow-sm block"></span>
                <span className="text-xl md:text-2xl font-bold tracking-tight leading-none">
                  {personal?.nickname}
                </span>
              </h1>
            </Link>
          </div>

          {backMode ? (
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="primary"
                size="sm"
                icon={({ size, className }) => (
                  <MaterialIcon
                    icon="arrow_back"
                    size={size}
                    className={`rtl:rotate-180 ${className}`}
                  />
                )}
                iconPosition="start"
                className="uppercase text-[10px] tracking-widest"
              >
                {backText}
              </Button>
            </div>
          ) : (
            <>
              {/* Desktop Links */}
              <div className="hidden sm:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase text-slate-500">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-blue-600 transition-colors cursor-pointer py-1"
                >
                  {lang === "ar" ? "الرئيسية" : "Home"}
                </a>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, "services")}
                  className="hover:text-blue-600 transition-colors cursor-pointer py-1"
                >
                  {nav.services}
                </a>
                <Link
                  to="/projects"
                  className="hover:text-blue-600 transition-colors uppercase cursor-pointer py-1"
                >
                  {nav.projects}
                </Link>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, "about")}
                  className="hover:text-blue-600 transition-colors cursor-pointer py-1"
                >
                  {nav.about}
                </a>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "contact")}
                  className="hover:text-blue-600 transition-colors cursor-pointer py-1"
                >
                  {nav.contact}
                </a>

                <div className="w-px h-4 bg-slate-200 mx-2"></div>

                <button
                  onClick={() => setLang(lang === "en" ? "ar" : "en")}
                  className="font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2 border border-slate-200 px-4 py-2 text-xs"
                >
                  <MaterialIcon icon="language" size={16} />
                  <span>{lang === "en" ? "العربية" : "English"}</span>
                </button>
              </div>

              {/* Mobile Controls */}
              <div className="flex items-center gap-4 sm:hidden">
                <button
                  onClick={() => setLang(lang === "en" ? "ar" : "en")}
                  className="font-bold text-xs text-slate-600 hover:text-blue-600 bg-slate-50 border border-slate-200 px-3 py-1.5 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <MaterialIcon icon="language" size={16} />
                  <span>{lang === "en" ? "العربية" : "EN"}</span>
                </button>
                <button
                  className="text-slate-900 p-2 cursor-pointer z-[70]"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle Menu"
                >
                  <MenuIcon isOpen={isMenuOpen} />
                </button>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-[50] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] sm:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6 text-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsMenuOpen(false);
            }}
            className="text-3xl font-black tracking-tighter text-slate-900 uppercase"
          >
            {isMenuOpen && (
              <TextBlock blockColor="#2563eb" className="block">
                {lang === "ar" ? "الرئيسية" : "Home"}
              </TextBlock>
            )}
          </a>
          <a
            href="#about"
            onClick={(e) => {
              scrollToSection(e, "about");
              setIsMenuOpen(false);
            }}
            className="text-3xl font-black tracking-tighter text-slate-900 uppercase"
          >
            {isMenuOpen && (
              <TextBlock blockColor="#2563eb" className="block">
                {nav.about}
              </TextBlock>
            )}
          </a>
          <Link
            to="/projects"
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl font-black tracking-tighter text-slate-900 uppercase"
          >
            {isMenuOpen && (
              <TextBlock blockColor="#2563eb" className="block">
                {nav.projects}
              </TextBlock>
            )}
          </Link>
          <a
            href="#services"
            onClick={(e) => {
              scrollToSection(e, "services");
              setIsMenuOpen(false);
            }}
            className="text-3xl font-black tracking-tighter text-slate-900 uppercase"
          >
            {isMenuOpen && (
              <TextBlock blockColor="#2563eb" className="block">
                {nav.services}
              </TextBlock>
            )}
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              scrollToSection(e, "contact");
              setIsMenuOpen(false);
            }}
            className="text-3xl font-black tracking-tighter text-slate-900 uppercase"
          >
            {isMenuOpen && (
              <TextBlock blockColor="#2563eb" className="block">
                {nav.contact}
              </TextBlock>
            )}
          </a>
        </div>
      </div>
    </>
  );
};

export const NavBack = ({ onBack, backText, lang, personal }) => (
  <Navbar
    backMode={true}
    onBack={onBack}
    backText={backText}
    lang={lang}
    personal={personal}
  />
);

export default Navbar;
