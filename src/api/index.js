import * as user from '@/api/user';
import * as theater from '@/api/theater';
import { memberGet,memberAdd,memberRemove,memberUpdate } from './member';
import { movieAdd, movieGet, movieRemove, movieUpdate } from './movie';

export const apiUser = user;
export const apiTheater = theater;
export const apiMemberGet = memberGet;
export const apiMemberAdd= memberAdd;
export const apiMemberUpdate = memberUpdate;
export const apiMemberRemove = memberRemove;
export const apiMovieGet = movieGet;
export const apiMovieAdd= movieAdd;
export const apiMovieUpdate = movieUpdate
export const apiMovieRemove = movieRemove;