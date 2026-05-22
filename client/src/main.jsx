import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './Pages/Home'
import Services from './Pages/Services'
import Work from './Pages/Work'
import Resume from './Pages/Resume'
import Contact from './Pages/Contact'
import PageWrapper from './animate/PageWrapper'
import AdminLayout from './Pages/Admin/AdminLayout'
import AdminImages from './Pages/Admin/AdminImages'
import AdminResume from './Pages/Admin/AdminResume'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route path='' element={<Home />} />
        <Route path='service' element={<Services />} />
        <Route path='work' element={<Work />} />
        <Route path='resume' element={<Resume />} />
        <Route path='contact' element={<Contact />} />
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
        <Route path='images' element={<AdminImages />} />
        <Route path='resume' element={<AdminResume />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageWrapper>
      <RouterProvider router={router} />
    </PageWrapper>
  </React.StrictMode>
)
