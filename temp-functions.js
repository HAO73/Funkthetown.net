// Importe la variable manquante preloadedVideos
const preloadedVideos = ref({});

// Fonction pour gérer les erreurs de vidéo
function onVideoError(event) {
  console.error("ERREUR VIDÉO DÉTECTÉE:", event);
  console.error("Source actuelle:", currentVideo.value);
  console.error("Index actuel:", currentVideoIndex.value);
  
  // Si une erreur se produit, essayons de passer à la vidéo suivante après un délai
  setTimeout(() => {
    console.log("Tentative de passage à la vidéo suivante suite à une erreur");
    forceNextVideo();
  }, 1000);
}