const projects = [
  'Portfolio Website',
  'Trek Recommendation System',
  'Admin Dashboard',
]

const Work = () => {
  return (
    <section className="min-h-screen px-6 py-20">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-14 text-center">
          My <span className="text-orange-500">Work</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-orange-500 transition"
            >

              <div className="h-56 bg-slate-800"></div>

              <div className="p-6">

                <h2 className="text-2xl font-semibold mb-3">
                  {project}
                </h2>

                <p className="text-slate-400 mb-4">
                  Modern and scalable web application.
                </p>

                <button className="text-orange-500 hover:text-orange-400">
                  View Project →
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default Work