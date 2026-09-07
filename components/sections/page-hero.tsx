import Image from "next/image"

interface PageHeroProps {
  title: string
  subtitle: string
  image: string
  badge?: string
}

export function PageHero({ title, subtitle, image, badge }: PageHeroProps) {
  return (
    <section className="relative isolate h-[360px] w-full overflow-hidden border-b border-border sm:h-[420px] lg:h-[480px]">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-secondary/90 via-secondary/60 to-secondary/85" />
      <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority sizes="100vw" onError={(event) => { event.currentTarget.src = "/placeholder.svg" }} />
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        {badge ? (
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm font-medium text-white mb-4">
            {badge}
          </span>
        ) : null}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl">{subtitle}</p>
      </div>
    </section>
  )
}
