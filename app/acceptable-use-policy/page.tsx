'use client'

import { useLanguage } from '@/contexts/language-context'

export default function AcceptableUsePolicyPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'سياسة الاستخدام المقبول',
      lastUpdated: 'آخر تحديث:',
      introduction: 'توضح سياسة الاستخدام المقبول هذه قواعد السلوك المتوقعة عند استخدام خدمات وموقع شركة العزب للإنشاءات.',
      sections: {
        acceptableUse: {
          title: '1. الاستخدام المقبول',
          content: 'توافق على استخدام الموقع والخدمات فقط للأغراض القانونية والمشروعة وبطريقة احترامية لحقوق الآخرين.'
        },
        prohibitedActivities: {
          title: '2. الأنشطة المحظورة',
          content: 'يُحظر نقل أو نشر أو توزيع أي محتوى غير قانوني أو تشهيري أو مسيء أو ينتهك حقوق الملكية الفكرية.'
        },
        harassment: {
          title: '3. الإزعاج والتهديد',
          content: 'يُحظر المضايقة أو التهديد أو الإساءة اللفظية أو العنف تجاه الموظفين أو المستخدمين الآخرين.'
        },
        spam: {
          title: '4. البريد العشوائي والمحتوى المكرر',
          content: 'يُحظر إرسال رسائل غير مرغوب فيها أو محتوى مكرر أو بيانات وسيطة.'
        },
        malware: {
          title: '5. البرامج الضارة والفيروسات',
          content: 'يُحظر تحميل أو توزيع أي فيروسات أو برامج ضارة أو أدوات اختراق.'
        },
        security: {
          title: '6. انتهاكات الأمان',
          content: 'يُحظر محاولة الوصول غير المصرح به أو اختراق أنظمة الأمان أو قواعد البيانات.'
        },
        intellproperty: {
          title: '7. الملكية الفكرية',
          content: 'يجب احترام جميع حقوق الملكية الفكرية وعدم نسخ أو إعادة نشر محتويات الموقع بدون إذن.'
        },
        enforcement: {
          title: '8. تطبيق السياسة',
          content: 'قد نعلق أو نحذف حسابات المستخدمين الذين ينتهكون هذه السياسة ونتخذ إجراءات قانونية إذا لزم الأمر.'
        }
      }
    },
    en: {
      title: 'Acceptable Use Policy',
      lastUpdated: 'Last Updated:',
      introduction: 'This Acceptable Use Policy outlines the rules of conduct expected when using the services and website of Al-Azab Construction Company.',
      sections: {
        acceptableUse: {
          title: '1. Acceptable Use',
          content: 'You agree to use the website and services only for lawful, legitimate purposes and in a manner that respects the rights of others.'
        },
        prohibitedActivities: {
          title: '2. Prohibited Activities',
          content: 'You may not transmit, publish, or distribute any illegal, defamatory, offensive, or infringing content.'
        },
        harassment: {
          title: '3. Harassment and Threats',
          content: 'Harassment, threats, verbal abuse, or violence towards employees or other users is strictly prohibited.'
        },
        spam: {
          title: '4. Spam and Duplicate Content',
          content: 'Sending unsolicited messages, duplicate content, or spamware is prohibited.'
        },
        malware: {
          title: '5. Malware and Viruses',
          content: 'You may not upload or distribute viruses, malware, or hacking tools.'
        },
        security: {
          title: '6. Security Violations',
          content: 'Unauthorized access attempts, security breaches, or database hacking are prohibited.'
        },
        intellproperty: {
          title: '7. Intellectual Property',
          content: 'All intellectual property rights must be respected and website content may not be copied or republished without permission.'
        },
        enforcement: {
          title: '8. Policy Enforcement',
          content: 'We may suspend or delete accounts of users who violate this policy and take legal action if necessary.'
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
                ? 'هذه السياسة تسري اعتبارًا من آخر تاريخ تحديث مدرج أعلاه. قد نعدل هذه السياسة من وقت لآخر، وسيتم نشر التعديلات على هذه الصفحة.'
                : 'This policy is effective as of the last update date listed above. We may modify this policy from time to time, and changes will be posted on this page.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
