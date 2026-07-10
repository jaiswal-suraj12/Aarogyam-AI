import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { sendMessage } from "../services/chatService";
import type { ChatMessage } from "../types/chat";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import jsPDF from "jspdf";
import { Mic } from "lucide-react";

const AIChat = () => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load chat history
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("chatHistory");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Invalid chat history:", error);
        localStorage.removeItem("chatHistory");
      }
    }

    return [
      {
        id: crypto.randomUUID(),
        role: "assistant",
        message:
          "👋 Hello! I'm your AI Fitness Coach. Ask me anything about workouts, diet, calories, nutrition, or fitness.",
      },
    ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  // Save history + Auto Scroll
  useEffect(() => {
    localStorage.setItem(
      "chatHistory",
      JSON.stringify(messages)
    );

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Type AI response character by character
  const typeMessage = async (
    text: string,
    id: string
  ) => {
    let current = "";

    for (const char of text) {
      current += char;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? {
              ...msg,
              message: current,
            }
            : msg
        )
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 10)
      );
    }
  };


  // Send Message
  const handleSend = async (message?:string) => {
    const text = message ?? input;
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      message: text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

      if (!message) {
    setInput("");
  }

    setLoading(true);

    try {
      const result = await sendMessage(updatedMessages);

      if (result.success) {
        // Create empty AI message
        const aiId = crypto.randomUUID();

        setMessages((prev) => [
          ...prev,
          {
            id: aiId,
            role: "assistant",
            message: "",
          },
        ]);

        // Type the AI response
        await typeMessage(result.response, aiId);

        toast.success("AI replied!");
      } else {
        toast.error("Failed to get AI response.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  //start listening
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error(
        "Speech recognition is not supported in this browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setInput(transcript);
     handleSend(transcript)
      toast.success("Voice captured!");
    };

    recognition.onerror = () => {
      toast.error("Voice recognition failed.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };


  // Clear Chat
  const clearChat = () => {
    localStorage.removeItem("chatHistory");

    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        message:
          "👋 Hello! I'm your AI Fitness Coach. Ask me anything about workouts, diet, calories, nutrition, or fitness.",
      },
    ]);

    toast.success("Chat cleared!");
  };
  //export chat to pdf 
  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("FitTrack AI Chat", 10, 15);

    pdf.setFontSize(12);

    let y = 30;

    messages.forEach((msg) => {
      const role =
        msg.role === "user"
          ? "You"
          : "AI Coach";

      const lines = pdf.splitTextToSize(
        `${role}: ${msg.message}`,
        180
      );

      pdf.text(lines, 10, y);

      y += lines.length * 7 + 5;

      // New page if needed
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    });

    pdf.save("FitTrack-AI-Chat.pdf");

    toast.success("Chat exported!");
  };


  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          🤖 AI Fitness Coach
        </h1>

        <div className="flex gap-3">

          <Button onClick={exportPDF}>
            Export PDF
          </Button>
          <Button onClick={clearChat}>
            Clear Chat
          </Button>
        </div>
      </div>

      {/* Chat Window */}
      <Card className="p-4 h-[500px] overflow-y-auto space-y-4">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user"
              ? "justify-end"
              : "justify-start"
              }`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 whitespace-pre-wrap ${msg.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-slate-200 dark:bg-slate-800 dark:text-white"
                }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.message}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-xl bg-slate-200 dark:bg-slate-800 px-4 py-2 animate-pulse">
              🤖 Thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef}></div>

      </Card>

      {/* Input */}
      <div className="flex gap-3 mt-4">
        <input
          type="text"
          className="flex-1 border rounded-lg px-4 py-2 dark:bg-slate-900 dark:text-white"
          placeholder="Ask your fitness question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <Button
          onClick={startListening}
          disabled={listening}
        >
          <Mic className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => handleSend()}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>

    </div>
  );
};

export default AIChat;
