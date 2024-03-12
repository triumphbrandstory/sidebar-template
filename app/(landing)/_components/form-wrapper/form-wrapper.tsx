import { PropsWithChildren } from "react";

type FormWrapperProps = {
  title: string;
} & PropsWithChildren;

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className="border-2 border-lake-blue">
      <div className="border-b-2 border-lake-blue py-2 pl-2">
        <h2 className="uppercase text-lake-blue">{title}</h2>
      </div>
      {children}
    </div>
  );
}
