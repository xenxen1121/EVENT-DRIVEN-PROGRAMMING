type BadgeProps = {
  children: React.ReactNode;
  tone: "success" | "warning" | "error";
};

export function Badge({ children, tone }: BadgeProps) {
  return (
    <span>
      {children} - {tone}
    </span>
  );
}