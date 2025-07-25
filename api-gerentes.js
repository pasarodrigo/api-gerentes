const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Gerentes por UF
const gerentesPorUF = {
  'AC': ['STEFFERSON MOURA DE OLIVEIRA'],
  'AL': ['LUIZ AUGUSTO CARVALHO DOS SANTOS'],
  'AM': ['STEFFERSON MOURA DE OLIVEIRA'],
  'AP': ['STEFFERSON MOURA DE OLIVEIRA'],
  'BA': ['LUIZ AUGUSTO CARVALHO DOS SANTOS'],
  'CE': ['STEFFERSON MOURA DE OLIVEIRA'],
  'DF': ['ARNALDINO GONCALVES DE OLIVEIRA JUNIOR'],
  'ES': ['Natasha Leal'],
  'GO': ['ARNALDINO GONCALVES DE OLIVEIRA JUNIOR'],
  'MA': ['STEFFERSON MOURA DE OLIVEIRA'],
  'MG': ['SEBASTIAO CARLOS GOMES DE OLIVEIRA'],
  'MS': ['ARNALDINO GONCALVES DE OLIVEIRA JUNIOR'],
  'MT': ['ARNALDINO GONCALVES DE OLIVEIRA JUNIOR'],
  'PA': ['STEFFERSON MOURA DE OLIVEIRA'],
  'PB': ['STEFFERSON MOURA DE OLIVEIRA','LUIZ AUGUSTO CARVALHO DOS SANTOS'],
  'PI': ['STEFFERSON MOURA DE OLIVEIRA'],
  'PE': ['LUIZ AUGUSTO CARVALHO DOS SANTOS'],
  'PR': ['MATHEUS SCHILLING GARCIA'],
  'RJ': ['Natasha Leal'],
  'RN': ['STEFFERSON MOURA DE OLIVEIRA','LUIZ AUGUSTO CARVALHO DOS SANTOS'],
  'RO': ['ARNALDINO GONCALVES DE OLIVEIRA JUNIOR'],
  'RR': ['STEFFERSON MOURA DE OLIVEIRA'],
  'RS': ['MATHEUS SCHILLING GARCIA',['RODRIGO PASA']],
  'SC': ['MATHEUS SCHILLING GARCIA'],
  'SE': ['LUIZ AUGUSTO CARVALHO DOS SANTOS'],
  'SP': ['RONEY DA SILVA PAULA','ALFREDO CARLOS ARGEOLI','RONALDO DOS SANTOS VANZELI'],
  'TO': ['ARNALDINO GONCALVES DE OLIVEIRA JUNIOR'],
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
