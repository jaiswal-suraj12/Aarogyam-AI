import { useState } from "react";
import toast from "react-hot-toast";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FoodAnalysis {
  id: string;
  image: string;
  response: string;
  createdAt: string;
}

const FoodHistory = () => {
  const [history, setHistory] = useState<FoodAnalysis[]>(() => {
    const saved = JSON.parse(
      localStorage.getItem("foodHistory") || "[]"
    );

    return saved;
  });

  const deleteItem = (id: string) => {
    const updated = history.filter(
      (item) => item.id !== id
    );

    setHistory(updated);

    localStorage.setItem(
      "foodHistory",
      JSON.stringify(updated)
    );

    toast.success("Food deleted!");
  };

  const clearHistory = () => {
    if (!window.confirm("Delete all food history?")) return;

    localStorage.removeItem("foodHistory");

    setHistory([]);

    toast.success("Food history cleared!");
  };

  if (history.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          🍽 Food History
        </h1>

        <Card className="p-8 text-center">
          <p className="text-slate-500">
            No food analysis available.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          🍽 Food History
        </h1>

        <Button
          onClick={clearHistory}
          className="bg-red-500 hover:bg-red-600"
        >
          Clear History
        </Button>
      </div>

      <div className="space-y-6">
        {history.map((item) => (
          <Card
            key={item.id}
            className="p-5"
          >
            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <img
                  src={item.image}
                  alt="Food"
                  className="rounded-xl w-full max-h-80 object-cover"
                />

                <p className="text-sm text-slate-500 mt-3">
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </p>

                <Button
                  onClick={() =>
                    deleteItem(item.id)
                  }
                  className="mt-4 bg-red-500 hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {item.response}
                </ReactMarkdown>
              </div>

            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default FoodHistory;
