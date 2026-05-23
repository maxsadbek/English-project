import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Mic, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ChatMessage } from "@/types";

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm your AI English tutor. Ask me about grammar, practice conversation, or get pronunciation feedback.",
    timestamp: new Date().toISOString(),
  },
];

export function AIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1000));

    const responses = [
      "Great question! In formal contexts, you'd typically use the present perfect tense here.",
      "Your sentence structure is solid. Consider using 'furthermore' to connect your ideas more smoothly.",
      "Let me generate a practice exercise based on that topic for you.",
    ];
    const assistantMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date().toISOString(),
    };
    setMessages((m) => [...m, assistantMsg]);
    setIsTyping(false);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">AI Tutor</h1>
            <p className="text-sm text-muted-foreground">
              Grammar help, conversation practice, and smart analysis
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Explain present perfect", "Pronunciation check", "Generate exercise"].map(
            (suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer hover:bg-muted"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
              </Badge>
            )
          )}
        </div>
      </div>

      <Card className="glass-card flex flex-1 flex-col overflow-hidden">
        <CardContent className="flex flex-1 flex-col p-0">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <Sparkles className="mb-1 h-3 w-3 text-primary" />
                  )}
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-1 rounded-2xl bg-muted px-4 py-3 w-fit">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="h-2 w-2 rounded-full bg-muted-foreground"
                  />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-border/50 p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" type="button">
                <Mic className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Ask your AI tutor..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} disabled={!input.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
