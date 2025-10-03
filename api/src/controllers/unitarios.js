const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar Unitário
const create = async (req, res) => {
  const { data, turno, peso, operador, etiqueta } = req.body;

  if (!data || !turno || !peso || !operador) {
    return res.status(400).json({ error: 'Campos obrigatórios: data, turno, peso, operador' });
  }

  try {
    const unitario = await prisma.unitario.create({
      data: {
        data: new Date(data),
        turno,
        peso,
        operador,
        etiqueta
      }
    });
    return res.status(201).json(unitario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Listar todos
const read = async (req, res) => {
  try {
    const unitarios = await prisma.unitario.findMany();
    return res.json(unitarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Buscar por ID
const readOne = async (req, res) => {
  try {
    const unitario = await prisma.unitario.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!unitario) return res.status(404).json({ error: 'Registro não encontrado' });
    return res.json(unitario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Atualizar
const update = async (req, res) => {
  try {
    const unitario = await prisma.unitario.update({
      where: { id: Number(req.params.id) },
      data: {
        ...req.body,
        data: req.body.data ? new Date(req.body.data) : undefined
      }
    });
    return res.status(200).json(unitario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Remover
const remove = async (req, res) => {
  try {
    await prisma.unitario.delete({ where: { id: Number(req.params.id) } });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = { create, read, readOne, update, remove };
