"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { HaloInput, HaloTextarea } from "@/components/ui/halo-input";
import { HaloButton } from "@/components/ui/halo-button";
import { CopyButton } from "@/components/ui/copy-button";
import { useLang } from "@/lib/i18n";
import { profile } from "@/lib/content";
import { ui2, tr } from "@/lib/site";

export function Contact() {
  const { lang } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const whatsapp = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
    lang === "pt" ? "Oi Gabriel, vi seu portfólio e quero conversar." : "Hi Gabriel, I saw your portfolio and would like to talk."
  )}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; fallback?: boolean };
      if (data.ok) {
        setDone(true);
        toast.success(tr(ui2.contact.sent, lang));
      } else if (data.fallback) {
        const body = `${form.message}\n\n— ${form.name} (${form.email})`;
        window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
        setDone(true);
        toast.success(tr(ui2.contact.sent, lang));
      } else {
        toast.error(tr(ui2.contact.error, lang));
      }
    } catch {
      toast.error(tr(ui2.contact.error, lang));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="container-x section-y">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface/60 p-6 sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-brand-3/15 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow={tr(ui2.contact.eyebrow, lang)}
              title={tr(ui2.contact.title, lang)}
              sub={tr(ui2.contact.sub, lang)}
              className="mb-8"
            />
            <div className="flex flex-col gap-3">
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border bg-background/60 px-4 py-3 transition-colors hover:border-brand/50"
              >
                <span className="flex items-center gap-3 text-sm">
                  <MessageCircle size={16} className="text-brand" /> {tr(ui2.contact.whatsapp, lang)}
                </span>
                <ArrowUpRight size={16} className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <div className="flex items-center justify-between rounded-2xl border border-border bg-background/60 py-1 pl-4 pr-1">
                <span className="mono flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-brand" /> {profile.email}
                </span>
                <CopyButton value={profile.email} variant="ghost" size="icon-sm" layout="inline" className="text-muted-foreground" />
              </div>
            </div>
          </div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            <input
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              name="website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
            <HaloInput
              required
              placeholder={tr(ui2.contact.name, lang)}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <HaloInput
              required
              type="email"
              placeholder={tr(ui2.contact.email, lang)}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <HaloTextarea
              required
              className="min-h-[140px]"
              placeholder={tr(ui2.contact.message, lang)}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <HaloButton type="submit" isLoading={sending} loadingText={tr(ui2.contact.sending, lang)} className="mt-1 h-11">
              {done ? tr(ui2.contact.sent, lang) : tr(ui2.contact.send, lang)}
            </HaloButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
