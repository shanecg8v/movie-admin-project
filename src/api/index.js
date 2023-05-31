import * as user from '@/api/user';
import { memberGetAll,memberAdd,memberRemove,memberUpdate } from './member';
import { movieAdd, movieGetAll, movieRemove, movieUpdate } from './movie';

export const apiUser = user;

export const apiMemberGetAll = memberGetAll;
export const apiMemberAdd= memberAdd;
export const apiMemberUpdate = memberUpdate;
export const apiMemberRemove = memberRemove;

export const apiMovieGetAll = movieGetAll;
export const apiMovieAdd= movieAdd;
export const apiMovieUpdate = movieUpdate
export const apiMovieRemove = movieRemove;
