<template>
  <div class="container" :class="deviceClass">
    <div v-if="isPortrait" class="orientation-message">
      <p>Pour une meilleure expérience, tournez votre appareil en mode paysage</p>
      <div class="rotate-icon">↻</div>
    </div>

    <video
      ref="backgroundVideo"
      autoplay
      muted
      playsinline
      class="background-video"
      @ended="nextVideo"
    >
      <source :src="currentVideo" type="video/mp4" />
      Votre navigateur ne supporte pas la vidéo HTML5.
    </video>
    <audio ref="backgroundAudio" class="background-audio" @play="onAudioPlay" @pause="onAudioPause" @ended="onAudioEnded">
      <source src="/MartinOne(MASTER (COM+EQ).wav" type="audio/wav" />
      Votre navigateur ne supporte pas l'audio HTML5.
    </audio>

    <div class="content">
      <p class="intro"><strong>Brother & Sisters. Bienvenue.<br>
      We open our field, to the world.<br>
      To make it shine.</strong></p>
      <h2>Notre Vision</h2>
      <p>La vibration.<br>
      Pour nous la musique a une fonction sacrée dans le progrès humain.<br>
      Perdu au fil des années, nous proposons de reintégrer sa puissance originelle.</p>
      <h2>Notre Mission</h2>
      <p>Crée une plateforme d'interconnexion humaine via holochain et lancer les premiers<br>
      éléments sonores susceptibles de rassembler autour de la musique.</p>
     
      <div class="buttons-container">
        <button class="play-btn" @click="toggleMusic">
          <span v-if="!isPlaying">▶️ Play la musique</span>
          <span v-else>⏸️ Pause la musique</span>
        </button>
        
        <a v-if="showUtopia" href="https://utopia.funkthetown.net" target="_blank" class="utopia-btn">Utopia</a>
      </div>
    </div>
  
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const isPlaying = ref(false);
const showUtopia = ref(false);
const isMobile = ref(false);
const isPortrait = ref(false);

// Détection plus robuste des appareils mobiles
const checkMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  isMobile.value = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  updateOrientation();
};

// Mettre à jour l'état de l'orientation
const updateOrientation = () => {
  // Utilise matchMedia pour une détection plus fiable que window.orientation
  isPortrait.value = window.matchMedia('(orientation: portrait)').matches;
};

// Préférence pour landscape mais adaptation en fonction de l'orientation
const handleOrientationChange = () => {
  updateOrientation();
};

// Provide a responsive class based on device and orientation
const deviceClass = computed(() => {
  return {
    'is-mobile': isMobile.value,
    'is-portrait': isPortrait.value,
    'is-landscape': !isPortrait.value
  };
});

// Initialiser
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', handleOrientationChange);
  window.addEventListener('orientationchange', handleOrientationChange);
  
  // Pour test: afficher le bouton Utopia immédiatement au chargement
// Délai court pour tester
});

// Nettoyer
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleOrientationChange);
  window.removeEventListener('orientationchange', handleOrientationChange);
});

