import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/main";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
