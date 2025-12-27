import Tesseract from "tesseract.js";

const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY;

const questionBox = document.getElementById("question");
const imageInput = document.getElementById("imageInput");
const resultBox = document.getElementById("result");

window.solve = async function () {
  if (!API_KEY) {
    resultBox.innerText =
      "❌ API key missing. Add VITE_GEMINI_API_KEY in Vercel.";
    return;
  }

  let question = questionBox.value.trim();

  // OCR if image selected
  if (!question && imageInput.files.length > 0) {
    resultBox.innerText = "📸 Reading image...";
    const ocr = await Tesseract.recognize(
      imageInput.files[0],
      "eng"
    );
    question = ocr.data.text.trim();
  }

  if (!question) {
    resultBox.innerText = "✏️ Please type or upload a question.";
    return;
  }

  resultBox.innerText = "🤖 Solving...";

  const prompt = `
You are an AI study helper for Indian students (Class 6–12).
Explain step-by-step in simple language.
Do NOT promote cheating.

Question:
${question}
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await res.json();
    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    resultBox.innerText =
      answer || "⚠️ No answer received. Try another question.";
  } catch (err) {
    console.error(err);
    resultBox.innerText = "❌ Error connecting to AI service.";
  }
};