''

import React, { cloneElement, useActionState, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SubmitButton } from './form/submit-button';
import { Form } from './form/form';
import { ActionState, initialActionState } from './form/utils/to-action-state';


interface UseConfirmDialogProps {
  action: (
    state: ActionState,
    formData: FormData
  ) => ActionState | Promise<ActionState>;
  trigger: React.ReactElement<{ onClick?: () => void }>;
  title?: string;
  description?: string;
}

const useConfirmDialog = ({ 
    action,
    trigger, 
    title = "Are you absolutely sure?", 
    description = "This action cannot be undone. Make sure you understand the consequences."
}: UseConfirmDialogProps) => {

    const [open, setIsOpen] = useState(false);
    const [ actionState, formAction ] = useActionState<ActionState, FormData>(
        action,
        initialActionState
    )

    const dialogTrigger = cloneElement(trigger, {
        onClick: () => setIsOpen((prevState) => !prevState),
    })

    const handleSuccess = () => {
        setIsOpen(false);
    }

  const dialog = (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form action={formAction} actionState={actionState} onSuccess={handleSuccess}>
              <SubmitButton label={"Confirm"} />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return {dialogTrigger, dialog}
}

export {useConfirmDialog}
