import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ConfirmOrder from "./components/Confirm_Order/ConfirmOrder.tsx";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
      </Routes>
    </>
  );
}

export default App;
