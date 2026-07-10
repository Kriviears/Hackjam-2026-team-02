// src/routes/technology-stack.tsx — Technology Stack Showcase page for PerX.
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/Icon";
import { PageTransition } from "@/components/PageTransition";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  technologies,
  comparisonRows,
  performanceHighlights,
  futureRoadmap,
  architectureLayers,
  type Tech,
} from "@/data/techStackData";

export const Route = createFileRoute("/technology-stack")({
  head: () => ({
    meta: [
      { title: "Technology Stack — PerX" },
      {
        name: "description",
        content: "Explore the modern, AI-powered technology stack that powers PerX's gamified career platform.",
      },
      { property: "og:title", content: "Technology Stack — PerX" },
      {
        property: "og:description",
        content: "React 19, TanStack, Tailwind, Groq and Llama 3.3 come together to power PerX.",
      },
    ],
  }),
  component: TechnologyStack,
});

const CATEGORIES: Tech["category"][] = [
  "Frontend",
  "Styling & UI",
  "Backend & Server",
  "AI Layer",
  "State Management",
  "Visualization & Animation",
];

const FLOATING_ICONS = ["Atom", "Rocket", "Cpu", "Database", "Palette", "Wand2", "ShieldCheck", "BrainCircuit"];

function TechnologyStack() {
  const [presentationMode, setPresentationMode] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(0);

  useEffect(() => {
    if (!presentationMode) return;
    const id = setInterval(() => {
      setHighlightIdx((i) => (i + 1) % CATEGORIES.length);
    }, 3000);
    return () => clearInterval(id);
  }, [presentationMode]);

  const grouped = useMemo(() => {
    const map = new Map<Tech["category"], Tech[]>();
    for (const cat of CATEGORIES) map.set(cat, []);
    for (const tech of technologies) map.get(tech.category)?.push(tech);
    return map;
  }, []);

  const heading = presentationMode ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl";
  const subheading = presentationMode ? "text-xl" : "text-base";
  const sectionHeading = presentationMode ? "text-3xl" : "text-2xl";

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl gradient-brand p-8 md:p-14">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
          {FLOATING_ICONS.map((name, i) => (
            <motion.div
              key={name}
              className="absolute text-background"
              style={{
                left: `${(i * 13 + 5) % 95}%`,
                top: `${(i * 21 + 8) % 85}%`,
              }}
              animate={{ y: [0, -16, 0] }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              <Icon name={name} className="h-10 w-10 md:h-14 md:w-14" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`${heading} font-extrabold text-background transition-all`}>
              Technology Behind PerX
            </h1>
            <p className={`mt-3 max-w-2xl ${subheading} text-background/80 transition-all`}>
              A modern, type-safe, AI-powered stack engineered for speed, scale, and a delightful learning
              experience.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-background/10 px-4 py-3 backdrop-blur-sm">
            <span className="text-sm font-semibold text-background">Presentation Mode</span>
            <Switch checked={presentationMode} onCheckedChange={setPresentationMode} />
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="mt-12">
        <h2 className={`${sectionHeading} font-bold text-foreground`}>Architecture at a Glance</h2>
        <p className="mt-1 text-muted-foreground">How data and requests flow through PerX's stack.</p>

        <div className="mt-8 flex flex-col items-center">
          {architectureLayers.map((layer, i) => {
            const isAi = layer.label.toLowerCase().includes("groq") || layer.label.toLowerCase().includes("ai");
            return (
              <div key={layer.label} className="flex w-full max-w-2xl flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`glass-card relative flex w-full items-center gap-4 p-5 ${
                    isAi ? "ring-2 ring-accent/60" : ""
                  }`}
                >
                  {isAi && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-accent/10"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <div
                    className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      isAi ? "gradient-brand" : "bg-secondary/10"
                    }`}
                  >
                    <Icon name={layer.icon} className={`h-6 w-6 ${isAi ? "text-background" : "text-secondary"}`} />
                  </div>
                  <div className="relative">
                    <p className="font-semibold text-foreground">{layer.label}</p>
                    <p className="text-sm text-muted-foreground">{layer.detail}</p>
                  </div>
                </motion.div>
                {i < architectureLayers.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 + 0.2 }}
                    className="h-8 w-0.5 origin-top bg-border"
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Technology Categories */}
      <section className="mt-16 space-y-14">
        {CATEGORIES.map((category, catIdx) => {
          const items = grouped.get(category) ?? [];
          const isAiSection = category === "AI Layer";
          const isHighlighted = presentationMode && highlightIdx === catIdx;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className={`rounded-3xl p-1 transition-all ${
                isHighlighted ? "ring-2 ring-accent shadow-lg" : ""
              }`}
            >
              <div
                className={`flex items-center justify-between rounded-3xl p-5 ${
                  isAiSection ? "gradient-brand" : ""
                }`}
              >
                <h3
                  className={`${sectionHeading} font-bold ${
                    isAiSection ? "text-background" : "text-foreground"
                  }`}
                >
                  {category}
                </h3>
                <Badge variant="secondary">{items.length} technologies</Badge>
              </div>

              {isAiSection && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-secondary/5 p-4 text-sm font-medium text-secondary">
                  {["Groq", "Llama 3.3 70B", "AI Career Navigator", "Roadmap Generator", "Personalized Recommendations"].map(
                    (step, i, arr) => (
                      <span key={step} className="flex items-center gap-3">
                        <span className="rounded-full bg-secondary/10 px-3 py-1">{step}</span>
                        {i < arr.length - 1 && <Icon name="ArrowRight" className="h-4 w-4 text-accent" />}
                      </span>
                    ),
                  )}
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((tech, i) => (
                  <TechCard key={tech.name} tech={tech} index={i} presentationMode={presentationMode} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Full Technology Grid */}
      <section className="mt-16">
        <h2 className={`${sectionHeading} font-bold text-foreground`}>Full Technology Grid</h2>
        <p className="mt-1 text-muted-foreground">Hover any card to reveal why we chose it.</p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {technologies.map((tech, i) => (
            <FlipCard key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      </section>

      {/* Why This Stack? Comparison Table */}
      <section className="mt-16">
        <h2 className={`${sectionHeading} font-bold text-foreground`}>Why This Stack?</h2>
        <div className="mt-6 glass-card overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requirement</TableHead>
                <TableHead>Technology</TableHead>
                <TableHead>Benefit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonRows.map((row) => (
                <TableRow key={row.requirement}>
                  <TableCell className="font-medium text-foreground">{row.requirement}</TableCell>
                  <TableCell className="text-secondary">{row.technology}</TableCell>
                  <TableCell className="text-muted-foreground">{row.benefit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Performance Highlights */}
      <section className="mt-16">
        <h2 className={`${sectionHeading} font-bold text-foreground`}>Performance Highlights</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {performanceHighlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card flex flex-col items-start gap-3 p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10">
                <Icon name={item.icon} className="h-5.5 w-5.5 text-secondary" />
              </div>
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Future Architecture */}
      <section className="mb-16 mt-16">
        <h2 className={`${sectionHeading} font-bold text-foreground`}>Future Architecture</h2>
        <p className="mt-1 text-muted-foreground">Where PerX's technology is headed next.</p>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {futureRoadmap.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="glass-card relative overflow-hidden p-5"
            >
              <Badge className="absolute right-3 top-3" variant="outline">
                Future Enhancement
              </Badge>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                <Icon name={item.icon} className="h-5.5 w-5.5 text-accent" />
              </div>
              <p className="mt-3 font-semibold text-foreground">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

function TechCard({ tech, index, presentationMode }: { tech: Tech; index: number; presentationMode: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`glass-card flex flex-col gap-3 p-5 ${
        tech.accent === "ai" ? "ring-1 ring-accent/40" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10">
          <Icon name={tech.icon} className="h-5.5 w-5.5 text-secondary" />
        </div>
        <p className={`font-semibold text-foreground ${presentationMode ? "text-lg" : ""}`}>{tech.name}</p>
      </div>
      <p className={`text-muted-foreground ${presentationMode ? "text-base" : "text-sm"}`}>{tech.description}</p>
      <p className="text-sm font-medium text-secondary">{tech.why}</p>
      <div className="flex flex-wrap gap-1.5">
        {tech.benefits.map((b) => (
          <Badge key={b} variant="secondary" className="font-normal">
            {b}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

function FlipCard({ tech, index }: { tech: Tech; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card relative flex flex-col items-center justify-center gap-2 overflow-hidden p-4 text-center"
    >
      <Icon name={tech.icon} className="h-7 w-7 text-secondary" />
      <p className="text-xs font-semibold text-foreground">{tech.name}</p>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-card/95 p-3 text-center backdrop-blur-sm"
          >
            <p className="text-xs font-semibold text-secondary">{tech.name}</p>
            <p className="text-[11px] leading-snug text-muted-foreground">{tech.why}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
