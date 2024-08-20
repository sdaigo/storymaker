export default async function generateContent(title: string) {
  const resp = await fetch("/api/story/content", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
  const { message } = await resp.json();
  return message;
}
