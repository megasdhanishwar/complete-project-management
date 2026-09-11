import React from "react";
import { Link } from "react-router-dom";
import {
  FiFolder,
  FiActivity,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";

import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import ProgressBar from "../components/ProgressBar";
import { initialProjects } from "../data/projects";

export default function Dashboard() {
  const total = initialProjects.length;

  const active = initialProjects.filter(
    (project) => project.status === "In Progress",
  ).length;

  const completed = initialProjects.filter(
    (project) => project.status === "Completed",
  ).length;

  const pending = initialProjects.filter(
    (project) => project.status === "Pending",
  ).length;

  return (
    <div className="dashboard-page">
      <PageHeader
        title="Dashboard"
        description="Overview of your project workspace."
        action={
          <Link to="/projects/add" className="primary-button">
            + New Project
          </Link>
        }
      />

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <FiFolder />
          </div>

          <span>Total Projects</span>
          <strong>{total}</strong>
          <small>All projects</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <FiActivity />
          </div>

          <span>Active Projects</span>
          <strong>{active}</strong>
          <small>Currently running</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <FiCheckCircle />
          </div>

          <span>Completed</span>
          <strong>{completed}</strong>
          <small>Successfully delivered</small>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <FiAlertCircle />
          </div>

          <span>Pending</span>
          <strong>{pending}</strong>
          <small>Awaiting start</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Recent Projects</h3>
              <p>Your latest project activity</p>
            </div>

            <Link to="/projects">
              View All <FiArrowRight />
            </Link>
          </div>

          <div className="recent-projects">
            {initialProjects.slice(0, 5).map((project) => (
              <Link
                to={`/projects/${project.id}`}
                className="recent-project"
                key={project.id}
              >
                <div className="project-mini-icon">
                  {project.name.charAt(0)}
                </div>

                <div className="recent-info">
                  <strong>{project.name}</strong>
                  <span>{project.client}</span>
                </div>

                <div className="recent-progress">
                  <ProgressBar value={project.progress} />
                </div>

                <StatusBadge status={project.status} />
              </Link>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Project Progress</h3>
              <p>Current completion levels</p>
            </div>
          </div>

          <div className="progress-list">
            {initialProjects.slice(0, 5).map((project) => (
              <div className="progress-item" key={project.id}>
                <div>
                  <strong>{project.name}</strong>
                  <span>{project.progress}% completed</span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
