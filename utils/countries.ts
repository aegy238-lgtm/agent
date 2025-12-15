export interface Country {
  code: string;
  name: string;
  dial_code: string;
  flag: string;
}

export const ARAB_COUNTRIES: Country[] = [
  { code: "SA", name: "المملكة العربية السعودية", dial_code: "+966", flag: "🇸🇦" },
  { code: "EG", name: "مصر", dial_code: "+20", flag: "🇪🇬" },
  { code: "AE", name: "الإمارات العربية المتحدة", dial_code: "+971", flag: "🇦🇪" },
  { code: "KW", name: "الكويت", dial_code: "+965", flag: "🇰🇼" },
  { code: "QA", name: "قطر", dial_code: "+974", flag: "🇶🇦" },
  { code: "BH", name: "البحرين", dial_code: "+973", flag: "🇧🇭" },
  { code: "OM", name: "سلطنة عمان", dial_code: "+968", flag: "🇴🇲" },
  { code: "YE", name: "اليمن", dial_code: "+967", flag: "🇾🇪" },
  { code: "JO", name: "الأردن", dial_code: "+962", flag: "🇯🇴" },
  { code: "IQ", name: "العراق", dial_code: "+964", flag: "🇮🇶" },
  { code: "LB", name: "لبنان", dial_code: "+961", flag: "🇱🇧" },
  { code: "PS", name: "فلسطين", dial_code: "+970", flag: "🇵🇸" },
  { code: "SY", name: "سوريا", dial_code: "+963", flag: "🇸🇾" },
  { code: "SD", name: "السودان", dial_code: "+249", flag: "🇸🇩" },
  { code: "LY", name: "ليبيا", dial_code: "+218", flag: "🇱🇾" },
  { code: "MA", name: "المغرب", dial_code: "+212", flag: "🇲🇦" },
  { code: "TN", name: "تونس", dial_code: "+216", flag: "🇹🇳" },
  { code: "DZ", name: "الجزائر", dial_code: "+213", flag: "🇩🇿" },
  { code: "MR", name: "موريتانيا", dial_code: "+222", flag: "🇲🇷" },
  { code: "DJ", name: "جيبوتي", dial_code: "+253", flag: "🇩🇯" },
  { code: "SO", name: "الصومال", dial_code: "+252", flag: "🇸🇴" },
  { code: "KM", name: "جزر القمر", dial_code: "+269", flag: "🇰🇲" }
];