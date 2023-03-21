import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Nav from "./components/Nav/Nav";
import TicketDetail from "./pages/TicketDetail/TicketDetail";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/:id" element={<TicketDetail />} />
      </Routes>
    </div>
  );
}

export default App;
