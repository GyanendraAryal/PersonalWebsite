import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import HeroSlider from './Components/HeroSlider';
import Home from './Pages/Home';
import Work from './Pages/Work'

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  )
}

export default App
