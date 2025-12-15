import { Language } from '../types';

export const translations = {
  ar: {
    title: "طلب فتح وكالة جديدة",
    subtitle: "بوابة الاعتماد الرسمية للوكلاء - قم بتعبئة البيانات للبدء",
    agencyInfo: "بيانات الوكالة",
    agentInfo: "بيانات المالك (الوكيل)",
    adminInfo: "بيانات المسؤول (الآدمن)",
    
    agencyName: "اسم الوكالة",
    agencyNamePlaceholder: "اكتب اسم الوكالة هنا...",
    country: "البلد / الدولة",
    countryPlaceholder: "مثال: المملكة العربية السعودية",
    
    agentId: "آيدي الوكيل (ID)",
    agentIdPlaceholder: "الرقم التعريفي للوكيل",
    whatsapp: "رقم الواتساب",
    whatsappPlaceholder: "مثال: 966500000000",
    
    adminName: "اسم الادمن",
    adminNamePlaceholder: "اسم المسؤول الإداري",
    adminId: "آيدي الادمن (ID)",
    adminIdPlaceholder: "الرقم التعريفي للادمن",
    
    submit: "إرسال طلب الاعتماد",
    processing: "جاري المعالجة...",
    
    successTitle: "تم تجهيز الطلب بنجاح",
    successMessage: "شكراً لك. تم إنشاء خطاب الاعتماد.",
    letterTitle: "خطاب الطلب الرسمي",
    copy: "نسخ النص",
    copied: "تم نسخ الخطاب الحافظة!",
    sendWhatsapp: "إرسال عبر الواتساب",
    sendEmail: "إرسال عبر البريد",
    newRequest: "تسجيل طلب جديد",
    
    required: "مطلوب",
    footer: "© 2024 نظام تسجيل الوكالات. جميع الحقوق محفوظة.",
    adminPanelTitle: "لوحة التحكم",
    
    // Auth Translations
    loginTitle: "تسجيل دخول المسؤول",
    passwordLabel: "كلمة المرور",
    passwordPlaceholder: "أدخل كلمة المرور...",
    loginButton: "دخول",
    cancelButton: "إلغاء",
    wrongPassword: "كلمة المرور غير صحيحة",
    securitySection: "الأمان وكلمة المرور",
    changePassword: "تغيير كلمة المرور",
    currentPassword: "الحالية: ",
    
    footerTextLabel: "نص التذييل (حقوق النشر)",
    defaultCountryCodeLabel: "كود الدولة الافتراضي (للواتساب)",
    defaultCountryCodePlaceholder: "مثال: 966",
    
    whatsappFooter: "عزيزي الوكيل، تم استلام طلبك مبدئياً. يرجى انتظار تفعيل الوكالة، وسيتم التواصل معكم لإنشاء مجموعة عمل لاستكمال باقي الإجراءات والبيانات.",
    whatsappPreview: "معاينة الرسالة التي سيتم إرسالها"
  },
  en: {
    title: "New Agency Registration",
    subtitle: "Official Agency Accreditation Portal - Fill in the details to start",
    agencyInfo: "Agency Information",
    agentInfo: "Owner (Agent) Information",
    adminInfo: "Admin Information",
    
    agencyName: "Agency Name",
    agencyNamePlaceholder: "Enter agency name here...",
    country: "Country",
    countryPlaceholder: "Ex: Saudi Arabia",
    
    agentId: "Agent ID",
    agentIdPlaceholder: "Agent's unique ID",
    whatsapp: "WhatsApp Number",
    whatsappPlaceholder: "Ex: 966500000000",
    
    adminName: "Admin Name",
    adminNamePlaceholder: "Administrative official name",
    adminId: "Admin ID",
    adminIdPlaceholder: "Admin's unique ID",
    
    submit: "Submit Accreditation Request",
    processing: "Processing...",
    
    successTitle: "Request Prepared Successfully",
    successMessage: "Thank you. The accreditation letter has been generated.",
    letterTitle: "Official Request Letter",
    copy: "Copy Text",
    copied: "Letter copied to clipboard!",
    sendWhatsapp: "Send via WhatsApp",
    sendEmail: "Send via Email",
    newRequest: "New Request",
    
    required: "Required",
    footer: "© 2024 Agency Registration System. All rights reserved.",
    adminPanelTitle: "Admin Panel",

    // Auth Translations
    loginTitle: "Admin Login",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password...",
    loginButton: "Login",
    cancelButton: "Cancel",
    wrongPassword: "Incorrect password",
    securitySection: "Security & Password",
    changePassword: "Change Password",
    currentPassword: "Current: ",
    
    footerTextLabel: "Footer Copyright Text",
    defaultCountryCodeLabel: "Default Country Code (WhatsApp)",
    defaultCountryCodePlaceholder: "Ex: 966",
    
    whatsappFooter: "Dear Agent, your request has been received. Please wait for agency activation. A group will be created for you to complete the remaining procedures.",
    whatsappPreview: "Preview of the message to be sent"
  },
  hi: {
    title: "नई एजेंसी पंजीकरण",
    subtitle: "आधिकारिक एजेंसी प्रत्यायन पोर्टल - शुरू करने के लिए विवरण भरें",
    agencyInfo: "एजेंसी की जानकारी",
    agentInfo: "मालिक (एजेंट) की जानकारी",
    adminInfo: "प्रशासक (एडमिन) की जानकारी",
    
    agencyName: "एजेंसी का नाम",
    agencyNamePlaceholder: "एजेंसी का नाम यहाँ दर्ज करें...",
    country: "देश",
    countryPlaceholder: "उदाहरण: भारत",
    
    agentId: "एजेंट आईडी",
    agentIdPlaceholder: "एजेंट की विशिष्ट आईडी",
    whatsapp: "व्हाट्सएप नंबर",
    whatsappPlaceholder: "उदाहरण: 919800000000",
    
    adminName: "एडमिन का नाम",
    adminNamePlaceholder: "प्रशासनिक अधिकारी का नाम",
    adminId: "एडमिन आईडी",
    adminIdPlaceholder: "एडमिन की विशिष्ट आईडी",
    
    submit: "प्रत्यायन अनुरोध भेजें",
    processing: "प्रक्रिया चल रही है...",
    
    successTitle: "अनुरोध सफलतापूर्वक तैयार",
    successMessage: "धन्यवाद। प्रत्यायन पत्र तैयार कर लिया गया है।",
    letterTitle: "आधिकारिक अनुरोध पत्र",
    copy: "टेक्स्ट कॉपी करें",
    copied: "पत्र क्लिपबोर्ड पर कॉपी किया गया!",
    sendWhatsapp: "व्हाट्सएप द्वारा भेजें",
    sendEmail: "ईमेल द्वारा भेजें",
    newRequest: "नया अनुरोध",
    
    required: "आवश्यक",
    footer: "© 2024 एजेंसी पंजीकरण प्रणाली। सर्वाधिकार सुरक्षित。",
    adminPanelTitle: "एडमिन पैनल",

    // Auth Translations
    loginTitle: "एडमिन लॉगिन",
    passwordLabel: "पासवर्ड",
    passwordPlaceholder: "पासवर्ड दर्ज करें...",
    loginButton: "लॉगिन",
    cancelButton: "रद्द करें",
    wrongPassword: "गलत पासवर्ड",
    securitySection: "सुरक्षा और पासवर्ड",
    changePassword: "पासवर्ड बदलें",
    currentPassword: "वर्तमान: ",
    
    footerTextLabel: "फुटर कॉपीराइट टेक्स्ट",
    defaultCountryCodeLabel: "डिफ़ॉल्ट देश कोड (व्हाट्सएप)",
    defaultCountryCodePlaceholder: "उदाहरण: 966",
    
    whatsappFooter: "प्रिय एजेंट, आपका अनुरोध प्राप्त हो गया है। कृपया एजेंसी सक्रियण की प्रतीक्षा करें। आपके लिए एक समूह बनाया जाएगा और बाकी प्रक्रिया पूरी की जाएगी।",
    whatsappPreview: "भेजे जाने वाले संदेश का पूर्वावलोकन"
  }
};