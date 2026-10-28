import {
  Code2,
  Globe,
  Server,
  Container,
  BookOpen,
} from 'lucide-react'

const CATEGORIES = [
  {
    id: 'languages',
    icon: Code2,
    label: 'Languages',
    skills: [
      { name: 'JavaScript', abbr: 'JS' },
      { name: 'TypeScript', abbr: 'TS' },
      { name: 'Python', abbr: 'Py' },
    ],
  },
  {
    id: 'frontend',
    icon: Globe,
    label: 'Frontend',
    skills: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Responsive UI' },
      { name: 'REST API Integration' },
    ],
  },
  {
    id: 'backend',
    icon: Server,
    label: 'Backend',
    skills: [
      { name: 'Django' },
      { name: 'Django REST Framework' },
      { name: 'REST API Design' },
      { name: 'API Integration' },
      { name: 'Data Handling' },
    ],
  },
  {
    id: 'devops',
    icon: Container,
    label: 'DevOps & Tools',
    skills: [
      { name: 'Docker' },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Environment Config' },
      { name: 'Containerization' },
    ],
  },
  {
    id: 'docs',
    icon: BookOpen,
    label: 'Technical Docs',
    skills: [
      { name: 'LaTeX' },
      { name: 'Overleaf' },
      { name: 'Technical Documentation' },
      { name: 'Academic Writing' },
    ],
  },
]

function CategoryCard({ category }) {
  const Icon = category.icon

  return (
    <div className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/[0.04] hover:shadow-[0_12px_35px_rgba(0,0,0,0.18)] sm:p-6">
      {/* Subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 transition-all duration-300 group-hover:border-orange-500/35 group-hover:bg-orange-500/[0.15]">
          <Icon
            className="h-5 w-5 text-orange-500 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold tracking-wide text-white">
            {category.label}
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            {String(category.skills.length).padStart(2, '0')} skills
          </p>
        </div>
      </div>

      {/* Skill tags */}
      <ul className="flex flex-wrap gap-2" role="list">
        {category.skills.map((skill) => (
          <li
            key={skill.name}
            className="cursor-default rounded-lg border border-white/[0.07] bg-white/[0.035] px-3 py-1.5 text-xs font-medium leading-relaxed text-zinc-400 transition-all duration-200 hover:border-orange-500/30 hover:bg-orange-500/[0.07] hover:text-zinc-200"
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="bg-[#0e0e10] py-24 sm:py-28"
    >
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12 max-w-2xl sm:mb-14">
          <p className="section-label">Technical Skills</p>

          <h2
            id="skills-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
          >
            What I work with
            <span className="text-orange-500">.</span>
          </h2>

          <p className="mt-5 max-w-xl text-[0.9375rem] leading-7 text-zinc-400">
            I build modern web applications with React and TypeScript,
            develop backend APIs with Django and Django REST Framework,
            use Docker for containerized development, and create
            professional technical documents with LaTeX and Overleaf.
          </p>

          <div className="mt-6 h-px w-16 bg-orange-500/70" />
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
