import { Heading } from "@/components/heading";
import { Suspense } from "react";
import OrganizationList from "@/features/organization/components/organization-list";
import { Spinner } from "@/components/spinner";
import { ErrorBoundary } from "react-error-boundary";
import { NotFound } from "@/components/not-found";
import { onboardingPath, organizationsPath } from "@/app/paths";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucidePlus } from "lucide-react";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organizations-by-user";
import { redirect } from "next/navigation";



const SelectActiveOrganizationPage = async () => {
  const organizations = await getOrganizationsByUser();

  const hasActive = organizations.some(
    (organization) =>{ return organization.membershipByUser.isActive }
  );

  if(hasActive) redirect(organizationsPath())

  return (
    <>
      <div className="flex-1 flex flex-col gap-y-8">
        <Heading
          title={"Select Organization"}
          description={"Pick One Organization To Work With"}
          actions={
            <Button asChild>
                <Link href={onboardingPath()}>
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

export default SelectActiveOrganizationPage;
