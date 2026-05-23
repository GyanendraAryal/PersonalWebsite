import { useState } from 'react'
import { submitContact } from '../api'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const contactInfo = [
    { title: 'Email', value: 'aryalgyanendra8@gmail.com' },
    { title: 'Location', value: 'Bhairahawa, Nepal' },
    { title: 'Role', value: 'Full Stack MERN Developer' },
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
    <section className="min-h-screen bg-slate-950 text-white px-6 py-24">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Let&apos;s Build <br />
            <span className="text-orange-500">Something Great</span>
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
              <h2 className="text-2xl font-semibold mb-8 text-orange-500">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title}>
                    <p className="text-slate-500 text-sm mb-1">{item.title}</p>
                    <h3 className="text-lg font-medium break-words">{item.value}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-orange-500">Socials</h2>
              <div className="flex flex-col gap-4">
                <a href="https://github.com/GyanendraAryal" target="_blank" rel="noreferrer"
                  className="bg-slate-800 hover:bg-orange-500 hover:text-black transition px-5 py-4 rounded-xl">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/gyanendra-aryal/" target="_blank" rel="noreferrer"
                  className="bg-slate-800 hover:bg-orange-500 hover:text-black transition px-5 py-4 rounded-xl">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none hover:border-orange-500 focus:border-orange-500 transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none hover:border-orange-500 focus:border-orange-500 transition"
                />
              </div>

              <textarea
                name="message"
                rows="7"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none hover:border-orange-500 focus:border-orange-500 transition resize-none"
              />

              {status === 'success' && (
                <p className="text-green-400 text-sm">Message sent! I&apos;ll get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 transition py-4 rounded-xl font-semibold text-lg"
              >
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
