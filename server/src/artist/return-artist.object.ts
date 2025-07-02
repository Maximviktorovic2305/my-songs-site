import { Prisma } from "generated/prisma";

export const returnArtistObject: Prisma.ArtistSelect = {
  id: true,
  name: true,
  email: true,
  password: false,
  isAdmin: true,
};
