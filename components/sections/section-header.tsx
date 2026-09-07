interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "start"
}

export function SectionHeader({ eyebrow, title, description, align = "center" }: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-start"

  return (
    <div className={`${alignment} max-w-3xl`}>
      {eyebrow ? (
        <span className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-wide text-primary sm:text-sm">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mb-4 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
