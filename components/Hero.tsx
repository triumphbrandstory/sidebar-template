import Link from "next/link";

export function Hero() {
  return (
    <div className="flex h-full max-w-[420px] flex-1 items-center justify-center">
      <Link href="/">
        <h1 className="text-center text-[2.5rem] font-bold leading-tight text-white">MEMORY LAKE</h1>
      </Link>
    </div>
  );
}
