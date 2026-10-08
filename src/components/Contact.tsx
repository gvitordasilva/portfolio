"use client";

import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { profile, ui, t } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { lang } = useLang();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Contato via portfólio — ${name}`;

    // 1) Abre o WhatsApp já preenchido (feito dentro do gesto de clique
    //    para não ser bloqueado pelo navegador).
    const waText = `Olá Gabriel! Meu nome é ${name}.\n\n${message}\n\nMeu e-mail: ${email}`;
    window.open(
      `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(waText)}`,
      "_blank",
      "noopener,noreferrer"
    );

    // 2) Envia a mensagem para o e-mail.
    if (profile.web3formsKey) {
      setStatus("sending");
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: profile.web3formsKey,
            subject,
            from_name: name,
            name,
            email,
            message,
          }),
        });
        const json = await res.json();
        if (json.success) {
          setStatus("success");
          formEl.reset();
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    } else {
      // Fallback sem chave configurada: abre o e-mail pré-preenchido.
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        subject
      )}&body=${body}`;
      setStatus("success");
      formEl.reset();
    }

    setTimeout(() => setStatus("idle"), 6000);
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-bg/60 px-4 py-3 text-sm text-text placeholder:text-faint outline-none transition-colors focus:border-accent";

  const buttonLabel =
    status === "sending"
      ? t(ui.contact.formSending, lang)
      : status === "success"
        ? t(ui.contact.formSuccess, lang)
        : status === "error"
          ? t(ui.contact.formError, lang)
          : t(ui.contact.formSend, lang);

  const contactLinks = [
    { icon: "@", label: profile.email, href: `mailto:${profile.email}` },
    {
      icon: "W",
      label: "WhatsApp",
      href: `https://wa.me/${profile.whatsapp}`,
    },
    { icon: "GH", label: "GitHub", href: profile.github },
    { icon: "in", label: "LinkedIn", href: profile.linkedin },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <SectionHeading index="07" title={t(ui.sections.contact, lang)} />
      <div className="grid gap-12 md:grid-cols-2">
        <Reveal>
          <p className="text-lg leading-relaxed text-muted">
            {t(ui.contact.lead, lang)}
          </p>
          <div className="mt-8 space-y-3">
            {contactLinks.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-text"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-xs text-accent transition-colors group-hover:border-accent">
                  {c.icon}
                </span>
                {c.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              required
              placeholder={t(ui.contact.formName, lang)}
              className={inputClass}
            />
            <input
              name="email"
              type="email"
              required
              placeholder={t(ui.contact.formEmail, lang)}
              className={inputClass}
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t(ui.contact.formMessage, lang)}
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className={`w-full rounded-lg px-6 py-3 font-medium transition-transform hover:-translate-y-0.5 disabled:opacity-70 ${
                status === "error"
                  ? "bg-red-500 text-white"
                  : "bg-accent text-[#04120c] shadow-glow"
              }`}
            >
              {buttonLabel}
            </button>
            <p className="mono text-center text-xs text-faint">
              {t(ui.contact.helper, lang)}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
