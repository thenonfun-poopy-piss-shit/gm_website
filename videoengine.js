// TriMess Video Engine. THE FUN 2026
document.addEventListener("DOMContentLoaded", function() {
  
  // DOM Element Selectors
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

  // Debug Selectors
  var debugOverlay = document.getElementById("debugOverlay");
  var closeDebugBtn = document.getElementById("closeDebugBtn");
  var debugResolution = document.getElementById("debugResolution");
  var debugTime = document.getElementById("debugTime");
  var debugVolume = document.getElementById("debugVolume");
  var debugBuffer = document.getElementById("debugBuffer");
  var debugInterval;

  // PNG Asset Paths
  var audioOnSrc = "https://assets-thenonfun.neocities.org/images/videoplayerassets/icons/audioON.png";
  var audioOffSrc = "https://assets-thenonfun.neocities.org/images/videoplayerassets/icons/audioOFF.png";

  // Reusable Play/Pause Logic
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

  // Mute / Unmute Logic
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

  // Volume Slider Logic
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

  // Unified Progress Layout Updates
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

  // Scroller click scrubbing tracking
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

  // Multi-engine Cross-Browser Fullscreen Handlers
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

  // IE11 Redraw Fix
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

  /* ==========================================================================
     Buffer Loading Event Handlers (IE11 Compliant)
     ========================================================================== */
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

  /* ==========================================================================
     IE11 YouTube Stats for Nerds Engine
     ========================================================================== */
  function updateDebugStats() {
    if (!video || !debugOverlay || debugOverlay.style.display === "none") return;

    // 1. Dimensions & Frame Drop Tracking (Trident/IE11 legacy property support)
    var width = video.videoWidth || 0;
    var height = video.videoHeight || 0;
    var droppedFrames = 0;
    if (video.webkitDroppedFrameCount) {
      droppedFrames = video.webkitDroppedFrameCount;
    } else if (video.msDroppedFrameCount) {
      droppedFrames = video.msDroppedFrameCount; // IE11 Specific frame drop metric
    }
    if (debugResolution) {
      debugResolution.innerHTML = width + "x" + height + " / " + droppedFrames + " dropped";
    }

    // 2. Stream Timeline
    if (debugTime) {
      debugTime.innerHTML = video.currentTime.toFixed(2) + " / " + (video.duration || 0).toFixed(2);
    }

    // 3. System Gain metrics
    if (debugVolume) {
      var volPercent = Math.round(video.volume * 100);
      debugVolume.innerHTML = volPercent + "% / " + (video.muted ? "true" : "false");
    }

    // 4. Buffer Health calculations
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

  // Context Menu Toggle ("Stats For Nerds" via right-click)
  if (container) {
    container.addEventListener("contextmenu", function(e) {
      e.preventDefault(); // Turn off native context window
      
      if (debugOverlay) {
        if (debugOverlay.style.display === "none") {
          debugOverlay.style.display = "block";
          // Start metric interval loops
          debugInterval = setInterval(updateDebugStats, 250);
        } else {
          debugOverlay.style.display = "none";
          clearInterval(debugInterval);
        }
      }
    });
  }

  // Explicit Close Button handler
  if (closeDebugBtn) {
    closeDebugBtn.addEventListener("click", function(e) {
      e.stopPropagation(); // Avoid triggering video play state shifts
      if (debugOverlay) {
        debugOverlay.style.display = "none";
        clearInterval(debugInterval);
      }
    });
  }

});