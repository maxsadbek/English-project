import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Music, Pause, Play, StickyNote, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFocusStore } from "@/stores/focusStore";

export function FocusPage() {
  const {
    focusMinutes,
    isTimerRunning,
    musicEnabled,
    notes,
    setFocusMinutes,
    toggleTimer,
    toggleMusic,
    addNote,
    removeNote,
  } = useFocusStore();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const handleAddNote = () => {
    if (!noteTitle.trim()) return;
    addNote({
      id: Date.now().toString(),
      title: noteTitle,
      content: noteContent,
      createdAt: new Date().toISOString(),
    });
    setNoteTitle("");
    setNoteContent("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">Focus mode</h1>
        <p className="mt-1 text-muted-foreground">
          Distraction-free studying with timer, music, and notes.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Timer className="h-4 w-4 text-primary" />
              Focus timer
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-8">
            <motion.div
              animate={isTimerRunning ? { scale: [1, 1.02, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl font-semibold tabular-nums tracking-tight"
            >
              {focusMinutes}:00
            </motion.div>
            <div className="mt-6 flex gap-2">
              {[15, 25, 45].map((min) => (
                <Button
                  key={min}
                  variant={focusMinutes === min ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFocusMinutes(min)}
                >
                  {min}m
                </Button>
              ))}
            </div>
            <Button className="mt-8 gap-2" size="lg" onClick={toggleTimer}>
              {isTimerRunning ? (
                <>
                  <Pause className="h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Start focus session
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Music className="h-4 w-4" />
              Ambient sounds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="music">Study music</Label>
              <Switch id="music" checked={musicEnabled} onCheckedChange={toggleMusic} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Rain", "Café", "Forest", "White noise"].map((sound) => (
                <Button key={sound} variant="outline" className="justify-start">
                  <Music className="mr-2 h-4 w-4" />
                  {sound}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <StickyNote className="h-4 w-4" />
            Study notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              placeholder="Note title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <Input
              placeholder="Content..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
          </div>
          <Button onClick={handleAddNote} disabled={!noteTitle.trim()}>
            Add note
          </Button>
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notes yet. Start capturing insights.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  layout
                  className="rounded-xl border border-border/50 p-4"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-medium">{note.title}</p>
                    <Button variant="ghost" size="sm" onClick={() => removeNote(note.id)}>
                      ×
                    </Button>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{note.content}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
