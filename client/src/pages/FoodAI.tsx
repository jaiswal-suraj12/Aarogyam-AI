import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { analyzeFoodImage } from "../services/imageService";

const FoodAI = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image must be smaller than 8 MB.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
  };

  const analyze = async () => {
    if (!image) {
      toast.error("Please choose an image first.");
      return;
    }

    setLoading(true);

    try {
      const data = await analyzeFoodImage(image);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setResult(data.response);

      const analysis = {
        id: crypto.randomUUID(),
        image: preview,
        response: data.response,
        createdAt: new Date().toISOString(),
      };

      const existing = JSON.parse(
        localStorage.getItem("foodHistory") || "[]"
      );

      localStorage.setItem(
        "foodHistory",
        JSON.stringify([analysis, ...existing])
      );

      toast.success("Food analyzed successfully!");

    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Server Error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        🍽️ AI Food Analyzer
      </h1>

      <Card className="p-6">

        <div className="flex flex-col sm:flex-row gap-4">

          {/* Gallery */}
          <label className="flex items-center justify-center gap-2 cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl transition">

            📁 Choose Image

            <input
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={handleSelect}
              className="hidden"
            />

          </label>

          {/* Camera */}
          <label className="flex items-center justify-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl transition">

            📷 Open Camera

            <input
              type="file"
              accept="image/*"
              capture="environment"
              disabled={loading}
              onChange={handleSelect}
              className="hidden"
            />

          </label>

        </div>

        {/* Selected file */}
        {image && (
          <p className="mt-4 text-sm text-slate-500">
            Selected: <strong>{image.name}</strong>
          </p>
        )}

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Food Preview"
            className="mt-5 w-full max-w-sm rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 object-cover"
          />
        )}

        {/* Analyze Button */}
        <Button
          className="mt-6"
          onClick={analyze}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">

              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

              Analyzing...

            </div>
          ) : (
            "Analyze Food"
          )}
        </Button>

      </Card>

      {/* AI Result */}
      {result && (
        <Card className="mt-6 p-6 prose dark:prose-invert max-w-none">

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {result}
          </ReactMarkdown>

        </Card>
      )}

    </div>
  );
};

export default FoodAI;