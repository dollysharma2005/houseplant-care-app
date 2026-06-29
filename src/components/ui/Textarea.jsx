export default function Textarea({ id, className = '', error, rows = 4, ...props }) {
  return (
    <textarea
      id={id}
      rows={rows}
      className={`input-field min-h-[120px] resize-y ${
        error
          ? 'border-red-300/80 focus:border-red-400 focus:ring-red-500/15'
          : ''
      } ${className}`}
      {...props}
    />
  )
}
