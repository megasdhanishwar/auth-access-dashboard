import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function Modal({
  open,
  title,
  description,
  confirmText = "Confirm",
  onConfirm,
  onCancel,
  danger = false,
}) {
  if (!open) return null;
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) =>
        event.target === event.currentTarget && onCancel()
      }
    >
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="icon-button modal-x"
          onClick={onCancel}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>
        <div className={`modal-icon ${danger ? "modal-icon-danger" : ""}`}>
          <AlertTriangle size={23} />
        </div>
        <h2 id="modal-title">{title}</h2>
        <p>{description}</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={`btn ${danger ? "btn-danger" : "btn-primary"}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </section>
    </div>
  );
}
