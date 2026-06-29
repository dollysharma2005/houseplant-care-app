export default function Select({ id, className = '', error, children, ...props }) {
  return (
    <select
      id={id}
      className={`input-field appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 ${
        error
          ? 'border-red-300/80 focus:border-red-400 focus:ring-red-500/15'
          : ''
      } ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
      }}
      {...props}
    >
      {children}
    </select>
  )
}
