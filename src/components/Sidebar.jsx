import React from "react";
import { NavLink } from "react-router-dom";
import { FiGrid, FiFolder, FiUsers, FiSettings, FiX } from "react-icons/fi";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-mark">P</div>

          <div>
            <h2>ProjectHub</h2>
            <span>Management</span>
          </div>

          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX />
          </button>
        </div>

        <div className="menu-label">MAIN MENU</div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" onClick={() => setSidebarOpen(false)}>
            <FiGrid />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/projects" onClick={() => setSidebarOpen(false)}>
            <FiFolder />
            <span>Projects</span>
          </NavLink>

          <NavLink to="/team">
            <FiUsers />
            <span>Team</span>
          </NavLink>

          <NavLink to="/settings">
            <FiSettings />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-mini">
            <div className="avatar">ES</div>

            <div>
              <strong>Eswar</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
