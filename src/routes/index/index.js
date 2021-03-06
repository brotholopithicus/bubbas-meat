import './style.css';
import videoMP4 from '@/assets/videos/video.mp4';
import videoWEBM from '@/assets/videos/video.webm';
import videoBackground from '@/assets/videos/video-background.jpeg';
import circleLogo from '@/assets/svgs/logo_with_circle.svg';

function App() {
  this.currentPath = window.location.pathname;
  this.bgVideo = document.querySelector('.bg-video');
  this.logoEl = document.querySelector('.logo');

  this.videos = [{ file: videoMP4, type: 'video/mp4' }, { file: videoWEBM, type: 'video/webm' }];

  this.createVideoSource = (video, type) => {
    const source = document.createElement('source');
    source.src = video;
    source.type = type;
    this.bgVideo.appendChild(source);
  }
  this.initialize = () => {
    this.videoBackground = document.createElement('img');
    this.videoBackground.src = videoBackground;
    this.bgVideo.appendChild(this.videoBackground);
    this.videos.forEach(video => this.createVideoSource(video.file, video.type));
    this.logoEl.src = circleLogo;
  }
}

const app = new App();
app.initialize();
