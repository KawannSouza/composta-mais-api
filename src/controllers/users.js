import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/prismaClient.js';

// FUNÇÃO DE REGISTRO
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are mandatory!" });
    }

    const userRole = role || "DOADOR"; // define DOADOR como padrão

    const existingUser = await prisma.user.findUnique({ where: { email }});
    if (existingUser) return res.status(409).json({ error: "Email already registered!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: userRole },
      select: { id: true, name: true, email: true, role: true }
    });

    return res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

// FUNÇÃO DE LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: "Email and password are required!" });

    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) return res.status(401).json({ error: "Invalid credentials!" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid credentials!" });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
};

// FUNÇÃO: EDITAR USUÁRIO
export const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phone, role, address, status } = req.body;

  if (req.user.userId !== id && req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Você não tem permissão para editar este usuário." });
  }

  try {
    const dadosAtualizados = { name, email, phone, role, address, status };

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      dadosAtualizados.password = hashed;
    }

    const usuarioAtualizado = await prisma.user.update({
      where: { id },
      data: dadosAtualizados,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        address: true,
        status: true
      }
    });

    return res.status(200).json({ message: "Usuário atualizado com sucesso!", usuario: usuarioAtualizado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};

// FUNÇÃO: EXCLUIR USUÁRIO
export const excluirUsuario = async (req, res) => {
  const { id } = req.params;

  if (req.user.userId !== id && req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Você não tem permissão para excluir este usuário." });
  }

  try {
    await prisma.user.delete({
      where: { id }
    });

    return res.status(200).json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao excluir usuário." });
  }
};
