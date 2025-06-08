import { lazy, Suspense } from "react";
import LoadingScreen from "./LoadingScreen";
const MyCanvas = lazy(() => import("./Canvas"));

export default function ExperiencePage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <MyCanvas />
    </Suspense>
  );
}