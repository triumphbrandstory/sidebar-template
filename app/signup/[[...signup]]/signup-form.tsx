"use client";
import { FormWrapper } from "@/app/(landing)/_components/form-wrapper/form-wrapper";
import { GoogleSignInOrSignUpButton } from "@/components/GoogleSignInOrSignUpButton";
import { Button } from "@/components/ui/button";
import { insertUserUserType } from "@/db/schema";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  createUser,
}: {
  createUser: (user: insertUserUserType) => Promise<boolean>;
}) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const router = useRouter();

  // This function will handle the user submitting their email and password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      setError(null);
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      const isClerkError = isClerkAPIResponseError(err);
      if (isClerkError) {
        setError(err.errors[0].message);
      }
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // This function will handle the user submitting a code for verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      // Submit the code that the user provides to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: confirmationCode,
      });

      if (completeSignUp.status !== "complete") {
        // The status can also be `abandoned` or `missing_requirements`
        // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      // Check the status to see if it is complete
      // If complete, the user has been created -- set the session active
      if (completeSignUp.status === "complete") {
        if (
          !completeSignUp.createdUserId ||
          !completeSignUp.firstName ||
          !completeSignUp.lastName ||
          !completeSignUp.emailAddress
        ) {
          setError("Missing fields");
          return;
        }
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/my-lake");
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      const isClerkError = isClerkAPIResponseError(err);
      if (isClerkError) {
        setError(err.errors[0].message);
      }
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return verifying ? (
    <FormWrapper title="Confirm your email">
      <div className="flex flex-col items-center gap-4 px-10 py-6">
        <p className="text-lake-blue">
          A 6-digit code was sent to <br />
          {emailAddress}
        </p>
        <form
          onSubmit={handleVerify}
          className="flex flex-col items-start space-y-5"
        >
          <div className="flex w-full gap-2" id="confirmationCode-input">
            <label
              htmlFor="confirmationCode"
              className="uppercase text-lake-blue"
            >
              confirmation code
            </label>
            <input
              value={confirmationCode}
              id="confirmationCode"
              name="confirmationCode"
              className="flex-1 bg-lake-gray-input px-1 text-lake-blue"
              maxLength={6}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
          </div>
          <Button type="submit" className="self-center">
            confirm
          </Button>
          {error && <p className="text-xs uppercase text-red-700">{error}</p>}
        </form>
      </div>
    </FormWrapper>
  ) : (
    <FormWrapper title="Sign Up">
      <div
        className="flex flex-col items-center gap-4 px-10 py-6"
        id="form-content"
      >
        <GoogleSignInOrSignUpButton />
        <span className="text-lake-blue">or</span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start space-y-5"
          id="form-inputs"
        >
          <div className="flex w-full gap-2" id="firstName-input">
            <label htmlFor="firstName" className="uppercase text-lake-blue">
              first name
            </label>
            <input
              name="firstName"
              type="text"
              id="firstName"
              className="flex-1 bg-lake-gray-input px-1 text-lake-blue"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex w-full gap-2" id="lastName-input">
            <label htmlFor="lastName" className="uppercase text-lake-blue">
              last name
            </label>
            <input
              name="lastName"
              type="text"
              id="lastName"
              className="flex-1 bg-lake-gray-input px-1 text-lake-blue"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex w-full gap-2" id="email-input">
            <label htmlFor="email" className="uppercase text-lake-blue">
              e-mail
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="flex-1 bg-lake-gray-input px-1 text-lake-blue autofill:text-lake-blue"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>

          <div className="flex w-full gap-2" id="password-input">
            <label htmlFor="password" className="uppercase text-lake-blue">
              password
            </label>
            <input
              type="password"
              id="password"
              className="flex-1 bg-lake-gray-input px-1 text-lake-blue"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={!isLoaded} className="self-center">
            {!isLoaded ? "loading" : "sign up"}
          </Button>
          {error && <p className="text-xs uppercase text-red-700">{error}</p>}
        </form>
      </div>
    </FormWrapper>
  );
}