const videos = [
  // Exemple de comment référencer des vidéos externes
  // 'https://stockage-externe.com/videos/20231126_A740461.MP4',
  // En attendant, continuez à utiliser les chemins locaux
  '/20231126_A740461.MP4',
  '/20231126_A740462k.MP4',
  '/20231126_A740463.MP4',
  '/20231126_A740464k.MP4',
  '/20231126_A740465.MP4',
  '/20231126_A740466.MP4',
  '/20231126_A740467.MP4',
  '/20231126_A740468.MP4',
  '/20231126_A740469.MP4',
  '/20231126_A740470k.MP4',
  '/20231126_A740471.MP4',
  '/20231126_A740472.MP4',
  '/20231126_A740473.MP4',
  '/20231126_A740474.MP4',
  '/20231126_A740475.MP4',
  '/20231126_A740476.MP4',
  '/20231126_A740477.MP4',
  '/20231126_A740478.MP4',
  '/20231126_A740479.MP4',
  '/20231126_A740480.MP4',
  '/20231126_A740481.MP4',
  '/20231126_A740482.MP4',
  '/20231126_A740483.MP4',
  '/20231126_A740484.MP4',
  '/20231126_A740485.MP4',
  '/20231126_A740486.MP4',
  '/20231126_A740487.MP4',
  '/20231126_A740488.MP4',
  '/20231126_A740489.MP4',
  '/20231126_A740490.MP4',
  '/20231126_A740491.MP4',
  '/20231126_A740492.MP4',
  '/20231126_A740493.MP4',
  '/20231126_A740494.MP4',
  '/20231126_A740495.MP4',
  '/20231126_A740496.MP4',
  '/20231126_A740497.MP4',
  '/20231126_A740498.MP4',
 
];
const currentVideoIndex = ref(0);
const currentVideo = ref(videos[currentVideoIndex.value]);
const backgroundVideo = ref(null);
const backgroundAudio = ref(null);

function nextVideo() {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % videos.length;
  currentVideo.value = videos[currentVideoIndex.value];
  // Recharge la vidéo et lance la lecture
  if (backgroundVideo.value) {
    backgroundVideo.value.load();
    backgroundVideo.value.play();
  }
}

function toggleMusic() {
  if (!backgroundAudio.value) return;
  if (isPlaying.value) {
    backgroundAudio.value.pause();
    isPlaying.value = false;
  } else {
    backgroundAudio.value.play();
    isPlaying.value = true;
  }
}

// Met à jour l'état si l'utilisateur utilise les contrôles natifs ou touche la fin
function onAudioPlay() {
  isPlaying.value = true;
  // Démarrer le timer pour le bouton Utopia
  setTimeout(() => {
    showUtopia.value = true;
  }, 3000); // 1 seconde pour le test
}


function onAudioPause() {
  isPlaying.value = false;
}

function onAudioEnded() {
  showUtopia.value = true;
  // Arrêter la vidéo de fond
  if (backgroundVideo.value) {
    backgroundVideo.value.pause();
  }
}

</script>

<style scoped>
/* Déclaration de la police FRUTIGER */
@font-face {
  font-family: 'FRUTIGER';
  src: url('/HELVETICA LT 95 BLACK.TTF');
  font-weight: 900;
  font-style: normal;
  font-display: swap; /* Améliore le chargement des polices */
}

/* Styles de base */
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'FRUTIGER', 'Segoe UI', Arial, sans-serif;
  background-color: #000;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  filter: brightness(0.5) blur(1px);
}

.background-audio {
  display: none;
}

/* Orientation message for portrait mode */
.orientation-message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  z-index: 1000;
  text-align: center;
  padding: 2rem;
}

.rotate-icon {
  font-size: 4rem;
  animation: rotate 2s infinite;
  margin-top: 2rem;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(90deg); }
}

.content {
  position: relative;
  z-index: 2;
  color: white;
  padding: 0 clamp(1rem, 5vw, 2.5rem);
  max-width: min(92%, 900px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  box-sizing: border-box;
}

.intro {
  margin-bottom: clamp(0.5rem, 2vw, 1.5rem);
  font-size: clamp(1.1rem, 3vw, 1.8rem);
  line-height: 1.4;
}

h2 {
  color: #582C16;
  font-weight: bold;
  margin-top: clamp(0.5rem, 1.5vw, 1.2rem);
  margin-bottom: clamp(0.2rem, 1vw, 0.7rem);
  font-size: clamp(1.3rem, 3.5vw, 2.2rem);
  width: 100%;
}

p {
  margin-bottom: clamp(0.5rem, 1.5vw, 1rem);
  font-size: clamp(0.9rem, 2.5vw, 1.5rem);
  line-height: 1.4;
  max-width: 100%;
}

/* Buttons container */
.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.8rem, 2vw, 1.5rem);
  margin-top: clamp(0.8rem, 2.5vw, 2rem);
  width: 100%;
}

