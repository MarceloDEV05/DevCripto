import { createBrowserRouter} from 'react-router-dom'

import { Layout } from './components/Layout'
import { Home } from './Pages/Home'
import { Details } from './Pages/Details'

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path:'/',
        element: <Home/>
      },
      {
        path:'/detail/:cripto',
        element:<Details/>
      }
    ]
  }
])