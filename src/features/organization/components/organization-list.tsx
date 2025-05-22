import React from 'react'
import { NotFound } from '@/components/not-found';
import { getOrganizationsByUser } from '../queries/get-organizations-by-user';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LucideArrowLeftRight, LucideArrowUpRightFromSquare, LucidePen, LucideTrash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SubmitButton } from '@/components/form/submit-button';
import { OrganizationSwitchButton } from './organization-switch-button';
  


const OrganizationList = async () => {
  const organizations = await getOrganizationsByUser()
  const hasActive = organizations.some((organization) => organization.membershipByUser.isActive)

  return (
    <div
      className="flex flex-col gap-y-8 items-center animate-fade-in-from-top"
      aria-label="Organization List"
    >
      {organizations.length === 0 ? (
        <NotFound label="No Organizations found" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">ID</TableHead>
              <TableHead className="text-muted-foreground">Name</TableHead>
              <TableHead className="text-muted-foreground">Joined At</TableHead>
              <TableHead className="text-muted-foreground">Members</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((organization) => {
              const isActive = organization.membershipByUser.isActive;

              const switchButton = (
                <OrganizationSwitchButton 
                  organizationId={organization.id}
                  trigger={
                    <SubmitButton
                      icon={<LucideArrowLeftRight className="w-4 h-4" />}
                      label={
                        !hasActive ? "Activate" : isActive ? "Active" : "Switch"
                      }
                      variant={
                        !hasActive ? "secondary" : isActive ? "default" : "outline"
                      }
                    />
                  }
                />
              );
              const detailButton = (
                <Button variant={"outline"} size={"icon"}>
                  <LucideArrowUpRightFromSquare className="w-4 h-4" />
                </Button>
              );
              const editButton = (
                <Button variant={"outline"} size={"icon"}>
                  <LucidePen className="w-4 h-4" />
                </Button>
              );
              const deleteButton = (
                <Button variant={"destructive"} size={"icon"}>
                  <LucideTrash className="w-4 h-4" />
                </Button>
              );

              const buttons = (
                <>
                  {switchButton}
                  {detailButton}
                  {editButton}
                  {deleteButton}
                </>
              );

              return (
                <TableRow key={organization.id}>
                  <TableCell>{organization.id}</TableCell>
                  <TableCell>{organization.name}</TableCell>
                  <TableCell>
                    {format(
                      organization.membershipByUser.joinedAt,
                      "yyyy-MM-dd, HH:mm"
                    )}
                  </TableCell>
                  <TableCell>{organization._count.memberships}</TableCell>
                  <TableCell className="flex justify-end gap-x-2">
                    {buttons}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OrganizationList;
