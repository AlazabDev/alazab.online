export interface Statistic {
  id: string
  valueEn: number
  valueAr: number
  labelAr: string
  labelEn: string
  icon: string
  suffix?: string
}

export const statistics: Statistic[] = [
  {
    id: "experience",
    valueEn: 15,
    valueAr: 15,
    labelAr: "سنة من الخبرة",
    labelEn: "Years of Experience",
    icon: "award",
    suffix: "+",
  },
  {
    id: "projects",
    valueEn: 500,
    valueAr: 500,
    labelAr: "مشروع مكتمل",
    labelEn: "Completed Projects",
    icon: "briefcase",
    suffix: "+",
  },
  {
    id: "companies",
    valueEn: 4,
    valueAr: 4,
    labelAr: "شركات متخصصة",
    labelEn: "Specialized Companies",
    icon: "building-2",
  },
  {
    id: "team",
    valueEn: 200,
    valueAr: 200,
    labelAr: "فريق احترافي",
    labelEn: "Expert Team Members",
    icon: "users",
    suffix: "+",
  },
]
