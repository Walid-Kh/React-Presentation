import {
  KeyboardEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { slide } from "../util/slide";
interface SlideProps {
  children?: ReactNode;
  reversed?: boolean;
  vertical?: boolean;
}
/* 

     */
export const Slide = ({ children, reversed, vertical }: SlideProps) => {
  useEffect(() => {
    // @ts-expect-error
    const eventHandler = (e) => {
      if (!e.shiftKey && (e.key === "ArrowDown" || e.key === "s"))
        slide("down");
      else if (!e.shiftKey && (e.key === "ArrowUp" || e.key === "w"))
        slide("up");
    };
    if (document.body.clientWidth > 800) {
      window.addEventListener("keydown", (e) => {
        if (
          [
            "Space",
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "PageDown",
            "PageUp",
          ].indexOf(e.code) > -1
        ) {
          e.preventDefault();
        }
      });
      return window.addEventListener("keydown", eventHandler);
    } else {
      window.removeEventListener("keydown", eventHandler);
    }
  }, []);
  return (
    <section
      className={`md:w-full md:h-screen gap-8 md:gap-4
      flex slide items-center justify-center p-4 w-full overflow-clip
      ${vertical ? "md:flex-col" : ""}
      ${reversed ? "md:flex-row-reverse" : "md:flex-row"}
      flex-col max-w-[1200px] m-auto
      `}
    >
      {children}
    </section>
  );
};
