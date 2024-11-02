import {BrowserRouter, Route, Routes} from "react-router-dom";
import Start from "./Start.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
