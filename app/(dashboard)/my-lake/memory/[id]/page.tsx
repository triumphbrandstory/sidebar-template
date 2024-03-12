import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import waterDrop from "@/assets/water-drop.svg";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

type PageParams = {
  params: {
    id: number;
  };
};

export default async function MemoryDetailPage({ params }: PageParams) {
  const id = params.id;
  // const session = await getServerSession(authOptions);

  return (
    <main className="flex h-full w-full flex-col items-start justify-between">
      <div className="flex w-full flex-col" id="form">
        <div
          className="border-b-lake-blue mb-4 grid grid-cols-3 border-b-2"
          id="form-title"
        >
          <h2 className="text-lake-blue col-start-2 mb-4 ml-6 text-xs uppercase">
            #{id}
          </h2>
        </div>
        <div className="border-b-lake-blue mb-4 border-b-2" id="form-title">
          <h2 className="text-lake-blue mb-4 ml-6 text-7xl uppercase">
            peko peko
          </h2>
        </div>
        <div
          className="border-b-lake-blue text-lake-blue mb-4 grid grid-cols-3 border-b-2 pb-4 uppercase"
          id="form-date"
        >
          <h4 className="ml-6 font-semibold">date</h4>
          <h5>nov 12, 2019</h5>
          <h5>10 PM</h5>
        </div>
        <div
          className="border-b-lake-blue text-lake-blue mb-4 grid grid-cols-3 border-b-2 pb-4 uppercase"
          id="form-date"
        >
          <h4 className="ml-6 font-semibold">location</h4>
          <h5 className="uppercase">guadalajara, jalisco</h5>
          <h5 className="uppercase">mexico</h5>
        </div>
        <div className="border-b-lake-blue text-lake-blue mb-4 flex gap-4 border-b-2">
          <p className="ml-6">
            We left Fenix Beds Hotel to explore a Colonia Americana. We tooke
            some pictures at Hera, but had no money to buy us a coffee. When we
            found La Tetería, we entered to drink something and did a list for
            the future. Day finished at Peko Peko with some pictures of us
            bathed by the red lights of the restaurant. Always a joy discover
            new places, flavors and feelings with you.
          </p>
          <textarea
            spellCheck={false}
            maxLength={500}
            name="description"
            id="description"
            className="placeholder:text-lake-blue ml-6 h-[12ch] flex-1 resize-none border-none text-xl focus:outline-none focus:ring-0"
            placeholder="About what happened"
          />
        </div>

        <div className="border-b-lake-blue text-lake-blue mb-4 grid grid-cols-3 gap-4 border-b-2 pb-4">
          <label
            htmlFor="email"
            className="tex-sm text-lake-blue ml-6 self-start font-semibold uppercase"
          >
            in a bottle to
          </label>
          <p className="uppercase">pdrmenezes1@gmail.com</p>
        </div>
      </div>
      <div className="flex w-full justify-between px-12 py-12">
        <Link
          href="/my-lake"
          className="border-lake-blue text-lake-blue hover:bg-lake-blue/75 flex items-center justify-center gap-1 rounded-full border-2 px-3 py-1 uppercase hover:text-white"
        >
          <MoveLeft />
          back to your memories
        </Link>
        <Link
          href={`/memories/send`}
          className="border-lake-blue text-lake-blue hover:bg-lake-blue/75 group flex items-center justify-center gap-1 rounded-full border-2 px-3 py-1 uppercase hover:text-white"
        >
          <Image
            className="group-hover:brightness-0 group-hover:invert"
            src={waterDrop}
            alt="water drop icon"
          />{" "}
          send in a bottle
        </Link>
      </div>
    </main>
  );
}
