"use client";
import { HTMLMotionProps, motion } from "framer-motion";
import { ComponentProps, MutableRefObject, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export function Shells() {
  const shellsContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={shellsContainerRef} className="absolute inset-0 w-full">
      <Shell
        src="/shells/shell1.png"
        alt="memory shell"
        className="w-36 md:w-56"
        top={"0%"}
        left={"55%"}
        rotate={"4deg"}
        shellsContainerRef={shellsContainerRef}
      />
      <Shell
        src="/shells/shell2.png"
        alt="memory shell"
        className="w-36 md:w-56"
        top={"0%"}
        left={"55%"}
        rotate={"15deg"}
        shellsContainerRef={shellsContainerRef}
      />
      <Shell
        src="/shells/shell3.png"
        alt="memory shell"
        className="w-36 md:w-56"
        top={"15%"}
        left={"55%"}
        rotate={"4deg"}
        shellsContainerRef={shellsContainerRef}
      />
      <Shell
        src="/shells/shell4.png"
        alt="memory shell"
        className="w-36 md:w-56"
        top={"30%"}
        left={"55%"}
        rotate={"4deg"}
        shellsContainerRef={shellsContainerRef}
      />
      <Shell
        src="/shells/shell5.png"
        alt="memory shell"
        className="w-36 md:w-56"
        top={"0%"}
        left={"55%"}
        rotate={"4deg"}
        shellsContainerRef={shellsContainerRef}
      />
    </div>
  );
}

type ShellProps = {
  shellsContainerRef: MutableRefObject<HTMLDivElement | null>;
  top?: string;
  left?: string;
  rotate?: string;
} & ComponentProps<"img"> &
  HTMLMotionProps<"img">;

function Shell({
  shellsContainerRef,
  left = "30%",
  rotate = "0deg",
  top = "40%",
  className,
  ...props
}: ShellProps) {
  const [zIndex, setZIndex] = useState(1);

  function updateZIndex() {
    const shellImages = document.querySelectorAll("#shell-image");
    let maxZIndex = 1;

    shellImages.forEach((shellImage) => {
      let zIndex = parseInt(
        window.getComputedStyle(shellImage).getPropertyValue("z-index"),
      );
      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });
    setZIndex(maxZIndex + 1);
  }

  return (
    <motion.img
      drag={true}
      dragConstraints={shellsContainerRef}
      // value from 0 to 1
      dragElastic={1}
      dragMomentum={true}
      src={props.src}
      alt={props.alt}
      className={twMerge("absolute h-auto w-[200px]", className)}
      style={{ top, left, rotate, zIndex }}
      onMouseDown={updateZIndex}
      id="shell-image"
      {...props}
    />
  );
}
