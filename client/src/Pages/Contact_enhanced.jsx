import { useState } from 'react'
import { submitContact } from '../api'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const contactInfo = [
    { title: 'Email', value: 'aryalgyanendra8@gmail.com', icon: '📧' },
    { title: 'Location', value: 'Bhairahawa, Nepal', icon: '📍' },
    { title: 'Role', value: 'Full Stack MERN/Django Developer', icon: '💻' },
  ]

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await submitContact(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      const data = err.response?.data
      setErrorMsg(
        data?.message?.[0] || data?.email?.[0] || data?.name?.[0] || 'Failed to send. Please try again.'
      )
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white px-6 py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-10 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Enhanced Heading */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 px-4 py-2 text-sm font-medium text-orange-300 backdrop-blur-sm">
              💬 Get In Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">Let's Build</span> <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">Something Great</span>
          </h1>
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Open to freelance work, collaborations, backend engineering,
            and full-stack MERN opportunities. Let's create something amazing together.
          </p>
        </div>

        {/* Enhanced Main Grid */}
        <div className="grid lg:grid-cols-5 gap-12">

          {/* Enhanced Left Side */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold mb-8 text-orange-400">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-700/20 hover:bg-gray-700/30 transition-all duration-300">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">{item.title}</p>
                      <h3 className="text-lg font-medium text-white break-words">{item.value}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold mb-6 text-orange-400">Connect With Me</h2>
              <div className="flex flex-col gap-4">
                <a href="https://github.com/GyanendraAryal" target="_blank" rel="noreferrer"
                  className="group flex items-center gap-4 bg-gray-700/30 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-black transition-all duration-300 px-6 py-4 rounded-2xl">
                  <span className="text-xl">🐙</span>
                  <span className="font-medium">GitHub</span>
                  <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/gyanendra-aryal/" target="_blank" rel="noreferrer"
                  className="group flex items-center gap-4 bg-gray-700/30 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-black transition-all duration-300 px-6 py-4 rounded-2xl">
                  <span className="text-xl">💼</span>
                  <span className="font-medium">LinkedIn</span>
                  <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Enhanced Right Side - Form */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-semibold mb-8 text-orange-400">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 rounded-2xl bg-gray-700/30 border border-gray-600/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 rounded-2xl bg-gray-700/30 border border-gray-600/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 rounded-2xl bg-gray-700/30 border border-gray-600/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-300"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
                    ❌ {errorMsg}
                  </div>
                )}

                {/* Enhanced Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact