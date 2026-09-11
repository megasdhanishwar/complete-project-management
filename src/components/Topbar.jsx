import React from "react";
import { FiMenu, FiBell, FiSearch } from "react-icons/fi";

export default function Topbar({ setSidebarOpen }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
          <FiMenu />
        </button>

        <div className="topbar-search">
          <FiSearch />
          <input placeholder="Search anything..." />
        </div>
      </div>

      <div className="topbar-right">
        <button className="icon-button">
          <FiBell />
          <span className="notification-dot" />
        </button>

        <div className="topbar-user">
          <div className="avatar">ES</div>

          <div>
            <strong>Eswar</strong>
            <span>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
