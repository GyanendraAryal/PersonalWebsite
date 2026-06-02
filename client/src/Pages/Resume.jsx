import { useEffect, useState } from 'react'
import { getActiveResume } from '../api'

const Resume = () => {
  const [resumeUrl, setResumeUrl] = useState('/Resume.pdf')

  useEffect(() => {
    getActiveResume()
      .then((res) => {
        if (res.data?.file_url) setResumeUrl(res.data.file_url)
      })
      .catch(() => {})
  }, [])

  const skills = [
    'JavaScript', 'React', 'Node.js', 'Express',
    'MongoDB', 'Tailwind CSS', 'JWT Auth',
    'REST APIs', 'Cloudinary', 'Git'
  ]

  const projects = [
    {
      title: 'EyeExpress',
      desc: 'Full-stack eyewear e-commerce with admin dashboard and payments.'
    },
    {
      title: 'CashYourPhone',
      desc: 'Used phone marketplace with authentication and image uploads.'
    },
    {
      title: 'AirPlus',
      desc: 'Travel & trekking platform with booking and admin system.'
    }
  ]

  return (
    <section className="min-h-screen bg-slate-950 text-white px-6 py-20">

      <div className="max-w-4xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Full Stack <span className="text-orange-500">MERN Developer</span>
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Backend-focused developer building scalable APIs, secure auth systems,
            and modern React applications with clean architecture.
          </p>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-medium transition"
          >
            Download CV
          </a>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-orange-500">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm rounded-full border border-slate-700 bg-slate-900 text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-orange-500">
            Projects
          </h2>

          <div className="space-y-5">
            {projects.map((p) => (
              <div
                key={p.title}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900 hover:border-orange-500 transition"
              >
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer line */}
        <div className="text-center text-slate-600 text-sm">
          Built with React + Tailwind CSS
        </div>

      </div>
    </section>
  )
}

export default Resume