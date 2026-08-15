import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "solid" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function MagneticButton({
  children,
  to,
  href,
  variant = "solid",
  className = "",
  onClick,
  type = "button",
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-4 text-[11px] font-semibold tracking-[0.24em] uppercase transition-colors duration-500";
  const skin =
    variant === "solid"
      ? "bg-gold text-charcoal hover:glow-gold"
      : "border border-gold/45 text-gold hover:border-gold hover:glow-gold";

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-offwhite/45 to-transparent opacity-0 group-hover:animate-sheen group-hover:opacity-100" />
      {variant === "ghost" && (
        <span className="pointer-events-none absolute inset-0 -z-0 origin-bottom scale-y-0 bg-gold/10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
      )}
    </>
  );

  const handlers = {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
      y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
    },
    onMouseLeave: () => {
      x.set(0);
      y.set(0);
    },
  };

  const style = { x: sx, y: sy };
  const cls = `${base} ${skin} ${className}`;

  if (to) {
    return (
      <motion.span style={style} {...handlers} className="inline-block">
        <Link to={to} className={cls}>
          {inner}
        </Link>
      </motion.span>
    );
  }
  if (href) {
    return (
      <motion.a style={style} {...handlers} href={href} className={cls}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button style={style} {...handlers} type={type} onClick={onClick} className={cls}>
      {inner}
    </motion.button>
  );
}