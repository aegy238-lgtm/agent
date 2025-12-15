import React from 'react';
import { AppConfig, Language } from '../types';
import { translations } from '../utils/translations';
import { ARAB_COUNTRIES } from '../utils/countries';
import { Save, Upload, Layout, Type, Eye, Image as ImageIcon, X, Mail, MessageCircle, Lock, Key } from 'lucide-react';

interface AdminPanelProps {
  config: AppConfig;
  onUpdate: (newConfig: AppConfig) => void;
  onClose: () => void;
  lang?: Language;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ config, onUpdate, onClose, lang = 'ar' }) => {
  const t = translations[lang];
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onUpdate({ ...config, [e.target.name]: e.target.value });
  };

  const handleToggleField = (field: keyof AppConfig['showFields']) => {
    onUpdate({
      ...config,
      showFields: {
        ...config.showFields,
        [field]: !config.showFields[field]
      }
    });
  };

  const handleImageUpload = (key: 'bannerImage' | 'backgroundImage' | 'logoImage', file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ ...config, [key]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const fieldLabels: Record<keyof AppConfig['showFields'], string> = {
    agencyName: translations[lang].agencyName,
    country: translations[lang].country,
    agentId: translations[lang].agentId,
    whatsapp: translations[lang].whatsapp,
    adminName: translations[lang].adminName,
    adminId: translations[lang].adminId
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex justify-end transition-opacity animate-fade-in" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md bg-white h-[100dvh] shadow-2xl overflow-y-auto transform transition-transform animate-slide-in-right flex flex-col">
        
        {/* Header */}
        <div className="bg-gray-900 text-white p-6 flex justify-between items-center sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <Layout className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">{t.adminPanelTitle}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8 flex-grow">
          
          {/* Section 1: Security */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
              <Lock className="w-5 h-5 text-red-600" />
              {t.securitySection}
            </h3>
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Key className="w-4 h-4 text-gray-500" />
                {t.changePassword}
              </label>
              <input
                type="text"
                name="adminPassword"
                value={config.adminPassword}
                onChange={handleTextChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 bg-white"
                dir="ltr"
              />
              <p className="text-xs text-gray-500 mt-2">
                * {t.currentPassword} <span className="font-mono bg-gray-200 px-1 rounded">{config.adminPassword}</span>
              </p>
            </div>
          </section>

          {/* Section 2: Basic Info */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
              <Type className="w-5 h-5 text-blue-600" />
              النصوص والعناوين
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الموقع الرئيسي</label>
                <input
                  type="text"
                  name="siteTitle"
                  value={config.siteTitle}
                  onChange={handleTextChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">العنوان الفرعي</label>
                <input
                  type="text"
                  name="siteSubtitle"
                  value={config.siteSubtitle}
                  onChange={handleTextChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.footerTextLabel}</label>
                <input
                  type="text"
                  name="customFooterText"
                  value={config.customFooterText || ''}
                  onChange={handleTextChange}
                  placeholder={t.footer}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Contact Info */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
              <MessageCircle className="w-5 h-5 text-green-600" />
              بيانات الاستلام (الإدارة)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.defaultCountryCodeLabel}</label>
                <select
                  name="defaultCountryCode"
                  value={config.defaultCountryCode}
                  onChange={handleTextChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
                  dir="ltr"
                >
                  {ARAB_COUNTRIES.map((country) => (
                    <option key={country.code} value={country.dial_code.replace('+', '')}>
                      {country.flag} {country.name} ({country.dial_code})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">يتم تحديده كافتراضي للمستخدم في الصفحة الرئيسية.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الواتساب لاستقبال الطلبات</label>
                <input
                  type="text"
                  name="contactWhatsapp"
                  value={config.contactWhatsapp || ''}
                  onChange={handleTextChange}
                  placeholder="مثال: 966500000000"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني لاستقبال الطلبات</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={config.contactEmail || ''}
                  onChange={handleTextChange}
                  placeholder="admin@example.com"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  dir="ltr"
                />
              </div>
            </div>
          </section>

          {/* Section 4: Images */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
              <ImageIcon className="w-5 h-5 text-purple-600" />
              الصور والخلفيات
            </h3>
            
            {/* Site Background */}
            <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
              <label className="block text-sm font-medium text-gray-700 mb-2">خلفية الموقع بالكامل</label>
              <div className="flex items-center gap-4">
                {config.backgroundImage && (
                  <img src={config.backgroundImage} className="w-16 h-16 object-cover rounded-lg border" alt="Background" />
                )}
                <label className="cursor-pointer flex items-center gap-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">رفع صورة</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('backgroundImage', e.target.files?.[0])} />
                </label>
              </div>
            </div>

            {/* Banner Image */}
            <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
              <label className="block text-sm font-medium text-gray-700 mb-2">صورة البنر العلوي</label>
              <div className="flex items-center gap-4">
                <img src={config.bannerImage} className="w-16 h-16 object-cover rounded-lg border" alt="Banner" />
                <label className="cursor-pointer flex items-center gap-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">تغيير البنر</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('bannerImage', e.target.files?.[0])} />
                </label>
              </div>
            </div>
            
             {/* Logo Image */}
             <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
              <label className="block text-sm font-medium text-gray-700 mb-2">الشعار (اللوجو)</label>
              <div className="flex items-center gap-4">
                {config.logoImage ? (
                  <img src={config.logoImage} className="w-16 h-16 object-contain rounded-lg border bg-gray-200" alt="Logo" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">لا يوجد</div>
                )}
                <label className="cursor-pointer flex items-center gap-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Upload className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">تغيير الشعار</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('logoImage', e.target.files?.[0])} />
                </label>
              </div>
            </div>
          </section>

          {/* Section 5: Visibility */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
              <Eye className="w-5 h-5 text-green-600" />
              إخفاء / إظهار العناصر
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {(Object.keys(config.showFields) as Array<keyof AppConfig['showFields']>).map((field) => (
                <div key={field} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">{fieldLabels[field]}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={config.showFields[field]}
                      onChange={() => handleToggleField(field)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t sticky bottom-0 shrink-0">
           <button 
             onClick={onClose}
             className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95"
           >
             <Save className="w-5 h-5" />
             حفظ وإغلاق
           </button>
        </div>

      </div>
    </div>
  );
};