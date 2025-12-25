import Tesseract from "tesseract.js";

export async function readImage(file) {
  const result = await Tesseract.recognize(file, "eng");
  return result.data.text;
}