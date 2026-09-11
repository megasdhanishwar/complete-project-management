import React, { useMemo, useState } from "react";
import {
  FiEdit2,
  FiMail,
  FiMoreVertical,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUser,
  FiUsers,
  FiX,
  FiCheck,
  FiEye,
} from "react-icons/fi";

const initialTeamMembers = [
  {
    id: 1,
    name: "John Anderson",
    role: "Project Manager",
    email: "john@example.com",
    status: "Active",
    initials: "JA",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Frontend Developer",
    email: "sarah@example.com",
    status: "Active",
    initials: "SW",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Backend Developer",
    email: "michael@example.com",
    status: "Active",
    initials: "MB",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "UI/UX Designer",
    email: "emily@example.com",
    status: "Inactive",
    initials: "ED",
  },
  {
    id: 5,
    name: "Daniel Wilson",
    role: "Frontend Developer",
    email: "daniel@example.com",
    status: "Active",
    initials: "DW",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    role: "QA Engineer",
    email: "sophia@example.com",
    status: "Active",
    initials: "SM",
  },
  {
    id: 7,
    name: "James Taylor",
    role: "Backend Developer",
    email: "james@example.com",
    status: "Inactive",
    initials: "JT",
  },
  {
    id: 8,
    name: "Olivia Thomas",
    role: "Product Designer",
    email: "olivia@example.com",
    status: "Active",
    initials: "OT",
  },
];

const emptyForm = {
  name: "",
  role: "Frontend Developer",
  email: "",
  status: "Active",
};

