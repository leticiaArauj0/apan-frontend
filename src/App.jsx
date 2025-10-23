import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ForgetPassword } from "./pages/ForgetPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { CreateProject } from "./pages/CreateProject";

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='home' element={<Home/>}></Route>
      <Route path='forget-password' element={<ForgetPassword/>}></Route>
      <Route path='home' element={<Home/>}></Route>
      <Route path='forget-password' element={<ForgetPassword/>}></Route>
      <Route path='reset-password' element={<ResetPassword/>}></Route>
      <Route path='create-project' element={<CreateProject/>}/>
    </Routes>
  )
}
