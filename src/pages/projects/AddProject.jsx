import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ProjectForm from "../../components/ProjectForm";
import Toast from "../../components/Toast";
import useProjects from "../../hooks/useProjects";

export default function AddProject() {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const [toast, setToast] = useState("");

  const handleSubmit = (project) => {
    addProject(project);

    setToast("Project created successfully");

    setTimeout(() => {
      navigate("/projects");
    }, 1000);
  };

  return (
    <div className="project-form-page">
      <PageHeader
        title="Create Project"
        description="Create a new project and define its details."
      />

      <ProjectForm onSubmit={handleSubmit} submitLabel="Create Project" />

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
