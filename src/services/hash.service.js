import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;
export const hashService = {};

hashService.hash = (text) => bcrypt.hash(text, SALT_ROUNDS);
hashService.compare = (text, hash) => bcrypt.compare(text, hash);
