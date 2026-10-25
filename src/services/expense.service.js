import { prisma } from "../db/prisma.js";
import { createError } from "../utils/create-error.js";

export const expenseService = {};

expenseService.create = (userId, input) => {
  return prisma.expense.create({
    data: {
      userId,
      ...input,
      transactionDate: input.transactionDate
        ? new Date(input.transactionDate).toISOString()
        : undefined,
      note: input.note ? input.note : null,
    },
  });
};

expenseService.update = async (expenseId, userId, input) => {
  const expense = await prisma.expense.findUnique({
    where: { id: +expenseId },
  });

  if (!expense) {
    createError(404, `Expense item with ${expenseId} not found`);
  }

  if (+userId !== expense.userId) {
    createError(403, "You do not have permission to perform this action");
  }

  const transactionDate = input.transactionDate
    ? new Date(input.transactionDate).toISOString()
    : undefined;

  const note = input.note !== undefined ? input.note : undefined;

  return prisma.expense.update({
    where: { id: +expenseId },
    data: {
      ...input,
      transactionDate,
      note,
    },
  });
};

expenseService.findAll = async (userId, search, page, limit, type) => {
  const take = parseInt(limit, 10) || 10;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const skip = (pageNum - 1) * take;
  const whereConditions = { userId };

  if (search && search.trim() !== "") {
    // Fixed quotes
    whereConditions.OR = [
      { title: { contains: search } },
      { note: { contains: search } },
    ];
  }

  if (type) {
    whereConditions.type = type;
  }

  const [expenses, total] = await prisma.$transaction([
    prisma.expense.findMany({
      where: whereConditions,
      skip,
      take,
      orderBy: { createdAt: "desc" }, // Fixed string quote
    }),
    prisma.expense.count({ where: whereConditions }),
  ]);

  return {
    expenses,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / take),
  };
};

expenseService.findOne = async (expenseId, userId) => {
  const expense = await prisma.expense.findUnique({
    where: { id: +expenseId },
  });

  if (!expense) {
    createError(404, `Todo item with id ${id} not found`);
  }

  if (userId !== expense.userId) {
    createError(403, "You do not have permission to perform this action");
  }
  return expense;
};

expenseService.remove = async (expenseId, userId) => {
  const expense = await prisma.expense.findUnique({
    where: { id: +expenseId },
  });
  if (!expense) {
    createError(404, `Todo item with id: ${expenseId} not found `);
  }

  if (userId !== expense.userId) {
    createError(403, "You do not have permission to perform this action");
  }

  return prisma.expense.delete({ where: { id: +expenseId } });
};
