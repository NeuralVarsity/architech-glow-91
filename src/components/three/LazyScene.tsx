import { Suspense, lazy, useEffect, useState } from "react";

const CityScene = lazy(() => import("./CityScene"));
const TowerScene = lazy(() => import("./TowerScene"));

export function LazyScene({ name, className = "" }: { name: "city" | "tower"; className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const Scene = name === "city" ? CityScene : TowerScene;

  if (!mounted) return <div className={className} aria-hidden />;

  return (
    <div className={className}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
  );
}