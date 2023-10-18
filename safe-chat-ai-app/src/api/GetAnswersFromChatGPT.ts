
import axios from "axios";

// Reading the API key from environment variables for security
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string;
const MODEL_TO_USE = import.meta.env.VITE_DEFAULT_CHAT_MODEL? import.meta.env.VITE_DEFAULT_CHAT_MODEL : 'gpt-3.5-turbo';

export const GenerateHRMessage = async (message: string) : Promise<string> => {
    try {
      // Set up the request data with your prompt and any other parameters
      const requestData = {
        model : MODEL_TO_USE,
        // For chat applications, 'messages' structure is commonly used
        messages: [
          { role: "system", content: "You are an expert Human Resource Manager who is well versed in all emplyement related matters. You are an expert Human Resource Manager who is well versed in all emplyement related matters. Your company name is Awesome Inc, Address 400 Great St, London, CA. Candidate's name will be provided. Product output as HTML div." },
          { role: "user", content: message }
        ],
        // Add other parameters here as needed
      };

      // Set up your config for the request headers
      const config = {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      };

      // Make a POST request to the OpenAI API
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions', 
        requestData, 
        config
      );

      // If the request is successful, the API response is in result.data
      if (result.data.choices && result.data.choices.length > 0) {
        // Update state with the response so it can be rendered
        return result.data.choices[0].message.content;
      } else {
        return("Received unexpected response format from API.");
      }
    } catch (error) {
      // Handle the error appropriately
      console.error("Error fetching data from OpenAI", error);
      return("Error fetching data from OpenAI. Please check the console for more information.");
    }
  };