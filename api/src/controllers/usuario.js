const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const create = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash }
    });

    const { senha: _, ...usuarioSemSenha } = novoUsuario;

    res.status(201).json({ mensagem: 'Usuário criado com sucesso', usuario: usuarioSemSenha });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

const read = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: { id: true, nome: true, email: true } // não retorna senha
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

const readOne = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      select: { id: true, nome: true, email: true }
    });
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nome, email },
      select: { id: true, nome: true, email: true }
    });

    res.json({ mensagem: 'Usuário atualizado com sucesso', usuario: usuarioAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.usuario.delete({ where: { id: Number(id) } });
    res.json({ mensagem: 'Usuário removido com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

module.exports = {
  create,
  read,
  readOne,
  update,
  remove
};
