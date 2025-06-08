import { lazy, Suspense } from "react";
import LoadingScreen from "./LoadingScreen";
import { Leva } from "leva";
import { useHash } from "../../hooks/useHash";
const MyCanvas = lazy(() => import("./Canvas"));

export default function ExperiencePage() {
  const isDebug = useHash("debug");

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <MyCanvas />
      </Suspense>
      <Leva hidden={!isDebug} />
    </>
  );
}