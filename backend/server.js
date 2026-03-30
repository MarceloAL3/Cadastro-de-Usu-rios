const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'usuarios_db',
  password: '123456',
  port: 5432,
});

// Rota de cadastro
app.post('/usuarios', async (req, res) => {
  const { nome, email } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});