const styles = {
  primary:
    "px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50",
  secondary:
    "px-6 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors",
  icon: "w-8 h-8 rounded bg-zinc-700 hover:bg-zinc-600 transition-colors",
} as const;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof styles;
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={className ? `${styles[variant]} ${className}` : styles[variant]}
      {...props}
    />
  );
}
