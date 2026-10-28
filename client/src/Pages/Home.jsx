import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Monitor, Code2, Layers, LayoutDashboard, Plug, Sparkles } from 'lucide-react'
import HeroSlider from '../Components/HeroSlider'
import SkillsSection from '../Components/SkillsSection'

/* ── Services preview — uses services.json like the Services page ─── */
const ICON_MAP = { Monitor, Code2, Layers, LayoutDashboard, Plug, Sparkles }

function ServicesPreview() {
  const [services, setServices] = useState([])

  useEffect(() => {
    fetch('/services.json')
      .then((r) => r.json())
      .then((d) => setServices(d.slice(0, 3)))
      .catch(() => {})
  }, [])

  if (services.length === 0) return null

  return (
    <section aria-labelledby="services-preview-heading" className="bg-[#0a0a0c] py-24">
      <div className="section-container">

        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <p className="section-label">What I offer</p>
            <h2 id="services-preview-heading" className="text-3xl font-bold text-white sm:text-4xl">
              Services
            </h2>
          </div>
          <Link
            to="/service"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-orange-400 transition-colors"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = ICON_MAP[s.icon] ?? Sparkles
            return (
              <div key={i} className="card card-hover p-5 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-orange-500" aria-hidden />
                </div>
                <div>
                  <p className="text-[0.625rem] font-semibold tracking-widest uppercase text-orange-500 mb-1">{s.tag}</p>
                  <h3 className="text-sm font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-[0.8125rem] text-zinc-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

/* ── Contact CTA banner ──────────────────────────────────────────── */
function ContactCTA() {
  return (
    <section aria-labelledby="cta-heading" className="bg-[#0e0e10] py-24">
      <div className="section-container">
        <div className="rounded-xl border border-white/8 bg-[#141416] px-8 py-14 text-center max-w-2xl mx-auto">
          <p className="section-label mb-2">Let's work together</p>
          <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Have a project in mind?
          </h2>
          <p className="text-zinc-400 text-[0.9375rem] leading-7 mb-8 max-w-lg mx-auto">
            I'm open to freelance work, internships, and collaborations. Send me a
            message and let's build something great.
          </p>
          <Link to="/contact" className="btn-primary inline-flex">
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Home ────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <HeroSlider />
      <SkillsSection />
      <ServicesPreview />
      <ContactCTA />
    </>
  )
}
