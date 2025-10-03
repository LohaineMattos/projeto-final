const express = require('express');
const { login } = require('./controllers/login');
const unitarioController = require('./controllers/unitarios');
const loteController = require('./controllers/lotes');
const usuarioController = require('./controllers/usuario');
const authMiddleware = require('./middlewares/authMiddleware');

const router = express.Router();

// Rota de teste
router.get('/teste', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Rota de login
router.post('/login', login);

// Rotas de Unitario (protegidas)
router.post('/unitario', authMiddleware, unitarioController.create);
router.get('/unitario', authMiddleware, unitarioController.read);
router.get('/unitario/:id', authMiddleware, unitarioController.readOne);
router.put('/unitario/:id', authMiddleware, unitarioController.update);
router.delete('/unitario/:id', authMiddleware, unitarioController.remove);

// Rotas de Lote (protegidas)
router.post('/lotes', authMiddleware, loteController.create);
router.get('/lotes', authMiddleware, loteController.read);
router.get('/lotes/:id', authMiddleware, loteController.readOne);
router.put('/lotes/:id', authMiddleware, loteController.update);
router.delete('/lotes/:id', authMiddleware, loteController.remove);

// Rotas de Usuario (protegidas)
router.post('/usuario', usuarioController.create);
router.get('/usuario', usuarioController.read);
router.get('/usuario/:id', usuarioController.readOne);
router.put('/usuario/:id', usuarioController.update);
router.delete('/usuario/:id', usuarioController.remove);

module.exports = router;
