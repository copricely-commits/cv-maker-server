export function purifyText(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/Page \d+/gi, "")
    .slice(0, 12000);
}

export function extractJSON(text) {
  if (!text) return null;

  text = text.replace(/```json|```/gi, "").trim();

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) return null;
  return text.slice(start, end + 1);
}
