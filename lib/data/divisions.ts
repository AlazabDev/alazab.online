export interface Division {
  id: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  icon: string
  color: string
  link: string
  order: number
}

export const divisions: Division[] = [
  {
    id: "luxury-finishing",
    titleAr: "التشطيبات الفاخرة",
    titleEn: "Luxury Finishing",
    descriptionAr: "تشطيبات سكنية استثنائية بأعلى معايير الجودة والفخامة",
    descriptionEn: "Exceptional residential finishing with the highest standards of quality and luxury",
    icon: "diamond",
    color: "#f5bf23",
    link: "https://luxury-finishing.alazab.com",
    order: 1,
  },
  {
    id: "brand-identity",
    titleAr: "الهوية التجارية",
    titleEn: "Brand Identity",
    descriptionAr: "تجهيز المحلات والفضاءات التجارية برؤية احترافية",
    descriptionEn: "Professional commercial space setup and branding solutions",
    icon: "storefront",
    color: "#f5bf23",
    link: "https://brand-identity.alazab.com",
    order: 2,
  },
  {
    id: "uberfix",
    titleAr: "صيانة شاملة",
    titleEn: "UberFix",
    descriptionAr: "خدمات صيانة وتجديد شاملة مع فريق متخصص",
    descriptionEn: "Comprehensive maintenance and renovation services with expert team",
    icon: "wrench",
    color: "#f5bf23",
    link: "https://uberfix.alazab.com",
    order: 3,
  },
  {
    id: "laban-alasfour",
    titleAr: "لبن الأصفور",
    titleEn: "Laban Alasfour",
    descriptionAr: "توريدات عامة وخدمات اللوجستيات والتوزيع",
    descriptionEn: "General supplies, logistics and distribution services",
    icon: "truck",
    color: "#f5bf23",
    link: "https://laban-alasfour.alazab.com",
    order: 4,
  },
]
