import { useEffect, useState } from 'react'
import { Download, ExternalLink, Loader2 } from 'lucide-react'
import { getActiveResume } from '../api'

/* ── Actual skill set (matches Skills section) ─────────────────── */
const SKILLS = [
  // Languages
  'JavaScript', 'TypeScript', 'Python',
  // Frontend
  'React', 'Tailwind CSS', 'Responsive UI',
  // Backend
  'Django', 'Django REST Framework', 'REST API Design',
  // DevOps
  'Docker', 'Git', 'GitHub',
  // Docs
  'LaTeX', 'Overleaf',
]

/* ── Project highlight list ────────────────────────────────────── */
const PROJECTS = [
  {
    title: 'EyeExpress',
    desc: 'Full-stack eyewear e-commerce with Redux auth, dynamic categories, and Khalti checkout.',
    stack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'CashYourPhone',
    desc: 'Mobile selling platform with instant valuation, authentication, and secure request handling.',
    stack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Portfolio CMS',
    desc: 'Dynamic portfolio site with a React frontend, Django REST API, and Cloudinary media storage.',
    stack: ['React', 'Django', 'PostgreSQL', 'Cloudinary'],
  },
]

export default function Resume() {
  const [resumeUrl, setResumeUrl] = useState('')
  const [loadingResume, setLoadingResume] = useState(true)

  useEffect(() => {
    getActiveResume()
      .then((res) => {
        if (res.data?.file_url) setResumeUrl(res.data.file_url)
      })
      .catch(() => {})
      .finally(() => setLoadingResume(false))
  }, [])

  return (
    <main className="min-h-screen bg-[#09090b] pt-14 text-zinc-100">
      <div className="section-container py-20 max-w-3xl">

        {/* ── Header ────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="section-label mb-3">Available for work</p>
            <h1 className="text-4xl font-bold leading-[1.08] sm:text-5xl">
              Full-Stack
              <br />
              <span className="text-orange-500">Developer</span>
            </h1>
            <p className="mt-4 text-[0.9375rem] text-zinc-400 leading-relaxed max-w-md">
              React + TypeScript frontend, Django REST Framework backend,
              containerized with Docker. Clean architecture, maintainable code.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            {loadingResume ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-sm text-zinc-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading…
              </div>
            ) : (
              resumeUrl ? (
                <>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  aria-label="Download resume PDF"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  View PDF
                </a>
                </>
              ) : (
                <p className="text-sm text-zinc-500">Resume is not available right now.</p>
              )
            )}
          </div>
        </div>

        {/* ── Divider ────────────────────────────────────── */}
        <div className="h-px bg-gradient-to-r from-zinc-900 via-zinc-700/60 to-zinc-900 mb-14" />

        {/* ── Skills ─────────────────────────────────────── */}
        <section aria-labelledby="resume-skills" className="mb-14">
          <p className="text-[0.6875rem] tracking-widest uppercase text-zinc-600 font-semibold mb-5" id="resume-skills">
            Skills
          </p>
          <div className="flex flex-wrap gap-2" role="list">
            {SKILLS.map((s) => (
              <span
                key={s}
                role="listitem"
                className="px-3 py-1.5 rounded-md border border-zinc-800 bg-[#111113] text-zinc-400 text-[0.8125rem] hover:border-orange-500/50 hover:text-zinc-200 transition-colors cursor-default"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* ── Projects ───────────────────────────────────── */}
        <section aria-labelledby="resume-projects">
          <p className="text-[0.6875rem] tracking-widest uppercase text-zinc-600 font-semibold mb-5" id="resume-projects">
            Projects
          </p>
          <div className="flex flex-col gap-3">
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className="flex items-start justify-between gap-4 p-5 rounded-xl border border-zinc-900 bg-[#111113] hover:border-zinc-800 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-zinc-100 mb-1">{p.title}</h3>
                  <p className="text-[0.8125rem] text-zinc-500 leading-relaxed mb-2">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded text-[0.6875rem] text-zinc-600 bg-zinc-900/80 border border-zinc-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="shrink-0 text-[0.6875rem] text-zinc-700 font-medium pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer note ────────────────────────────────── */}
        <div className="mt-14 pt-6 border-t border-zinc-900 flex items-center justify-between">
          <p className="text-xs text-zinc-700 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500" />
            React · Django · TypeScript · Docker · LaTeX
          </p>
          <p className="text-xs text-zinc-700">2025</p>
        </div>

      </div>
    </main>
  )
}
