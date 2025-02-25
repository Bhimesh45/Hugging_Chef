import { HfInference } from "@huggingface/inference";
// System prompt for guiding the AI response
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

// Hugging Face Model to Use
const MODEL_NAME = "mistralai/Mixtral-8x7B-Instruct-v0.1";

// Retrieve API key from environment variables
const API_KEY = process.env.REACT_APP_HF_ACCESS_TOKEN;
console.log(API_KEY)


if (!API_KEY) {
  console.error("🚨 Missing Hugging Face API Key! Make sure to set REACT_APP_HF_ACCESS_TOKEN in your .env file.");
}

// Initialize Hugging Face Inference
const hf = new HfInference(API_KEY);

export async function getRecipeFromMistral(ingredientsArr) {
  if (!API_KEY) {
    console.error("❌ Cannot proceed: Hugging Face API key is missing.");
    return "Error: Missing API Key!";
  }

  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await hf.chatCompletion({
      model: MODEL_NAME,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024,
    });

    // Ensure we safely access the response
    return response?.choices?.[0]?.message?.content || "⚠️ No response received from API.";
  } catch (err) {
    console.error("❌ API Request Failed:", err.message);
    return `Error: ${err.message}`;
  }
}
