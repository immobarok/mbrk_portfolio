import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import sleepingIcon from "@/assets/icons/sleeping.png";
import { useEffect, useState } from "react";
import { SheetMenu } from "./_components/SheetMenu";
import { AnimatedButton } from "./_components/AnimatedButton";

const MIN_SIZE = 86;
const MAX_SIZE = 350;

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const onScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  interface TimeFormatOptions extends Intl.DateTimeFormatOptions {
    hour: "numeric";
    minute: "2-digit";
    second: "2-digit";
    hour12: true;
  }

  const formatTime = (date: Date): string =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    } as TimeFormatOptions);

  const isWorkingHours = () => {
    const currentHour = currentTime.getHours();
    return currentHour >= 9 || currentHour < 2;
  };

  // Smoother industrial interpolation
  const maxScroll = 400;
  const scrollPercent = Math.min(scrollY / maxScroll, 1);

  // Animate font size, blur, spacing, opacity
  const fontSize = MAX_SIZE - (MAX_SIZE - MIN_SIZE) * scrollPercent;
  const opacity = 1 - 0.2 * scrollPercent;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-start justify-between px-8 transition-all duration-500 ease-in-out ${
        scrollY > 50 ? "py-2" : "bg-transparent"
      }`}
    >
      <section>
        <h1
          className="font-black tracking-tight text-accent"
          style={{
            fontSize: `${fontSize}px`,
            letterSpacing: scrollPercent > 0 ? "0.06em" : "-0.02em",
            opacity: opacity,
            fontWeight: 900,
            textShadow: "0 6px 18px rgba(0,0,0,0.45)",
            WebkitTextStroke: "0.6px rgba(0,0,0,0.12)",
            transition:
              "font-size 0.9s cubic-bezier(.65,.03,.29,1), filter 0.7s, letter-spacing 0.8s cubic-bezier(.41,.73,.79,.31), opacity 0.6s",
            willChange: "font-size, filter, letter-spacing, opacity",
          }}
        >
          MBRK
        </h1>
      </section>
      <section className="flex items-end justify-start space-y-2 gap-4 py-6">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-accent">Currently</span>
          <span className="font-medium text-accent">
            {isWorkingHours() ? "working" : ""}
          </span>
          {isWorkingHours() ? (
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          ) : (
            <img src={sleepingIcon} alt="Sleeping" className="w-4 h-4" />
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col gap-1">
            <p className="text-lg sm:text-xl font-medium text-accent">
              {formatTime(currentTime)}
            </p>
            <p className="text-sm text-accent">(GMT+6)</p>
          </div>
          <AnimatedButton />
          <SheetMenu />
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
