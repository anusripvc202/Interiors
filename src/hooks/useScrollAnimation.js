import { useEffect, useRef } from 'react';

export function useScrollAnimation(dependencies = []) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const targets = el.querySelectorAll('.anim-fade-up');
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return ref;
}
