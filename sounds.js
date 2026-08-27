// Sounds
var HOVER_SOUND_URL = 'https://files.mgyt.xyz/thefun/buttonrollover.mp3'; // rollover SFX
var CLICK_SOUND_URL = 'https://files.mgyt.xyz/thefun/buttonclickrelease.mp3'; // click SFX
var ERROR_SOUND_URL = 'https://files.mgytr.top/thefun/error.mp3'; // error SFX

var hoverSound = new Audio(HOVER_SOUND_URL);
var clickSound = new Audio(CLICK_SOUND_URL);
var errorSound = new Audio(ERROR_SOUND_URL);

// ONLY the specific error page names go here now
var errorPages = [
    'forbidden',
    'not_found',
    'notready',
    'tbd',
    'teapot',
    'updating',
    'errorphone',
    'pcerror'
];

function areSoundsMuted() {
    try { return localStorage.getItem('muteSounds') === 'true'; }
    catch(e) { return false; }
}

function safePlay(sound) {
    try {
        if (sound.readyState > 0) {
            sound.currentTime = 0;
        }
        
        var p = sound.play();
        if (p !== undefined && p.catch) {
            p.catch(function(e) {});
        }
    } catch(e) {
    }
}

// Checks if the current URL contains any of the specific error keywords
function isErrorPage() {
    // Grab the URL and make it lowercase to ensure it matches no matter how they typed it
    var currentUrl = window.location.href.toLowerCase();
    
    for (var i = 0; i < errorPages.length; i++) {
        // We check against the lowercase versions of your keywords
        if (currentUrl.indexOf(errorPages[i].toLowerCase()) !== -1) {
            return true;
        }
    }
    return false;
}

function initErrorSound() {
    if (!isErrorPage() || areSoundsMuted()) return;

    function removeInteractionListeners() {
        if (document.removeEventListener) {
            document.removeEventListener('click', playErrorSoundOnce);
            document.removeEventListener('keydown', playErrorSoundOnce);
            document.removeEventListener('touchstart', playErrorSoundOnce);
        }
    }

    function playErrorSoundOnce() {
        if (areSoundsMuted()) return;
        errorSound.currentTime = 0;
        safePlay(errorSound);
        removeInteractionListeners();
    }

    function addInteractionListeners() {
        if (document.addEventListener) {
            document.addEventListener('click', playErrorSoundOnce);
            document.addEventListener('keydown', playErrorSoundOnce);
            document.addEventListener('touchstart', playErrorSoundOnce);
        }
    }

    // Attempt to autoplay immediately
    try {
        errorSound.currentTime = 0;
        var playPromise = errorSound.play();

        if (playPromise !== undefined) {
            playPromise.then(function() {
                // Autoplay worked! We don't need to add interaction listeners.
            }).catch(function(error) {
                // Autoplay was blocked by the browser. 
                // Fall back to waiting for user interaction.
                addInteractionListeners();
            });
        } else {
            // Older browsers (like IE11) don't return a promise from play().
            // Play probably succeeded, but we add listeners just in case.
            addInteractionListeners();
        }
    } catch(e) {
        addInteractionListeners();
    }
}

function initLinkSounds() {
    var links = document.querySelectorAll('a');

    for (var i = 0; i < links.length; i++) {
        (function(link) {
            if (link.addEventListener) {
                link.addEventListener('mouseenter', function() {
                    if (areSoundsMuted()) return;
                    hoverSound.currentTime = 0;
                    safePlay(hoverSound);
                });
            } else if (link.attachEvent) {
                link.attachEvent('onmouseenter', function() {
                    if (areSoundsMuted()) return;
                    hoverSound.currentTime = 0;
                    safePlay(hoverSound);
                });
            }

            if (link.addEventListener) {
                link.addEventListener('click', function(event) {
                    if (areSoundsMuted()) return;
                    event = event || window.event;

                    var isInternal = link.hostname === window.location.hostname || !link.hostname;
                    var isNewTab = link.target === '_blank' || event.ctrlKey || event.shiftKey || event.metaKey;

                    if (isInternal && !isNewTab) {
                        if (event.preventDefault) event.preventDefault();
                        else event.returnValue = false;

                        clickSound.currentTime = 0;
                        safePlay(clickSound);

                        var dest = link.href;
                        setTimeout(function() {
                            window.location.href = dest;
                        }, 150);
                    } else {
                        clickSound.currentTime = 0;
                        safePlay(clickSound);
                    }
                });
            }
        })(links[i]);
    }
}

// Initialize everything on load
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function() {
        initLinkSounds();
        initErrorSound();
    });
} else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
            initLinkSounds();
            initErrorSound();
        }
    });
}