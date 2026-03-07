'use client'

import { useLanguage } from '@/contexts/language-context'

export default function RefundPolicyPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'سياسة الاسترجاع والإلغاء',
      lastUpdated: 'آخر تحديث:',
      introduction: 'توضح سياسة الاسترجاع والإلغاء هذه حقوقك وواجباتك المتعلقة بإلغاء الطلبات واسترجاع الأموال من شركة العزب للإنشاءات.',
      sections: {
        refundEligibility: {
          title: '1. شروط الاسترجاع',
          content: 'يحق لك طلب استرجاع الأموال خلال 30 يومًا من تاريخ الشراء إذا كان المنتج غير مستخدم وفي حالته الأصلية.'
        },
        refundProcess: {
          title: '2. عملية الاسترجاع',
          content: 'للمطالبة باسترجاع الأموال، يجب عليك التواصل مع فريق خدمة العملاء مع تقديم إثبات الشراء والمنتج أو الخدمة.'
        },
        refundTimeline: {
          title: '3. مهلة الاسترجاع',
          content: 'سيتم معالجة طلب الاسترجاع خلال 7-10 أيام عمل من تاريخ موافقتنا على الطلب.'
        },
        cancellation: {
          title: '4. إلغاء الطلبات',
          content: 'يمكنك إلغاء الطلب خلال 24 ساعة من تاريخ تقديمه بدون أي رسوم إضافية.'
        },
        partialRefund: {
          title: '5. الاسترجاع الجزئي',
          content: 'في حالة التعديلات أو الأضرار الناجمة عن سوء الاستخدام، قد نقدم استرجاعًا جزئيًا.'
        },
        nonRefundable: {
          title: '6. الخدمات غير قابلة للاسترجاع',
          content: 'الخدمات المخصصة والمواد المستخرجة بناءً على الطلب غير قابلة للاسترجاع.'
        },
        shippingRefunds: {
          title: '7. رسوم الشحن',
          content: 'رسوم الشحن قابلة للاسترجاع فقط في حالة العيب في المنتج أو الخطأ من طرفنا.'
        },
        contact: {
          title: '8. اتصل بنا',
          content: 'لأي استفسارات حول سياسة الاسترجاع، يرجى التواصل معنا عبر البريد الإلكتروني أو الهاتف.'
        }
      }
    },
    en: {
      title: 'Refund & Cancellation Policy',
      lastUpdated: 'Last Updated:',
      introduction: 'This Refund and Cancellation Policy outlines your rights and responsibilities regarding order cancellations and refunds from Al-Azab Construction Company.',
      sections: {
        refundEligibility: {
          title: '1. Refund Eligibility',
          content: 'You have the right to request a refund within 30 days of purchase if the product is unused and in its original condition.'
        },
        refundProcess: {
          title: '2. Refund Process',
          content: 'To claim a refund, you must contact our customer service team with proof of purchase and the product or service details.'
        },
        refundTimeline: {
          title: '3. Refund Timeline',
          content: 'Refund requests will be processed within 7-10 business days from the date of our approval.'
        },
        cancellation: {
          title: '4. Order Cancellation',
          content: 'You can cancel an order within 24 hours of placement without any additional fees.'
        },
        partialRefund: {
          title: '5. Partial Refunds',
          content: 'In case of modifications or damages due to misuse, we may offer a partial refund.'
        },
        nonRefundable: {
          title: '6. Non-Refundable Services',
          content: 'Custom services and materials extracted based on order requests are non-refundable.'
        },
        shippingRefunds: {
          title: '7. Shipping Fees',
          content: 'Shipping fees are refundable only in case of product defect or error on our part.'
        },
        contact: {
          title: '8. Contact Us',
          content: 'For any questions about our refund policy, please contact us via email or phone.'
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
