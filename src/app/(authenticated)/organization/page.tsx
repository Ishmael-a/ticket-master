import { Heading } from "@/components/heading";
import { Suspense } from "react";
import OrganizationList from "@/features/organization/components/organization-list";
import { Spinner } from "@/components/spinner";
import { ErrorBoundary } from "react-error-boundary";
import { NotFound } from "@/components/not-found";
import { organizationCreatePath } from "@/app/paths";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucidePlus } from "lucide-react";


// export const dynamic = "force-dynamic";

// Time-Based Caching(Incremental Static Regeneration)
// export const revalidate = 30;



const OrganizationPage = async () => {

  return (
    <>
      <div className="flex-1 flex flex-col gap-y-8">
        <Heading
          title={"My Organizations"}
          description={"All your organizations"}
          actions={
            <Button asChild>
                <Link href={organizationCreatePath()}>
                    <LucidePlus className="w-4 h-4"/>
                    Create Organization
                </Link>
            </Button>
          }
        />

        <ErrorBoundary fallback={<NotFound label="Something Went Wrong!" />}>
          <Suspense fallback={<Spinner />}>
            <OrganizationList/>
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default OrganizationPage;
