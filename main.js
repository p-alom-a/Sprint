// Récupération des éléments HTML
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const finishButton = document.getElementById('finishButton'); // Nouveau bouton
const countdownDisplay = document.getElementById('time');
const taskName = document.getElementById('title');
const timeName = document.getElementById('time');
const circularProgress = document.querySelector('.circular-progress');

// Mise à jour du nom et de la durée
const description = localStorage.getItem('descriptionInput');
taskName.innerText = description;
const time = localStorage.getItem('value');
timeName.innerText = `${time}min`;

let countdownTimer;
let endTime;
let durationInMilliseconds;
let isPaused = false;
let pausedTimeRemaining;

startButton.addEventListener('click', startCountdown);
pauseButton.addEventListener('click', pauseCountdown);
resumeButton.addEventListener('click', resumeCountdown);
finishButton.addEventListener('click', finishCountdown);

function toggleButtonsVisibility(start, pause, resume, finish) {
  startButton.style.display = start ? 'inline' : 'none';
  pauseButton.style.display = pause ? 'inline' : 'none';
  resumeButton.style.display = resume ? 'inline' : 'none';
  finishButton.style.display = finish ? 'inline' : 'none';
}

function startCountdown() {
  const durationInMinutes = time;
  durationInMilliseconds = durationInMinutes * 60 * 1000;

  setEndTime();
  startTimer();

  // Afficher le bouton "Finir"
  toggleButtonsVisibility(false, true, false, true);

  isPaused = false;
  updateCountdown();
}

function pauseCountdown() {
  clearInterval(countdownTimer);

  // Afficher le bouton "Finir"
  toggleButtonsVisibility(false, false, true, true);

  isPaused = true;
  pausedTimeRemaining = calculateTimeRemaining();
}

function resumeCountdown() {
  setEndTime();
  startTimer();

  // Afficher le bouton "Finir"
  toggleButtonsVisibility(false, true, false, true);

  isPaused = false;
  updateCountdown();
}

function finishCountdown() {
  clearInterval(countdownTimer);
  countdownDisplay.innerHTML = 'Terminé';

  // Masquer tous les boutons
  toggleButtonsVisibility(false, false, false, false);

  // Faire disparaître la div avec la classe "container"
  document.querySelector('.container').style.display = 'none';

  // Afficher le GIF une seule fois
  displayGif();
}

function setEndTime() {
  endTime = Date.now() + (isPaused ? pausedTimeRemaining : durationInMilliseconds);
}

function startTimer() {
  countdownTimer = setInterval(updateCountdown, 1000);
}

function calculateTimeRemaining() {
  return endTime - Date.now();
}

function updateCountdown() {
  const timeDifference = calculateTimeRemaining();

  if (timeDifference <= 0) {
    clearInterval(countdownTimer);
    countdownDisplay.innerHTML = 'Terminé';

    // Masquer tous les boutons
    toggleButtonsVisibility(false, false, false, false);

    // Faire disparaître la div avec la classe "container"
    document.querySelector('.container').style.display = 'none';

    // Afficher le GIF une seule fois
    displayGif();
  } else {
    const { minutes, seconds } = calculateTimeComponents(timeDifference);

    // Mise à jour de l'affichage du compte à rebours
    timeName.innerHTML = `${minutes}m ${seconds}s`;

    // Calcul de l'angle en fonction du temps écoulé
    const progressAngle = ((durationInMilliseconds - timeDifference) / durationInMilliseconds) * 360;

    // Mise à jour de la barre de progression circulaire
    circularProgress.style.background = `conic-gradient(black ${progressAngle}deg, #F2F8B2 ${progressAngle}deg)`;
  }
}

function displayGif() {
  // Afficher le GIF
  const iframe = document.createElement('iframe');
  iframe.src = 'https://giphy.com/embed/h3IYrMhAEZvC7nzCt4';
  iframe.width = '480';
  iframe.height = '432';
  iframe.frameBorder = '0';
  iframe.className = 'giphy-embed';
  iframe.allowFullScreen = true;

  // Styles pour centrer le GIF
  iframe.style.position = 'absolute';
  iframe.style.top = '50%';
  iframe.style.left = '50%';
  iframe.style.transform = 'translate(-50%, -50%)';

  document.body.appendChild(iframe);
    // Créer le bouton
    const newTaskButton = document.createElement('button');
    newTaskButton.innerText = 'Créer une nouvelle tâche';
    newTaskButton.className = 'btn';
    newTaskButton.style.position = 'absolute';
    newTaskButton.style.top = '85%';  
    newTaskButton.style.left = '50%';
    newTaskButton.style.transform = 'translateX(-50%)';
    newTaskButton.addEventListener('click', redirectToIndex);
  
    // Ajouter le bouton à la page
    document.body.appendChild(newTaskButton);
  }
  
  function redirectToIndex() {
    // Redirection vers l'index.html
    window.location.href = 'formulaire.html';
  
}

function calculateTimeComponents(timeInMilliseconds) {
  const minutes = Math.floor(timeInMilliseconds / (1000 * 60));
  const seconds = Math.floor((timeInMilliseconds % (1000 * 60)) / 1000);
  return { minutes, seconds };
}
