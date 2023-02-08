import { Navigate, redirect, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from './pages/Home'
import Cookies from "js-cookie"
import JobDetail from "./pages/JobDetail"
import Navbar from "./components/Navbar"
import { Box } from "@mui/material"
import { UserProvider } from "./context/UserContext"

const App = () => {

  const LoginRoute = ({children}) => {
    if(Cookies.get('user') !== undefined) {
      return (
        <Box>
          <Navbar />
          {children}
        </Box>
      )
    }
    return <Navigate to='/login' />
  }

  return (
    <>
      <UserProvider>
        <Routes>
          <Route 
            path="/" 
            element={
              <LoginRoute>
                <Home/>
              </LoginRoute>
              }
          />
          <Route 
            path='login' 
            element={
              <Box>
                <Navbar/>
                <Login/>
              </Box>
            }
          />
          <Route 
            path='detail-job/:slug'
            element={
              <LoginRoute>
                <JobDetail/>
              </LoginRoute>
            }
          />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
