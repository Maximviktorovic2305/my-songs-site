import { EnumGenres } from "generated/prisma";

export type SortType = 'asc' | 'desc'

export type FilterOptions = {
  genres?: EnumGenres[];
  title?: string;
  artistId?: number | string;
  artistNickname?: string;
  sortRating?: SortType
  sortByDate?: SortType
};