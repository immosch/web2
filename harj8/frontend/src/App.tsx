import { Route, Routes } from "react-router";

// pages
import HomePage from "./pages/Home";
import AthleteDetailPage from "./pages/AthleteDetail";
import AthleteFormPage from "./pages/AthleteFormPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="athletes/new" element={<AthleteFormPage />} />
      <Route path="athletes/:id" element={<AthleteDetailPage />} />
      <Route path="athletes/:id/edit" element={<AthleteFormPage />} />
    </Routes>
  );
}

export default App;
