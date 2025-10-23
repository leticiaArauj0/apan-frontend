import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='home' element={<Home/>}></Route>
    </Routes>
  )
}
