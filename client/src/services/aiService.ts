export const generateAIPlan = async (prompt: string) => {
  const response = await fetch("http://localhost:5000/api/ai/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  console.log("Status:", response.status);
  console.log("Response:", data);
  return data;
};