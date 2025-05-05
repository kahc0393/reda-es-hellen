const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Configura o multer para salvar arquivos enviados
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Rota para receber a redação
app.post('/enviar', upload.single('arquivo'), (req, res) => {
  const { nome, tema, redacao, tipo } = req.body;

  console.log('Nome:', nome);
  console.log('Tema:', tema);
  console.log('Tipo:', tipo);

  if (tipo === 'texto') {
    console.log('Redação (texto):', redacao);
  } else if (req.file) {
    console.log('Arquivo enviado:', req.file.filename);
  }

  res.send('Redação recebida com sucesso!');

  app.post('/enviar', upload.single('arquivo'), (req, res) => {
    const { nome, tema, redacao } = req.body;
    const arquivo = req.file;
  
    console.log('\n--- Redação recebida ---');
    console.log('Nome:', nome);
    console.log('Tema:', tema);
    if (redacao) {
      console.log('Texto da redação:\n', redacao);
    }
    if (arquivo) {
      console.log('Arquivo enviado:', arquivo.originalname);
    }
  
    res.send('Redação recebida com sucesso!');
  });
  
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

