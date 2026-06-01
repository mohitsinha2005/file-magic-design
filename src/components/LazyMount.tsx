import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
  fallback?: ReactNode;
}

/** Mounts children only when the wrapper enters the viewport, then unmounts when it leaves. */
const LazyMount = ({ children, rootMargin = "200px", className, fallback = null }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { rootMargin }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? children : fallback}
    </div>
  );
};

export default LazyMount;
