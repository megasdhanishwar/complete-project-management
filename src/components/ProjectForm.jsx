import React, { useState } from "react";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  name: "",
  description: "",
  client: "",
  manager: "",
  category: "",
  status: "Pending",
  priority: "Medium",
  progress: 0,
  startDate: "",
  dueDate: "",
  budget: "",
};

export default function ProjectForm({
  initialValues = defaultValues,
  onSubmit,
  submitLabel = "Create Project",
}) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    ...defaultValues,
    ...initialValues,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!form.client.trim()) {
      newErrors.client = "Client name is required";
    }

    if (!form.manager.trim()) {
      newErrors.manager = "Project manager is required";
    }

    if (!form.category) {
      newErrors.category = "Select a category";
    }

    if (!form.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!form.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    if (form.startDate && form.dueDate && form.dueDate < form.startDate) {
      newErrors.dueDate = "Due date cannot be before start date";
    }

    if (!form.description.trim()) {
      newErrors.description = "Project description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...form,
      progress: Number(form.progress),
      budget: Number(form.budget) || 0,
      team: initialValues.team || ["ES", "AK"],
    });
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <div className="form-section-title">
          <h3>Project Information</h3>
          <p>Enter the basic project details.</p>
        </div>

        <div className="form-grid">
          <div className="form-group full">
            <label>Project Name *</label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter project name"
            />

            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group full">
            <label>Description *</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the project..."
              rows="4"
            />

            {errors.description && (
              <span className="field-error">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label>Client *</label>

            <input
              name="client"
              value={form.client}
              onChange={handleChange}
              placeholder="Client name"
            />

            {errors.client && (
              <span className="field-error">{errors.client}</span>
            )}
          </div>

          <div className="form-group">
            <label>Project Manager *</label>

            <input
              name="manager"
              value={form.manager}
              onChange={handleChange}
              placeholder="Manager name"
            />

            {errors.manager && (
              <span className="field-error">{errors.manager}</span>
            )}
          </div>

          <div className="form-group">
            <label>Category *</label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option>Web Development</option>
              <option>Web Application</option>
              <option>Dashboard</option>
              <option>Mobile App</option>
              <option>CRM</option>
              <option>Website</option>
              <option>Management</option>
              <option>Portal</option>
            </select>

            {errors.category && (
              <span className="field-error">{errors.category}</span>
            )}
          </div>

          <div className="form-group">
            <label>Priority</label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-title">
          <h3>Project Schedule</h3>
          <p>Set project timeline and current progress.</p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Start Date *</label>

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />

            {errors.startDate && (
              <span className="field-error">{errors.startDate}</span>
            )}
          </div>

          <div className="form-group">
            <label>Due Date *</label>

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />

            {errors.dueDate && (
              <span className="field-error">{errors.dueDate}</span>
            )}
          </div>

          <div className="form-group">
            <label>Status</label>

            <select name="status" value={form.status} onChange={handleChange}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
          </div>

          <div className="form-group">
            <label>Progress (%)</label>

            <input
              type="number"
              name="progress"
              min="0"
              max="100"
              value={form.progress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Budget</label>

            <input
              type="number"
              name="budget"
              min="0"
              value={form.budget}
              onChange={handleChange}
              placeholder="₹ 0"
            />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/projects")}
        >
          <FiArrowLeft />
          Cancel
        </button>

        <button type="submit" className="primary-button">
          <FiSave />
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
