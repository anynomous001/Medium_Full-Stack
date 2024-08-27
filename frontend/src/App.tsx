
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import PublishBlog from './pages/PublishBlog'
import UserDetails from './pages/userDetails'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/publish' element={<PublishBlog />} />
          <Route path='/profile' element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
