import { useContext } from 'react'
import { PortfolioProfileContext } from './PortfolioProfileContextValue'

export default function usePortfolioProfile() {
  const context = useContext(PortfolioProfileContext)
  if (!context) {
    throw new Error('usePortfolioProfile must be used within PortfolioProfileProvider')
  }
  return context
}
