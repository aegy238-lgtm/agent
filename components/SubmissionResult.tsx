import React from 'react';
import { AgencyFormData, AppConfig, Language } from '../types';
import { CheckCircle, Copy, FileText, Mail, MessageCircle } from 'lucide-react';
import { translations } from '../utils/translations';

interface SubmissionResultProps {
  data: AgencyFormData;
  generatedLetter: string;
  config: AppConfig;
  onReset: () => void;
  lang: Language;
}

export const SubmissionResult: React.FC<SubmissionResultProps> = ({ data, generatedLetter, config, onReset, lang }) => {
  const t = translations[lang];
  const isRTL = lang === 'ar';

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    alert(t.copied);
  };

  const handleWhatsApp = () => {
    if (!config.contactWhatsapp) {
      alert("WhatsApp number not configured.");
      return;
    }

    // Since we now capture the correct country code and number in the form,
    // the data.whatsapp string is already in the format "+966 5XXXXXXXX"
    // We just need to strip the plus sign and spaces for the link.
    const cleanNumber = config.contactWhatsapp.replace(/[^\d]/g, '');

    const message = `*${t.title}*
---------------------------
*${t.agencyName}:* ${data.agencyName}
*${t.country}:* ${data.country}
*${t.agentId}:* ${data.agentId}
*${t.whatsapp}:* ${data.whatsapp}
*${t.adminName}:* ${data.adminName} (ID: ${data.adminId})
---------------------------

*${t.letterTitle}:*
${generatedLetter}

---------------------------
${t.whatsappFooter}`;

    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    if (!config.contactEmail) {
      alert("Email not configured.");
      return;
    }

    const subject = `${t.title}: ${data.agencyName}`;
    const body = `${t.agencyInfo}:
---------------------------
${t.agencyName}: ${data.agencyName}
${t.country}: ${data.country}
${t.agentId}: ${data.agentId}
${t.whatsapp}: ${data.whatsapp}
${t.adminName}: ${data.adminName}
${t.adminId}: ${data.adminId}

---------------------------
${t.letterTitle}:
${generatedLetter}
`;

    const url = `mailto:${config.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-500 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.successTitle}</h2>
        <p className="text-gray-600">{t.successMessage}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-primary-600 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <h3 className="font-bold text-lg">{t.letterTitle}</h3>
          </div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-sm transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>{t.copy}</span>
          </button>
        </div>
        <div className="p-6 bg-gray-50">
          <div className="prose prose-lg max-w-none text-start whitespace-pre-wrap text-gray-800 leading-relaxed font-medium">
            {generatedLetter}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {config.contactWhatsapp && (
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <MessageCircle className="w-6 h-6" />
            {t.sendWhatsapp}
          </button>
        )}
        
        {config.contactEmail && (
          <button
            onClick={handleEmail}
            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <Mail className="w-6 h-6" />
            {t.sendEmail}
          </button>
        )}
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onReset}
          className="text-white/80 hover:text-white font-medium transition-colors bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm"
        >
          {t.newRequest}
        </button>
      </div>
    </div>
  );
};