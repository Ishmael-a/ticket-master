import { VerifyEmailEventArgs } from "@/features/auth/events/event-verify-email";
import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";
import { EventSchemas, Inngest } from "inngest";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
  "app/auth.verify-email": VerifyEmailEventArgs;
};

// Create a client to send and receive events
export const inngest = new Inngest({ 
    id: "ishmael's-next-app",
    schemas: new EventSchemas().fromRecord<Events>(),
});
