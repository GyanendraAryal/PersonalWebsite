import { useState, useEffect } from "react";
import ProjectCard from "../Components/ProjectCard";

const Work = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/works.json");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black px-4 py-20 sm:px-6 lg:px-8">

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 h-80 w-80 rounded-full bg-orange-500/8 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-purple-500/8 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/3 h-60 w-60 rounded-full bg-cyan-500/8 blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Enhanced Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 px-4 py-2 text-sm font-medium text-orange-300 backdrop-blur-sm">
              ✨ Featured Work
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">Featured</span>{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-300 sm:text-xl max-w-2xl mx-auto">
            A curated collection of full-stack applications, responsive
            interfaces, and backend systems I've designed and developed with modern technologies.
          </p>
        </div>

        {/* Enhanced Projects Grid */}
        <div
          className={`
    grid gap-8 justify-items-center
    ${projects.length === 1
              ? "grid-cols-1"
              : projects.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }
  `}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="group transform transition-all duration-500 hover:-translate-y-3 hover:scale-105"
            >
              <ProjectCard
                project={project}
                count={index + 1}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="relative mb-8">
              <div className="h-16 w-16 rounded-full border-4 border-orange-500/20">
                <div className="h-16 w-16 rounded-full border-t-4 border-orange-500 animate-spin"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Loading Projects</h3>
            <p className="text-gray-400">Fetching the latest work...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;