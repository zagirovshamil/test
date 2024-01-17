import { Routes, Route } from "react-router-dom";

import { Homepage } from "./pages/homepage/homepage";
import { Header } from "./ui/header";

// npm run dev

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
};
