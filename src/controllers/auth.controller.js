import { authService } from "../services/auth.service.js";

export const authController = {};

authController.register = async (req, res) => {
  await authService.register(req.body);
  res.status(201).json({ message: "User registered successfully" });
};

authController.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const loginResult = await authService.login(email, password);
  res.json({
    access_token: loginResult.access_token,
    user: loginResult.user,
  });
};

authController.getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};
