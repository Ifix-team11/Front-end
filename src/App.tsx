import Register from '../src/Components/Register/Register'
import Login from '../src/Components/Login/Login'
import ForgotPassword from '../src/Components/ForgotPassword/ForgotPassword'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
 let router = createBrowserRouter([
    {path:'register' ,element : <Register/>},
    {path :'login' ,element :<Login/>},
    {path :'forgot-password' ,element :<ForgotPassword/>},
  ])
function App() {
 

  return (
    <>  
<RouterProvider router={router}></RouterProvider>

    </>
  )
}

export default App
