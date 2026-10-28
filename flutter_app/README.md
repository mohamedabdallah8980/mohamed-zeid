# ScorePulse Live - Flutter Mobile Application (Android & iOS) ⚽

تطبيق جوال متكامل للنتائج المباشرة والإحصائيات الرياضية مستوحى من 365Scores و SofaScore، مبني بنظام **Flutter (Dart)** مع بنية Clean Architecture و BLoC Cubit.

---

## 🚀 كيفية تشغيل المشروع على VS Code

### 1. المتطلبات:
* تثبيت **Flutter SDK** (إصدار `>= 3.16.0`).
* تثبيت إضافة **Flutter** في VS Code.

### 2. خطوات التشغيل:
```bash
# 1. الدخول إلى مجلد المشروع
cd flutter_app

# 2. تحميل الحزم والاعتماديات
flutter pub get

# 3. تشغيل التطبيق على المحاكي (Android / iOS / Chrome)
flutter run
```

### 3. إعداد مفتاح API:
افتح الملف `lib/core/config/app_config.dart` وضع مفتاحك الخاص من API-Football v3:
```dart
static const String apiKey = 'YOUR_API_KEY_HERE';
```

---

## 🏗️ هيكلية المشروع (Clean Architecture)

* `lib/core/`: الإعدادات، الثيم الداكن، خطوط Inter، شبكة Dio مع Caching تلقائي، والتعريب (عربي RTL وإنجليزي).
* `lib/features/scores/`: شاشة المباريات الرئيسية، شريط التاريخ الأفقي، فلاتر الحالات (مباشر، منتهية، قادمة).
* `lib/features/match_details/`: تفاصيل المباراة، رسم الملعب التكتيكي بـ `CustomPainter` (`PitchPainter`)، وتوزيع اللاعبين بالخطة التكتيكية وتقييمات الأداء.
* `lib/features/standings/`: جدول ترتيب الدوريات مع مناطق الصعود والهبوط وقائمة الهدافين.
* `lib/features/favorites/`: إدارة ومتابعة الأندية والمباريات المفضلة.
* `lib/features/search/`: البحث الفوري مع Debounce عن الفرق والدوريات.
* `lib/features/settings/`: إعدادات اللغة، الوضع الداكن، والإشعارات.
