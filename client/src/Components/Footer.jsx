import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-white">

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14">

                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">

                    {/* LEFT */}
                    <div className="max-w-md text-center md:text-left">

                        <div className="inline-block text-3xl font-bold tracking-wide cursor-pointer transition-transform duration-300 hover:scale-105">
                            <span className="text-white">
                                <Link
                                to='/'
                                >Gyanendra
                                </Link></span>
                            <span className="text-orange-500 text-4xl">.</span>
                        </div>

                        <p className="mt-5 text-gray-400 leading-7 text-sm sm:text-base">
                            Full-stack developer focused on building modern React applications,
                            interactive UI systems, and scalable web experiences with clean architecture.
                        </p>

                        {/* SMALL TECH STACK TAGS */}
                        <div className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start">
                            {["React", "Tailwind", "Node.js", "MERN"].map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-slate-700 text-slate-300 transition-colors duration-1000 ease-in-out hover:bg-orange-400 hover:text-white"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col items-center md:items-end">

                        <h3 className="text-lg font-semibold text-orange-500 mb-5">
                            Let’s Connect
                        </h3>

                        <p className="text-sm text-gray-400 mb-5 text-center md:text-right max-w-xs">
                            Open for internships, freelance work, and collaboration on web projects.
                        </p>

                        <div className="flex items-center gap-4">

                            {/* GitHub */}
                            <a href="https://github.com/GyanendraAryal" target="_blank" rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/60
                hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="transition-transform duration-300 group-hover:scale-110" > <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.95c.6.1.82-.26.82-.58v-2.17c-3.26.71-3.95-1.57-3.95-1.57-.55-1.4-1.35-1.77-1.35-1.77-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.86 2.84 1.32 3.53 1 .1-.79.42-1.32.76-1.62-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.33 1.22-3.15-.12-.3-.53-1.52.12-3.16 0 0 1-.32 3.3 1.2a11.4 11.4 0 016 0c2.3-1.52 3.3-1.2 3.3-1.2.65 1.64.24 2.86.12 3.16.76.82 1.22 1.87 1.22 3.15 0 4.51-2.74 5.5-5.35 5.8.43.37.81 1.1.81 2.22v3.3c0 .32.22.69.83.57A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" /> </svg>
                            </a>

                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/in/gyanendra-aryal/" target="_blank" rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/60
                hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="transition-transform duration-300 group-hover:scale-110" > <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.16h.05c.53-1 1.84-2.16 3.8-2.16 4.07 0 4.82 2.68 4.82 6.16V24h-4v-7.1c0-1.7-.03-3.88-2.37-3.88-2.37 0-2.73 1.85-2.73 3.76V24h-4V8z" /> </svg>
                            </a>

                            {/* Instagram */}
                            <a href="https://instagram.com/g_aryal5" target="_blank" rel="noopener noreferrer"
                                className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/60
                hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/20 active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="transition-transform duration-300 group-hover:scale-110" > <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.33 4 20 5.67 20 7.75v8.5C20 18.33 18.33 20 16.25 20h-8.5C5.67 20 4 18.33 4 16.25v-8.5C4 5.67 5.67 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" /> </svg>
                            </a>

                        </div>

                    </div>

                </div>

                {/* BOTTOM */}
                <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500 text-center">

                    <p>
                        © {new Date().getFullYear()} Gyanendra Aryal.
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;