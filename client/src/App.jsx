import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { PortfolioProfileProvider } from './context/PortfolioProfileContext'

function App() {
  return (
    <PortfolioProfileProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </PortfolioProfileProvider>
  )
}

export default App
