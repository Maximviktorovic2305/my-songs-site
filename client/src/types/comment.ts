import { Artist } from './artist'
import { Track } from './track'

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  text: string;
  like: number 
  dislike: number 
  trackId: number 
  artistId: number 
  artist: Artist 
  track: Track 
  currentUserVoteStatus?: 'like' | 'dislike' 
}

export interface CreateCommentDto {
  text: string;
}