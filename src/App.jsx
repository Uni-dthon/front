import {BrowserRouter, Route, Routes} from "react-router-dom";
import Start from "./Start.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import CalendarPage from "./CalendarPage.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