/* Play button */
.play-btn {
  padding: clamp(0.6rem, 1.5vw, 1rem) clamp(1rem, 2vw, 2rem);
  font-size: clamp(0.9rem, 2vw, 1.3rem);
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 2px solid white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  width: 100%;
  max-width: min(300px, 80%);
  text-align: center;
  margin-bottom: 0.5rem;
}

.play-btn:hover, .play-btn:active {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

/* Utopia button - avec animation d'apparition */
.utopia-btn {
  padding: clamp(0.6rem, 1.5vw, 1rem) clamp(1rem, 2vw, 2rem);
  background: linear-gradient(180deg, #ffd700, #00e1ff);
  color: #222;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s, box-shadow 0.2s;
  outline: none;
  opacity: 0.98;
  z-index: 10;
  font-family: 'FRUTIGER', 'Segoe UI', Arial, sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.3rem);
  width: 100%;
  max-width: min(300px, 80%);
  text-align: center;
  animation: appear 0.8s ease-in-out;
  text-decoration: none;
  display: inline-block;
}

@keyframes appear {
  0% { 
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  100% { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.utopia-btn:hover, .utopia-btn:active {
  transform: scale(1.05);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
}

/* Desktop styles */
@media (min-width: 1200px) {
  .content {
    padding: 2rem;
  }
  
  p br {
    display: inline; /* Assure que les retours à la ligne sont conservés sur desktop */
  }
  
  .buttons-container {
    margin-top: 2rem;
  }
}

/* Tablet styles */
@media (min-width: 768px) and (max-width: 1199px) {
  .content {
    padding: 2rem;
  }
  
  p {
    text-align: center;
  }
}

/* Mobile landscape styles */
@media (max-width: 767px) and (orientation: landscape) {
  .content {
    justify-content: center;
    padding: 1.5rem;
    overflow-y: auto;
    min-height: auto;
  }
  
  p br {
    display: none; /* Supprime les retours à la ligne pour une meilleure fluidité */
  }
  
  .buttons-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .play-btn, .utopia-btn {
    min-width: 150px;
    font-size: 0.9rem;
  }
}

/* Mobile portrait styles */
@media (max-width: 767px) and (orientation: portrait) {
  .content {
    text-align: center;
    padding: 1.5rem;
    justify-content: center;
  }
  
  p br {
    display: none;
  }
  
  .intro {
    margin-bottom: 1rem;
  }
  
  h2 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .buttons-container {
    margin-top: 1.5rem;
  }
}

/* Very small devices */
@media (max-width: 360px) {
  .content {
    padding: 1rem;
  }
  
  h2 {
    font-size: 1.2rem;
    margin-top: 0.7rem;
  }
  
  p {
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }
  
  .play-btn, .utopia-btn {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
}

/* Height-challenged devices */
@media (max-height: 500px) and (orientation: landscape) {
  .content {
    padding: 0.8rem;
    overflow-y: auto;
    justify-content: center;
  }
  
  .intro {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  h2 {
    font-size: 1.1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.3rem;
  }
  
  p {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }
  
  .buttons-container {
    margin-top: 0.5rem;
    gap: 0.5rem;
    flex-direction: row;
  }
  
  .play-btn, .utopia-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    min-width: auto;
  }
}

/* Pour les appareils à écran large */
@media (min-width: 1600px) {
  .content {
    max-width: 1000px;
  }
  
  .intro {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 2.4rem;
  }
  
  p {
    font-size: 1.6rem;
  }
}

/* Pour les appareils avec des écrans à ratio différent */
@media (aspect-ratio: 21/9), (min-aspect-ratio: 2/1) {
  .content {
    padding: 2rem;
    justify-content: center;
  }
  
  .background-video {
    width: 100vw;
    height: auto;
    min-height: 100vh;
  }
}

/* Pour les appareils avec écran tactile */
@media (hover: none) {
  .play-btn:active, .utopia-btn:active {
    transform: scale(0.95);
  }
}
</style>