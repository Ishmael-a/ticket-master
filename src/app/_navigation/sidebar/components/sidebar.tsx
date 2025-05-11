"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { mobileNavItems, navItems } from "../constants";
import { SidebarItem } from "./sidebar-item";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { getActivePath } from "@/utils/get-active-path";
import { usePathname } from "next/navigation";
import { signInPath, signUpPath } from "@/app/paths";

const Sidebar = () => {
    const { user, isFetched } = useAuth();
    const pathname = usePathname();

    const { activeIndex } = getActivePath(pathname, navItems.map((item) => item.href), [signInPath(), signUpPath()])

  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

    if (!user || !isFetched) {
        return <div className="md:w-[78px] bg-secondary/20"></div>;
    }

  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        className={cn(
          "animate-sidebar-from-left",
          "hidden md:block h-screen border-r pt-24",
          isTransition && "duration-200",
          isOpen ? "md:w-60 w-[78px]" : "w-[78px]"
        )}
        onMouseEnter={() => handleToggle(true)}
        onMouseLeave={() => handleToggle(false)}
      >
        <div className="px-3 py-2">
          <nav className="space-y-2">
            {navItems.map((navItem, index) => (
              <SidebarItem
                key={navItem.title}
                isOpen={isOpen}
                isActive={activeIndex === index}
                navItem={navItem}
              />
            ))}
          </nav>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={cn(
          "animate-sidebar-from-bottom",
          "md:hidden fixed border-t h-[60px] bottom-0 inset-x-0 z-10 px-3  bg-secondary"
        )}
      >
        <nav className="flex flex-1 justify-between items-center">
          {mobileNavItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.title}
              isOpen={true}
              isActive={activeIndex === index}
              navItem={navItem}
            />
          ))}
        </nav>
      </nav>
    </>
  );
};

export { Sidebar };
