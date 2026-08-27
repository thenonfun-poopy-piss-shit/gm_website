// achievements.js - Main directory
var ACHIEVEMENT_DATA = {
    'first_visit': { name: 'Welcome to gm_website', desc: 'Welcome, Enjoy your stay.', icon: 'first_visit' },
    'dev_mode': { name: '"Developer"', desc: 'Enabled developer console output.', icon: 'dev_mode' },
    'ie_user': { name: 'Tridenter', desc: 'Using an Internet Explorer based browser in 2026? The hospital is calling.', icon: 'ie'},
    'mobile_user': { name: 'Pocket Edition', desc: 'Browsing from a mobile device.', icon: 'mobile' },
    'error_404': { name: '404: Not Found', desc: 'Either i fucked up, you fucked up, or neocities fucked up.', icon: '404' },
    'error_503(1)': { name: '503: Updating', desc: 'i may or may not actually finish that update.', icon: '503' },
    'error_503(2)': { name: '503: Busy', desc: 'This site barely even exists yet.', icon: '503' },
    'error_403': { name: '403: Forbidden', desc: 'Get out and stay out!', icon: '403' },
    'error_418': { name: '418: Teapot', desc: 'Happens?', icon: '418', hidden: true },
    'error_426': { name: '426: Update Required', desc: 'You really should update.', icon: '426' },
    'error_400': { name: '400: Device not supported', desc: 'nope', icon: '400' },    
    'logo_death': { name: 'Curiosity killed the logo', desc: 'where did it go, I wonder.', icon: 'logodeath' },    
    'bigcommand': { name: 'what did you do', desc: '????', icon: 'bigcommand', hidden: true },
    'degub': { name: 'degub', desc: 'no seriously what did you do', icon: 'degub', hidden: true },   
    'dir': { name: 'DIR', desc: 'NOT READIN ALLAT', icon: 'dir' },   
    'thirdperson': { name: 'Third Person', desc: 'And now the user decided to get this achievement', icon: 'thirdperson' },
    'firstperson': { name: 'First Person', desc: 'I will get this achievement.', icon: 'firstperson' }, 
    'bob': { name: 'Wobbly', desc: 'Wobbly dobbity bob.', icon: 'bob' }, 
    'gay': { name: 'The World of color Update', desc: 'June came early.', icon: 'rainbow' },
    'spin': { name: 'Spin me right round', desc: 'This achievement also could have been called "washing machine"', icon: 'spin' },
    'spinge': { name: ' ', desc: ' you know what you did.', icon: 'spinge', hidden: true },
    'legal': { name: 'Legal', desc: 'Wow you really care dont you?', icon: 'legal', hidden: false },
    'note': { name: 'Notes Out', desc: 'clean that shit up right now', icon: 'note', hidden: false },
    '100_percent': { name: 'Completionist', desc: 'You caught all possible achievements for your hardware.', icon: 'platinum' }
};

// audio
var achSnd = null;

function playAchievementSound(id) {
   try { if (localStorage.getItem('muteSounds') === 'true') return; } catch(e) {}
    var defaultSnd = "https://files.catbox.moe/cduwr6.mp3"; 
    var spingeSnd = "https://files.catbox.moe/gk151s.mp3"; 

    var soundUrl = (id === 'spinge') ? spingeSnd : defaultSnd;

    if (!achSnd) { 
        achSnd = new Audio(soundUrl); 
    } else {
        achSnd.src = soundUrl;
        achSnd.load();
    }

    try {
        achSnd.pause();
        achSnd.currentTime = 0;
        var p = achSnd.play();
        if (p !== undefined && p.catch) { 
            p["catch"](function(e){ console.warn("Autoplay blocked"); }); 
        }
    } catch (e) { 
        achSnd.play(); 
    }
}

function getPlatformCompatibility(id) {
    var ua = window.navigator.userAgent;
    var isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1; //IE
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua); //phones

    if (id === 'ie_user' && !isIE) return false;
    if (id === 'mobile_user' && !isMobile) return false;
    return true; 
}

function checkCompletionist() {
    var rawData = localStorage.getItem('achievements');
    var unlocked = JSON.parse(rawData || '{}');
    var keys = Object.keys(ACHIEVEMENT_DATA);
    
    var possibleCount = 0;
    var unlockedCount = 0;

    for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        if (id === '100_percent' || id === 'placeholder') continue; 

        if (getPlatformCompatibility(id) || !!unlocked[id]) {
            possibleCount++;
            if (unlocked[id]) unlockedCount++;
        }
    }

    if (unlockedCount >= possibleCount && possibleCount > 0 && !unlocked['100_percent']) {
        setTimeout(function() { unlockAchievement('100_percent'); }, 500);
    }
}

function unlockAchievement(id) {
    var rawData = localStorage.getItem('achievements');
    var unlocked = JSON.parse(rawData || '{}');
    
    if (unlocked[id]) return; 

    unlocked[id] = new Date().toISOString();
    localStorage.setItem('achievements', JSON.stringify(unlocked));

    var data = ACHIEVEMENT_DATA[id];
    if (!data) return;

    playAchievementSound(id);

    var ua = window.navigator.userAgent;
    var isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    var imgSrc = isIE 
        ? 'https://assets-thenonfun.neocities.org/images/achivements/' + data.icon + '.png' //backup image host
        : 'images/achivements/' + data.icon + '.webp';

    var toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = '<img src="' + imgSrc + '" class="achievement-icon">' +
                     '<div class="achievement-text"><h5>Achievement Unlocked!</h5><p>' + data.name + '</p></div>';
    
    var container = document.getElementById('achievement-container') || document.createElement('div');
    if (!container.id) {
        container.id = 'achievement-container';
        document.body.appendChild(container);
    }
    container.appendChild(toast);

    setTimeout(function() { toast.className += ' show'; }, 100);
    setTimeout(function() {
        toast.className = toast.className.replace(' show', '');
        setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 600);
    }, 5000);

    checkCompletionist();
}

// Initial check
checkCompletionist();