// src/controllers/login.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const login = async (req, res) => {
  // recebe email e senha do body
  const { email, senha } = req.body;

  try {
    // procura usuário pelo email
    const user = await prisma.usuario.findUnique({
      where: { email: email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // compara senha
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // gera token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secreta', // defina JWT_SECRET no seu .env
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
};

module.exports = { login };
