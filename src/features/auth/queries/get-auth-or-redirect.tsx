import { getAuth } from '@/features/auth/actions/get-auth'
import { redirect } from 'next/navigation';
import { signInPath } from '@/app/paths';

export const getAuthOrRedirect = async () => {
    const auth = await getAuth();

    if (!auth.user) redirect(signInPath());

  return auth;
}


