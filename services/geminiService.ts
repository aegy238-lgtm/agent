import { GoogleGenAI } from "@google/genai";
import { AgencyFormData, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFormalRequest = async (data: AgencyFormData, lang: Language): Promise<string> => {
  try {
    let languagePrompt = "";
    if (lang === 'en') languagePrompt = "Write the letter in English.";
    else if (lang === 'hi') languagePrompt = "Write the letter in Hindi (Formal).";
    else languagePrompt = "Write the letter in Arabic (Formal).";

    const prompt = `
      Task: Write a highly formal and formatted agency registration request letter for a live streaming app.
      ${languagePrompt}
      
      Use the following details:
      - Agency Name: ${data.agencyName}
      - Country: ${data.country}
      - Agent/Owner ID: ${data.agentId}
      - WhatsApp Number: ${data.whatsapp}
      - Admin Name: ${data.adminName}
      - Admin ID: ${data.adminId}

      The letter should be addressed to the App Management. It should sound professional, committed, and respectful of the platform's rules.
      Do NOT include any conversational intro/outro (like "Here is the letter"). Start directly with the letter header/salutation.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || (lang === 'ar' ? "حدث خطأ أثناء إنشاء الخطاب." : "Error generating letter.");
  } catch (error) {
    console.error("Error generating request:", error);
    return lang === 'ar' 
      ? "عذراً، لم نتمكن من صياغة الخطاب تلقائياً في الوقت الحالي. يرجى المحاولة لاحقاً."
      : "Sorry, we could not generate the letter automatically at this time. Please try again later.";
  }
};