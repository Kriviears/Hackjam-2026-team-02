// src/components/StatCard.tsx — animated stat counter card.
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/Icon";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
}

export function StatCard({ icon, label, value, suffix }: StatCardProps) {
  const count = useAnimatedCounter(value);
  const reduced = useReducedMotion();
  return (
    <motion.div whileHover={reduced ? undefined : { y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="glass-card flex items-center gap-4 p-5 transition-shadow hover:shadow-2xl hover:shadow-blue-500/10">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-brand text-white">
          <Icon name={icon} className="h-6 w-6" />
        </div>
        <div>
          <div className="text-2xl font-bold text-foreground">
            {count.toLocaleString()}
            {suffix}
          </div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </Card>
    </motion.div>
  );
}
