const services = [
  {
    title: 'Frontend Development',
    desc: 'Modern responsive UI with React and TailwindCSS.',
  },
  {
    title: 'Backend Development',
    desc: 'REST APIs using Node.js and Express.',
  },
  {
    title: 'Full Stack Projects',
    desc: 'Complete MERN stack applications.',
  },
]

const Services = () => {
  return (
    <section className="min-h-screen px-6 py-20">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-14 text-center">
          My <span className="text-orange-500">Services</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:shadow-2xl shadow-amber-600 transition duration-300 hover:-translate-y-2"
            >

              <h2 className="text-2xl text-orange-500 font-semibold mb-4">
                {service.title}
              </h2>

              <p className="text-white leading-relaxed">
                {service.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default Services