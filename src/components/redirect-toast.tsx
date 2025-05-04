"use client";
import React from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

const RedirectToast = () => {
  const pathname = usePathname();

  React.useEffect(() => {

    const showCookieToast = async () => {
      const response = await fetch(`/api/cookies?key=toast`)

      const data = await response.json();

      if (data.value) {
        toast.success(data.value);

        await fetch(`/api/cookies?key=toast`, {
          method: "DELETE",
        });
      }
    };

    showCookieToast();
  }, [pathname]);

  return null;
};

export { RedirectToast };
