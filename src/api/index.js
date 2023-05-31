import * as user from '@/api/user';
import * as theater from '@/api/theater';
import { memberGetAll,memberAdd,memberRemove,memberUpdate } from './member';
import { movieAdd, movieGetAll, movieRemove, movieUpdate } from './movie';
import { movieShelfGetAll, movieShelfUpdate } from './movieShelf';

export const apiUser = user;
export const apiTheater = theater;

export const apiMemberGetAll = memberGetAll;
export const apiMemberAdd= memberAdd;
export const apiMemberUpdate = memberUpdate;
export const apiMemberRemove = memberRemove;

export const apiMovieGetAll = movieGetAll;
export const apiMovieAdd= movieAdd;
export const apiMovieUpdate = movieUpdate
export const apiMovieRemove = movieRemove;