export default function Team() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 6;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");

  const [selectedMember, setSelectedMember] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [menuOpen, setMenuOpen] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "success",
      });
    }, 2500);
  };

  const roles = [...new Set(teamMembers.map((member) => member.role))];

  const filteredMembers = useMemo(() => {
    let result = [...teamMembers];

    if (search.trim()) {
      const searchValue = search.toLowerCase();

      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(searchValue) ||
          member.email.toLowerCase().includes(searchValue) ||
          member.role.toLowerCase().includes(searchValue),
      );
    }

    if (statusFilter) {
      result = result.filter((member) => member.status === statusFilter);
    }

    if (roleFilter) {
      result = result.filter((member) => member.role === roleFilter);
    }

    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "role") {
        return a.role.localeCompare(b.role);
      }

      if (sortBy === "status") {
        return a.status.localeCompare(b.status);
      }

      return 0;
    });

    return result;
  }, [teamMembers, search, statusFilter, roleFilter, sortBy]);

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  const currentMembers = filteredMembers.slice(
    (currentPage - 1) * membersPerPage,
    currentPage * membersPerPage,
  );

  const activeMembers = teamMembers.filter(
    (member) => member.status === "Active",
  ).length;

  const inactiveMembers = teamMembers.filter(
    (member) => member.status === "Inactive",
  ).length;

  const openAddModal = () => {
    setModalType("add");
    setSelectedMember(null);
    setFormData(emptyForm);
    setErrors({});
    setModalOpen(true);
    setMenuOpen(null);
  };

  const openEditModal = (member) => {
    setModalType("edit");
    setSelectedMember(member);

    setFormData({
      name: member.name,
      role: member.role,
      email: member.email,
      status: member.status,
    });

    setErrors({});
    setModalOpen(true);
    setMenuOpen(null);
  };

  const openViewModal = (member) => {
    setModalType("view");
    setSelectedMember(member);
    setModalOpen(true);
    setMenuOpen(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMember(null);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }

    if (!formData.status) {
      newErrors.status = "Please select a status.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const generateInitials = (name) => {
    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (modalType === "add") {
      const newMember = {
        id: Date.now(),
        name: formData.name.trim(),
        role: formData.role,
        email: formData.email.trim(),
        status: formData.status,
        initials: generateInitials(formData.name),
      };

      setTeamMembers((prev) => [...prev, newMember]);
      setCurrentPage(1);

      closeModal();

      showToast("Team member added successfully.");
      return;
    }

    if (modalType === "edit" && selectedMember) {
      setTeamMembers((prev) =>
        prev.map((member) =>
          member.id === selectedMember.id
            ? {
                ...member,
                name: formData.name.trim(),
                role: formData.role,
                email: formData.email.trim(),
                status: formData.status,
                initials: generateInitials(formData.name),
              }
            : member,
        ),
      );

      closeModal();

      showToast("Team member updated successfully.");
    }
  };

  const handleDelete = (member) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${member.name}?`,
    );

    if (!confirmed) {
      return;
    }

    setTeamMembers((prev) => prev.filter((item) => item.id !== member.id));

    setMenuOpen(null);

    const newTotalPages = Math.ceil(
      (filteredMembers.length - 1) / membersPerPage,
    );

    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }

    showToast("Team member removed successfully.");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setRoleFilter("");
    setSortBy("name");
    setCurrentPage(1);
  };

  return (
    <div className="page-content team-page">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">Management</span>

          <h1>Team</h1>

          <p>Manage your team members, roles and account status.</p>
        </div>

        <button className="primary-button" onClick={openAddModal}>
          <FiPlus />
          Add Member
        </button>
      </div>

      <div className="team-stats">
        <div className="team-stat-card">
          <div className="team-stat-icon total">
            <FiUsers />
          </div>

          <div>
            <span>Total Members</span>
            <strong>{teamMembers.length}</strong>
          </div>
        </div>

        <div className="team-stat-card">
          <div className="team-stat-icon active">
            <FiCheck />
          </div>

          <div>
            <span>Active Members</span>
            <strong>{activeMembers}</strong>
          </div>
        </div>

        <div className="team-stat-card">
          <div className="team-stat-icon inactive">
            <FiUser />
          </div>

          <div>
            <span>Inactive Members</span>
            <strong>{inactiveMembers}</strong>
          </div>
        </div>
      </div>

      <div className="team-toolbar">
        <div className="search-box">
          <FiSearch />

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search team members..."
          />
        </div>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={handleStatusFilter}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          className="filter-select"
          value={roleFilter}
          onChange={handleRoleFilter}
        >
          <option value="">All Roles</option>

          {roles.map((role) => (
            <option value={role} key={role}>
              {role}
            </option>
          ))}
        </select>

        <select className="filter-select" value={sortBy} onChange={handleSort}>
          <option value="name">Sort by Name</option>
          <option value="role">Sort by Role</option>
          <option value="status">Sort by Status</option>
        </select>

        {(search || statusFilter || roleFilter) && (
          <button className="clear-filter-btn" onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>

      {currentMembers.length > 0 ? (
        <>
          <div className="team-grid">
            {currentMembers.map((member) => (
              <div className="team-card" key={member.id}>
                <div className="team-card-top">
                  <div className="member-avatar">{member.initials}</div>

                  <div className="team-menu-wrapper">
                    <button
                      className="icon-btn"
                      onClick={() =>
                        setMenuOpen(menuOpen === member.id ? null : member.id)
                      }
                    >
                      <FiMoreVertical />
                    </button>

                    {menuOpen === member.id && (
                      <div className="team-dropdown">
                        <button onClick={() => openViewModal(member)}>
                          <FiEye />
                          View
                        </button>

                        <button onClick={() => openEditModal(member)}>
                          <FiEdit2 />
                          Edit
                        </button>

                        <button
                          className="danger"
                          onClick={() => handleDelete(member)}
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="member-info">
                  <h3>{member.name}</h3>

                  <span>{member.role}</span>
                </div>

                <div className="member-email">
                  <FiMail />

                  <span>{member.email}</span>
                </div>

                <div className="member-footer">
                  <span
                    className={`status-badge ${member.status.toLowerCase()}`}
                  >
                    <span></span>
                    {member.status}
                  </span>

                  <button
                    className="view-member-btn"
                    onClick={() => openViewModal(member)}
                  >
                    <FiEye />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="team-pagination">
              <span>
                Showing {(currentPage - 1) * membersPerPage + 1}-
                {Math.min(currentPage * membersPerPage, filteredMembers.length)}{" "}
                of {filteredMembers.length}
              </span>

              <div className="pagination-controls">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="team-empty-state">
          <div className="team-empty-icon">
            <FiUsers />
          </div>

          <h3>No team members found</h3>

          <p>Try changing your search or filter settings.</p>

          {(search || statusFilter || roleFilter) && (
            <button className="secondary-button" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className={`team-modal ${
              modalType === "view" ? "team-view-modal" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="team-modal-header">
              <div>
                <span className="page-eyebrow">
                  {modalType === "add"
                    ? "Team Management"
                    : modalType === "edit"
                      ? "Update Member"
                      : "Member Details"}
                </span>

                <h2>
                  {modalType === "add"
                    ? "Add Team Member"
                    : modalType === "edit"
                      ? "Edit Team Member"
                      : "Team Member"}
                </h2>
              </div>

              <button className="modal-close" onClick={closeModal}>
                <FiX />
              </button>
            </div>

            {modalType === "view" && selectedMember ? (
              <div className="team-member-details">
                <div className="member-detail-profile">
                  <div className="member-detail-avatar">
                    {selectedMember.initials}
                  </div>

                  <div>
                    <h3>{selectedMember.name}</h3>

                    <span>{selectedMember.role}</span>
                  </div>
                </div>

                <div className="member-detail-list">
                  <div>
                    <span>Email Address</span>
                    <strong>{selectedMember.email}</strong>
                  </div>

                  <div>
                    <span>Role</span>
                    <strong>{selectedMember.role}</strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <strong>
                      <span
                        className={`status-badge ${selectedMember.status.toLowerCase()}`}
                      >
                        <span></span>
                        {selectedMember.status}
                      </span>
                    </strong>
                  </div>
                </div>

                <div className="team-modal-actions">
                  <button className="secondary-button" onClick={closeModal}>
                    Close
                  </button>

                  <button
                    className="primary-button"
                    onClick={() => openEditModal(selectedMember)}
                  >
                    <FiEdit2 />
                    Edit Member
                  </button>
                </div>
              </div>
            ) : (
              <form className="team-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className={errors.name ? "input-error" : ""}
                  />

                  {errors.name && (
                    <span className="form-error">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Email Address *</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className={errors.email ? "input-error" : ""}
                  />

                  {errors.email && (
                    <span className="form-error">{errors.email}</span>
                  )}
                </div>

                <div className="team-form-grid">
                  <div className="form-group">
                    <label>Role *</label>

                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="Project Manager">Project Manager</option>

                      <option value="Frontend Developer">
                        Frontend Developer
                      </option>

                      <option value="Backend Developer">
                        Backend Developer
                      </option>

                      <option value="UI/UX Designer">UI/UX Designer</option>

                      <option value="Product Designer">Product Designer</option>

                      <option value="QA Engineer">QA Engineer</option>
                    </select>

                    {errors.role && (
                      <span className="form-error">{errors.role}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Status *</label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>

                      <option value="Inactive">Inactive</option>
                    </select>

                    {errors.status && (
                      <span className="form-error">{errors.status}</span>
                    )}
                  </div>
                </div>

                <div className="team-modal-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="primary-button">
                    {modalType === "add" ? <FiPlus /> : <FiCheck />}

                    {modalType === "add" ? "Add Member" : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {toast.show && (
        <div
          className={`toast ${
            toast.type === "error" ? "toast-error" : "toast-success"
          }`}
        >
          <div className="toast-icon">
            <FiCheck />
          </div>

          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
