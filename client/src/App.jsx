import { Routes, Route } from 'react-router-dom'
import  Home  from './Pages/Home';
import Services from './Pages/Services';
import Work from './Pages/Work';
import Resume from './Pages/Resume';
import Contact from './Pages/Contact';
function App() {
  return (
    <Routes>
      <Route path='/home' element={<Home />} >
        <Route path='service' element={<Services />} />
        <Route path='work' element={<Work />} />
        <Route path='contact' element={<Contact />} />
        <Route path='resume' element={<Resume />} />
      </Route>
    </Routes>
  );
}

export default App
