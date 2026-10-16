import React from "react";
import { ShieldCheck } from "lucide-react";

export default function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark">
        <ShieldCheck size={21} strokeWidth={2.5} />
      </span>
      {!compact && (
        <span className="brand-name">
          StacklyAuth<span>.</span>
        </span>
      )}
    </div>
  );
}
