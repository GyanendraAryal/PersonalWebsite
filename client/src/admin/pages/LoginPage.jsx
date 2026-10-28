import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { clearAdminTokens, getAdminProfile, loginAdmin } from '../../api'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await loginAdmin({ username, password })
      await getAdminProfile()
      navigate(location.state?.from?.pathname || '/admin', { replace: true })
    } catch (loginError) {
      clearAdminTokens()
      const status = loginError.response?.status
      setError(
        status === 401
          ? 'Invalid username or password.'
          : status === 403
            ? 'This account does not have admin access.'
            : status === 404
              ? 'Admin API endpoint not found. Check that VITE_API_URL points to the backend API.'
              : status >= 500
                ? 'The admin service encountered a server error. Please try again later.'
                : !loginError.response
                  ? 'Could not reach the admin API. Check that the backend is running and VITE_API_URL is correct. For Vercel, set VITE_API_URL to the deployed backend API and allow this site in backend CORS.'
                  : 'Sign-in failed. Please check the server response and try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="admin-auth min-h-screen bg-[#0e0e10] text-zinc-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900/80 p-7 shadow-2xl"
      >
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">
          <LockKeyhole className="h-5 w-5 text-orange-400" />
        </div>
        <h1 className="text-xl font-semibold">Portfolio admin</h1>
        <p className="mt-1 text-sm text-zinc-500">Sign in with your admin account.</p>

        <label className="mt-6 block text-sm font-medium text-zinc-300" htmlFor="admin-username">
          Username
        </label>
        <input
          id="admin-username"
          autoComplete="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-orange-500/60"
        />

        <label className="mt-4 block text-sm font-medium text-zinc-300" htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-orange-500/60"
        />

        {error && (
          <p role="alert" className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:cursor-wait disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
