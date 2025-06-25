const express = require('express');
const app = express();
app.use(express.json());

// Gerentes por UF
const gerentesPorUF = {
  'RS': ['João', 'Ana'],
  'SP': ['Carlos', 'Marina', 'Eduardo'],
  'RJ': ['Fernanda'],
};

// Controle de rotação por UF
const rotacaoGerentes = {};

// Função para obter o próximo gerente da lista
function proximoGerente(uf) {
  const lista = gerentesPorUF[uf];
  if (!lista) return 'Não definido';

  if (!(uf in rotacaoGerentes)) {
    rotacaoGerentes[uf] = 0;
  }

  const index = rotacaoGerentes[uf];
  const gerente = lista[index];
  rotacaoGerentes[uf] = (index + 1) % lista.length;

  return gerente;
}

// Rota da API
app.post('/atribuir-gerentes', (req, res) => {
  const solicitacoes = req.body;

  if (!Array.isArray(solicitacoes)) {
    return res.status(400).json({ erro: 'Esperado um array de solicitações' });
  }

  const resultado = solicitacoes.map(solicitacao => ({
    ...solicitacao,
    gerente: proximoGerente(solicitacao.UF)
  }));

  res.json(resultado);
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
