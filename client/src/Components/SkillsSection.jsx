/**
 * Skills section — organized into five categories reflecting actual experience.
 * Uses Lucide React icons (already installed) plus simple text labels for
 * technologies without a good icon equivalent (LaTeX, Overleaf, DRF, etc.)
 */
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
      { name: 'Python',     abbr: 'Py' },
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
    <div className="card card-hover p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
          <Icon className="w-4.5 h-4.5 text-orange-500" aria-hidden />
        </div>
        <h3 className="text-sm font-semibold text-white">{category.label}</h3>
      </div>

      {/* Skill tags */}
      <ul className="flex flex-wrap gap-1.5" role="list">
        {category.skills.map((skill) => (
          <li
            key={skill.name}
            className="px-2.5 py-1 rounded-md text-xs font-medium text-zinc-400 bg-white/[0.04] border border-white/8 hover:border-orange-500/30 hover:text-zinc-200 transition-colors duration-200 cursor-default"
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
      className="bg-[#0e0e10] py-24"
    >
      <div className="section-container">

        {/* Section header */}
        <div className="mb-12 max-w-2xl">
          <p className="section-label">Technical Skills</p>
          <h2
            id="skills-heading"
            className="text-3xl font-bold text-white sm:text-4xl leading-tight"
          >
            What I work with
          </h2>
          <p className="mt-4 text-zinc-400 text-[0.9375rem] leading-7">
            I build modern web applications with React and TypeScript,
            develop backend APIs with Django and Django REST Framework,
            use Docker for containerized development, and create
            professional technical documents with LaTeX and Overleaf.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

      </div>
    </section>
  )
}
