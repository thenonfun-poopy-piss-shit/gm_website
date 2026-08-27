// NOTE
// THIS FILE IS UNUSED
// DO NOT USE
// OUTDATED OLD CODE
// --- VGUI ENGINE ---

function getVal(key) {
  try { 
    var stored = localStorage.getItem(key);
    if (stored === null && key === 'useExternalAssets') return true;
    return stored === 'true'; 
  } catch(e) { return false; }
}

function switchTab(tabName) {
  var tabs = document.getElementsByClassName('source-tab-item');
  var contents = document.getElementsByClassName('tab-content');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
    contents[i].classList.remove('active');
  }
  document.getElementById('tab-' + tabName).classList.add('active');
  document.getElementById('content-' + tabName).classList.add('active');
}

function toggleSettings(show) {
  var modal = document.getElementById('settingsModal');
  if(!modal) return;
  modal.style.display = show ? 'block' : 'none';
  if(show) {
    document.getElementById('muteWarnings').checked = getVal('hideWarnings');
    document.getElementById('useExternalAssets').checked = getVal('useExternalAssets');
    switchTab('site');
  }
}

function saveSettings() {
  localStorage.setItem('hideWarnings', document.getElementById('muteWarnings').checked);
  localStorage.setItem('useExternalAssets', document.getElementById('useExternalAssets').checked);
  toggleSettings(false);
  window.location.reload(); 
}

// Initialize on every page
(function() {
  var ua = navigator.userAgent;
  var isIE = !!document.documentMode || false;
  var isMobile = /Android|iPhone|iPad|iPod|IEMobile|Quest/i.test(ua);
  
  // GLOBAL IMAGE AUTO-CORRECT
  // This looks for any image with the class "gctr" and swaps the URL
  if (getVal('useExternalAssets')) {
      var images = document.querySelectorAll('.gctr');
      for (var i = 0; i < images.length; i++) {
          // Replace local path with external assets path
          var currentSrc = images[i].src;
          if (!currentSrc.includes('assets-thenonfun')) {
              var fileName = currentSrc.substring(currentSrc.lastIndexOf('/') + 1);
              images[i].src = "https://assets-thenonfun.neocities.org/" + fileName;
          }
      }
  }

  // Basic Alerts
  if (!getVal('hideWarnings')) {
    if (isMobile) console.log("WARN_DEVICE:MOBILECLIENT"); // Changed to console to be less annoying on subpages
    if (isIE) alert("WARN_BROWSER:OUTDATED");
  }
})();