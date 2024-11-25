import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import JobDetailPage from "./pages/JobDetailPage/JobDetailPage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/category/:status" element={<CategoryPage />} />
        <Route path="/job/:id" element={<JobDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
