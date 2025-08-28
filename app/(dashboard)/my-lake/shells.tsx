"use client";
import {
  randomizeShell,
  randomizeShellLeftPosition,
  randomizeShellRotate,
  randomizeShellTopPosition,
} from "@/utils/shells";
import { HTMLMotionProps, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ComponentProps, MutableRefObject, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type ShellsProps = {
  seeableMemories: {
    byUser: { id: string }[];
    toUser: { id: string }[];
    total: number;
  };
  totalMemories: number;
};

export function Shells({ seeableMemories, totalMemories }: ShellsProps) {
  const shellsContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const unseeableMemories = totalMemories - seeableMemories.total;
  const openableMemories = seeableMemories.byUser.concat(
    seeableMemories.toUser,
  );

  return (
    <div ref={shellsContainerRef} className="absolute inset-0 w-full">
      {Array.from({ length: unseeableMemories }).map((_, index) => (
        <Shell
          key={index}
          src={randomizeShell()}
          alt="memory shell"
          className="w-36 opacity-50 md:w-56"
          top={randomizeShellTopPosition()}
          left={randomizeShellLeftPosition()}
          rotate={randomizeShellRotate()}
          shellsContainerRef={shellsContainerRef}
        />
      ))}
      {openableMemories.map((memory) => (
        <Shell
          key={memory.id}
          src={randomizeShell()}
          onClick={() => router.push(`/my-lake/memory/${memory.id}`)}
          alt="memory shell"
          className="w-36 cursor-pointer md:w-56"
          shellsContainerRef={shellsContainerRef}
          top={randomizeShellTopPosition()}
          left={randomizeShellLeftPosition()}
          rotate={randomizeShellRotate()}
        />
      ))}
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
  onClick,
  ...props
}: ShellProps) {
  const [zIndex, setZIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (isDragging) {
      e.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(e as any);
    }
  };

  return (
    <motion.img
      drag={true}
      dragConstraints={shellsContainerRef}
      // value from 0 to 1
      dragElastic={1}
      dragMomentum={true}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setTimeout(() => setIsDragging(false), 100);
      }}
      src={props.src}
      alt={props.alt}
      className={twMerge("absolute h-auto w-[200px]", className)}
      style={{ top, left, rotate, zIndex }}
      onMouseDown={updateZIndex}
      onClick={handleClick}
      id="shell-image"
      {...props}
    />
  );
}
