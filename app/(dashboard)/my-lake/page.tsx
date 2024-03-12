import Link from "next/link";

export default function MyLakePage() {
  return (
    <main className="flex h-full w-full flex-col items-center z-10">
      <div className="border-b-lake-blue flex w-full flex-1 items-center justify-center border-b-2">
        <h1 className="text-lake-blue uppercase pointer-events-none">all memories</h1>
      </div>

      <div className="self-start px-12 py-12 w-full bg-white">
        <Link
          href={`/memory/2`}
          className="border-lake-blue text-lake-blue hover:bg-lake-blue/75 inline-block rounded-full border-2 px-3 py-1 uppercase hover:text-white"
        >
          see what emerges
        </Link>
      </div>
    </main>
  );
}
