import React from "react";
import { TextBlock } from "./TextBlockEffect";

const PageBanner = ({
  title,
  subtitle,
  titleColor = "#2563eb",
  subtitleColor = "#94a3b8",
  backgroundImage,
  lang = "ar",
}) => {
  return (
    <section className="relative py-24 px-6 md:px-12 overflow-hidden">


      <div className="relative z-10 max-w-3xl">
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tighter leading-tight text-slate-900 mb-8">
          <TextBlock blockColor={titleColor} className="block">
            {title}
          </TextBlock>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl">
          <TextBlock blockColor={subtitleColor} className="block">
            {subtitle}
          </TextBlock>
        </p>
      </div>
    </section>
  );
};

export default PageBanner;
