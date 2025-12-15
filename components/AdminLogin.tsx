import React, { useState } from 'react';
import { translations } from '../utils/translations';
import { Language } from '../types';
import { Lock, X } from 'lucide-react';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => boolean;
  lang: Language;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onLogin, lang }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const t = translations[lang];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (success) {
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
        <div className="bg-gray-900 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-lg">{t.loginTitle}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.passwordLabel}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`
                w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition-all
                ${error 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50 text-red-900' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }
              `}
              placeholder={t.passwordPlaceholder}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 font-medium animate-pulse">
                {t.wrongPassword}
              </p>
            )}
          </div>
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              {t.cancelButton}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-transform active:scale-95 shadow-lg shadow-blue-500/30"
            >
              {t.loginButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};