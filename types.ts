export type Language = 'ar' | 'en' | 'hi';

export interface AgencyFormData {
  agencyName: string;
  agentId: string;
  country: string;
  whatsapp: string;
  adminName: string;
  adminId: string;
}

export interface FormError {
  field: keyof AgencyFormData;
  message: string;
}

export interface AppConfig {
  siteTitle: string;
  siteSubtitle: string;
  bannerImage: string;
  backgroundImage: string;
  logoImage: string | null;
  contactWhatsapp: string;
  contactEmail: string;
  adminPassword: string;
  customFooterText: string; // New field for footer text override
  showFields: {
    agencyName: boolean;
    agentId: boolean;
    country: boolean;
    whatsapp: boolean;
    adminName: boolean;
    adminId: boolean;
  };
}