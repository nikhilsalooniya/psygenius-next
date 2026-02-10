const variantStyles = {
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
  neutral: "bg-gray-100 text-gray-600",
};

export function StatusBadge({
  label,
  variant,
}: {
  label: string;
  variant: "success" | "warning" | "danger" | "neutral";
}) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
