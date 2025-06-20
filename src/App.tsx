import { createBrowserRouter} from 'react-router-dom'

import { Layout } from './components/Layout'
import { Home } from './Pages/Home'

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path:'/',
        element: <Home/>
      }
    ]
  }
])