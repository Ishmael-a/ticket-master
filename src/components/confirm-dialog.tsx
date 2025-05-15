''

import React, { cloneElement, useActionState, useState, useEffect, useRef } from 'react'
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
import { ActionState, initialActionState } from './form/utils/to-action-state';
import { Button } from './ui/button';
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { toast } from 'sonner';



interface UseConfirmDialogProps {
  action: (
    state: ActionState,
    formData: FormData
  ) => ActionState | Promise<ActionState>;
  trigger: React.ReactElement<{ onClick?: () => void }> | ((isPending: boolean) => React.ReactElement<{ onClick?: () => void }>);
  title?: string;
  description?: string;
  onSuccess?: (actionState: ActionState) => void;
}

const useConfirmDialog = ({ 
    action,
    trigger, 
    title = "Are you absolutely sure?", 
    description = "This action cannot be undone. Make sure you understand the consequences.",
    onSuccess
}: UseConfirmDialogProps) => {
    const toastRef = useRef<string | number | null>(null)
    const [open, setIsOpen] = useState(false);
    const [ actionState, formAction, isPending ] = useActionState<ActionState, FormData>(
        action,
        initialActionState
    )

    useEffect(() => {
      if(isPending){
        toastRef.current = toast.success("Deleting...")
      }else if(toastRef.current){
        toast.dismiss(toastRef.current)
      }

      return () => { 
        if(toastRef.current) toast.dismiss(toastRef.current);
      }
    }, [isPending])

    useActionFeedback(actionState, {
      onSuccess: ({actionState}) => {
        if( actionState.message ) toast.success(actionState.message)
  
        onSuccess?.(actionState)
      },
      onError: ({actionState}) => {
        if( actionState.message ) toast.error(actionState.message)

      }
    })

    const dialogTrigger = cloneElement(typeof trigger === "function" ? trigger(isPending) : trigger, {
        onClick: () => setIsOpen((prevState) => !prevState),
    })


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
            <form action={formAction} >
              <Button type={"submit"} > Confirm </Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return {dialogTrigger, dialog}
}

export {useConfirmDialog}
