"use client";

import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useTheme } from "next-themes";
import {
  Home,
  Briefcase,
  FileText,
  Mail,


  Sun,
  Moon,
  Languages,
  Search,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { profile } from "@/lib/content";
import { ui2, tr } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { useMounted } from "@/hooks/use-mounted";

type Item = {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
};

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue<number>;
  item: Item;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const widthSync = useTransform(distance, [-140, 0, 140], [40, 68, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 170, damping: 14 });

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={cn(
        "group relative grid aspect-square place-items-center rounded-2xl border border-border bg-surface/80 text-foreground/80 shadow-sm transition-colors",
        "hover:border-brand/40 hover:text-foreground"
      )}
    >
      <span className="[&>svg]:h-[45%] [&>svg]:w-[45%]">{item.icon}</span>
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-[11px] text-popover-foreground opacity-0 shadow transition-opacity group-hover:opacity-100">
        {item.label}
      </span>
    </motion.div>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noreferrer" : undefined}
        aria-label={item.label}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={item.onClick} aria-label={item.label}>
      {content}
    </button>
  );
}

export function AppDock() {
  const mouseX = useMotionValue(Infinity);
  const { lang, toggle } = useLang();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = !mounted || resolvedTheme !== "light";
  const router = useRouter();
  const pathname = usePathname();
  const isHome = /^\/(pt|en)\/?$/.test(pathname ?? "");

  const goSection = (id: string) => {
    if (isHome) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    else router.push(`/${lang}#${id}`);
  };

  const items: Item[] = [
    { id: "home", label: tr(ui2.dock.home, lang), icon: <Home />, onClick: () => goSection("top") },
    { id: "work", label: tr(ui2.dock.work, lang), icon: <Briefcase />, onClick: () => goSection("work") },
    { id: "resume", label: tr(ui2.dock.resume, lang), icon: <FileText />, href: `/${lang}/resume` },
    { id: "contact", label: tr(ui2.dock.contact, lang), icon: <Mail />, onClick: () => goSection("contact") },
    { id: "sep1", label: "", icon: null },
    { id: "github", label: tr(ui2.dock.github, lang), icon: <GithubIcon />, href: profile.github, external: true },
    { id: "linkedin", label: tr(ui2.dock.linkedin, lang), icon: <LinkedinIcon />, href: profile.linkedin, external: true },
    { id: "sep2", label: "", icon: null },
    {
      id: "search",
      label: tr(ui2.dock.search, lang),
      icon: <Search />,
      onClick: () => window.dispatchEvent(new CustomEvent("palette:open")),
    },
    {
      id: "theme",
      label: tr(ui2.dock.theme, lang),
      icon: isDark ? <Sun /> : <Moon />,
      onClick: () => setTheme(isDark ? "light" : "dark"),
    },
    { id: "lang", label: tr(ui2.dock.lang, lang), icon: <Languages />, onClick: toggle },
  ];

  return (
    <div className="hide-presenting hide-print pointer-events-none fixed inset-x-0 bottom-4 z-50 hidden justify-center md:flex">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass pointer-events-auto flex h-16 items-end gap-2 rounded-3xl px-3 pb-2"
      >
        {items.map((item) =>
          item.id.startsWith("sep") ? (
            <div key={item.id} className="mx-1 mb-2 h-8 w-px self-end bg-border" />
          ) : (
            <DockIcon key={item.id} mouseX={mouseX} item={item} />
          )
        )}
      </motion.div>
    </div>
  );
}
