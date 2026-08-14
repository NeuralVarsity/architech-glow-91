import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], ["7deg", "-7deg"]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], ["-7deg", "7deg"]), { stiffness: 150, damping: 18 });

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className="group relative overflow-hidden rounded-sm border border-gold/15 bg-card transition-shadow duration-500 hover:shadow-[var(--shadow-gold)]"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          width={1200}
          height={900}
          className="size-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" />
        <span className="absolute top-4 left-4 rounded-sm border border-gold/40 bg-charcoal/70 px-3 py-1 text-[10px] tracking-[0.24em] text-gold uppercase backdrop-blur-sm">
          {project.status}
        </span>
      </div>

      <div className="relative p-6">
        <p className="text-[11px] tracking-[0.24em] text-muted-foreground uppercase">{project.location}</p>
        <h3 className="mt-2 text-xl font-medium text-offwhite">{project.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.blurb}</p>
        <div className="gold-rule my-5" />
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-[10px] tracking-[0.22em] text-muted-foreground uppercase">Starting</dt>
            <dd className="mt-1 font-medium text-gold">{project.price}</dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.22em] text-muted-foreground uppercase">Area</dt>
            <dd className="mt-1 font-medium text-offwhite/90">{project.area}</dd>
          </div>
        </dl>
      </div>
    </motion.article>
  );
}