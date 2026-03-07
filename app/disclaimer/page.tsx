'use client'

import { useLanguage } from '@/contexts/language-context'

export default function DisclaimerPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'إخلاء المسؤولية',
      lastUpdated: 'آخر تحديث:',
      introduction: 'يوضح هذا الإخلاء حدود المسؤولية والضمانات المتعلقة باستخدام موقع وخدمات شركة العزب للإنشاءات.',
      sections: {
        asIs: {
          title: '1. الخدمات "كما هي"',
          content: 'يتم توفير الموقع والخدمات "كما هي" بدون أي ضمانات صريحة أو ضمنية. نحن لا نضمن دقة أو اكتمال المحتوى.'
        },
        noWarranty: {
          title: '2. عدم الضمان',
          content: 'نحن لا نضمن أن الخدمات ستكون خالية من الأخطاء أو متاحة بشكل دائم أو خالية من الفيروسات.'
        },
        liabilityLimits: {
          title: '3. تحديد المسؤولية',
          content: 'لن نتحمل مسؤولية عن أي أضرار مباشرة أو غير مباشرة أو خاصة أو عابرة ناجمة عن استخدام الموقع.'
        },
        externalLinks: {
          title: '4. الروابط الخارجية',
          content: 'قد يحتوي الموقع على روابط لمواقع خارجية، ولا نتحمل مسؤولية عن محتويات تلك المواقع.'
        },
        accuracy: {
          title: '5. دقة المعلومات',
          content: 'نحاول توفير معلومات دقيقة، لكننا لا نضمن دقة أو اكتمال أو حداثة جميع المعلومات.'
        },
        professional: {
          title: '6. المشورة المهنية',
          content: 'المحتوى على الموقع ليس بديلاً عن المشورة المهنية والقانونية أو الطبية.'
        },
        indemnity: {
          title: '7. التعويض',
          content: 'توافق على تعويضنا عن أي ضرر أو خسارة أو مطالبة ناجمة عن انتهاكك لهذا الإخلاء.'
        },
        changes: {
          title: '8. التعديلات',
          content: 'نحتفظ بالحق في تعديل هذا الإخلاء في أي وقت بدون إشعار مسبق.'
        }
      }
    },
    en: {
      title: 'Disclaimer',
      lastUpdated: 'Last Updated:',
      introduction: 'This Disclaimer clarifies the limits of liability and warranties related to the use of Al-Azab Construction Company website and services.',
      sections: {
        asIs: {
          title: '1. Services "As Is"',
          content: 'The website and services are provided "as is" without any express or implied warranties. We do not guarantee the accuracy or completeness of the content.'
        },
        noWarranty: {
          title: '2. No Warranty',
          content: 'We do not warrant that the services will be error-free, always available, or free from viruses.'
        },
        liabilityLimits: {
          title: '3. Limitation of Liability',
          content: 'We shall not be liable for any direct, indirect, special, or consequential damages arising from the use of the website.'
        },
        externalLinks: {
          title: '4. External Links',
          content: 'The website may contain links to external websites, and we are not responsible for their content.'
        },
        accuracy: {
          title: '5. Accuracy of Information',
          content: 'While we strive to provide accurate information, we do not guarantee the accuracy, completeness, or currency of all information.'
        },
        professional: {
          title: '6. Professional Advice',
          content: 'Content on the website is not a substitute for professional, legal, or medical advice.'
        },
        indemnity: {
          title: '7. Indemnification',
          content: 'You agree to indemnify us against any damage, loss, or claims arising from your violation of this disclaimer.'
        },
        changes: {
          title: '8. Changes',
          content: 'We reserve the right to modify this disclaimer at any time without prior notice.'
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

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'ar'
                ? 'هذا الإخلاء يسري اعتبارًا من آخر تاريخ تحديث مدرج أعلاه. قد نعدل هذا الإخلاء من وقت لآخر، وسيتم نشر التعديلات على هذه الصفحة.'
                : 'This disclaimer is effective as of the last update date listed above. We may modify this disclaimer from time to time, and changes will be posted on this page.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
