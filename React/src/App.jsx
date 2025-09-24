import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import LeadForm from "./Components/LeadForm";
import LeadLists from "./Components/LeadLists";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeadForm />} />
        <Route path="/lead-lists" element={<LeadLists />} />
      </Routes>
    </Router>
  );
};


