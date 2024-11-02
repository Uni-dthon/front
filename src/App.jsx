import {BrowserRouter, Route, Routes} from "react-router-dom";
import GlobalStyles from "./GlobalStyles.jsx";
import Start from "./Start.jsx";
import CalendarPage from "./CalendarPage.jsx";

function App() {

  return (
    <>
      <GlobalStyles/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start/>}/>
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
