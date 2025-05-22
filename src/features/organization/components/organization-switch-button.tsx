'use client'

import { Form } from '@/components/form/form'
import { initialActionState } from '@/components/form/utils/to-action-state'
import React, { useActionState } from 'react'
import { switchOrganization } from '../actions/switch-organization'

type OrganizationSwitchButtonProps = {
    organizationId: string,
    trigger: React.ReactElement
}

const OrganizationSwitchButton = ({
    organizationId,
    trigger
}: OrganizationSwitchButtonProps) => {
    const [actionState, action] = useActionState(
      switchOrganization.bind(null, organizationId),
      initialActionState
    );
    
  return (
    <Form action={action} actionState={actionState}>
        {trigger}
    </Form>
  )
}

export {OrganizationSwitchButton}
