import Link from "next/link";
import { ticketsPath } from "@/app/paths";
import { Heading } from "@/components/heading";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title={"HomePage"} description={"This Is The Home Page"} />

      <div className="flex flex-col items-center">
        <Link href={ticketsPath()} className="underline">
          Go To The Tickets Page
        </Link>
      </div>
    </div>
  );
}
