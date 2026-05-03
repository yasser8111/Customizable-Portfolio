'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '../../lib/utils';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const TextBlock = ({ 
  children, 
  blockColor = '#DDFC3E', 
  textColor = 'inherit', 
  fontFamily = 'inherit',
  className = '',
  textClassName = ''
}) => {
  const containerRef = useRef(null);
  const blockRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Small delay to ensure page layout and scroll-reset have settled
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      const isRTL = getComputedStyle(containerRef.current).direction === 'rtl';
      const startOrigin = isRTL ? 'right' : 'left';
      const endOrigin = isRTL ? 'left' : 'right';
      
      const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
            once: true,
          }
        });

        // Reset states
        gsap.set(blockRef.current, { scaleX: 0, transformOrigin: startOrigin });
        gsap.set(textRef.current, { opacity: 0 });

        tl.to(blockRef.current, {
          scaleX: 1,
          duration: 0.4,
          ease: 'expo.inOut',
        })
        .set(textRef.current, { opacity: 1 })
        .to(blockRef.current, {
          scaleX: 0,
          transformOrigin: endOrigin,
          duration: 0.4,
          ease: 'expo.inOut',
        });
      }, 200);

      return () => clearTimeout(timer);
    }, { scope: containerRef });

    return (
      <span 
        ref={containerRef} 
        className={cn("relative inline-block overflow-visible py-0.5 px-1", className)}
        style={{ fontFamily }}
      >
        <span 
          ref={textRef} 
          className={cn("relative z-10 block", textClassName)}
          style={{ color: textColor }}
        >
          {children}
        </span>
        <span 
          ref={blockRef}
          className="absolute -inset-y-1 inset-x-0 z-20 block"
          style={{ backgroundColor: blockColor, willChange: 'transform' }}
        />
      </span>
    );
  };

const TextBlockEffect = ({ children }) => {
  return (
    <div className="text-block-effect-container">
      {children}
    </div>
  );
};

export default TextBlockEffect;