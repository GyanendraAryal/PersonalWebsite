const Contact = () => {
  return (
    <section className="min-h-screen px-6 py-20 flex items-center">

      <div className="max-w-4xl mx-auto w-full">

        <h1 className="text-5xl font-bold mb-14 text-center">
          Contact <span className="text-orange-500">Me</span>
        </h1>

        <form className="bg-slate-900 p-10 rounded-2xl border border-slate-800 space-y-6">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-orange-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-orange-500"
          />

          <textarea
            rows="6"
            placeholder="Your Message"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-orange-500"
          ></textarea>

          <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-xl font-semibold">
            Send Message
          </button>

        </form>

      </div>

    </section>
  )
}

export default Contact