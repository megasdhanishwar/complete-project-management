import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";

import Team from "./pages/Team";
import Settings from "./pages/Settings";

import ProjectsLayout from "./pages/projects/ProjectsLayout";
import Projects from "./pages/projects/Projects";
import AddProject from "./pages/projects/AddProject";
import ProjectDetails from "./pages/projects/ProjectDetails";
import EditProject from "./pages/projects/EditProject";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />{" "}
        <Route path="/settings" element={<Settings />} />
        
        <Route path="projects" element={<ProjectsLayout />}>
          <Route index element={<Projects />} />
          <Route path="add" element={<AddProject />} />
          <Route path=":id" element={<ProjectDetails />} />
          <Route path=":id/edit" element={<EditProject />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
