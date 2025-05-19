import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { passwordResetEvent } from "@/features/password/events/event-password-reset";
import { verifyEmailEvent } from "@/features/auth/events/event-verify-email";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    passwordResetEvent,
    verifyEmailEvent,
  ],
});
