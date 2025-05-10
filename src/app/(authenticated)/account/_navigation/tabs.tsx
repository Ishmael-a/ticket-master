"use client";

import { accountPasswordPath, accountProfilePath } from "@/app/paths";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AccountTabs = () => {
  const pathname = usePathname();

  return (
    <Tabs value={pathname.split("/").at(-1)}>
      <TabsList>
        <TabsTrigger value={"profile"} asChild>
          <Link href={accountProfilePath()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger value={"password"} asChild>
          <Link href={accountPasswordPath()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export { AccountTabs };
