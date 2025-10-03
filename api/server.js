require('dotenv').config();
const express = require('express');
const cors = require("cors");
const router = require('./src/routes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Torna a pasta 'docs' pública
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// usa as rotas
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
