export interface Testimonial {
  id: string
  nameAr: string
  nameEn: string
  companyAr: string
  companyEn: string
  quoteAr: string
  quoteEn: string
  division: "luxury-finishing" | "brand-identity" | "uberfix" | "laban-alasfour"
  image?: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    nameAr: "أحمد محمد",
    nameEn: "Ahmed Mohammed",
    companyAr: "مالك عقار فاخر",
    companyEn: "Luxury Property Owner",
    quoteAr: "كانت تجربة رائعة جداً مع فريق التشطيبات الفاخرة، لم أتوقع هذا المستوى من الاحترافية والجودة",
    quoteEn: "Working with the Luxury Finishing team was an amazing experience, I didn't expect such professional quality",
    division: "luxury-finishing",
    rating: 5,
  },
  {
    id: "testimonial-2",
    nameAr: "فاطمة علي",
    nameEn: "Fatima Ali",
    companyAr: "صاحبة متجر تجاري",
    companyEn: "Commercial Store Owner",
    quoteAr: "ساعدتنا الهوية التجارية على تحسين صورة متجرنا بشكل كبير وزيادة جاذبيته",
    quoteEn: "The Brand Identity services significantly improved our store's image and attractiveness",
    division: "brand-identity",
    rating: 5,
  },
  {
    id: "testimonial-3",
    nameAr: "محمد السيد",
    nameEn: "Mohammed El-Sayed",
    companyAr: "مدير مرافق عقارية",
    companyEn: "Facilities Manager",
    quoteAr: "خدمة الصيانة الشاملة توفر لنا الوقت والجهد، فريق متخصص وسريع وفعال",
    quoteEn: "The comprehensive maintenance service saves us time and effort with a specialized, fast and effective team",
    division: "uberfix",
    rating: 5,
  },
  {
    id: "testimonial-4",
    nameAr: "ليلى حسن",
    nameEn: "Layla Hassan",
    companyAr: "مديرة عمليات لوجستية",
    companyEn: "Logistics Operations Manager",
    quoteAr: "خدمات التوريدات والتوزيع من الشركة موثوقة جداً وفي الوقت المحدد دائماً",
    quoteEn: "The supplies and distribution services are very reliable and always on time",
    division: "laban-alasfour",
    rating: 5,
  },
]
