import Tesseract from "tesseract.js";

/* =========================
   CONFIG
========================= */
const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY;

/* =========================
   ELEMENTS
========================= */
const questionBox = document.getElementById("question");
const imageInput = document.getElementById("imageInput");
const resultBox = document.getElementById("result");

/* =========================
   MAIN SOLVE FUNCTION
========================= */
window.solve = async function () {
  // 1️⃣ API key check
  if (!API_KEY) {
    resultBox.innerText =
      "❌ API key missing. Add VITE_GEMINI_API_KEY in Vercel.";
    return;
  }

  let questionText = questionBox.value.trim();

  // 2️⃣ OCR if image selected and text empty
  if (!questionText && imageInput.files.length > 0) {
    resultBox.innerText = "📸 Reading image...";
    try {
      const ocrResult = await Tesseract.recognize(
        imageInput.files[0],
        "eng"
      );
      questionText = ocrResult.data.text.trim();
    } catch (err) {
      resultBox.innerText = "❌ Error reading image.";
      return;
    }
  }

  // 3️⃣ No question found
  if (!questionText) {
    resultBox.innerText = "✏️ Please type or upload a clear question.";
    return;
  }

  resultBox.innerText = "🤖 Solving...";

  // 4️⃣ Prompt
  const prompt = `
You are an AI study helper for Indian students (Class 6–12).

Rules:
- Explain step-by-step
- Use simple language
- Show full working for maths
- Explain concepts clearly for science
- Give easy meaning for English
- Do NOT promote cheating

Question:
${questionText}
`;

  // 5️⃣ Gemini API call (LATEST MODEL)
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
            generationConfig: {
    temperature: 0.4,
    maxOutputTokens: 800,
    topP: 0.9,
    topK: 40
   } 
 })  
    const data = await response.json();
    console.log("Gemini response:", data);

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) {
      resultBox.innerText =
        "⚠️ AI could not generate an answer. Try rephrasing the question.";
      return;
    }

    resultBox.innerText = answer;
  } catch (error) {
    console.error(error);
    resultBox.innerText = "❌ Error connecting to AI service.";
  }
};