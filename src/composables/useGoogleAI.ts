import { GoogleGenAI } from "@google/genai";
import { ref } from "vue";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCE5kMVtpQZjnNBvBIZYex9OMhM-edBHaE",
});

const useGoogleAI = () => {

    const isLoading = ref(false);

  async function senToAI(userMessage: string | undefined) {
      if (!userMessage) {
          return {
              isSuccess: false,
              response: "Please enter a message",
            };
        }
        
    isLoading.value = true;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userMessage,
    });
    isLoading.value = false;
    return {
        isSuccess: true,
        response: response.text,
    };
  }

  return {
    senToAI,
    isLoading,
  };
};

export default useGoogleAI;
