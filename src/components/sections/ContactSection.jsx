import React from "react";
import { TextBlock } from "../ui/TextBlockEffect";
import Button from "../ui/Button";
import { GithubIcon, WhatsappIcon, InstagramIcon } from "../ui/BrandIcons";

const ContactSection = ({ personal, sections, lang }) => {
  return (
    <section id="contact" className="pt-24 pb-12 md:py-24 px-6 md:px-12 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-black tracking-tighter mb-8 leading-[1.1] text-slate-900 flex flex-col items-start">
            {sections.letsBuild.split("\n").map((line, i) => (
              <TextBlock key={i} blockColor="#2563eb" className="block">
                {line}
              </TextBlock>
            ))}
          </h2>
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-3 text-base md:text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <i className="ri-mail-line"></i>
            {personal.email}
            <span className="material-symbols-sharp text-[20px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
              arrow_outward
            </span>
          </a>
        </div>

        <div className="flex flex-col items-start md:items-end gap-8">
          <div className="flex gap-0 overflow-hidden">
            <Button
              href={personal.socials.github}
              external
              variant="social"
              shape="squareIcon"
              className="hover-github"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </Button>
            <Button
              href={personal.socials.whatsapp}
              external
              variant="social"
              shape="squareIcon"
              className="hover-whatsapp"
              aria-label="WhatsApp"
            >
              <WhatsappIcon className="w-5 h-5" />
            </Button>
            <Button
              href={personal.socials.instagram}
              external
              variant="social"
              shape="squareIcon"
              className="hover-instagram"
              aria-label="Instagram Profile"
            >
              <InstagramIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
