import axios from "axios";
import { AnalysisData } from "./TextAnalysisApi";

export interface AnonymizedItem {
  start: number;
  end: number;
  entity_type: string;
  text: string;
  operator: string;
}
export interface AnonymizerResponse {
  text: string;
  annonimized_items: AnonymizedItem[];
}

const anonymizersConfig = {
  "DEFAULT": {
      "type": "hash",
      "key": "FAFABBCCFAFABBCC0101010101010101",
      "new_value": "sha256"
  },
  "PHONE_NUMBER": {
      "type": "mask",
      "masking_char": "*",
      "chars_to_mask": 4,
      "from_end": true
  }
}
export const fetchAnonymizerResponse = async (
  message: string,
  analyserOutput: AnalysisData[]
) => {
  try {
    const response = await axios.post(`/anonymize`, {
      text: message,
      analyzer_results: analyserOutput,
      anonymizers: anonymizersConfig,
    });
    // Parse the JSON text into an array of objects
    const jsonData = response.data;

    // Create the AnalysisData array
    const anaonymizedItems: AnonymizedItem[] = jsonData.items.map((item: any) => ({
      entity_type: item.entity_type,
      start: item.start,
      end: item.end,
      text: item.text,
      operator: item.operator,
    }));

    // Determine the status based on the number of AnalysisData items
    const anonymized_text: string = jsonData.text;

    // Create the AnaylysResponse object
    const anonymizerResponse: AnonymizerResponse = {
      text : anonymized_text,
      annonimized_items: anaonymizedItems,
    };
    console.log("Entities annonymized." + anonymizerResponse.annonimized_items.length);
    console.log(anonymizerResponse);
    return anonymizerResponse;
  } catch (error) {
    console.error("Error fetching Anonymizer reply:", error);
    throw error;
  }
};
