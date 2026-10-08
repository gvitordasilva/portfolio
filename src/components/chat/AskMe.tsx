"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { profile } from "@/lib/content";
import { ui2, tr } from "@/lib/site";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

export function AskMe() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [offline, setOffline] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (res.status === 503) {
        setOffline(true);
        setMsgs(next);
        return;
      }
      if (!res.ok || !res.body) {
        setMsgs([...next, { role: "assistant", content: tr(ui2.contact.error, lang) }]);
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs([...next, { role: "assistant", content: acc }]);
      }
    } catch {
      setMsgs([...next, { role: "assistant", content: tr(ui2.contact.error, lang) }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="hide-presenting hide-print fixed bottom-24 right-4 z-[60] md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass mb-3 flex h-[28rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="flex items-center gap-2 text-sm font-medium">
                <Sparkles size={14} className="text-brand" /> {tr(ui2.chat.title, lang)}
              </p>
              <button type="button" onClick={() => setOpen(false)} aria-label="close" className="text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {msgs.length === 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">{tr(ui2.chat.hint, lang)}</p>
                  {ui2.chat.suggestions[lang].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="block w-full rounded-xl border border-border bg-background/60 px-3 py-2 text-left text-sm hover:border-brand/50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[88%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    m.role === "user" ? "ml-auto bg-foreground text-background" : "bg-background/70"
                  )}
                >
                  {m.content || <span className="caret">▍</span>}
                </div>
              ))}
              {offline && (
                <p className="rounded-xl border border-border bg-background/70 px-3 py-2 text-sm">
                  {tr(ui2.chat.offline, lang)}{" "}
                  <a className="text-brand underline" href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </p>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border p-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tr(ui2.chat.placeholder, lang)}
                disabled={offline}
                className="h-10 flex-1 rounded-xl bg-background/60 px-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-brand/50"
              />
              <button
                type="submit"
                disabled={busy || offline || !input.trim()}
                aria-label={tr(ui2.chat.send, lang)}
                className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-black disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="glass ml-auto flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium shadow-lg"
        aria-label={tr(ui2.chat.open, lang)}
      >
        <MessageSquare size={16} className="text-brand" />
        <span className="hidden sm:inline">{tr(ui2.chat.open, lang)}</span>
      </motion.button>
    </div>
  );
}
