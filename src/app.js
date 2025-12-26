import Tesseract from "tesseract.js";

// ====== CONFIG ======
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const DAILY_LIMIT = 5;

// ====== ELEMENTS ======
const questionInput = document.getElementById("question");
const imageInput = document.getElementById("imageInput");
const answerBox = document.getElementById("answer");
const loading = document.getElementById("loading");

// ====== DAILY LIMIT LOGIC ======
function canAskQuestion() {
  const today = new Date().toDateString();
  let usage = JSON.parse(localStorage.getItem("usage")) || {
    date: today,
    count: 0
  };

  if (usage.date !== today) {
    usage.date = today;
    usage.count = 0;
  }

  if (usage.count >= DAILY_LIMIT) {
    alert("Daily free limit reached. Please try tomorrow or upgrade to premium.");
    return false;
  }

  usage.count++;
  localStorage.setItem("usage", JSON.stringify(usage));
  return true;
}

// ====== OCR: IMAGE → TEXT ======
imageInput.addEventListener("change", async () => {
  const file = imageInput.files[0];
  if (!file) return;

  loading.style.display = "block";
  loading.innerText = "📸 Reading image...";

  try {
    const result = await Tesseract.recognize(file, "eng", {
      logger: m => console.log(m)
    });

    questionInput.value = result.data.text.trim();
  } catch (err) {
    alert("Failed to read image.");
    console.error(err);
  }

  loading.style.display = "none";
});

// ====== SOLVE QUESTION ======
window.solve = async function () {
  const question = questionInput.value.trim();

  if (!question) {
    alert("Please type or upload a question.");
    return;
  }

  if (!canAskQuestion()) return;

  loading.style.display = "block";
  loading.innerText = "🤖 Solving...";
  answerBox.textContent = "";

  const prompt = `
You are an AI study helper for Indian students (Class 6–12).
Solve the question step-by-step.
Explain in simple language.
If maths, show full working.
If science, explain concept clearly.
If English, give easy meaning.
Do NOT promote cheating.

Question:
${question}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate an answer.";

    answerBox.textContent = answer;
  } catch (error) {
    answerBox.textContent =
      "Error occurred. Please check your internet connection.";
    console.error(error);
  }

  loading.style.display = "none";
};