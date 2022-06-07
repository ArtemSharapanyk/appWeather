import { Alert } from "antd";
import React from "react";

export function ErrorMessage({ children }: any) {
  if (!children) return null;

  return (
    <div className="error-validation-message">
      <Alert message={children} type="error" />
    </div>
  );
}
