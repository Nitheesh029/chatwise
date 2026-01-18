import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, ProfilePage } from "./pages";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default App;
