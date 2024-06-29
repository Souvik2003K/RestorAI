import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import LoginForm from './components/Login';
import SignupForm from './components/Signup';


export default function App() {

  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/signup' element={<SignupForm />}></Route>
        </Routes>
      </Router>
    </div>
  )
}
