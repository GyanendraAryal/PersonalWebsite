import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './Pages/Home';
import Services from './Pages/Services';
import Work from './Pages/Work';
import Resume from './Pages/Resume';
import Contact from './Pages/Contact';
import PageWrapper from './animate/PageWrapper'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='home' element={<Home/>}/>
      <Route path='service' element={<Services/>}/>
      <Route path='work' element={<Work/>}/>
      <Route path='resume' element={<Resume/>}/>
      <Route path='contact' element={<Contact/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageWrapper><RouterProvider router = {router}/></PageWrapper>
  </React.StrictMode>
)
