import {BrowserRouter, Route, Routes} from "react-router-dom";
import GlobalStyles from "./globalStyles.jsx";
import Start from "./Start.jsx";
import styled from "styled-components";

function App() {

  return (
    <>
      <GlobalStyles/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
