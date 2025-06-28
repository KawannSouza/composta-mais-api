import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/prismaClient.js';

//FUNÇÃO DE REGISTRO
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "Name, email, password and role fields are mandatory!" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email }});
    if (existingUser) return res.status(409).json({ error: "Email already registered!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
      select: { id: true, name: true, email: true, role: true }
    });

    return res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal server error!" });
  }
}

//FUNÇÃO DE LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: "Email and password are required!" });

    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) return res.status(401).json({ error: "Invalid credentials!" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid credentials!" });

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}