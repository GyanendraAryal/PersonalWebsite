import { useState, useEffect } from "react";
import ProjectCard from "../Components/ProjectCard";

const Work = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/data.json");
      const data = await res.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <section className="min-h-screen px-6 py-20">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-14 text-center">
          My <span className="text-orange-500">Work</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-8">

          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} count={index+1} />
          ))}

        </div>

      </div>

    </section>
  );
};

export default Work;