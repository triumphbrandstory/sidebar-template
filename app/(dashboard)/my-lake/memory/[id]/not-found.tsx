export default function NotFound() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col gap-2 text-lake-blue">
        <h1 className="font-medium uppercase">
          Apologies, this memory does not yet exist.
          <br />
          Do you want to create it?
        </h1>
        <p className="text-sm font-light">{"(metaphorically or literally)"}</p>
      </div>
    </div>
  );
}
