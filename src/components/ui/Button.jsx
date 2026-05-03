/**
 * Reusable Button component with multiple variants and sizes.
 * Supports both <button> and <a> rendering via the `as` or `href` prop.
 */

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200",
  secondary:
    "border-2 border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white",
  ghost: "bg-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-50",
  outline:
    "border-2 border-slate-300 bg-transparent text-slate-900 hover:border-slate-900 hover:bg-slate-50/50",
  tech: "border border-slate-900 bg-transparent text-slate-900 hover:bg-slate-900 hover:text-white",
  social: "text-slate-700 hover:text-blue-600 transition-colors",
};

const sizes = {
  sm: "py-2 px-4 text-xs gap-1.5",
  md: "py-2.5 px-5 text-sm gap-2",
  lg: "py-3 px-8 text-sm gap-2",
};

const shapes = {
  pill: "rounded-full",
  rounded: "rounded-xl",
  square: "rounded-none",
  icon: "rounded-full p-4",
  squareIcon: "rounded-none p-4 aspect-square",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  shape = "square",
  href,
  tech = true,
  external = false,
  className = "",
  icon: Icon,
  iconPosition = "start",
  onClick,
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none";

  const classes = [
    base,
    variants[variant] || variants.primary,
    tech ? "btn-tech-hover" : "",
    shape === "icon" ? shapes.icon : sizes[size],
    shapes[shape] || shapes.square,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {Icon && iconPosition === "start" && (
        <span className="inline-flex shrink-0">
          <Icon size={16} />
        </span>
      )}
      {children}
      {Icon && iconPosition === "end" && (
        <span className="inline-flex shrink-0">
          <Icon size={16} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}
