import { Artist } from './artist'
import { Track } from './track'

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  text: string;
  like: number | null;
  dislike: number | null;
  trackId: number | null;
  artistId: number | null;
  artist: Artist | null;
  track: Track | null;
  currentUserVoteStatus?: 'like' | 'dislike' | null; 
}

export interface CreateCommentDto {
  text: string;
}