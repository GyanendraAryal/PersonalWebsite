import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import PageWrapper from './animate/PageWrapper'
import ErrorBoundary from './Components/ErrorBoundary'
import LoadingFallback from './Components/LoadingFallback'

const Home = lazy(() => import('./Pages/Home'))
const Services = lazy(() => import('./Pages/Services'))
const Work = lazy(() => import('./Pages/Work'))
const Resume = lazy(() => import('./Pages/Resume'))
const Contact = lazy(() => import('./Pages/Contact'))
const AdminLayout = lazy(() => import('./Pages/Admin/AdminLayout'))
const AdminImages = lazy(() => import('./Pages/Admin/AdminImages'))
const AdminResume = lazy(() => import('./Pages/Admin/AdminResume'))

const wrap = (Component) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
)

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route path='' element={wrap(Home)} />
        <Route path='service' element={wrap(Services)} />
        <Route path='work' element={wrap(Work)} />
        <Route path='resume' element={wrap(Resume)} />
        <Route path='contact' element={wrap(Contact)} />
      </Route>
      <Route path='/admin' element={wrap(AdminLayout)}>
        <Route path='images' element={wrap(AdminImages)} />
        <Route path='resume' element={wrap(AdminResume)} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <PageWrapper>
      <RouterProvider router={router} />
    </PageWrapper>
  </ErrorBoundary>
)
