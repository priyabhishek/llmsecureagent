
import { fetchAnalysisResponse } from "./TextAnalysisApi";
import { fetchAnonymizerResponse } from "./TextAnnonymizer";

export const fetchAiReply = async (message: string) => {
  try {
    const response = await fetchAnalysisResponse(message);
    if (response.status !== "true" || response.analysisData.length === 0) {
      console.log("No entities detected. No cleanup needed.");
      return message;
    }
    // Now call the anonymizer API
    const anonymizerResponse = await fetchAnonymizerResponse(message, response.analysisData);
    if (anonymizerResponse.annonimized_items.length === 0) {
      console.log("No action taken from anonymizer. No cleanup needed.");
      return message;
    }
    return anonymizerResponse.text;
  } catch (error) {
    console.error("Error fetching AI reply:", error);
    throw error;
  }
};

