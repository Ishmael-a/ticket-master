"use client";

import { SubmitButton } from "@/components/form/submit-button";
import { createOrganization } from "../actions/create-organization";
import { useActionState } from "react";
import {
  ActionStateStatus,
  initialActionState,
} from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";
import { Input } from "@/components/ui/input";

const OrganizationCreateForm = () => {
  const [actionState, action] = useActionState(
    createOrganization,
    initialActionState
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name={"name"}
        placeholder={"Organization Name"}
        defaultValue={
          actionState.status === ActionStateStatus.ERROR
            ? (actionState.payload?.get("name") as string)
            : ""
        }
      />
      <FieldError actionState={actionState} name="name" />

      <SubmitButton label={"Create"} />
    </Form>
  );
};

export { OrganizationCreateForm };
