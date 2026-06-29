const floatingLabelClasses =
  'pointer-events-none absolute left-4 top-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-zinc-500 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-primary-600 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-zinc-500'

export default function Input({
  id,
  className = '',
  error,
  label,
  required = false,
  ...props
}) {
  const errorClasses = error
    ? 'border-red-300/80 focus:border-red-400 focus:ring-red-500/15'
    : ''

  if (label) {
    return (
      <div className="relative">
        <input
          id={id}
          placeholder=" "
          className={`peer input-floating ${errorClasses} ${className}`}
          {...props}
        />
        <label htmlFor={id} className={floatingLabelClasses}>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      </div>
    )
  }

  return (
    <input
      id={id}
      className={`input-field ${errorClasses} ${className}`}
      {...props}
    />
  )
}
