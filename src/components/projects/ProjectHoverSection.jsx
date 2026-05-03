import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { createSlug } from "../../lib/utils";
import { TextBlock } from "../ui/TextBlockEffect";

// Simple utility to merge class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

const ProjectHoverSection = ({
  projects,
  className,
  thumbnailWidth = 480,
  thumbnailHeight = 270,
}) => {
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const xTo = useRef();
  const yTo = useRef();
  
  const [isDesktop, setIsDesktop] = useState(true);
  const [modal, setModal] = useState({ active: false, index: 0 });
  const activeRef = useRef(false);

  useEffect(() => {
    activeRef.current = modal.active;
  }, [modal.active]);

  // Detect desktop vs mobile
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  useGSAP(() => {
    if (!isDesktop || !modalRef.current) return;
    
    gsap.set(modalRef.current, { 
      xPercent: -50, 
      yPercent: -50,
      x: mousePos.current.x,
      y: mousePos.current.y
    });

    xTo.current = gsap.quickTo(modalRef.current, "x", { duration: 0.6, ease: "power3.out" });
    yTo.current = gsap.quickTo(modalRef.current, "y", { duration: 0.6, ease: "power3.out" });

    const updateTick = () => {
      if (activeRef.current) {
        xTo.current(mousePos.current.x);
        yTo.current(mousePos.current.y);
      }
    };

    gsap.ticker.add(updateTick);
    return () => gsap.ticker.remove(updateTick);
  }, [isDesktop]);

  useGSAP(() => {
    if (!isDesktop || !modalRef.current) return;

    gsap.to(modalRef.current, {
      scale: modal.active ? 1 : 0,
      opacity: modal.active ? 1 : 0,
      duration: 0.5,
      ease: "expo.out"
    });
  }, [modal.active, isDesktop]);

  if (isDesktop) {
    return (
      <div
        ref={containerRef}
        onMouseLeave={() => setModal({ active: false, index: 0 })}
        className={cn("relative flex flex-col w-full", className)}
      >
        <div className="flex flex-col w-full">
          {projects.map((project, index) => (
            <Link
              key={index}
              to={`/projects/${createSlug(project.title)}`}
              onMouseEnter={(e) => {
                if (xTo.current && yTo.current) {
                  xTo.current(e.clientX);
                  yTo.current(e.clientY);
                }
                setModal({ active: true, index });
              }}
              className={cn(
                "w-full flex flex-col md:flex-row md:items-center justify-between px-6 md:px-12 py-12 cursor-pointer transition-all duration-300 hover:bg-slate-50",
              )}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-3 md:mb-0">
                <TextBlock blockColor="#2563eb">{project.title}</TextBlock>
              </h2>
            </Link>
          ))}
          <div className="w-full h-px" />
        </div>

        {/* Thumbnail Modal - Viewport relative */}
        <div
          ref={modalRef}
          className="pointer-events-none fixed left-0 top-0 z-100 overflow-hidden shadow-2xl border border-white/20"
          style={{
            width: thumbnailWidth,
            height: thumbnailHeight,
            opacity: 0,
            willChange: "transform, opacity",
          }}
        >
          <div
            className="relative w-full h-full transition-transform duration-500 ease-out"
            style={{
              transform: `translateY(${-modal.index * 100}%)`,
            }}
          >
            {projects.map((project, index) => (
              <div key={index} className="w-full h-full shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Mobile version
  return (
    <div className={cn("flex flex-col w-full", className)}>
      {projects.map((project, index) => (
        <Link
          key={index}
          to={`/projects/${createSlug(project.title)}`}
          className="flex flex-col"
        >
          <div className="w-full px-6 py-8 active:bg-slate-50 transition-colors">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
              <TextBlock blockColor="#2563eb">{project.title}</TextBlock>
            </h2>
            <p className="text-slate-500 text-base font-medium line-clamp-2 mb-6">
              <TextBlock blockColor="#cbd5e1" className="block">
                {project.desc}
              </TextBlock>
            </p>
            <div className="w-full aspect-video overflow-hidden border border-slate-400">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectHoverSection;
