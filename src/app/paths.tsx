export const homePath = () => "/";

export const ticketsPath = () => "/tickets";
export const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;
export const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit`;

export const signUpPath = () => "/sign-up"

export const signInPath = () => "/sign-in"

export const organizationsPath = () => "/organization";
export const organizationCreatePath = () => "/organization/create";

export const onboardingPath = () => "/onboarding";
export const selectActiveOrganizationPath = () => "/onboarding/select-active-organization";

export const emailVerificationPath = () => "/email-verification"

export const forgotPasswordPath = () => "/password-forgot"

export const passwordResetPath = () => "/password-reset";

export const accountProfilePath = () => "/account/profile";
export const accountPasswordPath = () => "/account/password";