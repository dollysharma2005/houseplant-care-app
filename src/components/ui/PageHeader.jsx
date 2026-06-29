import FadeIn from '../motion/FadeIn'

export default function PageHeader({ title, description, action }) {
  return (
    <FadeIn className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600">
          HomePlant
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            {description}
          </p>
        )}
      </div>
      {action && <div className="w-full shrink-0 sm:w-auto">{action}</div>}
    </FadeIn>
  )
}
