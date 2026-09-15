export default function Button({
  children,
  variant = 'dark',
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant}`}
      {...props}
    >
      {children}
    </button>
  )
}
