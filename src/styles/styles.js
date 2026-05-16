export const styles = {
    page: { minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" },

    // Navbar
    navbar: { background: "#0f172a", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" },
    navBrand: { display: "flex", alignItems: "center", gap: "10px" },
    navLogo: { fontSize: "22px" },
    navLogoIcon: { size: 20, color: "#D4AF37", fill: "#D4AF37" },
    navTitle: { color: "#f8fafc", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.5px" },

    // Container
    container: { maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" },
    pageHeader: { marginBottom: "28px" },
    pageTitle: { fontSize: "28px", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.5px" },
    pageSubtitle: { color: "#94a3b8", marginTop: "4px", fontSize: "14px" },

    // Summary
    summaryBar: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" },
    summaryIcon: { fontSize: "28px" },
    summaryCount: { fontSize: "32px", fontWeight: 800, lineHeight: 1 },
    summaryLabel: { color: "#64748b", fontSize: "13px", marginTop: "2px", fontWeight: 500 },

    // Toolbar
    toolbar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" },
    filterGroup: { display: "flex", gap: "6px", flexWrap: "wrap" },
    filterBtn: { padding: "7px 16px", borderRadius: "20px", border: "1.5px solid #e2e8f0", background: "#fff", color: "#64748b", cursor: "pointer", fontSize: "13px", fontWeight: 500 },
    filterBtnActive: { background: "#0f172a", color: "#fff", border: "1.5px solid #0f172a" },
    addBtn: { padding: "10px 20px", background: "#0f172a", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600, fontSize: "14px" },

    // Grid
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" },

    // Card
    cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    cardStatusContainer: { display: "flex", alignItems: "center", gap: "10px", flex: 1 },
    statusDot: { width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0 },
    statusBadge: { fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px" },
    cardActions: { display: "flex", gap: "4px" },
    iconBtn: { background: "transparent", border: "none", cursor: "pointer", fontSize: "15px", padding: "4px 6px", borderRadius: "6px", opacity: 0.7 },
    cardTitle: { margin: 0, fontSize: "16px", fontWeight: 700, color: "#0f172a", lineHeight: 1.3 },
    cardDesc: { margin: 0, fontSize: "13px", color: "#64748b", lineHeight: 1.5 },
    cardFooter: { marginTop: "auto", paddingTop: "8px", borderTop: "1px solid #f1f5f9" },
    dueDate: { fontSize: "12px", fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" },

    // Empty
    empty: { textAlign: "center", padding: "80px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" },
    emptyIcon: { fontSize: "56px" },
    emptyIconProps: { size: 48, strokeWidth: 1.5, color: "#9ca3af" },
    emptyTitle: { fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: 0 },
    emptyDesc: { color: "#94a3b8", margin: 0 },

    // Modal
    overlay: { position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "24px", backdropFilter: "blur(4px)" },
    modal: { background: "#fff", borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "480px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" },
    modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
    modalTitle: { fontSize: "18px", fontWeight: 700, color: "#0f172a" },
    closeBtn: { background: "transparent", border: "none", cursor: "pointer", fontSize: "16px", color: "#94a3b8", padding: "4px 8px", borderRadius: "6px" },

    // Form
    formGroup: { marginBottom: "16px" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", color: "#0f172a", outline: "none", boxSizing: "border-box", background: "#f8fafc" },
    inputError: { borderColor: "#ef4444" },
    textarea: { width: "100%", padding: "10px 14px", border: "1.5px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", color: "#0f172a", outline: "none", boxSizing: "border-box", resize: "vertical", background: "#f8fafc", fontFamily: "inherit" },
    errorText: { color: "#ef4444", fontSize: "12px", marginTop: "4px", display: "block" },
    formActions: { display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "24px" },
    cancelBtn: { padding: "10px 20px", background: "#f1f5f9", color: "#374151", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "14px" },
    submitBtn: { padding: "10px 20px", background: "#0f172a", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "14px" },
    
    // Task Form
    formDateStatusGroup: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
    deleteModalContent: { padding: "8px" },
    deleteModalText: { color: "#6b7280", marginBottom: "24px" },
    toolbarActions: { display: "flex", gap: "10px" },
};