import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import RootLayout from './components/layout/RootLayout'
import Dashboard from './components/dashboard/Dashboard'
import CourseExplorer from './components/courses/CourseExplorer'
import CourseDetails from './components/courses/CourseDetails'
import CourseLearning from './components/courses/CourseLearning'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import NotFound from './components/NotFound'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // Mock auth functions for the prototype
  const handleLogin = () => setIsAuthenticated(true)
  const handleSignup = () => setIsAuthenticated(true)
  const handleLogout = () => setIsAuthenticated(false)

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Login onLogin={handleLogin} />
        } />
        <Route path="/signup" element={
          isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Signup onSignup={handleSignup} />
        } />
        
        <Route path="/" element={<RootLayout onLogout={handleLogout} isAuthenticated={isAuthenticated} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          } />
          <Route path="courses" element={<CourseExplorer />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />
          <Route path="learn/:courseId" element={
            isAuthenticated ? <CourseLearning /> : <Navigate to="/login" replace />
          } />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App