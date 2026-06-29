export default function Label({ htmlFor, children, required = false, className = '' }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500 ${className}`}
    >
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
  )
}
