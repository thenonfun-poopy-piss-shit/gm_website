// TriMess Video Engine. THE FUN 2026
document.addEventListener("DOMContentLoaded", function() {
  
  var container = document.getElementById("videoContainer");
  var video = document.getElementById("myVideo");
  var playBtn = document.getElementById("playBtn");
  var muteBtn = document.getElementById("muteBtn");
  var muteIcon = document.getElementById("muteIcon");
  var fsBtn = document.getElementById("fsBtn");
  var progressContainer = document.getElementById("progressContainer");
  var progressBar = document.getElementById("progressBar");
  var volumeSlider = document.getElementById("volumeSlider");
  var loadingIndicator = document.getElementById("loadingIndicator");
  var debugOverlay = document.getElementById("debugOverlay");
  var closeDebugBtn = document.getElementById("closeDebugBtn");
  var debugResolution = document.getElementById("debugResolution");
  var debugTime = document.getElementById("debugTime");
  var debugVolume = document.getElementById("debugVolume");
  var debugBuffer = document.getElementById("debugBuffer");
  var debugInterval;
  var audioOnSrc = "https://assets-thenonfun.neocities.org/images/videoplayerassets/icons/audioON.png";
  var audioOffSrc = "https://assets-thenonfun.neocities.org/images/videoplayerassets/icons/audioOFF.png";

  function togglePlay() {
    if (!video || !playBtn) return;
    if (video.paused) {
      video.play();
      playBtn.innerHTML = "⏸";  
    } else {
      video.pause();
      playBtn.innerHTML = "▶"; 
    }
  }

  if (playBtn) { playBtn.addEventListener("click", togglePlay); }
  if (video) { video.addEventListener("click", togglePlay); }

  if (muteBtn && video) {
    muteBtn.addEventListener("click", function() {
      if (video.muted) {
        video.muted = false;
        if (muteIcon) muteIcon.src = audioOnSrc;
        if (volumeSlider) volumeSlider.value = video.volume;
      } else {
        video.muted = true;
        if (muteIcon) muteIcon.src = audioOffSrc;
        if (volumeSlider) volumeSlider.value = 0;
      }
    });
  }

  function handleVolumeChange() {
    if (!video || !volumeSlider) return;
    video.volume = volumeSlider.value;
    if (video.volume === 0) {
      video.muted = true;
      if (muteIcon) muteIcon.src = audioOffSrc;
    } else {
      video.muted = false;
      if (muteIcon) muteIcon.src = audioOnSrc;
    }
  }

  if (volumeSlider) {
    volumeSlider.addEventListener("input", handleVolumeChange);
    volumeSlider.addEventListener("change", handleVolumeChange); 
  }
  
  function updateProgressBar() {
    if (video && progressBar && video.duration) {
      var percentage = (video.currentTime / video.duration) * 100;
      progressBar.style.width = percentage + "%";
    }
  }

  if (video) {
    video.addEventListener("timeupdate", updateProgressBar);
    video.addEventListener("seeking", updateProgressBar);
    video.addEventListener("seeked", updateProgressBar);
  }

  if (progressContainer && video) {
    progressContainer.addEventListener("click", function(e) {
      var containerWidth = progressContainer.offsetWidth;
      var clickX = e.offsetX;
      if (video.duration) {
        video.currentTime = (clickX / containerWidth) * video.duration;
        updateProgressBar(); 
      }
    });
  }
  
  if (fsBtn && container) {
    fsBtn.addEventListener("click", function() {
      if (!document.fullscreenElement && 
          !document.msFullscreenElement && 
          !document.webkitFullscreenElement) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.msRequestFullscreen) {
          container.msRequestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    });
  }

  function forceTridentReflow() {
    if (video) {
      var currentDisplay = video.style.display;
      video.style.display = 'none';
      video.offsetHeight; 
      video.style.display = currentDisplay;
    }
  }

  document.addEventListener("fullscreenchange", forceTridentReflow);
  document.addEventListener("msfullscreenchange", forceTridentReflow);
  document.addEventListener("webkitfullscreenchange", forceTridentReflow);

  if (video && loadingIndicator) {
    video.addEventListener("waiting", function() {
      loadingIndicator.style.display = "block";
    });
    video.addEventListener("playing", function() {
      loadingIndicator.style.display = "none";
    });
    video.addEventListener("seeking", function() {
      loadingIndicator.style.display = "block";
    });
    video.addEventListener("seeked", function() {
      loadingIndicator.style.display = "none";
    });
    video.addEventListener("canplay", function() {
      loadingIndicator.style.display = "none";
    });
  }
  
  function updateDebugStats() {
    if (!video || !debugOverlay || debugOverlay.style.display === "none") return;

    var width = video.videoWidth || 0;
    var height = video.videoHeight || 0;
    var droppedFrames = 0;
    if (video.webkitDroppedFrameCount) {
      droppedFrames = video.webkitDroppedFrameCount;
    } else if (video.msDroppedFrameCount) {
      droppedFrames = video.msDroppedFrameCount;
    }
    if (debugResolution) {
      debugResolution.innerHTML = width + "x" + height + " / " + droppedFrames + " dropped";
    }

    if (debugTime) {
      debugTime.innerHTML = video.currentTime.toFixed(2) + " / " + (video.duration || 0).toFixed(2);
    }

    if (debugVolume) {
      var volPercent = Math.round(video.volume * 100);
      debugVolume.innerHTML = volPercent + "% / " + (video.muted ? "true" : "false");
    }
    if (debugBuffer) {
      var bufferLen = 0;
      var targetTime = video.currentTime;
      for (var i = 0; i < video.buffered.length; i++) {
        if (targetTime >= video.buffered.start(i) && targetTime <= video.buffered.end(i)) {
          bufferLen = video.buffered.end(i) - targetTime;
          break;
        }
      }
      debugBuffer.innerHTML = bufferLen.toFixed(2) + "s";
    }
  }

  if (container) {
    container.addEventListener("contextmenu", function(e) {
      e.preventDefault();
      
      if (debugOverlay) {
        if (debugOverlay.style.display === "none") {
          debugOverlay.style.display = "block";
          debugInterval = setInterval(updateDebugStats, 250);
        } else {
          debugOverlay.style.display = "none";
          clearInterval(debugInterval);
        }
      }
    });
  }

  if (closeDebugBtn) {
    closeDebugBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      if (debugOverlay) {
        debugOverlay.style.display = "none";
        clearInterval(debugInterval);
      }
    });
  }

});