import React from 'react'
import Link from "next/link";
import { homePath, ticketsPath } from "@/app/paths";
import { buttonVariants } from "@/components/ui/button";
import { LucideKanban } from "lucide-react";
import { ThemeSwitcher } from './theme/theme-switcher';

const Navbar = () => {
  return (
    <nav
      className="
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
      <div className='flex align-items gap-x-2'>
        <ThemeSwitcher />
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "default" })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
}

export {Navbar}
