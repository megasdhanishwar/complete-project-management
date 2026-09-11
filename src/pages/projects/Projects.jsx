import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiSliders,
} from "react-icons/fi";

import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import EmptyState from "../../components/EmptyState";
import Loading from "../../components/Loading";
import ErrorState from "../../components/ErrorState";
import useProjects from "../../hooks/useProjects";

export default function Projects() {
  const { projects, loading, error, deleteProject } = useProjects();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState("");

  const itemsPerPage = 5;

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(value) ||
          project.client.toLowerCase().includes(value) ||
          project.manager.toLowerCase().includes(value) ||
          project.id.toLowerCase().includes(value),
      );
    }

    if (status !== "All") {
      result = result.filter((project) => project.status === status);
    }

    if (priority !== "All") {
      result = result.filter((project) => project.priority === priority);
    }

    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "progress") {
      result.sort((a, b) => b.progress - a.progress);
    }

    if (sort === "budget") {
      result.sort((a, b) => b.budget - a.budget);
    }

    return result;
  }, [projects, search, status, priority, sort]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const currentProjects = filteredProjects.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleDelete = () => {
    deleteProject(deleteId);
    setDeleteId(null);
    setToast("Project deleted successfully");

    if (currentProjects.length === 1 && page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="projects-page">
      <PageHeader
        title="Projects"
        description="Manage, track and monitor all your projects."
        action={
          <Link to="/projects/add" className="primary-button">
            <FiPlus />
            Add Project
          </Link>
        }
      />

      <div className="project-toolbar">
        <div className="search-box">
          <FiSearch />

          <input
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Search projects..."
          />
        </div>

        <div className="filter-group">
          <div className="select-wrapper">
            <FiSliders />

            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
            >
              <option value="All">All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
          </div>

          <select
            value={priority}
            onChange={(event) => {
              setPriority(event.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value);
              setPage(1);
            }}
          >
            <option value="newest">Newest</option>

            <option value="name">Name A-Z</option>

            <option value="progress">Progress</option>

            <option value="budget">Budget</option>
          </select>
        </div>
      </div>

      <div className="projects-table-card">
        {currentProjects.length === 0 ? (
          <EmptyState
            title="No projects found"
            description="Try adjusting your search or filters."
          />
        ) : (
          <>
            <div className="table-wrapper">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Client</th>
                    <th>Manager</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Progress</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentProjects.map((project) => (
                    <tr key={project.id}>
                      <td>
                        <div className="project-table-name">
                          <div className="project-icon">
                            {project.name.charAt(0)}
                          </div>

                          <div>
                            <strong>{project.name}</strong>

                            <span>{project.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>{project.client}</td>

                      <td>{project.manager}</td>

                      <td>
                        <StatusBadge status={project.status} />
                      </td>

                      <td>
                        <span
                          className={`priority-badge ${project.priority.toLowerCase()}`}
                        >
                          {project.priority}
                        </span>
                      </td>

                      <td>
                        <div className="table-progress">
                          <div className="progress-track">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${project.progress}%`,
                              }}
                            />
                          </div>

                          <span>{project.progress}%</span>
                        </div>
                      </td>

                      <td>{project.dueDate}</td>

                      <td>
                        <div className="table-actions">
                          <Link
                            to={`/projects/${project.id}`}
                            className="table-action view"
                            title="View"
                          >
                            <FiEye />
                          </Link>

                          <Link
                            to={`/projects/${project.id}/edit`}
                            className="table-action edit"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </Link>

                          <button
                            className="table-action delete"
                            title="Delete"
                            onClick={() => setDeleteId(project.id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <span>
                Showing{" "}
                {Math.min(
                  (page - 1) * itemsPerPage + 1,
                  filteredProjects.length,
                )}{" "}
                to {Math.min(page * itemsPerPage, filteredProjects.length)} of{" "}
                {filteredProjects.length}
              </span>

              <div className="pagination-buttons">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                >
                  <FiChevronLeft />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((number) => (
                  <button
                    key={number}
                    className={page === number ? "active" : ""}
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal
        open={Boolean(deleteId)}
        title="Delete Project"
        onClose={() => setDeleteId(null)}
      >
        <div className="delete-content">
          <div className="delete-icon">
            <FiTrash2 />
          </div>

          <h3>Delete this project?</h3>

          <p>This project will be permanently removed from your workspace.</p>

          <div className="modal-actions">
            <button
              className="secondary-button"
              onClick={() => setDeleteId(null)}
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
