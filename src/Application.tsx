import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inventory from "./screens/Inventory";
import "../src/styles/globals.css"

const Application = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Application;
