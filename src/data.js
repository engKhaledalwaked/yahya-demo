import { ref, computed, watchEffect } from 'vue'

const saved = (() => { try { return localStorage.getItem('by-lang') } catch { return null } })()
export const lang = ref(saved === 'en' ? 'en' : 'ar')
watchEffect(() => {
  document.documentElement.lang = lang.value
  document.documentElement.dir = lang.value === 'ar' ? 'rtl' : 'ltr'
  try { localStorage.setItem('by-lang', lang.value) } catch {}
})
export const toggleLang = () => { lang.value = lang.value === 'ar' ? 'en' : 'ar' }
export const tr = (o) => (o && typeof o === 'object' ? o[lang.value] ?? o.ar : o)
export const img = (p) => `/img/${p}`

// خرائط Google + لوحة المكتب
export const site = {
  whatsapp: '966557713177',
  phone: { tel: '+966557713177', label: '055 771 3177' },
  signPhones: [
    { tel: '+966555458729', label: '055 545 8729' },
    { tel: '+966544191147', label: '054 419 1147' },
    { tel: '+966114821925', label: '011 482 1925' },
  ],
  rating: '3.8', reviews: '173',
  maps: 'https://www.google.com/maps/search/?api=1&query=24.6909012,46.6509045',
  mapEmbed: 'https://www.google.com/maps?q=24.6909012,46.6509045&z=17&output=embed',
}
export const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

export const goals = [
  { id: 'rent', t: { ar: 'أبحث عن إيجار', en: 'I want to rent' } },
  { id: 'list', t: { ar: 'أبي أأجّر عقاري', en: 'I want to list my property' } },
  { id: 'manage', t: { ar: 'إدارة أملاكي', en: 'Manage my property' } },
]
export const types = [
  { id: 'apt', icon: 'M5 21V5l7-3 7 3v16zM9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2', t: { ar: 'شقة', en: 'Apartment' } },
  { id: 'floor', icon: 'M3 21V10l9-7 9 7v11zM9 21v-6h6v6', t: { ar: 'دور', en: 'Floor' } },
  { id: 'villa', icon: 'M2 21V11l6-5 6 5v10M14 21V9l4-3 4 3v12M6 15h4', t: { ar: 'فيلا', en: 'Villa' } },
  { id: 'bldg', icon: 'M4 21V3h10v18M14 21V8h6v13M7 7h4M7 11h4M7 15h4', t: { ar: 'عمارة كاملة', en: 'Whole building' } },
  { id: 'shop', icon: 'M3 9l2-5h14l2 5M4 9v12h16V9M3 9h18M9 21v-6h6v6', t: { ar: 'محل تجاري', en: 'Shop' } },
]
export const districts = [
  { id: 'umh', t: { ar: 'أم الحمام', en: 'Umm Al Hamam' } },
  { id: 'olaya', t: { ar: 'العليا', en: 'Al Olaya' } },
  { id: 'sulay', t: { ar: 'السليمانية', en: 'Al Sulimaniyah' } },
  { id: 'muather', t: { ar: 'المعذر', en: 'Al Muather' } },
  { id: 'rahm', t: { ar: 'الرحمانية', en: 'Al Rahmaniyah' } },
  { id: 'any', t: { ar: 'أي حي قريب', en: 'Any nearby' } },
]
export const slots = [
  { id: 'am', t: { ar: 'صباحاً (٩–١٢)', en: 'Morning (9–12)' } },
  { id: 'pm', t: { ar: 'عصراً (٤–٧)', en: 'Afternoon (4–7)' } },
  { id: 'eve', t: { ar: 'مساءً (٧–١٠)', en: 'Evening (7–10)' } },
]

