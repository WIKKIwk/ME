import { useEffect, useRef, useState } from 'react';
import CountUp from './CountUp.jsx';

export default function BitsStatCounter({ to, suffix = '+' }) {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setStart(true);
        observer.unobserve(element);
      },
      { threshold: 0.18, rootMargin: '0px 0px -12% 0px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <span className="stat-counter-shell" ref={ref}>
      <CountUp
        from={0}
        to={to}
        separator=","
        direction="up"
        duration={2}
        className="count-up-text"
        startWhen={start}
        bypassInView={true}
      />
      <span className="stat-counter-suffix">{suffix}</span>
    </span>
  );
}
