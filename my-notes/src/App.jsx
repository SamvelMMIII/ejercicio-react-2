import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotasPage from "./pages/NotasPage";
import 'notyf/notyf.min.css';

function App() {
  return (
    <>
      <Router>
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"notas/"}>Notas</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="notas/" element={<NotasPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;