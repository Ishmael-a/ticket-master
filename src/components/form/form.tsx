import React from 'react'
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { ActionState } from '@/components/form/utils/to-action-state'
import { toast } from "sonner";

interface FormProps{
    children: React.ReactNode,
    action: (formData: FormData) => void,
    actionState: ActionState,
    onSuccess?: (actionState: ActionState) => void,
    onError?: (actionState: ActionState) => void,
}

const Form = ({ action, children, actionState, onSuccess, onError }: FormProps) => {

  useActionFeedback(actionState, {
    onSuccess: ({actionState}) => {
      if( actionState.message ) toast.success(actionState.message)

        onSuccess?.(actionState)
    },
    onError: ({actionState}) => {
      if( actionState.message ) toast.error(actionState.message)

        onError?.(actionState)
    }
  })

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  )
}

export { Form }