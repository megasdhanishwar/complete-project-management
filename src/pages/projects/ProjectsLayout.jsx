import React from "react";
import { Outlet } from "react-router-dom";

export default function ProjectsLayout() {
  return (
    <section className="projects-module">
      <Outlet />
    </section>
  );
}
