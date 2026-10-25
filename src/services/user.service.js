import { prisma } from "../db/prisma.js";
import { createError } from "../utils/create-error.js";

export const userService = {};

userService.create = async (data) => {
  try {
    return await prisma.user.create({ data });
  } catch (err) {
    if (err.name === "PrismaClientKnownRequestError" && err.code === "P2002") {
      createError(409, "Email already in use", { email: data.email });
    }
    throw err;
  }
};

userService.findByEmail = (email) =>
  prisma.user.findFirst({
    where: {
      email,
    },
  });

userService.findById = (id) =>
  prisma.user.findFirst({
    where: { id },
    omit: { passwordHash: true },
  });
