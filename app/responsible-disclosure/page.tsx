'use client'

import { useLanguage } from '@/contexts/language-context'
import { Mail, AlertCircle } from 'lucide-react'

export default function ResponsibleDisclosurePage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'سياسة الإفصاح المسؤول عن الثغرات الأمنية',
      lastUpdated: 'آخر تحديث:',
      introduction: 'تلتزم شركة العزب للإنشاءات بأمان بيانات وأنظمة عملائها. نحن نقدر مساهمة الباحثين الأمنيين في تحسين أماننا.',
      sections: {
        purpose: {
          title: '1. الهدف',
          content: 'هذه السياسة تحدد كيفية التعامل مع الثغرات الأمنية المكتشفة بطريقة مسؤولة وآمنة.'
        },
        reporting: {
          title: '2. الإبلاغ عن الثغرات',
          content: 'إذا اكتشفت أي ثغرة أمنية، يرجى إرسال تقرير مفصل إلى security@al-azab.co مع تجنب الإفصاح العام.'
        },
        information: {
          title: '3. المعلومات المطلوبة',
          content: 'يجب أن يتضمن التقرير: وصف الثغرة، خطوات إعادة الإنتاج، تأثيرها المحتمل، والجدول الزمني المقترح للإصلاح.'
        },
        timeline: {
          title: '4. جدول زمني للاستجابة',
          content: 'سنقر بـ استلام تقريرك خلال 24 ساعة وسنعمل على إصلاح الثغرة خلال 90 يومًا.'
        },
        confidentiality: {
          title: '5. السرية',
          content: 'سنحافظ على سرية معلوماتك ولن نكشفها إلا للأشخاص الضروريين لحل المشكلة.'
        },
        credit: {
          title: '6. الاعتراف',
          content: 'إذا رغبت، سنعطيك رصيدًا علنيًا عند الإصلاح (إذا لم يكن هناك قيود قانونية).'
        },
        outOfScope: {
          title: '7. خارج النطاق',
          content: 'الهجمات الاجتماعية والبحث المشروع والاختبار بدون إذن لا تندرج ضمن هذه السياسة.'
        },
        contact: {
          title: '8. التواصل',
          content: 'للإبلاغ عن ثغرة أمنية: security@al-azab.co أو الاتصال برقم الهاتف +201004006620'
        }
      }
    },
    en: {
      title: 'Responsible Disclosure & Security Policy',
      lastUpdated: 'Last Updated:',
      introduction: 'Al-Azab Construction Company is committed to the security of our customers\' data and systems. We appreciate security researchers\' contributions to improving our security.',
      sections: {
        purpose: {
          title: '1. Purpose',
          content: 'This policy outlines how security vulnerabilities will be handled in a responsible and safe manner.'
        },
        reporting: {
          title: '2. Reporting Vulnerabilities',
          content: 'If you discover a security vulnerability, please send a detailed report to security@al-azab.co while avoiding public disclosure.'
        },
        information: {
          title: '3. Required Information',
          content: 'Your report should include: a description of the vulnerability, reproduction steps, potential impact, and a proposed timeline for fixes.'
        },
        timeline: {
          title: '4. Response Timeline',
          content: 'We will acknowledge receipt of your report within 24 hours and work to fix the vulnerability within 90 days.'
        },
        confidentiality: {
          title: '5. Confidentiality',
          content: 'We will maintain the confidentiality of your information and only disclose it to necessary parties for resolution.'
        },
        credit: {
          title: '6. Recognition',
          content: 'If desired, we will give you public credit upon fix (if there are no legal restrictions).'
        },
        outOfScope: {
          title: '7. Out of Scope',
          content: 'Social engineering, legitimate research, and unauthorized testing do not fall under this policy.'
        },
        contact: {
          title: '8. Contact',
          content: 'To report a security vulnerability: security@al-azab.co or call +201004006620'
        }
      }
    }
  }

  const data = content[language as keyof typeof content]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 lg:py-20">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {data.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {data.lastUpdated} {new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 dark:text-blue-300 font-medium">
                {language === 'ar'
                  ? 'إذا اكتشفت ثغرة أمنية، يرجى إرسال تقرير مفصل بدلاً من الإفصاح العام.'
                  : 'If you discover a security vulnerability, please send a detailed report instead of public disclosure.'}
              </p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {data.introduction}
            </p>

            <div className="space-y-6">
              {Object.entries(data.sections).map(([key, section]: [string, any]) => (
                <div key={key}>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-8">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                  {language === 'ar' ? 'بريد الأمان' : 'Security Email'}
                </p>
                <a href="mailto:security@al-azab.co" className="text-yellow-600 dark:text-yellow-400 hover:underline font-medium">
                  security@al-azab.co
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'ar'
                ? 'هذه السياسة تسري اعتبارًا من آخر تاريخ تحديث مدرج أعلاه. قد نعدل هذه السياسة من وقت لآخر، وسيتم نشر التعديلات على هذه الصفحة.'
                : 'This policy is effective as of the last update date listed above. We may modify this policy from time to time, and changes will be posted on this page.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
