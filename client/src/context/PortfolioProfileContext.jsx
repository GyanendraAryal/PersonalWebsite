import { useEffect, useState } from 'react'
import { getApiErrorMessage, getPortfolioProfile } from '../api'
import { PortfolioProfileContext } from './PortfolioProfileContextValue'

export function PortfolioProfileProvider({ children }) {
  const [profile, setProfile] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getPortfolioProfile()
      .then(({ data }) => {
        if (!active) return
        setProfile(data)
        setStatus('ready')
      })
      .catch((requestError) => {
        if (!active) return
        setError(getApiErrorMessage(requestError, 'Please try again later.'))
        setStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <PortfolioProfileContext.Provider value={{ profile, status, error }}>
      {children}
    </PortfolioProfileContext.Provider>
  )
}
