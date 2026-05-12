const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');
const cityRoutes = require('./routes/cityRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir frontend como estático (opcional para desenvolvimento local unificado)
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas API v1
app.use('/api/v1', cityRoutes);

// Tratamento Global de Erros (último middleware)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Lupa Cidadã API rodando em http://localhost:${PORT}`);
});
