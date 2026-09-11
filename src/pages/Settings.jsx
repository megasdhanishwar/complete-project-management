import React, { useState } from "react";
import {
  FiBell,
  FiCheck,
  FiGlobe,
  FiLock,
  FiSave,
  FiUser,
  FiShield,
  FiMail,
  FiMoon,
  FiMonitor,
  FiSun,
} from "react-icons/fi";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const [fullName, setFullName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [projectAlerts, setProjectAlerts] = useState(true);

  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: <FiUser />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <FiBell />,
    },
    {
      id: "security",
      label: "Security",
      icon: <FiLock />,
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: <FiGlobe />,
    },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="page-eyebrow">Preferences</span>

          <h1>Settings</h1>

          <p>
            Manage your account, notifications, security and application
            preferences.
          </p>
        </div>
      </div>

      <div className="settings-layout">
        <aside className="settings-sidebar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-nav ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </aside>

        <section className="settings-card">
          {activeTab === "profile" && (
            <>
              <div className="settings-card-header">
                <div className="settings-title-icon">
                  <FiUser />
                </div>

                <div>
                  <h2>Profile Settings</h2>
                  <p>Update your personal information and account details.</p>
                </div>
              </div>

              <div className="settings-form">
                <div className="settings-profile-preview">
                  <div className="settings-avatar">ES</div>

                  <div>
                    <h3>{fullName || "Admin User"}</h3>
                    <span>Administrator</span>
                  </div>
                </div>

                <div className="settings-form-grid">
                  <div className="form-group">
                    <label>Full Name</label>

                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Role</label>

                    <input type="text" value="Administrator" disabled />
                  </div>

                  <div className="form-group">
                    <label>Account Status</label>

                    <div className="settings-status-field">
                      <span className="settings-status-dot"></span>
                      Active
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <div className="settings-section-heading">
                    <div className="settings-section-icon">
                      <FiMail />
                    </div>

                    <div>
                      <h3>Contact Information</h3>
                      <p>Your primary account contact information.</p>
                    </div>
                  </div>

                  <div className="settings-info-box">
                    <span>Email</span>
                    <strong>{email}</strong>
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="primary-button" onClick={handleSave}>
                    {saved ? <FiCheck /> : <FiSave />}

                    {saved ? "Changes Saved" : "Save Changes"}
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "notifications" && (
            <>
              <div className="settings-card-header">
                <div className="settings-title-icon">
                  <FiBell />
                </div>

                <div>
                  <h2>Notification Settings</h2>
                  <p>Control how and when you receive notifications.</p>
                </div>
              </div>

              <div className="settings-form">
                <div className="settings-section first-section">
                  <div className="settings-section-heading">
                    <div className="settings-section-icon">
                      <FiBell />
                    </div>

                    <div>
                      <h3>Notification Preferences</h3>
                      <p>Choose which notifications you want to receive.</p>
                    </div>
                  </div>

                  <div className="setting-row">
                    <div className="setting-row-content">
                      <strong>Push Notifications</strong>

                      <p>
                        Receive notifications about important account activity.
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`toggle ${notifications ? "active" : ""}`}
                      onClick={() => setNotifications(!notifications)}
                      aria-label="Toggle push notifications"
                    >
                      <span></span>
                    </button>
                  </div>

                  <div className="setting-row">
                    <div className="setting-row-content">
                      <strong>Email Updates</strong>

                      <p>Receive project updates and reports through email.</p>
                    </div>

                    <button
                      type="button"
                      className={`toggle ${emailUpdates ? "active" : ""}`}
                      onClick={() => setEmailUpdates(!emailUpdates)}
                      aria-label="Toggle email updates"
                    >
                      <span></span>
                    </button>
                  </div>

                  <div className="setting-row">
                    <div className="setting-row-content">
                      <strong>Project Alerts</strong>

                      <p>
                        Get notified when project status or deadlines change.
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`toggle ${projectAlerts ? "active" : ""}`}
                      onClick={() => setProjectAlerts(!projectAlerts)}
                      aria-label="Toggle project alerts"
                    >
                      <span></span>
                    </button>
                  </div>
                </div>

                <div className="settings-notification-summary">
                  <div className="summary-icon">
                    <FiCheck />
                  </div>

                  <div>
                    <strong>Notification preferences updated</strong>

                    <p>Your notification settings are applied automatically.</p>
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="primary-button" onClick={handleSave}>
                    {saved ? <FiCheck /> : <FiSave />}

                    {saved ? "Changes Saved" : "Save Preferences"}
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "security" && (
            <>
              <div className="settings-card-header">
                <div className="settings-title-icon">
                  <FiLock />
                </div>

                <div>
                  <h2>Security Settings</h2>
                  <p>Manage your password and account security.</p>
                </div>
              </div>

              <div className="settings-form">
                <div className="settings-section first-section">
                  <div className="settings-section-heading">
                    <div className="settings-section-icon">
                      <FiShield />
                    </div>

                    <div>
                      <h3>Change Password</h3>
                      <p>Use a strong password to keep your account secure.</p>
                    </div>
                  </div>

                  <div className="security-form">
                    <div className="form-group">
                      <label>Current Password</label>

                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                    </div>

                    <div className="form-group">
                      <label>New Password</label>

                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                      <span className="input-hint">
                        Use at least 8 characters with a mix of letters and
                        numbers.
                      </span>
                    </div>

                    <div className="form-group">
                      <label>Confirm New Password</label>

                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                <div className="security-info">
                  <div className="security-info-icon">
                    <FiShield />
                  </div>

                  <div>
                    <strong>Your account is protected</strong>

                    <p>
                      Keep your password private and avoid using the same
                      password across multiple accounts.
                    </p>
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="primary-button" onClick={handleSave}>
                    {saved ? <FiCheck /> : <FiSave />}

                    {saved ? "Password Updated" : "Update Password"}
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "preferences" && (
            <>
              <div className="settings-card-header">
                <div className="settings-title-icon">
                  <FiGlobe />
                </div>

                <div>
                  <h2>Application Preferences</h2>
                  <p>Customize your application experience.</p>
                </div>
              </div>

              <div className="settings-form">
                <div className="settings-section first-section">
                  <div className="settings-section-heading">
                    <div className="settings-section-icon">
                      <FiMonitor />
                    </div>

                    <div>
                      <h3>Appearance</h3>
                      <p>Choose how the application should look.</p>
                    </div>
                  </div>

                  <div className="theme-options">
                    <button
                      type="button"
                      className={`theme-option ${
                        theme === "light" ? "active" : ""
                      }`}
                      onClick={() => setTheme("light")}
                    >
                      <div className="theme-option-icon">
                        <FiSun />
                      </div>

                      <div>
                        <strong>Light</strong>
                        <span>Bright and clean interface</span>
                      </div>

                      {theme === "light" && (
                        <div className="theme-check">
                          <FiCheck />
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      className={`theme-option ${
                        theme === "system" ? "active" : ""
                      }`}
                      onClick={() => setTheme("system")}
                    >
                      <div className="theme-option-icon">
                        <FiMonitor />
                      </div>

                      <div>
                        <strong>System</strong>
                        <span>Follow your device preferences</span>
                      </div>

                      {theme === "system" && (
                        <div className="theme-check">
                          <FiCheck />
                        </div>
                      )}
                    </button>

                    <button
                      type="button"
                      className={`theme-option ${
                        theme === "dark" ? "active" : ""
                      }`}
                      onClick={() => setTheme("dark")}
                    >
                      <div className="theme-option-icon">
                        <FiMoon />
                      </div>

                      <div>
                        <strong>Dark</strong>
                        <span>Dark interface for low light</span>
                      </div>

                      {theme === "dark" && (
                        <div className="theme-check">
                          <FiCheck />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                <div className="settings-section">
                  <div className="settings-section-heading">
                    <div className="settings-section-icon">
                      <FiGlobe />
                    </div>

                    <div>
                      <h3>Language</h3>
                      <p>Select your preferred application language.</p>
                    </div>
                  </div>

                  <div className="form-group language-group">
                    <label>Application Language</label>

                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="English">English</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>
                </div>

                <div className="settings-preference-summary">
                  <div>
                    <span>Current Theme</span>
                    <strong>
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </strong>
                  </div>

                  <div>
                    <span>Language</span>
                    <strong>{language}</strong>
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="primary-button" onClick={handleSave}>
                    {saved ? <FiCheck /> : <FiSave />}

                    {saved ? "Preferences Saved" : "Save Preferences"}
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
