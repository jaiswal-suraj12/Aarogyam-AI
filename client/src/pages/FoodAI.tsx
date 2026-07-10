import { useState } from "react";
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
            toast.error("Image is too large. Please choose an image under 8 MB.");
            return;
        }

        setImage(file);

        setPreview(URL.createObjectURL(file));
    };

    const analyze = async () => {
        if (!image) {
            toast.error("Please choose an image.");
            return;
        }

        setLoading(true);

        try {
            const data = await analyzeFoodImage(image);

            if (data.success) {
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



                toast.success("Analysis completed!");
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            console.error("Food analysis error :" ,error);
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

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelect}
                />

                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="mt-5 rounded-xl w-72"
                    />
                )}

                <Button
                    className="mt-6"
                    onClick={analyze}
                    disabled={loading}
                >
                    {loading
                        ? "Analyzing..."
                        : "Analyze Food"}
                </Button>

            </Card>

            {result && (
                <Card className="mt-6 p-6 prose dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {result}
                    </ReactMarkdown>
                </Card>
            )}

        </div>
    );
};

export default FoodAI;
