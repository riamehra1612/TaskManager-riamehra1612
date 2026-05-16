import { Clock, RefreshCw, CheckCircle2 } from 'lucide-react';

export const STATUS_CONFIG = {
  Pending: { color: "#f59e0b", bg: "#fef3c7", dot: "#f59e0b" },
  "In Progress": { color: "#3b82f6", bg: "#dbeafe", dot: "#3b82f6" },
  Completed: { color: "#10b981", bg: "#d1fae5", dot: "#10b981" },
};

export const FILTERS = ["All", "Pending", "In Progress", "Completed"];

export const STATUSES = ["Pending", "In Progress", "Completed"];

export const SUMMARY_META = [
  { label: "Pending", color: "#f59e0b", icon: <Clock /> },
  { label: "In Progress", color: "#3b82f6", icon: <RefreshCw /> },
  { label: "Completed", color: "#10b981", icon: <CheckCircle2 /> },
];