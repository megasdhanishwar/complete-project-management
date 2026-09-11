import React from "react";

export default function PageHeader({ title, description, action }) {
  return (
    <div className="page-header">
      <div>
        <div className="breadcrumb">Workspace / Projects</div>

        <h1>{title}</h1>

        {description && <p>{description}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
