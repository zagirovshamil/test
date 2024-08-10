import { Routes, Route } from "react-router-dom";
import { Header } from "./ui/header";
import { Homepage } from "./pages";

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
