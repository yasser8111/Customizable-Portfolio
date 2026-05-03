import React from "react";

const ProjectCard = ({ project, onSelectProject, isFirst = false }) => {
  return (
    <div
      onClick={() => onSelectProject(project)}
      className={`flex flex-col md:flex-row md:items-start justify-between py-12 ps-8 pe-6 md:pe-12 cursor-pointer relative`}
    >
      <div className="max-w-2xl relative z-10 flex-1">
        <div className="flex items-center gap-4 mb-3">
          <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            {project.title}
          </h4>
          <span className="text-xs font-mono font-medium px-2 py-1 bg-slate-100 text-slate-600">
            {project.year}
          </span>
        </div>
        <p className="text-base md:text-lg text-slate-500 font-semibold mb-4 leading-relaxed line-clamp-2">
          {project.desc}
        </p>
        <p className="text-sm font-semibold text-blue-600 tracking-wide">
          {project.tech}
        </p>
      </div>

      {project.image && (
        <div className="mt-8 md:mt-0 md:ms-12 w-full md:w-48 h-48 md:h-32 shrink-0 overflow-hidden bg-slate-100">
          <img 
            src={project.image} 
            alt={project.title} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-500" 
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(ProjectCard);
