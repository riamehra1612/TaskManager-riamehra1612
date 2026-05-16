/**
 * BaseCard Component
 * 
 * A reusable card wrapper component that handles card styling for different variants.
 * Supports "summary" (for summary statistics) and "task" (for task items) card layouts.
 * 
 */
export default function BaseCard({ children, borderTopColor, style, variant = "default" }) {
  // Returns card styling based on the selected variant
  const getCardStyle = () => {
    const baseStyle = {
      borderTop: `4px solid ${borderTopColor || "#e5e7eb"}`,
    };

    if (variant === "summary") {
      return {
        ...baseStyle,
        background: "#fff",
        borderRadius: "12px",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      };
    }

    if (variant === "task") {
      return {
        ...baseStyle,
        background: "#fff",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        border: "1px solid #f1f5f9",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      };
    }

    return baseStyle;
  };

  return (
    <div style={{ ...getCardStyle(), ...style }}>
      {children}
    </div>
  );
}
