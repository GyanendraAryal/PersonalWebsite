const ProjectCard = ({ project, count }) => {
  return (
    <div className="relative w-full md:w-[30%] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800
      transition-all duration-300 ease-in-out
      hover:-translate-y-2 hover:scale-[1.03]
      hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20">

      {/* COUNT BADGE */}
      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/10
        text-white text-xs font-semibold px-3 py-1 rounded-full">
        #{count}
      </div>

      {/* IMAGE AREA */}
      <div className="h-56 bg-gradient-to-br from-slate-800 to-slate-700"></div>

      {/* CONTENT */}
      <div className="p-6">

        <h2 className="text-2xl text-white font-semibold mb-2">
          {project.projectName}
        </h2>

        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          Modern and scalable web application built with React and Tailwind CSS.
        </p>

        {/* BUTTON */}
        <button className="text-white flex items-center gap-1 group transition-colors duration-200 hover:text-orange-400">
          View Project
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>

      </div>

    </div>
  );
};

export default ProjectCard;