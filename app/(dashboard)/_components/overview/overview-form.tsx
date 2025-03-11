"use client";
import waterDrop from "@/assets/water-drop.svg";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { formatDateToShort } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { useState, useTransition } from "react";

type OverviewFormProps = {
  memoriesCount: number;
  unseenMemoriesCount: number;
  seenMemoriesCount: number;
  memoriesSharedByUserInLast30DaysCount: number;
  appNotification: boolean | null;
  emailNotification: boolean | null;
};

export function OverviewForm({
  memoriesCount,
  seenMemoriesCount,
  unseenMemoriesCount,
  memoriesSharedByUserInLast30DaysCount,
  appNotification,
  emailNotification,
}: OverviewFormProps) {
  const { user } = useClerk();
  const { toast } = useToast();
  const [isAppNotificationPending, startAppNotificationTransition] =
    useTransition();
  const [isEmailNotificationPending, startEmailNotificationTransition] =
    useTransition();
  const [appNotificationState, setAppNotificationState] = useState<boolean>(
    appNotification || false,
  );
  const [emailNotificationState, setEmailNotificationState] = useState<boolean>(
    emailNotification || false,
  );

  const handleNotificationChange = async (
    field: "app_notification" | "email_notification",
    value: boolean,
  ) => {
    try {
      // optimistic update
      if (field === "app_notification") {
        setAppNotificationState(value);
      } else {
        setEmailNotificationState(value);
      }

      const formData = new FormData();
      formData.append("field", field);
      formData.append("value", value.toString());

      const startTransition =
        field === "app_notification"
          ? startAppNotificationTransition
          : startEmailNotificationTransition;

      startTransition(async () => {
        const response = await fetch("/api/user-preferences", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to update preferences");
        }
      });

      toast({
        title: "Preferences updated",
        description: `${field === "app_notification" ? "Desktop" : "Email"} notifications ${value ? "enabled" : "disabled"}.`,
      });
    } catch (error) {
      console.error("Failed to update preferences:", error);
      toast({
        title: "Error",
        description: "Failed to update notification preferences.",
        variant: "destructive",
      });

      // revert optimistic update on error
      if (field === "app_notification") {
        setAppNotificationState(!value);
      } else {
        setEmailNotificationState(!value);
      }
    }
  };

  return (
    <div
      className="flex h-full w-full flex-col justify-start overflow-y-visible sm:overflow-y-auto"
      id="form"
    >
      <div className="border-b-2 border-b-lake-blue" id="form-title">
        <h2 className="pb-4 pl-6 text-7xl uppercase text-lake-blue">
          {user?.firstName}&apos;s lake
        </h2>
      </div>
      <div
        className="grid grid-cols-3 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
        id="form-date"
      >
        <h4 className="pl-6 font-semibold">registered in</h4>
        {user?.createdAt && <h5>{formatDateToShort(user?.createdAt)}</h5>}
      </div>
      <div
        className="grid grid-cols-3 grid-rows-2 gap-2 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
        id="form-date"
      >
        <h4 className="col-span-1 row-span-1 pl-6 font-semibold">
          <Image src={waterDrop} alt="water drop icon" />
        </h4>
        <h5 className="col-span-full col-start-2">
          {memoriesCount} mementos in your memory lake
        </h5>
        <span className="col-span-full col-start-2 text-xs uppercase text-lake-gray">
          {seenMemoriesCount} emerged / {unseenMemoriesCount} to meet you in the
          future
        </span>
      </div>
      <div
        className="grid grid-cols-3 grid-rows-2 gap-2 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
        id="form-date"
      >
        <h4 className="col-span-1 row-span-1 pl-6 font-semibold uppercase">
          bottles sent
        </h4>
        <h5 className="col-span-full col-start-2">
          {memoriesSharedByUserInLast30DaysCount}/3
        </h5>
        <span className="col-span-full col-start-1 whitespace-pre-line pl-6 pr-4 text-xs uppercase text-lake-gray">
          you can send up to 3 bottles each 30 days. if the person does not have
          a memory lake account, the bottle will be sent via email
        </span>
      </div>
      <div
        className="grid grid-cols-3 grid-rows-2 gap-2 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
        id="form-date"
      >
        <h4 className="col-span-1 row-span-1 pl-6 font-semibold uppercase">
          receive memories
        </h4>
        <h5 className="col-start-2 uppercase">via desktop</h5>
        <label className="relative col-start-3 inline-flex cursor-pointer items-center">
          <Switch
            checked={appNotificationState}
            onCheckedChange={async (checked) => {
              await handleNotificationChange("app_notification", checked);
            }}
            disabled={isAppNotificationPending}
          />
        </label>
        <h5 className="col-start-2 row-start-2 uppercase">via e-mail</h5>
        <label className="relative col-start-3 row-start-2 inline-flex cursor-pointer items-center">
          <Switch
            checked={emailNotificationState}
            onCheckedChange={async (checked) => {
              await handleNotificationChange("email_notification", checked);
            }}
            disabled={isEmailNotificationPending}
          />
        </label>
      </div>
      <div
        className="grid grid-cols-3 grid-rows-2 gap-2 border-b-2 border-b-lake-blue py-4 pb-4 uppercase text-lake-blue"
        id="form-date"
      >
        <h4 className="col-span-1 row-span-1 pl-6 font-semibold uppercase">
          email
        </h4>
        {user?.primaryEmailAddress?.emailAddress && (
          <h5 className="col-start-2 uppercase">
            {user.primaryEmailAddress?.emailAddress}
          </h5>
        )}
        <h4 className="col-span-1 row-start-2 pl-6 font-semibold uppercase">
          password
        </h4>
        <h5 className="col-start-2 uppercase">
          last changed: {user?.updatedAt && formatDateToShort(user?.updatedAt)}
        </h5>
      </div>
    </div>
  );
}
