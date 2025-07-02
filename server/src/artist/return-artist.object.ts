import { Prisma } from 'generated/prisma';

export const returnArtistObject: Prisma.ArtistSelect = {
  id: true,
  nickname: true,
  name: true,
  email: true,
  password: false,
  avatar: true,
  role: true,
  tracks: true,
  favoriteTracks: true,
};
