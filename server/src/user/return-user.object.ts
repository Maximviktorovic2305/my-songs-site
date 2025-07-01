import { Prisma } from "generated/prisma";

export const returnUserObject: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  password: false,
  isAdmin: true,
};
