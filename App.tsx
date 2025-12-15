import React, { useState, useEffect, useRef } from 'react';
import { AgencyFormData, FormError, AppConfig, Language } from './types';
import { translations } from './utils/translations';
import { InputField } from './components/InputField';
import { SubmissionResult } from './components/SubmissionResult';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { generateFormalRequest } from './services/geminiService';
import { db } from './services/firebase';
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Building2, 
  User, 
  Globe, 
  Phone, 
  UserCog, 
  Hash, 
  Send,
  Loader2,
  Sparkles,
  Settings,
  Languages
} from 'lucide-react';

const initialData: AgencyFormData = {
  agencyName: '',
  agentId: '',
  country: '',
  whatsapp: '',
  adminName: '',
  adminId: ''
};

// Default Configuration
const DEFAULT_CONFIG: AppConfig = {
  siteTitle: 'طلب فتح وكالة جديدة',
  siteSubtitle: 'بوابة الاعتماد الرسمية للوكلاء - قم بتعبئة البيانات للبدء',
  bannerImage: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop",
  backgroundImage: '',
  logoImage: null,
  contactWhatsapp: '',
  contactEmail: '',
  adminPassword: '123456', // Default Password
  customFooterText: '', 
  showFields: {
    agencyName: true,
    agentId: true,
    country: true,
    whatsapp: true,
    adminName: true,
    adminId: true,
  }
};

