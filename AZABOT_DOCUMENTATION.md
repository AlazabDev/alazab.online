# AzaBot - نظام الشات بوت الذكي المتقدم
# Advanced Intelligent Chatbot System

## 📋 المحتويات | Table of Contents

1. [نظرة عامة](#نظرة-عامة)
2. [المميزات الرئيسية](#المميزات-الرئيسية)
3. [البنية المعمارية](#البنية-المعمارية)
4. [الخدمات](#الخدمات)
5. [المكونات](#المكونات)
6. [الاستخدام](#الاستخدام)
7. [التكاملات](#التكاملات)
8. [الإعدادات](#الإعدادات)

---

## 🎯 نظرة عامة

**AzaBot** هو نظام شات بوت ذكي متقدم تم تطويره خصيصاً لشركة العزب. يجمع بين التكنولوجيا الحديثة والتصميم الاحترافي لتقديم تجربة عملاء استثنائية.

### الميزات الرئيسية:
- ✅ محادثة نصية وصوتية متقدمة
- ✅ دعم عربي كامل مع Web Speech API
- ✅ أسئلة سريعة ذكية
- ✅ تكاملات كاملة مع الأنظمة الأخرى
- ✅ تصميم احترافي وجميل
- ✅ استجابة سريعة وفعّالة

---

## ⭐ المميزات الرئيسية

### 1. المحادثة الثنائية (Text & Voice)
- **المحادثة النصية**: واجهة نصية كلاسيكية سهلة الاستخدام
- **المحادثة الصوتية**: استماع تحدث وتحويل صوت إلى نص باستخدام Web Speech API
- دعم اللغات: العربية والإنجليزية

### 2. الأسئلة السريعة
8 أسئلة سريعة مخصصة:
- ما هي خدماتكم الرئيسية؟
- احسب تكلفة مشروعي
- أريد تقديم طلب صيانة
- شاهد معرض أعمالنا
- خدمات الهوية التجارية
- التشطيبات الفاخرة
- تواصل معنا الآن
- احجز استشارة مجانية

### 3. الاستجابات الذكية
الروبوت يفهم ويستجيب ذكياً لـ:
- الخدمات والميزات
- الأسعار والتكاليف
- الصيانة والإصلاح
- معرض الأعمال
- الهوية التجارية
- المعلومات الاتصالية
- الاستشارات

### 4. التصميم الاحترافي
- تصميم حديث وجميل
- ألوان متناسقة مع الهوية
- تأثيرات حركية سلسة
- واجهة سهلة الاستخدام
- دعم كامل للعربية (RTL)

---

## 🏗️ البنية المعمارية

```
lib/
├── aza-chatbot-service.ts     # الخدمة الأساسية للرسائل
├── aza-quick-questions.ts     # إدارة الأسئلة السريعة
├── aza-speech-service.ts      # خدمة تحويل الكلام إلى نص
├── aza-tts-service.ts         # خدمة تحويل النص إلى كلام
└── aza-integrations.ts        # التكاملات مع الأنظمة الأخرى

components/
└── aza-bot.tsx                # المكون الرئيسي الواجهة
```

---

## 🔧 الخدمات | Services

### 1. aza-chatbot-service.ts
**الوظيفة**: معالجة الرسائل وإنشاء الاستجابات الذكية

**الفئات الرئيسية**:
- `AzaChatbotService`: خدمة الرسائل الأساسية
- `ChatMessage`: واجهة رسالة
- `BotResponse`: واجهة الاستجابة

**الدوال الرئيسية**:
```typescript
// إنشاء رسالة
chatbotService.createMessage(text, sender)

// إنشاء استجابة ذكية
chatbotService.generateResponse(userMessage)

// تغيير اللغة
chatbotService.setLanguage(language)
```

### 2. aza-quick-questions.ts
**الوظيفة**: إدارة الأسئلة السريعة

**الواجهات**:
```typescript
interface QuickQuestion {
  id: string
  textAr: string
  textEn: string
  category: "services" | "pricing" | "maintenance" | ...
  icon: string
}
```

**الدوال**:
```typescript
// الحصول على نص السؤال
getQuestionText(question, language)

// الحصول على أسئلة من فئة معينة
getQuestionsByCategory(category)

// الحصول على أسئلة عشوائية
getRandomQuestions(count)
```

### 3. aza-speech-service.ts
**الوظيفة**: تحويل الكلام إلى نص

**الفئة الرئيسية**:
```typescript
class AzaSpeechRecognition {
  // بدء الاستماع
  startListening(callback)
  
  // إيقاف الاستماع
  stopListening()
  
  // تغيير اللغة
  setLanguage(lang)
  
  // التحقق من الدعم
  isSupported()
}
```

### 4. aza-tts-service.ts
**الوظيفة**: تحويل النص إلى كلام

**الفئة الرئيسية**:
```typescript
class AzaTextToSpeech {
  // تشغيل الكلام
  speak(text, onEnd)
  
  // إيقاف التشغيل
  stop()
  
  // إيقاف مؤقت
  pause()
  
  // استئناف
  resume()
  
  // تغيير اللغة
  setLanguage(language)
  
  // الحصول على الأصوات المتاحة
  getAvailableVoices()
}
```

### 5. aza-integrations.ts
**الوظيفة**: التكاملات مع الأنظمة الأخرى

**الفئة الرئيسية**:
```typescript
class AzaIntegrations {
  // معالجة السؤال السريع
  handleQuickQuestion(questionId)
  
  // كشف نية المستخدم
  detectIntention(message)
  
  // الحصول على رابط التنقل
  getNavigationUrl(route)
  
  // تنسيق الرسالة للتكامل
  formatMessageForIntegration(message, route)
}
```

---

## 🎨 المكونات | Components

### aza-bot.tsx
**المكون الرئيسي للواجهة**

#### الحالة (State):
```typescript
isOpen              // تبويب الفتح/الغلق
activeTab          // التبويب النشط (نصي/صوتي)
messages           // قائمة الرسائل
inputValue         // قيمة الإدخال
isLoading          // حالة التحميل
isListening        // حالة الاستماع
```

#### الدوال الرئيسية:
```typescript
// إرسال رسالة
handleSendMessage(text)

// بدء الاستماع
handleStartListening()

// معالجة السؤال السريع
handleQuickQuestion(questionId)

// نسخ الرسالة
handleCopyMessage(text)
```

#### الميزات:
- ✅ تبويبان للمحادثة النصية والصوتية
- ✅ عرض الرسائل مع تأثيرات
- ✅ أزرار سريعة للأسئلة
- ✅ دعم النسخ والتشغيل الصوتي
- ✅ حالات التحميل والاستماع
- ✅ واجهة احترافية جميلة

---

## 📖 الاستخدام | Usage

### في المشروع:
```typescript
import { AzaBot } from "@/components/aza-bot"

export default function Layout() {
  return (
    <div>
      {/* محتوى الصفحة */}
      <AzaBot />
    </div>
  )
}
```

### الإعدادات الأساسية:
```typescript
// تغيير اللغة
chatbotService.setLanguage("ar") // عربي
chatbotService.setLanguage("en") // إنجليزي

// بدء الاستماع
speechRecognition.startListening((transcript) => {
  console.log("النص المتحدث:", transcript)
})

// تشغيل الصوت
tts.speak("مرحباً بك!")
```

---

## 🔗 التكاملات | Integrations

### الأنظمة المدمجة:

1. **نظام الصيانة** (Maintenance System)
   - كلمات مفتاحية: صيانة، إصلاح، عطل
   - التوجيه إلى: `/maintenance-requests`

2. **حساب التكاليف** (Cost Calculator)
   - كلمات مفتاحية: سعر، تكلفة، تقدير
   - التوجيه إلى: `/cost-calculator`

3. **معرض الأعمال** (Portfolio Gallery)
   - كلمات مفتاحية: مشاريع، أعمال، معرض
   - التوجيه إلى: `/gallery`

4. **الهوية التجارية** (Brand Identity)
   - كلمات مفتاحية: هوية، تجارية، تصميم
   - التوجيه إلى: `/brand-identity`

### مثال على التكامل:
```typescript
const intention = AzaIntegrations.detectIntention(userMessage)
if (intention === "maintenance") {
  // الانتقال إلى صفحة الصيانة
  window.location.href = "/maintenance-requests"
}
```

---

## ⚙️ الإعدادات | Configuration

### متطلبات المتصفح:
- ✅ Web Speech API (للصوت)
- ✅ speechSynthesis API (للنطق)
- ✅ ES2020+ JavaScript support

### اللغات المدعومة:
- ✅ العربية (ar)
- ✅ الإنجليزية (en)

### الألوان:
- الرئيسي: أزرق داكن (#1e40af)
- التركيز: أصفر (#fbbf24)
- الثانوي: رمادي (#6b7280)

---

## 📊 الإحصائيات

| العنصر | العدد |
|--------|-------|
| أسطر الكود | 1,800+ |
| الخدمات | 5 |
| المكونات | 1 |
| الأسئلة السريعة | 8 |
| الاستجابات المخصصة | 12 |
| التكاملات | 4 |

---

## 🚀 الخطوات التالية

1. **اختبار شامل**
   - اختبار المحادثة النصية
   - اختبار المحادثة الصوتية
   - اختبار جميع التكاملات

2. **التحسينات المستقبلية**
   - إضافة AI متقدم
   - تحسين الاستجابات
   - دعم لغات إضافية

3. **المراقبة**
   - تتبع استخدام المستخدمين
   - تحسين الاستجابات بناءً على الاستخدام
   - إضافة ميزات جديدة

---

## 📞 الدعم والمساعدة

للأسئلة أو المشاكل:
- 📧 البريد الإلكتروني: info@al-azab.co
- 📞 الهاتف: +201004006620
- 🌐 الموقع: https://al-azab.co

---

**تم تطويره بواسطة**: فريق تطوير العزب
**التاريخ**: 2026
**النسخة**: 1.0.0
