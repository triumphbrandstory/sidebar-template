import { ChevronLeft, Fish } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MyLakeLeftColumn } from "@/app/(dashboard)/_components/my-lake/left-column";
import { UserMenuBase } from "@/app/(dashboard)/_components/user-menu-base";

type PageParams = {
  params: {
    id: number;
  };
};

export default async function MemoryDetailPage({ params }: PageParams) {
  const id = params.id;

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <MyLakeLeftColumn />
      <div className="flex h-full w-full flex-col items-start justify-between">
        <div className="mb-2 mr-12 mt-12 self-end">
          <UserMenuBase />
        </div>

        <div className="flex h-full w-full flex-col items-start justify-between">
          <div className="flex w-full flex-col" id="form">
            <div
              className="mb-4 grid grid-cols-3 border-b-2 border-b-lake-blue"
              id="form-title"
            >
              <h2 className="col-start-2 mb-4 ml-6 text-xs uppercase text-lake-blue">
                #{id}
              </h2>
            </div>
            <div className="mb-4 border-b-2 border-b-lake-blue" id="form-title">
              <h2 className="mb-4 ml-6 text-7xl uppercase text-lake-blue">
                peko peko
              </h2>
            </div>
            <div
              className="mb-4 grid grid-cols-3 border-b-2 border-b-lake-blue pb-4 uppercase text-lake-blue"
              id="form-date"
            >
              <h4 className="ml-6 font-semibold">date</h4>
              <h5>nov 12, 2019</h5>
              <h5>10 PM</h5>
            </div>
            <div
              className="mb-4 grid grid-cols-3 border-b-2 border-b-lake-blue pb-4 uppercase text-lake-blue"
              id="form-date"
            >
              <h4 className="ml-6 font-semibold">location</h4>
              <h5 className="uppercase">guadalajara, jalisco</h5>
              <h5 className="uppercase">mexico</h5>
            </div>
            <div className="mb-4 flex gap-4 border-b-2 border-b-lake-blue text-lake-blue">
              <p className="ml-6">
                We left Fenix Beds Hotel to explore a Colonia Americana. We
                tooke some pictures at Hera, but had no money to buy us a
                coffee. When we found La Tetería, we entered to drink something
                and did a list for the future. Day finished at Peko Peko with
                some pictures of us bathed by the red lights of the restaurant.
                Always a joy discover new places, flavors and feelings with you.
              </p>
              <textarea
                spellCheck={false}
                maxLength={500}
                name="description"
                id="description"
                className="ml-6 h-[12ch] flex-1 resize-none border-none text-xl placeholder:text-lake-blue focus:outline-none focus:ring-0"
                placeholder="About what happened"
              />
            </div>

            <div className="mb-4 grid grid-cols-3 gap-4 border-b-2 border-b-lake-blue pb-4 text-lake-blue">
              <label
                htmlFor="email"
                className="tex-sm ml-6 self-start font-semibold uppercase text-lake-blue"
              >
                in a bottle to
              </label>
              <p className="uppercase">friend@email.com</p>
            </div>
          </div>
          <div className="flex w-full justify-between px-12 py-12">
            <Button asChild>
              <Link href="/my-lake">
                <ChevronLeft className="mr-1 h-5 w-5" />
                back to your lake
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/memories/send`}>
                <Fish className="mr-1 h-5 w-5" />
                send in a bottle
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
