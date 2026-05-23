import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500 shadow-glow"
      >
        <Sparkles className="h-8 w-8 text-white" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm font-medium text-muted-foreground"
      >
        Preparing your learning space...
      </motion.p>
    </div>
  );
}