const dict = {
  ar: {
    ribbon: 'نسخة عرض تجريبية — مُعدّة لمكتب بن يحيى للعقارات',
    brand: 'بن يحيى', brandSub: 'للعقارات', brandEn: 'BIN YAHYA REAL ESTATE',
    nav: { find: 'اطلب عقار', owners: 'للملّاك', process: 'كيف نشتغل', reviews: 'آراء', visit: 'المكتب' },
    hero: {
      kicker: 'أم الحمام · الرياض',
      t1: 'سكنك القادم', t2: 'يبدأ من مكتب', t3: 'تعرفه الحارة.',
      lead: 'تأجير شقق وأدوار وعمائر ومحلات، وإدارة أملاك مع متابعة الصيانة — وعقود موثقة عبر منصة إيجار.',
      cta: 'اطلب عقارك', owners: 'عندي عقار',
      ejar: 'عقود موثقة في إيجار', rate: 'تقييم على Google',
    },
    finder: {
      kicker: 'اطلب عقار', title: 'قل لنا وش تبي… ونرشّح لك المتاح',
      goal: 'طلبك', type: 'نوع العقار', district: 'الحي', rooms: 'عدد الغرف', budget: 'الميزانية السنوية (تقريباً)',
      sar: 'ريال', plus: '+', name: 'الاسم', phone: 'الجوال',
      send: 'أرسل الطلب عبر واتساب', required: 'الرجاء كتابة الاسم والجوال.',
      msg: { hello: 'السلام عليكم، عندي طلب عقار', goal: 'الطلب', type: 'النوع', district: 'الحي', rooms: 'الغرف', budget: 'الميزانية السنوية', name: 'الاسم', phone: 'الجوال' },
    },
    owners: {
      kicker: 'للملّاك', title: 'عقارك عندنا… وأنت مرتاح',
      items: [
        { t: 'تسويق وتأجير', d: 'نعرض عقارك على قاعدة عملائنا ونفرز المستأجرين.' },
        { t: 'عقود إيجار موثقة', d: 'توثيق العقد إلكترونياً عبر منصة إيجار لحفظ حق الطرفين.' },
        { t: 'تحصيل ومتابعة', d: 'متابعة الدفعات وتذكير المستأجرين بالمواعيد.' },
        { t: 'صيانة سريعة', d: 'نتابع أعطال السباكة والكهرباء مع الفنيين حتى تنحل.' },
      ],
      cta: 'سجّل عقارك',
    },
    process: {
      kicker: 'كيف نشتغل', title: 'من أول اتصال حتى استلام المفتاح',
      steps: [
        { t: 'ترسل طلبك', d: 'نوع العقار والحي والميزانية.' },
        { t: 'نرشّح ونرتّب المعاينة', d: 'نرسل لك المتاح ونحدد موعد المعاينة.' },
        { t: 'العقد في إيجار', d: 'توثيق العقد ودفع الرسوم عبر المنصة.' },
        { t: 'تستلم المفتاح', d: 'ونبقى معك لأي صيانة أو استفسار.' },
      ],
    },
    callback: {
      title: 'ما لحقت ترد؟ نحن نتصل فيك', lead: 'اختر الوقت المناسب ونرجع لك.',
      slot: 'الوقت المناسب', send: 'اطلب اتصال',
      msg: 'السلام عليكم، أرجو التواصل معي', mSlot: 'الوقت المناسب',
    },
    reviews: { kicker: 'آراء العملاء', title: 'من مراجعات Google', note: 'مقتطفات من مراجعات المكتب على خرائط Google.' },
    visit: {
      kicker: 'المكتب', title: 'شارع أم الحمام',
      addr: 'شارع أم الحمام، حي أم الحمام الشرقي، الرياض 12325',
      hours: [{ d: 'السبت – الخميس', h: '٩:٠٠ ص – ١٠:٠٠ م' }, { d: 'الجمعة', h: '٤:٠٠ م – ١٠:٠٠ م' }],
      dir: 'الاتجاهات', call: 'اتصال', more: 'أرقام المكتب',
    },
    footer: { rights: 'جميع الحقوق محفوظة', demo: 'نسخة عرض تجريبية', also: 'وللمقاولات' },
    sticky: { call: 'اتصال', wa: 'اطلب عقار' },
  },
  en: {
    ribbon: 'Demo preview — prepared for Bin Yahya Real Estate',
    brand: 'Bin Yahya', brandSub: 'Real Estate', brandEn: 'مكتب بن يحيى للعقارات',
    nav: { find: 'Find a property', owners: 'Owners', process: 'How it works', reviews: 'Reviews', visit: 'Office' },
    hero: {
      kicker: 'Umm Al Hamam · Riyadh',
      t1: 'Your next home', t2: 'starts at an office', t3: 'the neighbourhood knows.',
      lead: 'Apartments, floors, whole buildings and shops for rent, plus property management with maintenance follow-up — and contracts registered on Ejar.',
      cta: 'Find your property', owners: 'I own a property',
      ejar: 'Contracts on Ejar', rate: 'Google rating',
    },
    finder: {
      kicker: 'Find a property', title: 'Tell us what you need — we’ll shortlist what’s available',
      goal: 'Request', type: 'Property type', district: 'District', rooms: 'Bedrooms', budget: 'Annual budget (approx.)',
      sar: 'SAR', plus: '+', name: 'Name', phone: 'Mobile',
      send: 'Send request on WhatsApp', required: 'Please enter your name and mobile.',
      msg: { hello: 'Hello, I have a property request', goal: 'Request', type: 'Type', district: 'District', rooms: 'Bedrooms', budget: 'Annual budget', name: 'Name', phone: 'Mobile' },
    },
    owners: {
      kicker: 'Owners', title: 'Leave your property with us — and relax',
      items: [
        { t: 'Marketing & leasing', d: 'We present your property to our client base and screen tenants.' },
        { t: 'Ejar contracts', d: 'Contracts registered electronically on Ejar to protect both sides.' },
        { t: 'Collection & follow-up', d: 'We follow up payments and remind tenants of due dates.' },
        { t: 'Fast maintenance', d: 'We follow plumbing and electrical issues with technicians until solved.' },
      ],
      cta: 'List your property',
    },
    process: {
      kicker: 'How it works', title: 'From the first call to the keys',
      steps: [
        { t: 'Send your request', d: 'Type, district and budget.' },
        { t: 'Shortlist & viewing', d: 'We send what’s available and book a viewing.' },
        { t: 'Contract on Ejar', d: 'Register the contract and pay fees on the platform.' },
        { t: 'Get the keys', d: 'And we stay with you for maintenance or questions.' },
      ],
    },
    callback: {
      title: 'Missed us? We’ll call you', lead: 'Pick a convenient time and we’ll get back to you.',
      slot: 'Preferred time', send: 'Request a call',
      msg: 'Hello, please call me back', mSlot: 'Preferred time',
    },
    reviews: { kicker: 'Reviews', title: 'From Google reviews', note: 'Excerpts from the office’s Google Maps reviews.' },
    visit: {
      kicker: 'Office', title: 'Umm Al Hamam Street',
      addr: 'Umm Al Hamam St., Umm Al Hamam East, Riyadh 12325',
      hours: [{ d: 'Saturday – Thursday', h: '9:00 AM – 10:00 PM' }, { d: 'Friday', h: '4:00 – 10:00 PM' }],
      dir: 'Directions', call: 'Call', more: 'Office numbers',
    },
    footer: { rights: 'All rights reserved', demo: 'Demo preview', also: '& Contracting' },
    sticky: { call: 'Call', wa: 'Find a property' },
  },
}
export const t = computed(() => dict[lang.value])

export const reviews = [
  { n: 'E M', ltr: false, q: 'استأجرت عمارة سكنية لموظفين الشركة وحصل بعض الأعطال بالسباكة وصراحة كانوا متعاونين جداً، وبنفس اليوم تم معالجة العطل. شكراً لكم 🙏🏼' },
  { n: 'MOHAMMED SALEEMUDDIN', ltr: true, q: 'Best real estate office in Um al Hammam.' },
  { n: 'افلاطون بن سقراط', ltr: false, q: 'مكتب متعاون جداً ويملك قاعدة جيدة لكل من يحتاج شقة… أنصح فيه.' },
]
