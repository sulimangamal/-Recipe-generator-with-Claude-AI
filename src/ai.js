const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

export async function getRecipeFromChefClaude(ingredientsArr) {
  // Basic validation
  if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
    throw new Error("ingredientsArr must be a non-empty array");
  }

  const ingredientsString = ingredientsArr.join(", ");

  // Use a relative path so development proxy (or CORS on the backend) can handle requests.
  // Keep the prompt simple — the backend expects { prompt }.
  const payload = {
    prompt: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
  };

  try {
    // Use direct backend URL for debugging (bypass Vite proxy). If this works,
    // we know the backend accepts the request and the proxy was the issue.
    const res = await fetch('http://localhost:5001/api/message', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Bubble up a helpful error to the caller
      const txt = await res.text().catch(() => "");
      throw new Error(`Backend returned ${res.status} ${res.statusText} - ${txt}`);
    }

    const data = await res.json();

    // The backend now always returns { text } with the recipe
    return data?.text || "No recipe found.";
  } catch (err) {
    console.error("getRecipeFromChefClaude error:", err);
    return "No recipe found.";
  }
}
