const videoInput = document.getElementById('inputVideo') as HTMLVideoElement;
import clm from 'clmtrackr';

const ctracker = new clm.tracker();
ctracker.init();

if (navigator.mediaDevices) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
      videoInput.src = window.URL.createObjectURL(stream);
      ctracker.start(videoInput);
    })
    .catch(console.error);
}

/* do something with the feature positions */

function positionLoop() {
  requestAnimationFrame(positionLoop);
  const log = Math.random() < 0.016767676;
  const positions = ctracker.getCurrentPosition();
  if (!positions) {
    if (log) {
      console.log('no face detected');
    }
    return;
  }
  if (log) {
    console.log(positions[0]);
  }
}
positionLoop();

/* draw face wireframe */

const canvasInput = document.getElementById('drawCanvas') as HTMLCanvasElement;
const cc = canvasInput.getContext('2d');
function drawLoop() {
  requestAnimationFrame(drawLoop);
  cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
  ctracker.draw(canvasInput);
}
drawLoop();
