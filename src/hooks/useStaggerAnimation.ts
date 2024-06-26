import { useAnimate, stagger, inView } from "framer-motion";
import { useEffect } from "react";

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

type IProp = {
  className: string;
  position: 'horizontal' | 'vertical'
}
export function useStaggerAnimation({ position, className }: IProp) {

  const [scope, animate] = useAnimate();

  const axis = position === 'vertical' ? { y: [60, 0] } : { x: [60, 0] }

  useEffect(() => {
    inView(className, ({ target }) => {
      animate(
        target,
        {
          ...axis,
          opacity: [0, 1],
        },
        {
          duration: .8,
          delay: staggerMenuItems,
          type: 'spring',
          bounce: 0,
        }
      );
    })
  }, [])

  return {
    scope,
  }
}