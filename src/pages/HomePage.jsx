import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { createSlug } from "../lib/utils";
import Button from "../components/ui/Button";
import ProjectHoverSection from "../components/projects/ProjectHoverSection";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ContactSection from "../components/sections/ContactSection";
import { TextBlock } from "../components/ui/TextBlockEffect";
import MaterialIcon from "../components/ui/MaterialIcon";

const ArrowIcon = ({ size = 16, className = "" }) => (
  <MaterialIcon
    icon="arrow_back"
    size={size}
    className={`rtl:rotate-180 ${className}`}
  />
);

const HomePage = ({
  lang,
  setLang,
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
  isUnderConstruction,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
}) => {
  const navigate = useNavigate();

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white "
    >
      {isUnderConstruction && (
        <div className="bg-blue-600 text-white py-2 px-4 text-center text-xs font-bold tracking-widest uppercase">
          {personal.underConstructionText}
        </div>
      )}

      {/* Container */}
      <div className="max-w-[1400px] mx-auto w-full min-h-screen flex flex-col">
        {/* Navigation */}
        <Navbar
          personal={personal}
          nav={nav}
          lang={lang}
          setLang={setLang}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          scrollToSection={scrollToSection}
        />

        <main className="flex-1">
          <section className="relative overflow-hidden min-h-[calc(100dvh-76px)] bg-white flex items-center">
            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-[6fr_4fr] items-stretch min-h-[calc(100dvh-65px)] relative z-10">
              {/* Left: Text Content */}
              <div className="relative z-10 w-full flex items-center px-6 md:px-12 py-20 lg:py-0">
                <div className="flex flex-col items-center text-center md:items-start md:text-start w-full max-w-4xl">
                  <h2 className="text-[clamp(2rem,6vw,4rem)] font-black tracking-tighter leading-[1.2] mb-8 text-slate-900 text-balance max-w-3xl mx-auto md:mx-0">
                    {hero.title.split("\n").map((line, i) => (
                      <span key={i} className="block w-full">
                        <TextBlock blockColor="#2563eb" className="block">
                          {line.split(/(grow|تنمو)/g).map((part, j) =>
                            part === "grow" || part === "تنمو" ? (
                              <span key={j} className="text-blue-600">
                                {part}
                              </span>
                            ) : (
                              part
                            ),
                          )}
                        </TextBlock>
                      </span>
                    ))}
                  </h2>

                  <div className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-medium mb-10 flex flex-col items-center md:items-start gap-1 text-balance mx-auto md:mx-0">
                    <TextBlock
                      blockColor="#cbd5e1"
                      className="inline-block py-0"
                    >
                      {hero.subtitle}
                    </TextBlock>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center md:justify-start">
                    <Button
                      href="#projects"
                      onClick={(e) => scrollToSection(e, "projects")}
                      variant="primary"
                      size="lg"
                      className="px-10 py-4 text-lg"
                    >
                      {buttons.viewProjects}
                    </Button>
                    <Button
                      href="#contact"
                      onClick={(e) => scrollToSection(e, "contact")}
                      variant="outline"
                      size="lg"
                      className="px-10 py-4 text-lg"
                    >
                      {buttons.contactMe}
                    </Button>
                  </div>
                  {/* Social Proof */}
                  <div className="mt-12 pt-8 flex flex-wrap w-full items-center justify-center md:justify-start gap-x-6 gap-y-4 sm:gap-x-8 text-sm font-semibold text-slate-600">
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="check_circle"
                        size={18}
                        className="text-blue-600"
                      />
                      <span>
                        {lang === "ar"
                          ? "3+ مشاريع مكتملة"
                          : "3+ Completed Projects"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="speed"
                        size={18}
                        className="text-blue-600"
                      />
                      <span>
                        {lang === "ar"
                          ? "أركز على الأداء وتجربة المستخدم"
                          : "Focus on Performance & UX"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MaterialIcon
                        icon="design_services"
                        size={18}
                        className="text-blue-600"
                      />
                      <span>
                        {lang === "ar"
                          ? "تصاميم مبنية وفق أفضل الممارسات"
                          : "Best Practice Designs"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Image Content */}
              <div className="relative overflow-hidden bg-slate-50 hidden md:flex items-center justify-center min-h-[400px] md:min-h-0">
                <img
                  src="/hero-img2.png"
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
                {/* Decorative overlay for premium feel */}
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-multiply pointer-events-none" />
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects">
            <div className="w-full">
              {/* Section Header */}
              <div className=" md:p-12 p-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                  <TextBlock blockColor="#2563eb">
                    {sections.selectedWorks}
                  </TextBlock>
                </h3>
              </div>

              <ProjectHoverSection projects={projects.slice(0, 3)} />
              <div className="py-12 px-6 md:px-12 flex justify-end rtl:justify-start md:justify-center md:rtl:justify-center">
                <Link to="/projects">
                  <Button
                    variant="primary"
                    icon={({ className }) => (
                      <ArrowIcon size={16} className={className} />
                    )}
                    iconPosition="start"
                    className="uppercase"
                  >
                    {buttons.viewAll}
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Skills & About */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* About */}
              <div
                id="about"
                className="md:col-span-5 py-16 ps-6 md:ps-12 pe-12"
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-8">
                  <TextBlock blockColor="#2563eb">{sections.about}</TextBlock>
                </h3>
                {about.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg leading-relaxed text-slate-500 mb-6 last:mb-0"
                  >
                    <TextBlock blockColor="#cbd5e1" className="block">
                      {paragraph}
                    </TextBlock>
                  </p>
                ))}
                <div className="mt-10 flex justify-end" dir="ltr">
                  <Link to="/about">
                    <Button
                      variant="outline"
                      icon={({ className }) => (
                        <ArrowIcon size={16} className={className} />
                      )}
                      iconPosition="start"
                      className="uppercase"
                    >
                      {buttons.aboutMe}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Skills */}
              <div
                id="skills"
                className="hidden md:block md:col-span-7 py-16 ps-12 pe-6 md:pe-12"
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-8">
                  <TextBlock blockColor="#2563eb">
                    {sections.expertise}
                  </TextBlock>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
                  {expertise.slice(0, 4).map((item, i) => (
                    <div key={i}>
                      <h4 className="font-bold text-slate-900 mb-4 pb-2 uppercase tracking-wide text-sm">
                        <TextBlock blockColor="#2563eb">
                          {item.category}
                        </TextBlock>
                      </h4>
                      <ul className="space-y-3 text-base text-slate-500 font-medium">
                        {item.skills.slice(0, 3).map((skill, j) => (
                          <li key={j}>
                            <TextBlock blockColor="#cbd5e1">{skill}</TextBlock>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div
                className="md:col-span-3 py-8 md:py-16 ps-6 md:ps-12 pe-8 flex flex-row md:flex-col justify-between items-center md:items-start gap-4"
                dir="ltr"
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 md:mb-8">
                  <TextBlock blockColor="#2563eb">
                    {sections.services}
                  </TextBlock>
                </h3>
                <div className="hidden md:flex justify-end" dir="ltr">
                  <Link to="/services">
                    <Button
                      variant="primary"
                      icon={({ className }) => (
                        <ArrowIcon size={16} className={className} />
                      )}
                      iconPosition="start"
                      className="uppercase"
                    >
                      {buttons.moreServices}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-3">
                {services.map((service, i) => {
                  const palette = [
                    {
                      base: "#0284c7",
                      bg: "#f0f9ff",
                      title: "#0c4a6e",
                      desc: "#0369a1",
                    },
                    {
                      base: "#db2777",
                      bg: "#fdf2f8",
                      title: "#831843",
                      desc: "#be185d",
                    },
                    {
                      base: "#059669",
                      bg: "#ecfdf5",
                      title: "#064e3b",
                      desc: "#047857",
                    },
                  ][i % 3];

                  return (
                    <div
                      key={i}
                      className="p-8 md:p-12 cursor-pointer transition-all duration-500"
                      style={{ backgroundColor: palette.bg }}
                    >
                      <div className="mb-8">
                        <span
                          className="text-5xl font-mono font-bold tracking-tighter text-slate-500 opacity-30 transition-all duration-500"
                          style={{ color: palette.base }}
                        >
                          0{i + 1}
                        </span>
                      </div>
                      <h4
                        className="text-xl md:text-2xl font-bold mb-4"
                        style={{ color: palette.title }}
                      >
                        <TextBlock blockColor={palette.base}>
                          {service.title}
                        </TextBlock>
                      </h4>
                      <p
                        className="text-base font-medium leading-relaxed"
                        style={{ color: palette.desc }}
                      >
                        <TextBlock blockColor={palette.base} className="block">
                          {service.desc}
                        </TextBlock>
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Only: More Services Button */}
              <div className="md:hidden py-12 px-6 flex justify-end rtl:justify-start md:justify-center md:rtl:justify-center">
                <Link to="/services">
                  <Button
                    variant="primary"
                    icon={({ className }) => (
                      <ArrowIcon size={16} className={className} />
                    )}
                    iconPosition="start"
                    className="uppercase"
                  >
                    {buttons.moreServices}
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <ContactSection personal={personal} sections={sections} lang={lang} />
        </main>

        <Footer text={footer.text} />
      </div>
    </div>
  );
};

export default HomePage;
