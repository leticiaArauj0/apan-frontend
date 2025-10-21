import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Register/>}></Route>
    </Routes>
  )
}
