import { useState, useEffect } from "react";
import ProjectCard from "../Components/ProjectCard";

const Work = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0f172a] px-4 py-20 sm:px-6 lg:px-8">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
         
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
            A curated collection of full-stack applications, responsive
            interfaces, and backend systems I’ve designed and developed.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="group transform transition duration-300 hover:-translate-y-2"
            >
              <ProjectCard
                project={project}
                count={index + 1}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
            <p className="text-slate-400">Loading projects...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;