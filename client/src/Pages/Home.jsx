const Home = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>

          <p className="text-orange-500 font-semibold mb-4">
            Full Stack Developer
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Hi, I'm <span className="text-orange-500">Gyanendra</span>
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            I build modern web applications with React, Node.js and
            beautiful user experiences.
          </p>

          <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-xl font-semibold shadow-lg">
            Explore My Work
          </button>

        </div>

        {/* Right */}
        <div className="flex justify-center">

          <div className="w-80 h-80 rounded-full border-4 border-orange-500 overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>

    </section>
  )
}

export default Home