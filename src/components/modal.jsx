/**
 * Modal Component
 * 
 * Generic modal overlay for displaying dialogs and forms.
 * Closes on Escape key press or clicking the backdrop.
 * Prevents event propagation on modal click to keep modal open.
 * 
 */
import { useEffect } from "react";
import { styles } from "../styles/styles";

export default function Modal({ onClose, children }) {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
