export const metadata = {
  title: "مجموعة العزب للإنشاءات | Alazab Construction Group - أربع شركات متخصصة",
  description:
    "مجموعة العزب - أربع شركات متخصصة: التشطيبات الفاخرة، الهوية التجارية، الصيانة الشاملة، والتوريدات. حلول متكاملة لبناء وتطوير أحلامك.",
  keywords: "العزب, مقاولات, تشطيبات فاخرة, هوية تجارية, صيانة, توريدات, البناء, الرياض, السعودية",
  authors: [{ name: "Alazab Construction Group" }],
  openGraph: {
    title: "مجموعة العزب | أربع شركات متخصصة تحت سقف واحد",
    description: "التشطيبات الفاخرة، الهوية التجارية، الصيانة الشاملة، والتوريدات. كل ما تحتاجه في شركة واحدة.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://alazab.com",
    images: ["/hero-banner.jpg"],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

import HomePageClient from "./HomePageClient"

export default function HomePageServer() {
  return <HomePageClient />
}
