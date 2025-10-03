const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar Lote
const create = async (req, res) => {
  const {
    data,
    horario,
    turno,
    peso_vazio,
    peso_cheio,
    etiqueta,
    operador,
    tipo,
    autenticado,
    peso_embalagem,
    qtd_sacos
  } = req.body;

  if (!data) {
    return res.status(400).json({ error: 'O campo "data" é obrigatório' });
  }

  try {
    const lote = await prisma.lote.create({
      data: {
        data: new Date(data),
        horario,
        turno,
        peso_vazio,
        peso_cheio,
        etiqueta,
        operador,
        tipo,
        autenticado: autenticado ?? false,
        peso_embalagem,
        qtd_sacos
      }
    });
    return res.status(201).json(lote);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Listar todos
const read = async (req, res) => {
  try {
    const lotes = await prisma.lote.findMany();
    return res.json(lotes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Buscar por ID
const readOne = async (req, res) => {
  try {
    const lote = await prisma.lote.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!lote) return res.status(404).json({ error: 'Lote não encontrado' });
    return res.json(lote);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Atualizar
const update = async (req, res) => {
  try {
    const lote = await prisma.lote.update({
      where: { id: Number(req.params.id) },
      data: {
        ...req.body,
        data: req.body.data ? new Date(req.body.data) : undefined
      }
    });
    return res.status(200).json(lote);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Remover
const remove = async (req, res) => {
  try {
    await prisma.lote.delete({ where: { id: Number(req.params.id) } });
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = { create, read, readOne, update, remove };
