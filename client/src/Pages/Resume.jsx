const Resume = () => {

  const skills = [
    'JavaScript (ES6+)',
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Redux Toolkit',
    'Tailwind CSS',
    'JWT Authentication',
    'REST APIs',
    'Docker',
    'Git & GitHub',
    'Postman',
    'Cloudinary',
    'eSewa/Khalti Integration',
  ]

  const projects = [
    {
      title: 'EyeExpress',
      subtitle: 'Eyewear E-Commerce Platform',
      description:
        'Built a full-stack MERN eyewear platform with customer storefront, admin dashboard, Redux auth flow, payment integration, analytics dashboard, and responsive UI.',
    },

    {
      title: 'CashYourPhone',
      subtitle: 'Used Phone Marketplace',
      description:
        'Developed a marketplace platform with secure JWT authentication, eSewa ePay V2 integration, Cloudinary image hosting, and role-based access control.',
    },

    {
      title: 'AirPlus',
      subtitle: 'Travel & Trekking Platform',
      description:
        'Created a travel and trekking platform with admin dashboard, booking management, REST APIs, and modular MongoDB architecture.',
    },
  ]

  return (
    <section className="min-h-screen px-6 py-20 bg-slate-950 text-white">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Full Stack MERN <br />
            <span className="text-orange-500">
              Developer
            </span>
          </h1>

          <p className="text-white mt-6 max-w-2xl mx-auto leading-relaxed">
            Backend-oriented MERN developer focused on scalable REST APIs,
            secure authentication systems, MongoDB architecture, and modern
            React applications.
          </p>

        </div>

        {/* Main Resume Card */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side */}

          <div className="lg:col-span-1 space-y-8">

            {/* Education */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-semibold mb-6 text-orange-500">
                Education
              </h2>

              <div className="space-y-5">

                <div>
                  <h3 className="font-semibold text-lg">
                    Bachelor of Computer Applications
                  </h3>

                  <p className="text-slate-400">
                    Tribhuvan University
                  </p>

                  <p className="text-slate-500 text-sm mt-1">
                    Currently Pursuing
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    +2 ISC (AG)
                  </h3>

                  <p className="text-slate-400">
                    Shree Nawaratna Secondary School
                  </p>

                  <p className="text-slate-500 text-sm mt-1">
                    GPA: 3.26
                  </p>
                </div>

              </div>

            </div>

            {/* Download Button */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-semibold mb-5 text-orange-500">
                Resume PDF
              </h2>

              <p className="text-slate-400 mb-6">
                Download my complete resume with projects,
                technical skills, and experience.
              </p>

              <a
                href="/Resume.pdf"
                download
                className="inline-flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 transition px-6 py-4 rounded-xl font-medium"
              >
                Download CV
              </a>

            </div>

          </div>

          {/* Right Side */}

          <div className="lg:col-span-2 space-y-8">

            {/* Skills */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-semibold mb-6 text-white">
                Technical Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {skills.map((skill) => (

                  <span
                    key={skill}
                    className="bg-orange-500/10 border border-orange-500/20 text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-500 transition"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

            {/* Projects */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-semibold mb-8 text-orange-500">
                Key Projects
              </h2>

              <div className="space-y-8">

                {projects.map((project) => (

                  <div
                    key={project.title}
                    className="border-b border-slate-800 pb-8 last:border-none last:pb-0"
                  >

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">

                      <h3 className="text-2xl font-bold">
                        {project.title}
                      </h3>

                      <span className="text-orange-400 text-sm">
                        2024 — Present
                      </span>

                    </div>

                    <p className="text-slate-400 font-medium mb-3">
                      {project.subtitle}
                    </p>

                    <p className="text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Resume