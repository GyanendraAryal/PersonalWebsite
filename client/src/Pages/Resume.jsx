const Resume = () => {
  return (
    <section className="min-h-screen px-6 py-20">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-14 text-center">
          My <span className="text-orange-500">Resume</span>
        </h1>

        <div className="bg-slate-900 rounded-2xl p-10 border border-slate-800">

          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-3 text-orange-500">
              Education
            </h2>

            <p className="text-slate-300">
              Bachelor in Computer Science
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-3 text-orange-500">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {[
                'React',
                'JavaScript',
                'Tailwind',
                'Node.js',
                'MongoDB',
                'Git',
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-lg"
                >
                  {skill}
                </span>
              ))}

            </div>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl transition">
            Download CV
          </button>

        </div>

      </div>

    </section>
  )
}

export default Resume