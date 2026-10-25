import { expenseService } from "../services/expense.service.js";

export const expenseController = {};

expenseController.create = async (req, res) => {
  const expense = await expenseService.create(req.user.id, req.body);
  res.status(201).json({ expense });
};

expenseController.update = async (req, res) => {
  const expense = await expenseService.update(
    req.params.expenseId,
    req.user.id,
    req.body,
  );
  res.status(200).json({ expense });
};

expenseController.getAll = async (req, res) => {
  try {
    const { page, limit, search, type } = req.validatedQuery || req.query;
    const result = await expenseService.findAll(
      req.user.id,
      search,
      page,
      limit,
      type,
    );
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

expenseController.getOnt = async (req, res) => {
  const expense = await expenseService.findOne(
    req.params.expenseId,
    req.user.id,
  );
  res.status(200).json({ expense });
};

expenseController.remove = async (req, res) => {
  await expenseService.remove(req.params.expenseId, req.user.id);
  res.status(204).send();
};
