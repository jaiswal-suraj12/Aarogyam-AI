export const analyzeFoodImage = async (image: File) => {
  if (!image.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }

  if (image.size > 8 * 1024 * 1024) {
    throw new Error("Image is too large. Please choose an image under 8 MB.");
  }

  const formData = new FormData();

  formData.append("image", image);

  const response = await fetch(
    "http://localhost:5000/api/image/analyze-food",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Food analysis failed.");
  }

  return data;
};
