 const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoReiniciar = document.querySelector(".botao-reiniciar");
const progressoAtual = document.querySelector(".progresso-atual");
const progressoTotal = document.querySelector(".progresso-total");

const perguntas = [
  {
    enunciado: "Você está começando sua jornada no mundo pop! Qual diva pop te inspira a entrar nessa aventura musical?",
    alternativas: [
      {
        texto: "Taylor Swift",
        afirmacao: "Você se inspira nas letras sinceras e na evolução artística de Taylor."
      },
      {
        texto: "Beyoncé",
        afirmacao: "Você quer causar impacto com presença forte e vocais poderosos como Beyoncé."
      }
    ]
  },
  {
    enunciado: "Qual seria sua primeira performance no palco?",
    alternativas: [
      {
        texto: "Um hit pop dançante com coreografia marcante.",
        afirmacao: "Você começou arrasando no palco com energia e movimentos que lembram Britney Spears."
      },
      {
        texto: "Uma balada emocionante que mostra sua voz.",
        afirmacao: "Você apostou na emoção, conectando o público como Adele faz com suas músicas."
      }
    ]
  },
  {
    enunciado: "Você vai lançar seu primeiro álbum. Qual é o conceito?",
    alternativas: [
      {
        texto: "Reinvenção e liberdade artística.",
        afirmacao: "Você está seguindo o caminho de Lady Gaga, surpreendendo o público a cada faixa."
      },
      {
        texto: "Empoderamento e identidade pessoal.",
        afirmacao: "Você decidiu inspirar e fortalecer outras pessoas, como Lizzo e Demi Lovato fazem."
      }
    ]
  },
  {
    enunciado: "Um clipe seu viralizou nas redes sociais. Como ele é?",
    alternativas: [
      {
        texto: "Colorido, dançante e cheio de atitude.",
        afirmacao: "Sua vibe lembra os vídeos de Katy Perry: cativante e visualmente incrível."
      },
      {
        texto: "Simples, mas intenso e cheio de emoção.",
        afirmacao: "Você tocou corações com um clipe sensível no estilo da Billie Eilish."
      }
    ]
  },
  {
    enunciado: "Um fã te pergunta qual conselho você daria para quem quer seguir carreira na música pop. Você responde:",
    alternativas: [
      {
        texto: "Seja autêntico e nunca tenha medo de ousar.",
        afirmacao: "Você valoriza a originalidade como Madonna sempre valorizou ao longo de sua carreira."
      },
      {
        texto: "Cuide da sua saúde mental e se conecte com sua arte.",
        afirmacao: "Você aprendeu com artistas como Selena Gomez que a conexão emocional é essencial."
      }
    ]
  }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = localStorage.getItem("historiaPop") || "";

function inicia() {
  progressoTotal.textContent = perguntas.length;
  if (historiaFinal && atual >= perguntas.length) {
    mostraResultado();
  } else {
    mostraPergunta();
  }
}

function mostraPergunta() {
  if (atual >= perguntas.length) {
    mostraResultado();
    return;
  }

  perguntaAtual = perguntas[atual];
  caixaPerguntas.textContent = perguntaAtual.enunciado;
  caixaAlternativas.textContent = "";
  caixaResultado.style.display = "none";
  textoResultado.textContent = "";
  progressoAtual.textContent = atual + 1;

  mostraAlternativas();
}

function mostraAlternativas() {
  for (const alternativa of perguntaAtual.alternativas) {
    const botaoAlternativas = document.createElement("button");
    botaoAlternativas.textContent = alternativa.texto;
    botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
    caixaAlternativas.appendChild(botaoAlternativas);
  }
}

function respostaSelecionada(opcaoSelecionada) {
  const afirmacoes = opcaoSelecionada.afirmacao;
  historiaFinal += afirmacoes + " ";
  localStorage.setItem("historiaPop", historiaFinal);
  atual++;
  caixaPrincipal.style.opacity = 0;
  setTimeout(() => {
    mostraPergunta();
    caixaPrincipal.style.opacity = 1;
  }, 300);
}

function mostraResultado() {
  caixaPerguntas.textContent = "Sua jornada pop chegou ao fim!";
  textoResultado.textContent = historiaFinal;
  caixaAlternativas.textContent = "";
  caixaResultado.style.display = "block";
  botaoReiniciar.style.display = "inline-block";
}

botaoReiniciar.addEventListener("click", () => {
  atual = 0;
  historiaFinal = "";
  localStorage.removeItem("historiaPop");
  botaoReiniciar.style.display = "none";
  caixaPrincipal.style.opacity = 0;
  setTimeout(() => {
    mostraPergunta();
    caixaPrincipal.style.opacity = 1;
  }, 300);
});

inicia();