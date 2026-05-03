import { NavBack } from "../components/layout/Navbar";
import ProjectButtons from "../components/projects/ProjectButtons";

const ProjectDetailsPage = ({ project, onBack, lang, footerText, buttons, personal }) => {
  return (
    <div className="max-w-[1400px] mx-auto w-full px-4 md:px-12 min-h-screen flex flex-col">
      <NavBack personal={personal} onBack={onBack} backText={buttons.backToHome} lang={lang} />

      <main className="flex-1">
        <section className="py-8 md:py-16 lg:py-24 edge-to-edge">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="flex flex-col">
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tighter text-slate-900 leading-[1.1] mb-6">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="text-sm font-mono font-medium px-3 py-1 bg-slate-100 text-slate-600">
                  {project.year}
                </span>
                <span className="text-sm font-semibold text-blue-600 tracking-wide">
                  {project.tech}
                </span>
              </div>
              <div className="text-base md:text-lg text-slate-600 leading-relaxed space-y-6">
                {project.desc.split("\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <ProjectButtons project={project} buttons={buttons} />
            </div>
            {project.image && (
              <div className="w-full bg-slate-50">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-auto object-contain block mx-auto"
                />
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="py-8 mt-auto flex flex-col md:flex-row justify-center items-center gap-4 edge-to-edge">
        <p className="text-slate-500 font-medium text-[10px] md:text-sm tracking-wide text-center">
          &copy; {new Date().getFullYear()} {footerText}
        </p>
      </footer>
    </div>
  );
};

export default ProjectDetailsPage;
