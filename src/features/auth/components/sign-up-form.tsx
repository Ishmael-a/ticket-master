'use client'

import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/form/submit-button";
import { signUp } from "../actions/sign-up"
import { useActionState } from "react"
import { initialActionState } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";
import PasswordInput from "./password-input";



const SignUpForm = ()  => {
    const [ actionState, action ] = useActionState(
        signUp,
        initialActionState
    )

    return (
      <Form action={action} actionState={actionState}>
        <Input
          name={"username"}
          placeholder={"Username"}
          defaultValue={actionState.payload?.get("username") as string}
        />
        <FieldError actionState={actionState} name="username" />

        <Input
          name={"email"}
          placeholder={"Email"}
          defaultValue={actionState.payload?.get("email") as string}
        />
        <FieldError actionState={actionState} name="email" />

        <PasswordInput
          name={"password"}
          placeholder={"Password"}
          defaultValue={actionState.payload?.get("password") as string}
        />
        <FieldError actionState={actionState} name="password" />

        <PasswordInput
          name={"confirmPassword"}
          placeholder={"Confirm Password"}
          defaultValue={actionState.payload?.get("confirmPassword") as string}
        />
        <FieldError actionState={actionState} name="confirmPassword" />

        <SubmitButton label={"Sign Up"} />
      </Form>
    );
}


export { SignUpForm }