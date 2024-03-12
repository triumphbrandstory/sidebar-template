"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import axios, { AxiosResponse } from "axios";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema, type TSignUpFormSchema } from "./schema";
// import { signIn } from "next-auth/react";

export function SignUpForm() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,

    reset,
  } = useForm<TSignUpFormSchema>({ resolver: zodResolver(signUpFormSchema) });

  async function onSubmit(data: TSignUpFormSchema) {
    const { name, email, password } = data;

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const response = await axios.post("/api/signup", {
      name,
      email,
      hashedPassword,
    });

    if (response.data.errors) {
      const errors = response.data.errors;
      if (errors.name) {
        setError("name", {
          type: "server",
          message: errors.name,
        });
      } else if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      } else if (errors.repeatPassword) {
        setError("repeatPassword", {
          type: "server",
          message: errors.repeatPassword,
        });
      } else {
        setError("root", {
          type: "server",
          message: "Sorry there was an error creating your user :(",
        });
      }
    }
    if (response.data.success) {
      // const signInResponse = await signIn("credentials", {
      //   email,
      //   password,
      //   redirect: false,
      // });
      const signInResponse = { ok: true, error: false };
      if (signInResponse && signInResponse.ok && !signInResponse.error) {
        push("/my-lake");
      } else {
        setError("root", { type: "login", message: `login: ${signInResponse?.error}` });
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 px-10 py-6" id="form-content">
      <GoogleSignInButton />
      <span className="text-lake-blue">or</span>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start space-y-5" id="form-inputs">
        <div className="flex w-full gap-2" id="name-input">
          <label htmlFor="name" className="text-lake-blue uppercase">
            name
          </label>
          <input {...register("name")} type="text" id="name" className="bg-lake-gray-input text-lake-blue flex-1 px-1" />
        </div>
        {errors.name && <p className="text-xs uppercase text-red-700">{`${errors.name.message}`}</p>}
        <div className="flex w-full gap-2" id="email-input">
          <label htmlFor="email" className="text-lake-blue uppercase">
            e-mail
          </label>
          <input {...register("email")} type="email" id="email" className="bg-lake-gray-input text-lake-blue flex-1 px-1" />
        </div>
        {errors.email && <p className="text-xs uppercase text-red-700">{`${errors.email.message}`}</p>}
        <div className="flex w-full gap-2" id="password-input">
          <label htmlFor="password" className="text-lake-blue uppercase">
            password
          </label>
          <input {...register("password")} type="password" id="password" className="bg-lake-gray-input text-lake-blue flex-1 px-1" />
        </div>
        {errors.password && <p className="text-xs uppercase text-red-700">{`${errors.password.message}`}</p>}
        <div className="flex w-full gap-2" id="repeat-password-input">
          <label htmlFor="repeat-password" className="text-lake-blue uppercase">
            repeat password
          </label>
          <input {...register("repeatPassword")} type="password" id="repeat-password" className="bg-lake-gray-input text-lake-blue flex-1 px-1" />
        </div>
        {errors.repeatPassword && <p className="text-xs uppercase text-red-700">{`${errors.repeatPassword.message}`}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="border-lake-blue text-lake-blue hover:bg-lake-blue/75 self-center rounded-full border-2 px-3 py-1 uppercase hover:text-white"
        >
          {isSubmitting ? "loading" : "sign up"}
        </button>
        {errors.root && <p className="text-xs uppercase text-red-700">{`${errors.root.message}`}</p>}
      </form>
    </div>
  );
}
