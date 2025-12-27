import Tesseract from "tesseract.js";

/* =========================
   CONFIG
========================= */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/* =========================
   ELEMENTS
========================= */
const questionInput = document.getElementById("question");
const imageInput = document.getElementById("imageInput");
const resultBox = document.getElementById("result");

/* =========================
   MAIN FUNCTION
========================= */
window.solve = async function () {
  // 🔴 API key missing
  if (!API_KEY) {
    resultBox.innerText =
      "❌ API key missing. Add VITE_GEMINI_API_KEY in Vercel.";
    return;
  }

  let questionText = questionInput.value.trim();

  /* =========================
     OCR FROM IMAGE
  ========================= */
  if (!questionText && imageInput.files.length > 0) {
    resultBox.innerText = "📸 Reading image...";
    try {
      const ocr = await Tesseract.recognize(
        imageInput.files[0],
        "eng"
      );
      questionText = ocr.data.text.trim();
    } catch (err) {
      resultBox.innerText = "❌ Could not read image.";
      return;
    }
  }

  /* =========================
     NO QUESTION
  ========================= */
  if (!questionText) {
    resultBox.innerText = "✏️ Please type or upload a clear question.";
    return;
  }

  resultBox.innerText = "🤖 Solving...";

  /* =========================
     PROMPT
  ========================= */
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

  /* =========================
     GEMINI API CALL
  ========================= */
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
      }
    );

    const data = await response.json();
    console.log("Gemini response:", data);

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) {
      resultBox.innerText =
        "⚠️ AI could not generate an answer. Please try another question.";
      return;
    }

    resultBox.innerText = answer;
  } catch (error) {
    console.error(error);
    resultBox.innerText = "❌ Error connecting to AI service.";
  }
};