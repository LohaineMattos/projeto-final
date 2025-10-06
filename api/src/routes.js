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
router.get('/login', login);

// Rotas de Unitario (protegidas)
router.post('/unitario', unitarioController.create);
router.get('/unitario', authMiddleware, unitarioController.read);
router.get('/unitario/:id', unitarioController.readOne);
router.put('/unitario/:id', unitarioController.update);
router.delete('/unitario/:id', unitarioController.remove);

// Rotas de Lote (protegidas)
router.post('/lotes', loteController.create);
router.get('/lotes', loteController.read);
router.get('/lotes/:id', loteController.readOne);
router.put('/lotes/:id', loteController.update);
router.delete('/lotes/:id', loteController.remove);

// Rotas de Usuario (protegidas)
router.post('/usuario', usuarioController.create);
router.get('/usuario', usuarioController.read);
router.get('/usuario/:id', usuarioController.readOne);
router.put('/usuario/:id', usuarioController.update);
router.delete('/usuario/:id', usuarioController.remove);

module.exports = router;
