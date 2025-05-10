"use client";

import Link from "next/link";
import { homePath, signInPath, signUpPath } from "@/app/paths";
import { buttonVariants } from "@/components/ui/button";
import { LucideKanban } from "lucide-react";
import { ThemeSwitcher } from "../../components/theme/theme-switcher";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { AccountDropdown } from "./account-dropdown";

const Navbar = () => {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <AccountDropdown user={user} />
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign In
      </Link>
    </>
  );
  return (
    <nav
      className="
          animate-header-from-top
          animate-header-from-top
          supports-backdrop-blur:bg-background/60
          fixed left-0 right-0 top-0 z-20
          bg-background/95 backdrop-blur
          w-full flex justify-between py-2.5 px-5 border-b
        "
    >
      <div>
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h2 className="ml-2 text-lg font-semibold">TicketMaster</h2>
        </Link>
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Navbar };
