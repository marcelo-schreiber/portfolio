import { lazy, Suspense, useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
const MyCanvas = lazy(() => import("./Canvas"));
const LevaPanel = lazy(async () => {
  const { Leva } = await import("leva");
  return { default: Leva };
});

export default function ExperiencePage() {
  const [isDebug, setIsDebug] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  useEffect(() => {
    const updateDebugState = () => {
      setIsDebug(window.location.hash === "#debug");
    };

    updateDebugState();
    window.addEventListener("hashchange", updateDebugState);
    return () => window.removeEventListener("hashchange", updateDebugState);
  }, []);

  useEffect(() => {
    const loadCanvas = () => setIsCanvasReady(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadCanvas, { timeout: 1000 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(loadCanvas, 100);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {isCanvasReady && (
        <Suspense fallback={<LoadingScreen />}>
          <MyCanvas />
        </Suspense>
      )}
      {isDebug && (
        <Suspense fallback={null}>
          <LevaPanel />
        </Suspense>
      )}
    </>
  );
}
