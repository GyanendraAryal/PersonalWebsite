const Contact = () => {

  const contactInfo = [
    {
      title: 'Email',
      value: 'aryalgyanendra8@gmail.com',
    },

    {
      title: 'Location',
      value: 'Bhairahawa, Nepal',
    },

    {
      title: 'Role',
      value: 'Full Stack MERN Developer',
    },
  ]

  return (
    <section className="min-h-screen bg-slate-950 text-white px-6 py-24">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Let’s Build <br />
            <span className="text-orange-500">
              Something Great
            </span>
          </h1>

          <p className="text-white mt-6 max-w-2xl mx-auto leading-relaxed">
            Open to freelance work, collaborations, backend engineering,
            and full-stack MERN opportunities.
          </p>

        </div>

        {/* Main Grid */}

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left Side */}

          <div className="lg:col-span-2 space-y-6">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-semibold mb-8 text-orange-500">
                Contact Information
              </h2>

              <div className="space-y-6">

                {contactInfo.map((item) => (

                  <div key={item.title}>

                    <p className="text-slate-500 text-sm mb-1">
                      {item.title}
                    </p>

                    <h3 className="text-lg font-medium break-words">
                      {item.value}
                    </h3>

                  </div>

                ))}

              </div>

            </div>

            {/* Social Links */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-semibold mb-6 text-orange-500">
                Socials
              </h2>

              <div className="flex flex-col gap-4">

                <a
                  href="https://github.com/GyanendraAryal"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-orange-500 hover:text-black transition px-5 py-4 rounded-xl"
                >
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/in/gyanendra-aryal/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-orange-500 hover:text-black transition px-5 py-4 rounded-xl"
                >
                  LinkedIn
                </a>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="lg:col-span-3">

            <form className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-10 space-y-6">

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none hover:border-orange-500 transition"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none hover:border-orange-500 transition"
                />

              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none hover:border-orange-500 transition"
              />

              <textarea
                rows="7"
                placeholder="Tell me about your project..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none hover:border-orange-500 transition resize-none"
              ></textarea>

              <button
                className="w-full bg-orange-500 hover:bg-orange-600 transition py-4 rounded-xl font-semibold text-lg"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Contact