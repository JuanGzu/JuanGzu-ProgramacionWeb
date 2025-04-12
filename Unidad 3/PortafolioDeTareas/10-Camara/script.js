const btnCamara = document.getElementById('btnCamara');
const btnGrabar = document.getElementById('btnGrabar');
const video = document.getElementById('video');
const grabacion = document.getElementById('grabacion');
const descargar = document.getElementById('descargar');

let mediaRecorder;
let chunks = [];
let streamActivo = null;

// Activar la cámara
btnCamara.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      streamActivo = stream;
      video.srcObject = stream;
      btnGrabar.disabled = false;

      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = event => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: 'video/mp4' });
        chunks = [];

        const videoURL = URL.createObjectURL(videoBlob);
        grabacion.src = videoURL;

        descargar.href = videoURL;
        descargar.download = 'grabacion.mp4';
        descargar.style.display = 'inline-block';
      };
    })
    .catch(err => {
      alert('Error al acceder a la cámara o micrófono.');
      console.error(err);
    });
});

// Iniciar / detener grabación
btnGrabar.addEventListener('click', () => {
  if (btnGrabar.textContent.includes('Iniciar')) {
    mediaRecorder.start();
    btnGrabar.textContent = '⏹️ Detener Grabación';
    descargar.style.display = 'none';
  } else {
    mediaRecorder.stop();
    btnGrabar.textContent = '🎬 Iniciar Grabación';
  }
});
