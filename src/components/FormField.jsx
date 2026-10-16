import React from "react";

export default function FormField({
  label,
  error,
  hint,
  icon: Icon,
  right,
  ...props
}) {
  return (
    <div className={`form-field ${error ? "field-error" : ""}`}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <div className="input-wrap">
        {Icon && <Icon className="input-icon" size={18} />}
        <input {...props} />
        {right}
      </div>
      {error && <span className="field-message error-message">{error}</span>}
      {!error && hint && <span className="field-message">{hint}</span>}
    </div>
  );
}