function App() {
  // Config state
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [lang, setLang] = useState<Language>('ar');
  const t = translations[lang];

  // Form states
  const [formData, setFormData] = useState<AgencyFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof AgencyFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  
  // Auth States
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load Config from Firebase on Mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, "settings", "appConfig");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setConfig(docSnap.data() as AppConfig);
        } else {
          // If no config exists in DB, save default
          await setDoc(docRef, DEFAULT_CONFIG);
          setConfig(DEFAULT_CONFIG);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
        // Fallback to local storage if Firebase fails
        const saved = localStorage.getItem('agencyAppConfig');
        if (saved) setConfig(JSON.parse(saved));
      } finally {
        setLoadingConfig(false);
      }
    };

    fetchConfig();
  }, []);

  // Debounced Save Config to Firebase
  useEffect(() => {
    if (loadingConfig) return;

    const saveTimeout = setTimeout(async () => {
      try {
        const docRef = doc(db, "settings", "appConfig");
        await setDoc(docRef, config);
        // Also keep local storage as backup
        localStorage.setItem('agencyAppConfig', JSON.stringify(config));
      } catch (error) {
        console.error("Error saving config:", error);
      }
    }, 1000); // Debounce for 1 second to avoid too many writes while typing

    return () => clearTimeout(saveTimeout);
  }, [config, loadingConfig]);

  // Update document direction based on language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AgencyFormData, string>> = {};
    
    if (config.showFields.agencyName && !formData.agencyName.trim()) newErrors.agencyName = t.required;
    if (config.showFields.agentId && !formData.agentId.trim()) newErrors.agentId = t.required;
    if (config.showFields.country && !formData.country.trim()) newErrors.country = t.required;
    if (config.showFields.whatsapp && !formData.whatsapp.trim()) newErrors.whatsapp = t.required;
    if (config.showFields.adminName && !formData.adminName.trim()) newErrors.adminName = t.required;
    if (config.showFields.adminId && !formData.adminId.trim()) newErrors.adminId = t.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof AgencyFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // 1. Generate Letter AI
      const letter = await generateFormalRequest(formData, lang);
      setGeneratedLetter(letter);

      // 2. Save Request to Firebase
      try {
        await addDoc(collection(db, "requests"), {
          ...formData,
          letter: letter,
          createdAt: serverTimestamp(),
          status: 'pending',
          language: lang
        });
      } catch (dbError) {
        console.error("Error saving to DB:", dbError);
        // Continue even if saving fails, user still sees the letter
      }

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Error processing request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData(initialData);
    setGeneratedLetter('');
    setErrors({});
  };

  // Auth Handlers
  const handleSettingsClick = () => {
    if (isAuthenticated) {
      setShowAdminPanel(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = (password: string) => {
    if (password === config.adminPassword) {
      setIsAuthenticated(true);
      setShowLogin(false);
      setShowAdminPanel(true);
      return true;
    }
    return false;
  };

  const displayTitle = config.siteTitle === DEFAULT_CONFIG.siteTitle ? t.title : config.siteTitle;
  const displaySubtitle = config.siteSubtitle === DEFAULT_CONFIG.siteSubtitle ? t.subtitle : config.siteSubtitle;

  if (loadingConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen pb-8 md:pb-12 transition-all duration-300 bg-gray-50 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ 
        backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : 'none',
      }}
    >
      {/* Controls Container (Admin + Language) */}
      <div className="fixed top-4 z-50 flex gap-3 px-4 w-full justify-between pointer-events-none">
        {/* Admin Button (Pointer events auto to enable click) */}
        <div className="pointer-events-auto">
          <button 
            onClick={handleSettingsClick}
            className="bg-black/30 backdrop-blur-md p-2 md:p-3 rounded-full text-white hover:bg-black/50 transition-all shadow-lg hover:rotate-90 duration-500 border border-white/20"
            title={t.adminPanelTitle || "Admin"}
          >
            <Settings className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Language Switcher */}
        <div className="pointer-events-auto flex gap-2 bg-black/30 backdrop-blur-md p-1.5 rounded-full border border-white/20">
          <button 
            onClick={() => setLang('ar')} 
            className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${lang === 'ar' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/10'}`}
          >
            عربي
          </button>
          <button 
            onClick={() => setLang('en')} 
            className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${lang === 'en' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/10'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLang('hi')} 
            className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${lang === 'hi' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/10'}`}
          >
            हिंदी
          </button>
        </div>
      </div>

      <AdminLogin 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
        lang={lang}
      />

      {showAdminPanel && (
        <AdminPanel 
          config={config} 
          onUpdate={setConfig} 
          onClose={() => setShowAdminPanel(false)}
          lang={lang}
        />
      )}

      {/* Top Banner Area */}
      <div className="relative h-60 md:h-72 w-full bg-gray-900 overflow-hidden shadow-2xl">
        <img 
          src={config.bannerImage} 
          alt="Agency Cover" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        
        {/* Banner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 pt-8 md:pt-10">
          
          <div className="bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-2xl mb-3 md:mb-4 shadow-xl border border-white/20">
            {config.logoImage ? (
              <img 
                src={config.logoImage} 
                alt="Agency Logo" 
                className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-lg" 
              />
            ) : (
              <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16">
                <Building2 className="w-8 h-8 md:w-12 md:h-12 text-blue-300" />
              </div>
            )}
          </div>

          <h1 className="text-2xl md:text-5xl font-extrabold text-center mb-2 md:mb-3 drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 px-2 leading-tight">
            {displayTitle}
          </h1>
          <p className="text-sm md:text-lg text-blue-50 opacity-90 max-w-2xl text-center font-medium drop-shadow-md px-4">
            {displaySubtitle}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 relative z-10 -mt-12 md:-mt-16">
        {!isSuccess ? (
          // Dark Glassmorphism Container
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-white/10 ring-1 ring-white/10">
             <div className="h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 w-full opacity-80"></div>
             {/* Form */}
             <form onSubmit={handleSubmit} className="p-5 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                  
                  {/* Agency Section */}
                  {(config.showFields.agencyName || config.showFields.country) && (
                    <div className="md:col-span-2">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-3 pb-2 border-b border-white/10">
                        <div className="bg-yellow-500/20 p-2 rounded-lg backdrop-blur-sm">
                          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
                        </div>
                        {t.agencyInfo}
                      </h3>
                    </div>
                  )}

                  {config.showFields.agencyName && (
                    <InputField
                      label={t.agencyName}
                      name="agencyName"
                      value={formData.agencyName}
                      onChange={handleChange}
                      error={errors.agencyName}
                      placeholder={t.agencyNamePlaceholder}
                      icon={<Building2 className="w-4 h-4" />}
                    />
                  )}

                  {config.showFields.country && (
                    <InputField
                      label={t.country}
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      error={errors.country}
                      placeholder={t.countryPlaceholder}
                      icon={<Globe className="w-4 h-4" />}
                    />
                  )}

                  {/* Agent Section */}
                  {(config.showFields.agentId || config.showFields.whatsapp) && (
                    <div className="md:col-span-2 mt-2 md:mt-4">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-3 pb-2 border-b border-white/10">
                        <div className="bg-blue-500/20 p-2 rounded-lg backdrop-blur-sm">
                          <User className="w-4 h-4 md:w-5 md:h-5 text-blue-300" />
                        </div>
                        {t.agentInfo}
                      </h3>
                    </div>
                  )}

                  {config.showFields.agentId && (
                    <InputField
                      label={t.agentId}
                      name="agentId"
                      value={formData.agentId}
                      onChange={handleChange}
                      error={errors.agentId}
                      placeholder={t.agentIdPlaceholder}
                      icon={<Hash className="w-4 h-4" />}
                    />
                  )}

                  {config.showFields.whatsapp && (
                    <InputField
                      label={t.whatsapp}
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      error={errors.whatsapp}
                      placeholder={t.whatsappPlaceholder}
                      type="tel"
                      icon={<Phone className="w-4 h-4" />}
                    />
                  )}

                  {/* Admin Section */}
                  {(config.showFields.adminName || config.showFields.adminId) && (
                    <div className="md:col-span-2 mt-2 md:mt-4">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-3 pb-2 border-b border-white/10">
                        <div className="bg-indigo-500/20 p-2 rounded-lg backdrop-blur-sm">
                          <UserCog className="w-4 h-4 md:w-5 md:h-5 text-indigo-300" />
                        </div>
                        {t.adminInfo}
                      </h3>
                    </div>
                  )}

                  {config.showFields.adminName && (
                    <InputField
                      label={t.adminName}
                      name="adminName"
                      value={formData.adminName}
                      onChange={handleChange}
                      error={errors.adminName}
                      placeholder={t.adminNamePlaceholder}
                      icon={<User className="w-4 h-4" />}
                    />
                  )}

                  {config.showFields.adminId && (
                    <InputField
                      label={t.adminId}
                      name="adminId"
                      value={formData.adminId}
                      onChange={handleChange}
                      error={errors.adminId}
                      placeholder={t.adminIdPlaceholder}
                      icon={<Hash className="w-4 h-4" />}
                    />
                  )}
                </div>

                <div className="mt-8 md:mt-10 pt-6 border-t border-white/10 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      w-full md:w-auto justify-center
                      flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-white shadow-xl text-lg
                      transform transition-all duration-200 hover:-translate-y-1 active:scale-95
                      ${isSubmitting 
                        ? 'bg-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-2xl hover:shadow-blue-900/50'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        {t.processing}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 ml-1 rtl:ml-1 ltr:mr-1" />
                        {t.submit}
                      </>
                    )}
                  </button>
                </div>
             </form>
          </div>
        ) : (
          <SubmissionResult 
            data={formData} 
            generatedLetter={generatedLetter}
            config={config}
            onReset={handleReset}
            lang={lang}
          />
        )}

        <div className="mt-8 md:mt-12 text-center pb-6">
          <p className="text-blue-100 font-medium text-xs md:text-sm shadow-lg backdrop-blur-md bg-black/20 border border-white/10 inline-block px-4 py-1.5 rounded-full">
            {config.customFooterText || t.footer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;