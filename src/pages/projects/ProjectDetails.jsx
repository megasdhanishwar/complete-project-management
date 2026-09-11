import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiLayers,
} from "react-icons/fi";

import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import ProgressBar from "../../components/ProgressBar";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import ErrorState from "../../components/ErrorState";
import useProjects from "../../hooks/useProjects";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProject, deleteProject } = useProjects();

  const project = getProject(id);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toast, setToast] = useState("");

  if (!project) {
    return <ErrorState message="Project not found." />;
  }

  const handleDelete = () => {
    deleteProject(id);

    setDeleteOpen(false);
    setToast("Project deleted successfully");

    setTimeout(() => {
      navigate("/projects");
    }, 800);
  };

  return (
    <div className="project-details-page">
      <PageHeader
        title={project.name}
        description={project.description}
        action={
          <div className="header-actions">
            <Link to="/projects" className="secondary-button">
              <FiArrowLeft />
              Back
            </Link>

            <Link
              to={`/projects/${project.id}/edit`}
              className="primary-button"
            >
              <FiEdit2 />
              Edit Project
            </Link>
          </div>
        }
      />

      <div className="details-layout">
        <div className="details-main">
          <div className="details-card">
            <div className="details-card-header">
              <div>
                <span className="project-id">{project.id}</span>

                <h2>{project.name}</h2>
              </div>

              <StatusBadge status={project.status} />
            </div>

            <div className="details-description">
              <h4>About Project</h4>
              <p>{project.description}</p>
            </div>

            <ProgressBar value={project.progress} />
          </div>

          <div className="details-card">
            <div className="details-card-title">
              <h3>Project Information</h3>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">
                  <FiUser />
                </div>

                <div>
                  <span>Client</span>
                  <strong>{project.client}</strong>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FiUser />
                </div>

                <div>
                  <span>Project Manager</span>
                  <strong>{project.manager}</strong>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FiLayers />
                </div>

                <div>
                  <span>Category</span>
                  <strong>{project.category}</strong>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FiDollarSign />
                </div>

                <div>
                  <span>Budget</span>
                  <strong>₹{project.budget.toLocaleString()}</strong>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FiCalendar />
                </div>

                <div>
                  <span>Start Date</span>
                  <strong>{project.startDate}</strong>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FiCalendar />
                </div>

                <div>
                  <span>Due Date</span>
                  <strong>{project.dueDate}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="details-sidebar">
          <div className="details-card">
            <div className="details-card-title">
              <h3>Priority</h3>
            </div>

            <span
              className={`priority-badge ${project.priority.toLowerCase()}`}
            >
              {project.priority} Priority
            </span>
          </div>

          <div className="details-card">
            <div className="details-card-title">
              <h3>Team Members</h3>
            </div>

            <div className="team-list">
              {project.team.map((member, index) => (
                <div className="team-member" key={index}>
                  <div className="avatar">{member}</div>

                  <div>
                    <strong>Team Member {index + 1}</strong>

                    <span>Project Team</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="danger-card">
            <div>
              <h3>Delete Project</h3>
              <p>Permanently remove this project from your workspace.</p>
            </div>

            <button
              className="danger-button"
              onClick={() => setDeleteOpen(true)}
            >
              <FiTrash2 />
              Delete
            </button>
          </div>
        </aside>
      </div>

      <Modal
        open={deleteOpen}
        title="Delete Project"
        onClose={() => setDeleteOpen(false)}
      >
        <div className="delete-content">
          <div className="delete-icon">
            <FiTrash2 />
          </div>

          <h3>Are you sure?</h3>

          <p>
            You are about to delete <strong>{project.name}</strong>. This action
            cannot be undone.
          </p>

          <div className="modal-actions">
            <button
              className="secondary-button"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </button>

            <button className="danger-button" onClick={handleDelete}>
              Delete Project
            </button>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
