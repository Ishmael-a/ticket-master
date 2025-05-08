import { Heading } from "@/components/heading";
import { Suspense } from "react";
import TicketList from "@/features/tickets/components/ticket-list";
import { Spinner } from "@/components/spinner";
import { ErrorBoundary } from "react-error-boundary";
import { NotFound } from "@/components/not-found";
import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/features/tickets/components/ticket-upsert-form";
import { getAuth } from "@/features/auth/actions/get-auth";


// export const dynamic = "force-dynamic";

// Time-Based Caching(Incremental Static Regeneration)
// export const revalidate = 30;

const TicketsPage = async () => {
  const { user } = await getAuth();

  return (
    <>
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title={"My Tickets"}
        description={"All your tickets at one place"}
      />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created."
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <ErrorBoundary fallback={<NotFound label="Something Went Wrong!" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList userId={user?.id}/>
        </Suspense>
      </ErrorBoundary>
    </div>
    </>
  );
};

export default TicketsPage;
