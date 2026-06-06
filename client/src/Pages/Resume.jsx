import { useEffect, useState } from 'react'
import { getActiveResume } from '../api'

const skills = [
  'JavaScript',
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'Tailwind CSS',
  'JWT Auth',
  'REST APIs',
  'Cloudinary',
  'Git',
]

const projects = [
  {
    title: 'EyeExpress',
    desc: 'Full-stack eyewear e-commerce with admin dashboard and payments.',
  },
  {
    title: 'CashYourPhone',
    desc: 'Used phone marketplace with authentication and image uploads.',
  },
  {
    title: 'AirPlus',
    desc: 'Travel & trekking platform with booking and admin system.',
  },
]

const Resume = () => {
  const [resumeUrl, setResumeUrl] = useState('/Resume.pdf')

  useEffect(() => {
    getActiveResume()
      .then((res) => {
        if (res.data?.file_url) {
          setResumeUrl(res.data.file_url)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="min-h-screen bg-[#09090b] text-zinc-100 px-6 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase text-zinc-500 mb-3">
              Available for work
            </p>

            <h1 className="font-syne text-5xl font-bold leading-[1.05] text-zinc-50">
              Full Stack
              <br />
              <span className="text-orange-500">MERN Developer</span>
            </h1>

            <p className="mt-4 text-[15px] font-light text-zinc-400 leading-relaxed max-w-md">
              Backend-focused developer building scalable APIs, secure auth
              systems, and modern React applications with clean architecture.
            </p>
          </div>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 mb-16" />

        {/* Skills */}
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.18em] uppercase text-zinc-600 mb-5">
            Skills
          </p>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 rounded-full border border-zinc-800 bg-[#111113] text-zinc-400 text-[13px] hover:border-orange-500 hover:text-zinc-50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-zinc-600 mb-5">
            Projects
          </p>

          <div className="flex flex-col gap-3">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="flex items-center justify-between gap-4 p-5 rounded-xl border border-zinc-900 bg-[#111113] hover:border-zinc-800 transition-colors"
              >
                <div>
                  <h3 className="font-syne text-base font-medium text-zinc-50 mb-1">
                    {project.title}
                  </h3>

                  <p className="text-[13px] font-light text-zinc-500 leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                <span className="shrink-0 font-syne text-[11px] text-zinc-700 self-start pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-zinc-900 flex items-center justify-between">
          <p className="text-xs text-zinc-700 tracking-wide">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 mb-px" />
            React + Tailwind CSS
          </p>

          <p className="text-xs text-zinc-700">2025</p>
        </div>
      </div>
    </section>
  )
}

export default Resume