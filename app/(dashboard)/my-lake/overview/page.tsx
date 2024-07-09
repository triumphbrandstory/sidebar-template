import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { UserMenuBase } from "../../_components/user-menu-base";
import { Button } from "@/components/ui/button";
import { MyLakeLeftColumn } from "../../_components/my-lake/left-column";
import { SignOutButton } from "../../_components/overview/sign-out-button";
import { OverviewForm } from "../../_components/overview/overview-form";
import { data } from "@/app/data";

export default async function OverviewPage() {
  const result = await data.user_preferences.query.getOverviewPageData();

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left column */}
      <MyLakeLeftColumn />

      <div className="flex h-screen w-full flex-col items-start justify-between">
        <div className="mb-2 mr-12 mt-12 self-end">
          <UserMenuBase />
        </div>
        <OverviewForm
          memoriesCount={result.memoriesCount}
          seenMemoriesCount={result.seenMemoriesCount}
          unseenMemoriesCount={result.unseenMemoriesCount}
          memoriesSharedByUserInLast30DaysCount={
            result.memoriesSharedByUserInLast30DaysCount
          }
          appNotification={result.appNotification}
          emailNotification={result.emailNotification}
        />
        <div className="flex w-full flex-wrap justify-between gap-4 px-12 py-8 xl:gap-0">
          <Button asChild>
            <Link href="/my-lake">
              <ChevronLeft className="mr-1 h-5 w-5" />
              back to your lake
            </Link>
          </Button>
          <div className="flex gap-4">
            <Button asChild>
              <Link href={"/my-lake/delete-account"}>delete account</Link>
            </Button>
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
