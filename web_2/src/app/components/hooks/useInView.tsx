import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.2) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting); // ✅ handles both true & false
      },
      { threshold }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);

      // ✅ FIX: trigger immediately if already in viewport
      const rect = currentRef.getBoundingClientRect();
      const inViewNow =
        rect.top < window.innerHeight && rect.bottom >= 0;

      if (inViewNow) {
        setIsInView(true);
      }
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return { ref, isInView };
}