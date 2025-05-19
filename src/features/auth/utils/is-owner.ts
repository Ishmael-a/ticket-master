import { User as AuthUser } from "generated/prisma";

type Entity = {
  userId: string | null;
};

const isOwner = (
  authUser: AuthUser | null | undefined,
  entity: Entity | null | undefined
) => {
  if (!authUser || !entity) return false;

  if (!entity.userId) return false;

  if (authUser.id === entity.userId) {
    return true;
  } else {
    return false;
  }
};

export { isOwner };
