import axios from "axios";

export interface AnalysisData {
  entity_type: string;
  start: number;
  end: number;
  score: number;
}
export interface AnaylysResponse {
  status: string;
  analysisData: AnalysisData[];
}

export const fetchAnalysisResponse = async (message: string) => {
  try {
    const response = await axios.post(`/analyze`, {
      text: message,
      language: "en",
    });
    // Parse the JSON text into an array of objects
    const jsonData = response.data;

    // Create the AnalysisData array
    const analysisData: AnalysisData[] = jsonData.map((item: any) => ({
      entity_type: item.entity_type,
      start: item.start,
      end: item.end,
      score: item.score,
    }));

    // Determine the status based on the number of AnalysisData items
    const status: string = analysisData.length > 0 ? "true" : "false";

    // Create the AnaylysResponse object
    const analysisResponse: AnaylysResponse = {
      status,
      analysisData,
    };
    console.log("Entities detected." + analysisResponse.analysisData.length);
    console.log(analysisResponse);
    return analysisResponse;
  } catch (error) {
    console.error("Error fetching AI reply:", error);
    throw error;
  }
};
