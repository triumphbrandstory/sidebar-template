import { AuthenticateButtons } from "@/components/AuthenticateButtons";
import { HomeLeftColumn } from "./(landing)/_components/home/left-column";

export default async function Home() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <HomeLeftColumn />
      <div className="flex flex-col items-center justify-between gap-12 bg-white px-12 py-12 md:max-h-screen xl:gap-0">
        <AuthenticateButtons />
        <div className="flex h-full flex-col items-center justify-center md:px-8">
          <div className="place-items-center space-y-5 text-lake-blue">
            <p>
              In computer science, a data lake is a centralized repository
              designed to store, process, and secure large amounts of
              structured, semistructured, and unstructured data. It can store
              data in its native format and process any variety of it.
            </p>
            <p>
              It means data lakes and our memories share things in common — both
              data and mementos can emerge depending on the input or moment we
              live in the present.
            </p>
            <p>
              MEMORY LAKE is a digital repository for personal mementos. If
              memories of past meet us for what we experience in the present,
              the lake is the possibility of getting in touch with endearing
              moments more often.
            </p>
            <hr className="my-4 h-0.5 w-1/3 bg-lake-blue" />
            <p>“In the present if you will, in the present to continue.”</p>
            <p>– Francis Allÿs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
