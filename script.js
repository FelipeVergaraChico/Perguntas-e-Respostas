const questions = [
  {
    question: "Qual dos seguintes é um dispositivo de entrada?",
    options: ["Monitor", "Teclado", "Impressora", "Projetor"],
    answer: 1,
    explanation:
      "Teclado é um dispositivo de entrada, pois permite que o usuário insira dados no computador.",
  },
  {
    question: "Qual dispositivo é considerado de saída?",
    options: ["Mouse", "Microfone", "Monitor", "Scanner"],
    answer: 2,
    explanation:
      "Monitor é um dispositivo de saída, pois exibe informações que saem do computador para o usuário.",
  },
  {
    question: "O que o mouse representa?",
    options: ["Entrada", "Saída", "Armazenamento", "Processamento"],
    answer: 0,
    explanation:
      "O mouse é um dispositivo de entrada, usado para controlar o cursor e selecionar opções na tela.",
  },
  {
    question: "Qual dos seguintes é um dispositivo de saída?",
    options: ["Projetor", "Teclado", "Mouse", "Webcam"],
    answer: 0,
    explanation:
      "Projetor é um dispositivo de saída, pois projeta a imagem do computador para uma superfície externa.",
  },
  {
    question: "Qual dispositivo é usado para entrada de áudio?",
    options: ["Microfone", "Alto-falante", "Monitor", "Impressora"],
    answer: 0,
    explanation:
      "Microfone é um dispositivo de entrada, pois capta áudio e envia ao computador.",
  },
  {
    question:
      "Qual dispositivo é comumente usado para entrada de comandos e navegação em interfaces gráficas?",
    options: ["Teclado", "Monitor", "Mouse", "Impressora"],
    answer: 2,
    explanation:
      "O mouse é amplamente utilizado para navegar em interfaces gráficas e inserir comandos através de cliques.",
  },
  {
    question:
      "Qual dos seguintes dispositivos é um exemplo clássico de dispositivo de saída?",
    options: ["Scanner", "Microfone", "Alto-falante", "Webcam"],
    answer: 2,
    explanation:
      "O alto-falante é um dispositivo de saída que reproduz sons processados pelo computador.",
  },
  {
    question:
      "Qual dispositivo é utilizado para converter informação digital em papel?",
    options: ["Scanner", "Impressora", "Monitor", "Teclado"],
    answer: 1,
    explanation:
      "A impressora é usada para converter informações digitais em documentos ou imagens físicas em papel.",
  },
  {
    question: "Que tipo de dispositivo é um joystick?",
    options: ["Entrada", "Saída", "Armazenamento", "Processamento"],
    answer: 0,
    explanation:
      "Um joystick é um dispositivo de entrada utilizado principalmente para jogos, permitindo ao usuário controlar movimentos ou ações na tela.",
  },
  {
    question:
      "Qual destes é um exemplo de dispositivo de entrada e saída utilizado em bancos para transações?",
    options: [
      "Teclado",
      "Caixa Eletrônico (ATM)",
      "Monitor",
      "Impressora de Tickets",
    ],
    answer: 1,
    explanation:
      "Um Caixa Eletrônico (ATM) é um dispositivo que permite a entrada de comandos via teclado e também a saída de informações através do seu monitor e da entrega de dinheiro.",
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(questions);

let currentQuestionIndex = 0;
let score = 0;
let wrongAnswers = [];

// Exibe a pergunta atual
function showQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(index);
    optionsElement.appendChild(button);
  });
}

// Verifica a resposta do jogador
function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    score++;
  } else {
    wrongAnswers.push({
      question: currentQuestion.question,
      correctAnswer: currentQuestion.options[currentQuestion.answer],
      explanation: currentQuestion.explanation,
    });
  }
  nextQuestion();
}

// Exibe a próxima pergunta ou o resultado final
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Mostra a pontuação final e as perguntas erradas com explicação
function showScore() {
  const resultTitle = document.getElementById("resultTitle");
  const scoreMessage = document.getElementById("scoreMessage");
  const wrongTitle = document.getElementById("wrongTitle");
  const wrongAnswersList = document.getElementById("wrongAnswersList");

  document.getElementById("game").style.display = "none";
  document.getElementById("score").style.display = "block";

  if (score === questions.length) {
    resultTitle.textContent = "Parabéns! Você acertou todas as questões!";
    scoreMessage.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
    wrongTitle.style.display = "none";
  } else {
    resultTitle.textContent = "Jogo Concluído!";
    scoreMessage.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
    wrongTitle.style.display = "block";
    wrongAnswersList.innerHTML = "";
    wrongAnswers.forEach((wrong) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${wrong.question} - Resposta Correta: ${wrong.correctAnswer}. Explicação: ${wrong.explanation}`;
      wrongAnswersList.appendChild(listItem);
    });
  }
}

// Reinicia o jogo
function restartGame() {
  shuffleArray(questions);
  currentQuestionIndex = 0;
  score = 0;
  wrongAnswers = [];
  document.getElementById("game").style.display = "block";
  document.getElementById("score").style.display = "none";
  showQuestion();
}

showQuestion();
