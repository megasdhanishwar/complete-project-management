import { useEffect, useState } from "react";
import { initialProjects } from "../data/projects";

export default function useProjects() {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("project-management-data");

    return savedProjects ? JSON.parse(savedProjects) : initialProjects;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("project-management-data", JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    setProjects((current) => [
      {
        ...project,
        id: `PRJ-${String(Date.now()).slice(-5)}`,
      },
      ...current,
    ]);
  };

  const updateProject = (id, updatedProject) => {
    setProjects((current) =>
      current.map((project) =>
        project.id === id ? { ...project, ...updatedProject } : project,
      ),
    );
  };

  const deleteProject = (id) => {
    setProjects((current) => current.filter((project) => project.id !== id));
  };

  const getProject = (id) => {
    return projects.find((project) => project.id === id);
  };

  return {
    projects,
    loading,
    error,
    setLoading,
    setError,
    addProject,
    updateProject,
    deleteProject,
    getProject,
  };
}
