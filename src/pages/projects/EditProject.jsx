import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import ProjectForm from "../../components/ProjectForm";
import Toast from "../../components/Toast";
import ErrorState from "../../components/ErrorState";
import useProjects from "../../hooks/useProjects";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProject, updateProject } = useProjects();

  const project = getProject(id);

  const [toast, setToast] = useState("");

  if (!project) {
    return <ErrorState message="The requested project could not be found." />;
  }

  const handleSubmit = (updatedProject) => {
    updateProject(id, updatedProject);

    setToast("Project updated successfully");

    setTimeout(() => {
      navigate(`/projects/${id}`);
    }, 1000);
  };

  return (
    <div className="project-form-page">
      <PageHeader
        title="Edit Project"
        description={`Update details for ${project.name}.`}
      />

      <ProjectForm
        initialValues={project}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
