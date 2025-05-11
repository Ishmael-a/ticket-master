import Link from "next/link";
import { cloneElement } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { closedClassName } from "../constants";
import { NavItem } from "../types";
import { Separator } from "@/components/ui/separator";

type SidebarItemProps = {
  isOpen: boolean;
  isActive: boolean;
  navItem: NavItem;
};

const SidebarItem = ({ isOpen, isActive,  navItem }: SidebarItemProps) => {

  return (
    <>
      {navItem.separator && <Separator />}
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "hidden group relative md:flex h-12 justify-start",
          isActive && "bg-muted font-bold hover:bg-muted"
        )}
      >
        {cloneElement(navItem.icon, {
          className: "h-5 w-5",
        })}
        <span
          className={cn(
            "absolute left-12 text-base duration-200",
            isOpen ? "md:block hidden" : "w-[78px]",
            !isOpen && closedClassName
          )}
        >
          {navItem.title}
        </span>
      </Link>
      <Link
        href={navItem.href}
        className={cn(
          isActive
            ? buttonVariants({ variant: "default" })
            : buttonVariants({ variant: "ghost" }),
          "md:hidden group flex flex-col h-14 items-center justify-center",
          isActive ? "bg-muted font-bold" : "text-muted-foreground"
        )}
      >
        {cloneElement(navItem.icon, {
          className: "h-5 w-5",
        })}
        <span
          className={cn(
            " text-xs duration-200",
            "transition-all duration-300 "
          )}
        >
          {navItem.title}
        </span>
      </Link>
    </>
  );
};

export { SidebarItem };
