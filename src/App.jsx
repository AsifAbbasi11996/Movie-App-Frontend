import './App.css'
import Navbar from './components/Navbar' // Import Navbar
import { Route, Routes } from 'react-router-dom' // Updated imports
import HomePage from './pages/HomePage' // Create these components as per your needs
import Search from './pages/Search'
import MovieDetail from './components/MovieDetail'
import MovieList from './pages/MovieList'
import Login from './auth/Login'
import Register from './auth/Register'

function App () {
  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path='/' element={<MovieList />} />
        {/* Updated to use element prop */}
        <Route path='/movies' element={<HomePage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movie/:movieId' element={<MovieDetail />} />
        {/* Updated to use element prop */}
        <Route path='/login' element={<Login />} />
        {/* Updated to use element prop */}
        <Route path='/register' element={<Register />} />
        {/* Updated to use element prop */}
      </Routes>
    </>
  )
}

export default App