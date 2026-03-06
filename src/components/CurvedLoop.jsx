import React, { useEffect, useMemo, useRef, useState } from 'react';
import './CurvedLoop.css';

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className = '',
  direction = 'left',
  interactive = true,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef(null);
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);

  const ready = spacing > 0;
  const repeatCount = spacing ? Math.max(4, Math.ceil(2200 / spacing) + 2) : 4;
  const items = Array.from({ length: repeatCount }, (_, index) => (
    <span key={index} className={`curved-loop-copy ${className}`.trim()}>
      {text}
    </span>
  ));

  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getBoundingClientRect().width);
    }
  }, [text, className]);

  useEffect(() => {
    if (!ready) return;

    let frame = 0;

    const step = () => {
      if (!dragRef.current) {
        setOffset((current) => {
          const delta = dirRef.current === 'right' ? speed : -speed;
          let next = current + delta;

          if (dirRef.current === 'left' && next <= -spacing) {
            next += spacing;
          }

          if (dirRef.current === 'right' && next >= 0) {
            next -= spacing;
          }

          return next;
        });
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [ready, spacing, speed]);

  const onPointerDown = (event) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = event.clientX;
    velRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!interactive || !dragRef.current || !spacing) return;

    const dx = event.clientX - lastXRef.current;
    lastXRef.current = event.clientX;
    velRef.current = dx;

    setOffset((current) => {
      let next = current + dx;

      if (next <= -spacing) next += spacing;
      if (next >= 0) next -= spacing;

      return next;
    });
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className="curved-loop-jacket"
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <span ref={measureRef} className={`curved-loop-measure ${className}`.trim()}>
        {text}
      </span>
      <div className="curved-loop-track" style={{ transform: `translate3d(${offset}px, 0, 0)` }}>
        {items}
      </div>
    </div>
  );
};

export default CurvedLoop;
