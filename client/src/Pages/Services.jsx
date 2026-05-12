import { Monitor, Code2, Layers, LayoutDashboard, Plug, Sparkles } from "lucide-react";
import ServiceCard from "../Components/ServiceCard";

const services = [
  {
    icon: Monitor,
    tag: "Frontend",
    title: "Frontend Development",
    desc: "Building modern, responsive, and interactive UIs using React, Tailwind CSS, and component-based architecture."
  },
  {
    icon: Code2,
    tag: "React",
    title: "React Application Development",
    desc: "Creating scalable single-page applications with routing, API integration, state management, and reusable components."
  },
  {
    icon: Layers,
    tag: "Full Stack",
    title: "Full-Stack MVP Development",
    desc: "Developing complete web applications using MERN stack with REST APIs, authentication, and database integration."
  },
  {
    icon: LayoutDashboard,
    tag: "Admin",
    title: "Dashboard & Admin Panels",
    desc: "Designing clean and functional dashboards for managing data like projects, users, and analytics."
  },
  {
    icon: Plug,
    tag: "Backend",
    title: "API Integration & Data Handling",
    desc: "Connecting frontend apps with APIs (or mock JSON data) to build dynamic, real-world applications."
  },
  {
    icon: Sparkles,
    tag: "UI / UX",
    title: "UI/UX Focused Development",
    desc: "Crafting smooth user experiences with animations, responsive layouts, and modern design principles."
  }
];

const Services = () => {
  return (
    <section className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-14 text-center">
          My <span className="text-orange-500">Services</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;