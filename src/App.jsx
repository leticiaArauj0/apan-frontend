import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ForgetPassword } from "./pages/ForgetPassword";
import { Home } from "./pages/Home";
import { ForgetPassword } from "./pages/ForgetPassword";

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='home' element={<Home/>}></Route>
      <Route path='forget-password' element={<ForgetPassword/>}></Route>
      <Route path='home' element={<Home/>}></Route>
      <Route path='forget-password' element={<ForgetPassword/>}></Route>
    </Routes>
  )
}
