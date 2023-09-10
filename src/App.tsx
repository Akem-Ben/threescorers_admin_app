import './App.css'
import Signup from './components/signup/Signup'
import Login from '../src/components/login/Login'
import { Routes, Route } from "react-router-dom";
import Overview from './components/sidebarpages/overview/overview'
import Users from './components/sidebarpages/users/users';
import Admins from './components/sidebarpages/admin/admin';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
    <main>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/overview" element={<Overview />}></Route>
      <Route path="/users" element={<Users />}></Route>
      <Route path="/admins" element={<Admins />}></Route>
      </Routes>
      </main>
    </>
  )
}

export default App
