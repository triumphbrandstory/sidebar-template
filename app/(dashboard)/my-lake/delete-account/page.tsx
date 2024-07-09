"use client";
import { Button } from "@/components/ui/button";
import { MyLakeLeftColumn } from "../../_components/my-lake/left-column";
import { UserMenuBase } from "../../_components/user-menu-base";
import { FormWrapper } from "@/app/(landing)/_components/form-wrapper/form-wrapper";
import Link from "next/link";

export default function DeleteAccountPage() {
  async function deleteAccount() {
    // "use server";
    // TODO: delete user account and logout
    console.log("Not deleted yet");
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <MyLakeLeftColumn />
      {/* right column */}
      <div className="flex h-screen w-full flex-col items-start justify-between">
        <div className="mb-2 mr-12 mt-12 self-end">
          <UserMenuBase />
        </div>
        <div className="flex h-full w-full place-items-center justify-center">
          <FormWrapper title="Delete account">
            <form action={deleteAccount}>
              <div className="flex flex-col items-center gap-4 px-10 py-6">
                <p className="text-lake-blue">
                  Are you sure you want to delete your account? <br />
                  Your data will be lost forever.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    // type="submit"
                    // TODO: delete account and redirect to home signed out
                    onClick={() => alert("Not hooked up yet")}
                  >
                    yes
                  </Button>
                  <Button asChild>
                    <Link href="/my-lake/overview">nevermind</Link>
                  </Button>
                </div>
              </div>
            </form>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}
