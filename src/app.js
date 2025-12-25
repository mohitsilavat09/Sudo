async function solve() {
  const question = document.getElementById("question").value;
  const answerBox = document.getElementById("answer");

  if (!question) {
    answerBox.textContent = "Please enter a question.";
    return;
  }

  answerBox.textContent = "Thinking...";

  const prompt = `
You are an AI study helper for Indian students (Class 6–12).
Solve the question step-by-step.
Explain in simple language.
If maths, show full working.
If science, explain concept clearly.
If English, give easy meaning.
Do NOT promote cheating.

Question: ${question}
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();
  answerBox.textContent =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No answer found.";
}