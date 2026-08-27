 //===================//
 //TRIMESS MAIN ENGINE//
 //THE FUN 2026       //
 //===================//
 //CODENAME "TriMess"
 //NOTE: DO NOT LEARN ANYTHING FROM THIS DOCUMENT. THIS FILE IS A MESS, AND SHOULD NOT EVER BE USED FOR LEARNING JAVASCRIPT!!!!
 //THANK YOU
 //hell starts here, good luck, enjoy your stay.
          //TODO*, site may break on phones when swtiching pages only on the index, *however i realized nobody gaf so i wont even bother to try to find the issue.
//console thats used everywhere else but for the index
(function initGlobalCommandLine() {
    var isIndexPage = window.location.pathname === '/' || 
                      window.location.pathname.indexOf('index.html') !== -1; //check for if the current page is the index
                      
    if (isIndexPage) return; //disables the \ console if so

    window.addEventListener('keydown', function(e) {
        if (e.key === '\\' || e.keyCode === 220) {
            if (document.activeElement === document.getElementById('engineCmdInput')) return;
            e.preventDefault(); 
            toggleCommandLine();
        }
    });
    function toggleCommandLine() {
        var consoleDiv = document.getElementById('onScreenConsole');
        if (!consoleDiv) return;

        var cmdContainer = document.getElementById('engineCmdContainer');
        var cmdInput = document.getElementById('engineCmdInput');

        if (!cmdContainer) {
            cmdContainer = document.createElement('div');
            cmdContainer.id = 'engineCmdContainer';
            cmdContainer.style.marginTop = '8px';
            cmdContainer.style.display = 'none'; 
            cmdContainer.style.background = 'rgba(20, 20, 20, 0.9)';
            cmdContainer.style.border = '1px solid #444';
            cmdContainer.style.padding = '4px 6px';
            
            var promptLabel = document.createElement('span');
            promptLabel.innerText = '] ';
            promptLabel.style.color = '#f5d042'; 
            promptLabel.style.marginRight = '6px';
            promptLabel.style.fontWeight = 'bold';
            promptLabel.style.fontFamily = 'monospace';
            
            cmdInput = document.createElement('input');
            cmdInput.id = 'engineCmdInput';
            cmdInput.type = 'text';
            cmdInput.placeholder = 'Enter command...';
            cmdInput.style.background = 'transparent';
            cmdInput.style.border = 'none';
            cmdInput.style.color = '#ffffff';
            cmdInput.style.fontFamily = 'monospace';
            cmdInput.style.outline = 'none';
            
            //TODO: fix IE11 not grabbing the \ input and then adding in the command console, or add another way to summon a command console on other pages, maybe one using a TFGUI window instead.
            cmdInput.style.msFlex = '1';
            cmdInput.style.flex = '1';
            cmdInput.style.fontSize = '12px';
            
            cmdContainer.appendChild(promptLabel);
            cmdContainer.appendChild(cmdInput);
            consoleDiv.appendChild(cmdContainer);
            
            cmdInput.addEventListener('keydown', function(innerEvent) {
                if (innerEvent.key === 'Enter' || innerEvent.keyCode === 13) {
                    var commandString = cmdInput.value.trim();
                    if (commandString) {
                        if (typeof executeCommand === 'function') {
                            executeCommand(commandString);
                        } else {
                            console.error("FATAL: executeCommand function is missing.");
                        }
                        cmdInput.value = ''; 
                    }
                }
            });
        }

        // IE 11 shit, all this yet the command console still doesnt open with the "\" keybind.
        if (cmdContainer.style.display === 'none' || cmdContainer.style.display === '') {
            cmdContainer.style.display = '-ms-flexbox';
            cmdContainer.style.display = 'flex';
            
            consoleDiv.style.display = '-ms-flexbox';
            consoleDiv.style.display = 'flex'; // attempt to force it open
            
            setTimeout(function() { cmdInput.focus(); }, 20);
        } else {
            cmdContainer.style.display = 'none';
        }
    }
})();//emblem code as used on the index
var emblem = document.getElementById('siteEmblem');
if (emblem) {
    emblem.addEventListener('click', function() {
        var embedCode = '<a href="https://thenonfun.neocities.org"><img src="https://thenonfun.neocities.org/images/gmwebsitebadge.gif" alt="gm_website" width="88" height="31" style="border:none;"></a>';
        
        var textArea = document.createElement("textarea");
        textArea.value = embedCode;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            var successful = document.execCommand('copy');
            if (successful) {
                var feedback = document.getElementById('copyFeedback');
                if (feedback) feedback.className = "copy-feedback show";
                
                setTimeout(function() {
                    if (feedback) feedback.className = "copy-feedback";
                }, 1500);
            }
        } catch (err) {
            console.error('FS_ERROR: Unable to copy emblem code.', err);
        }
        
        document.body.removeChild(textArea);
    });
}
        var SITE_VERSION = "2026..."; // fallback for the version in the console output, probably should change it slightly without the dots

        // fetch version from version.txt
        (function() {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/version.txt", true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    SITE_VERSION = xhr.responseText.trim();
                    var buildEl = document.getElementById('siteBuildNum');
                    if (buildEl) buildEl.innerText = SITE_VERSION;
                }
            };
            xhr.send();
        })();
        //helpers
        function getClosestAnchor(el) {
            while (el && el !== document.body) {
                if (el.tagName === 'A') return el;
                el = el.parentElement;
            }
            return null;
        }
        function getVal(key) {
            try { return localStorage.getItem(key) === 'true'; } catch(e) { return false; }
        } //TODO: Merge all the browser ua checks in this file into this one starting piece of code, then just call from here.
      //gets users browser here
        function getBrowserName() {
            var s = navigator.userAgent;
            if (s.indexOf("Windows Phone") !== -1 || s.indexOf("IEMobile") !== -1) return "Internet Explorer (Mobile)";
            if (s.indexOf("MSIE") !== -1 || s.indexOf("Trident/") !== -1 || !!document.documentMode) return "Internet Explorer";
            if (s.indexOf("Edg") !== -1) return "Edge";
            if (s.indexOf("OPR") !== -1 || s.indexOf("Opera") !== -1) return "Opera";
            if (s.indexOf("Presto/") !== -1) return "Opera (Presto)";
            if (s.indexOf("Firefox") !== -1) return "Firefox";
            if (s.indexOf("Chrome") !== -1) return "Chrome";
            if (s.indexOf("Safari") !== -1) return "Safari";
            return "Unknown Engine";
        }
      //gets browsers engine here.
        function getEngineName() {
            var s = navigator.userAgent;
            if (s.indexOf("Trident") !== -1 || !!document.documentMode) return "Trident";
            if (s.indexOf("Presto") !== -1) return "Presto";
            if (s.indexOf("Edge") !== -1) return "EdgeHTML";
            if (s.indexOf("Firefox") !== -1) return "Gecko";
            if (s.indexOf("Chrome") !== -1) return "Chromium";
            if (s.indexOf("Safari") !== -1 && s.indexOf("Chrome") === -1) return "WebKit";
            return "Unknown";
        }

      //main console
        (function initDeveloperConsole() {
            if (!getVal('devMode')) return;

            var oldLog = console.log;
            var oldWarn = console.warn;
            var oldError = console.error;
            var oldInfo = console.info;
            
            var onScreenConsole = document.getElementById('onScreenConsole');
            if (!onScreenConsole) {
                onScreenConsole = document.createElement('div');
                onScreenConsole.id = 'onScreenConsole';
                document.body.insertBefore(onScreenConsole, document.body.firstChild);
            }

            var devLogContainer = document.getElementById('devLogContainer');
            var maxLines = 10;

            function printToScreen(msg, color) {
                if (onScreenConsole) {
                    onScreenConsole.style.display = '-ms-flexbox';
                    onScreenConsole.style.display = 'flex';
                    var line = document.createElement('div');
                    line.className = 'console-line';
                    if (color) line.style.color = color;
                    line.innerText = typeof msg === 'object' ? "Object" : msg;
                    onScreenConsole.appendChild(line);

                    while (onScreenConsole.childNodes.length > maxLines) {
                        onScreenConsole.removeChild(onScreenConsole.firstChild);
                    }

                    setTimeout(function() {
                        if (line.parentNode) line.parentNode.removeChild(line);
                        if (onScreenConsole.childNodes.length === 0) onScreenConsole.style.display = 'none';
                    }, 6000);
                }

                if (devLogContainer) {
                    var logEntry = document.createElement('div');
                    if (color) logEntry.style.color = color;
                    logEntry.innerText = typeof msg === 'object' ? "Object" : msg;
                    devLogContainer.appendChild(logEntry);
                    devLogContainer.scrollTop = devLogContainer.scrollHeight;
                }
            }
  
            console.log = function() {
                if (oldLog) oldLog.apply(console, arguments);
                var args = Array.prototype.slice.call(arguments); //im hungry
                printToScreen(args.join(' '));
            };
            console.warn = function() {
                if (oldWarn) oldWarn.apply(console, arguments);
                var args = Array.prototype.slice.call(arguments); //what to eat
                printToScreen(args.join(' '), '#ffae42');
            };
            console.error = function() {
                if (oldError) oldError.apply(console, arguments);
                var args = Array.prototype.slice.call(arguments); //no ideas
                printToScreen(args.join(' '), '#ff4c4c');
            };
            console.info = function() {
                if (oldInfo) oldInfo.apply(console, arguments);
                var args = Array.prototype.slice.call(arguments); //actually i probably have yesterdays food
                printToScreen(args.join(' '), '#55ff55');
            };

            // error checks
            window.onerror = function(msg, url, line) {
                console.error("FATAL ERROR: " + msg + " at line " + line); //yep lasagne W EATS
                return false;
            };

            //boot logs you see when going to a page on this site
            setTimeout(function() {
                printToScreen("gm_website 'TriMess' [Version " + SITE_VERSION + "]", "#d386ff");
                printToScreen("(c) The Fun. Site is under a CC BY 4.0 license.", "#d386ff"); 
                printToScreen("See legal page for details.", "#d386ff");
                //TODO: condence all UA checks into one check so i dont have to do this each time since this is bad practice!!!
                var isIE = !!document.documentMode || false;
                var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); //i actually visited this site on a nokia n82, checks work very well here
                if (isIE) console.error("WARN_BROWSER: OUTDATED CLIENT DETECTED");
                if (isMobile) console.warn("WARN_DEVICE: MOBILE CLIENT DETECTED");
            }, 100);
        })();
//main index command console code here
        function executeCommand(input) {
            if (!input) return;
            var parts = input.trim().split(/\s+/);
            var cmd = parts[0].toLowerCase();
            var arg = parts[1];
        
            console.log("] " + input);

            switch(cmd) {
case 'js_state':
  //command for general javascript checking, along with other things like the site version being printed out
    console.info("--- JAVASCRIPT ENGINE STATE ---");
    console.log("  Site Version: " + SITE_VERSION);
    console.log("  Noclip Active: " + !!window.noclipActive);
    console.log("  Bobbing Interval: " + (window.bobInterval ? "ACTIVE" : "INACTIVE"));
    console.log("  Rainbow Interval: " + (window.rainbowInterval ? "ACTIVE" : "INACTIVE"));
    console.log("  Audio Playing: " + (window._currentPlayingSound ? "YES" : "NO"));
    break;
    case 'ui_inspect':
      //checks for these specific stuff
    console.info("--- UI ELEMENT INSPECTOR ---");
    console.log("  Settings Modals (.source-modal): " + document.querySelectorAll('.source-modal').length);
    console.log("  Achievement Toasts (.achievement-toast): " + document.querySelectorAll('.achievement-toast').length);
    console.log("  Wiki Banners (.wiki-banner): " + document.querySelectorAll('.wiki-banner').length);
    console.log("  Blog Containers (.blog-container): " + document.querySelectorAll('.blog-container').length);
    
    // checks for more specific shit on the page
    console.log("  Draggable Header (#modalHeader): " + (document.getElementById('modalHeader') ? "LOADED" : "MISSING"));
    console.log("  Global Console (#onScreenConsole): " + (document.getElementById('onScreenConsole') ? "LOADED" : "MISSING"));
    console.log("  Vignette Overlay (#vignette): " + (document.getElementById('vignette') ? "LOADED" : "MISSING"));
    break;
    //achievement commands
case 'give_achievement':
case 'achievement_grant':
// no the password isnt encrypted in anyway lmao, why the fuck would i even bother doing allat
    var args = input.split(' '); // input being the full command string
    var achId = args[1];
    var pass = args[2];

    if (!achId) { 
        console.error("USAGE: give_achievement <id> <password>"); 
        break; 
    }

    //simple password checker
    if (pass !== "9160") { //ooohh you wanna look away from the password SO BAD oohh yeah you dont wanna cheat anymore yeaaaahhhh you dont feel like cheating anymore OOOOOhhhhhHHHHHHh
        console.error("ACCESS DENIED: Invalid authorization code.");
        unlockAchievement('error_403'); // unlock 403 "forbidden" achievement if password is wrong
        break;
    }

    if (!ACHIEVEMENT_DATA[achId]) { 
        console.error("Error: Unknown achievement ID '" + achId + "'"); 
        break; 
    }

    unlockAchievement(achId);
    console.info("SYSTEM: Authentication successful. Granted '" + achId + "'");
    break;

                case 'remove_achievement':
                case 'achievement_revoke':
                    if (!arg) { console.error("USAGE: remove_achievement <id>"); break; }
                    var rawData = localStorage.getItem('achievements');
                    var unl = JSON.parse(rawData || '{}');
                    if (unl[arg]) {
                        delete unl[arg];
                        localStorage.setItem('achievements', JSON.stringify(unl));
                        console.info("SYSTEM: Revoked achievement '" + arg + "'");
                    } else {
                        console.warn("SYSTEM: Achievement '" + arg + "' is not currently unlocked.");
                    }
                    break; //burped so hard rn

                case 'reset_achievements':
                    localStorage.removeItem('achievements');
                    console.warn("SYSTEM: All achievements have been completely reset.");
                    console.info("Note: Refresh the page to clear the current session memory.");
                    break;
                   //NOCLIP WAS REMOVED DUE TO BEING BROKEN FOR SO LONG, AND NOT SERVING A USE 
                   case 'reset_chat_consent':
                case 'revoke_consent':
                    try {
                        localStorage.removeItem('chatConsentGiven');
                        console.info("SYSTEM: Chatbox cookie consent has been revoked.");
                        
                        var currentPath = window.location.pathname.toLowerCase();
                        // If they are currently on a page with a chatbox, reload it to force the UI update
                        if (currentPath.indexOf('guestbook') !== -1 || currentPath.indexOf('chatbox') !== -1) {
                            console.warn("Active chat session detected. Reloading to enforce disclaimer...");
                            setTimeout(function() { window.location.reload(); }, 800);
                        } else {
                            console.log("The legal disclaimer will reappear the next time you visit a chat page.");
                        }
                    } catch (e) {
                        console.error("FILESYSTEM_FAIL: Could not modify LocalStorage.");
                    }
                    break;
case 'thirdperson':
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.backgroundColor = "#050505"; 
    document.documentElement.style.height = "100vh";

    document.body.style.animation = "none"; 
    document.body.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    document.body.style.transformOrigin = "center top";
    
    document.body.style.setProperty("transform", "scale(0.7) translateY(50px)", "important");
    
    document.body.style.outline = "1px solid #222";
    document.body.style.boxShadow = "0 0 60px rgba(0,0,0,0.9)";

    console.warn("Camera set to Thirdperson mode");
    if(typeof unlockAchievement === "function") unlockAchievement('thirdperson');
    break;

case 'firstperson':
    // restore view
    document.documentElement.style.overflow = "";
    document.documentElement.style.backgroundColor = "";
    
    document.body.style.animation = "none"; 
    document.body.style.setProperty("transform", "none", "important");
    document.body.style.outline = "none";
    document.body.style.boxShadow = "none";

    console.info("CAMERA: Reattached to firstperson.");
        if(typeof unlockAchievement === "function") unlockAchievement('firstperson');
    break;
case 'ent_kill':
    if (!arg) { console.error("USAGE: ent_kill <id> or ent_kill .<class>"); break; }
    var killTargets;
    if (arg.charAt(0) === '.') {
        killTargets = document.getElementsByClassName(arg.substring(1));
    } else {
        var byId = document.getElementById(arg);
        killTargets = byId ? [byId] : document.getElementsByClassName(arg);
    }
    if (killTargets.length) {
        for (var k = 0; k < killTargets.length; k++) {
            killTargets[k].classList.add('physics-fall');
        }
        console.info("Entity '" + arg + "' killed (" + killTargets.length + " matched).");
        if (arg === 'mainTitle') {
            unlockAchievement('logo_death');
        } else {
            unlockAchievement('ent_kill');
        }
    } else {
        console.error("YOU DONE FUCKED UP!!!!!!!!!!!!!!!");
    }
    break;
case 'respawn_logo': //this fuckass poopy stinky command does nothing, its useless anyway, why wouldnt you just refresh the fucking page to make it come back again
    var title = document.getElementById('mainTitle');
    if (title) {
      console.log("DEBUG: Triggering logo death achievement...");
        title.classList.remove('physics-fall');
        console.info("PHYSICS: Entity 'maintitle' respawned at origin.");
    }
    break;
              case 'tfgui_spin':
                    var state = (arg === '1');
                    if (state) {
                        document.body.classList.add('spinning-forever');
                        console.info("Initiating infinite orbital rotation.");
                                    unlockAchievement('spin');
                    } else {
                        document.body.classList.remove('spinning-forever');
                        console.info("Rotation stopped.");
                    }
                    break;
                  case 'view_code':
    if (!arg) {
        console.error("USAGE: view_code <filepath>");
        break;
    }
    
    var filePath = arg;
    var extSplit = filePath.split('.');
    var ext = extSplit.length > 1 ? extSplit[extSplit.length - 1].toLowerCase() : 'txt';
    
    console.info("Fetching source code for " + filePath + "...");
    
    var xhrCode = new XMLHttpRequest();
    xhrCode.open("GET", filePath, true);
    
    xhrCode.onreadystatechange = function() {
        if (xhrCode.readyState === 4) {
            if (xhrCode.status === 200 || xhrCode.status === 304) {
                var rawCode = xhrCode.responseText;
                
                var isActiveScript = false;
                var isActiveCSS = false;
                var scripts = document.getElementsByTagName('script');
                var links = document.getElementsByTagName('link');
                var i, j;

                for (i = 0; i < scripts.length; i++) {
                    if (scripts[i].src && scripts[i].src.indexOf(filePath) !== -1) {
                        isActiveScript = true;
                        break;
                    }
                }
                for (j = 0; j < links.length; j++) {
                    if (links[j].href && links[j].href.indexOf(filePath) !== -1) {
                        isActiveCSS = true;
                        break;
                    }
                }
                
                var safeCode = rawCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                
                if (ext === 'js' || ext === 'json') {
                    safeCode = safeCode.replace(/(&quot;.*?&quot;|'.*?'|`.*?`)/g, '<span style="color: #f5d042;">$1</span>');
                    safeCode = safeCode.replace(/\b(var|function|return|if|else|for|while|switch|case|break|default|true|false|null|console)\b/g, '<span style="color: #d386ff; font-weight: bold;">$1</span>');
                    safeCode = safeCode.replace(/(\/\/.*)/g, '<span style="color: #888888; font-style: italic;">$1</span>');
                } else if (ext === 'css') {
                    safeCode = safeCode.replace(/([a-zA-Z\-]+)\s*:/g, '<span style="color: #d386ff;">$1</span>:');
                    safeCode = safeCode.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #888888; font-style: italic;">$1</span>');
                } else if (ext === 'html') {
                    safeCode = safeCode.replace(/(&lt;\/?[a-zA-Z0-9]+)/g, '<span style="color: #ff6644;">$1</span>');
                }
                
                var lines = safeCode.split('\n');
                var tableHTML = "<table style='border-collapse: collapse; width: 100%; font-family: monospace; font-size: 13px; line-height: 1.4;'>";
                tableHTML += "<tbody>";
                
                for (i = 0; i < lines.length; i++) {
                    var lineNum = i + 1;
                    var lineContent = lines[i] || " ";
                    
                    tableHTML += "<tr id='code_row_" + lineNum + "' data-raw-line='" + lines[i].replace(/'/g, "&#39;") + "'>";
                    tableHTML += "<td style='position: -webkit-sticky; position: sticky; left: 0; background-color: #2b2b2b; color: #888; text-align: right; padding: 0 10px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; border-right: 1px solid #444; vertical-align: top; z-index: 2; white-space: pre; width: 1px;'>";
                    tableHTML += lineNum;
                    tableHTML += "</td>";
                    
                    tableHTML += "<td style='padding: 0 10px; color: #e1e1e1; white-space: pre; vertical-align: top;'>";
                    tableHTML += lineContent;
                    tableHTML += "</td>";
                    tableHTML += "</tr>";
                }
                tableHTML += "</tbody></table>";
                
                var viewerId = 'codeViewer_' + new Date().getTime();
                var viewerDiv = document.createElement('div');
                viewerDiv.id = viewerId;
                viewerDiv.className = 'source-modal';
                
                var winWidth = Math.min(750, window.innerWidth * 0.9);
                var winHeight = Math.min(500, window.innerHeight * 0.8);
                var initialLeft = (window.innerWidth - winWidth) / 2;
                var initialTop = (window.innerHeight - winHeight) / 2;
                
                viewerDiv.style.width = winWidth + 'px';
                viewerDiv.style.height = winHeight + 'px';
                viewerDiv.style.left = initialLeft + 'px';
                viewerDiv.style.top = initialTop + 'px';
                viewerDiv.style.transform = 'none';
                viewerDiv.style.display = 'block';
                viewerDiv.style.zIndex = '10005';
                viewerDiv.style.overflow = 'hidden';
                viewerDiv.style.boxSizing = 'border-box';
                
                var statusBadge = "";
                if (isActiveScript || isActiveCSS) {
                    statusBadge = " <span style='color: #55ff55; font-size: 11px; margin-left: 8px;'>[ACTIVE IN RUNTIME]</span>";
                }

                var html = "";
                // Header
                html += "<div class='source-header' id='" + viewerId + "_header'>";
                html += "<span>// Viewing: " + filePath + statusBadge + "</span>";
                html += "<button class='close-x' style='background:none;border:none;' onclick='if(window._codeHighlightInterval) clearInterval(window._codeHighlightInterval); document.body.removeChild(document.getElementById(\"" + viewerId + "\"))'>X</button>"; //XBOXXXX LIIIIIVE!!!!!!!!!!!!!!!!!!!!!
                html += "</div>";
                
                // Body
                html += "<div class='source-body' style='padding:0; background-color:#1e1e1e; height: calc(100% - 35px); overflow: auto;'>";
                html += tableHTML;
                html += "</div>";
                
                viewerDiv.innerHTML = html;
                document.body.appendChild(viewerDiv);
                
                (function() {
                    var vDiv = document.getElementById(viewerId);
                    var vHeader = document.getElementById(viewerId + "_header");
                    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                    
                    vHeader.onmousedown = function(e) {
                        e = e || window.event;
                        e.preventDefault();
                        pos3 = e.clientX;
                        pos4 = e.clientY;
                        document.onmouseup = function() {
                            document.onmouseup = null;
                            document.onmousemove = null;
                        };
                        document.onmousemove = function(e) {
                            e = e || window.event;
                            pos1 = pos3 - e.clientX;
                            pos2 = pos4 - e.clientY;
                            pos3 = e.clientX;
                            pos4 = e.clientY;
                            vDiv.style.top = (vDiv.offsetTop - pos2) + "px";
                            vDiv.style.left = (vDiv.offsetLeft - pos1) + "px";
                        };
                    };
                })();

                if (window._codeHighlightInterval) {
                    clearInterval(window._codeHighlightInterval);
                }

                window._codeHighlightInterval = setInterval(function() {
                    if (!document.getElementById(viewerId)) {
                        clearInterval(window._codeHighlightInterval);
                        return;
                    }

                    var rows = viewerDiv.getElementsByTagName('tr');
                    for (var r = 0; r < rows.length; r++) {
                        var row = rows[r];
                        var rawText = row.getAttribute('data-raw-line') || '';
                        var shouldHighlight = false;

                        if (window.bobInterval && rawText.indexOf('tfgui_bob') !== -1) {
                            shouldHighlight = true;
                        } else if (window.rainbowInterval && (rawText.indexOf('tfgui_rainbow') !== -1 || rawText.indexOf('tfgui_gay') !== -1)) {
                            shouldHighlight = true;
                        } else if (window._currentPlayingSound && rawText.indexOf('playsound') !== -1) {
                            shouldHighlight = true;
                        } else if (document.body.classList.contains('spinning-forever') && rawText.indexOf('tfgui_spin') !== -1) {
                            shouldHighlight = true;
                        } else if (document.getElementById('wireframe-style') && rawText.indexOf('mat_wireframe') !== -1) {
                            shouldHighlight = true;
                        } else if (document.getElementById('tfguiPos') && rawText.indexOf('cl_show_pos') !== -1) {
                            shouldHighlight = true;
                        }

                        if (shouldHighlight) {
                            row.style.backgroundColor = 'rgba(255, 255, 0, 0.25)';
                            row.style.borderLeft = '3px solid #f5d042';
                        } else {
                            row.style.backgroundColor = '';
                            row.style.borderLeft = '';
                        }
                    }
                }, 200);
                
                console.info("SYSTEM: Code view opened with active line inspector in TFGUI.");
                
            } else {
                console.error("FS_ERROR: Could not load '" + filePath + "'. HTTP Status: " + xhrCode.status);
            }
        }
    };
    xhrCode.send();
    break;
              case 'tfgui_bob':
    var state = (arg === '1');
    var hud = document.getElementById('mainHudContainer');
    var logo = document.getElementById('mainTitle'); // TODO: Fix logo not getting targetted due to css conflict (?)
    
    if (state) {
        if (window.bobInterval) clearInterval(window.bobInterval);
        
        window.bobInterval = setInterval(function() {
            var time = Date.now() / 1000;
            var angle = Math.sin(time * 2) * 3;
            var offset = Math.cos(time * 2) * 5;
            
            var transformString = "rotate(" + angle + "deg) translateY(" + offset + "px)";
            
            if (hud) hud.style.transform = transformString;
            if (logo) logo.style.transform = transformString; // Logo should but doesnt bob. most likely css conflict
        }, 30);
        console.info("HUD & Logo Bobbing: ENABLED");
                    unlockAchievement('bob');
    } else {
        clearInterval(window.bobInterval);
        if (hud) hud.style.transform = "";
        if (logo) logo.style.transform = "";
        console.info("Bobbing: DISABLED");
    }
    break;
    case 'listconvars':
                    console.info("--- AVAILABLE CONVARS ---");
                    //wow isnt that cool
                    console.log("  disableteapot  [" + (getVal('disableTeapot') ? "true" : "false") + "] - Disables the 418 teapot random redirect");
                    console.log("  devmode        [" + (getVal('devMode') ? "true" : "false") + "] - Enables developer mode and extra client tabs");
                    console.log("  mutewarnings   [" + (getVal('hideWarnings') ? "true" : "false") + "] - Suppresses outdated browser/mobile alerts");
                    console.log("  hidewarnings   [Alias for mutewarnings]");
                    console.log("  disablesplashes[" + (getVal('disableSplashes') ? "true" : "false") + "] - Disables random splash texts");
                    console.info("--- Usage: setconvar <varname> <true/false> ---");
                    break;
              case 'make_coffee':
                    console.warn("Error 418: I'm a teapot.");
                    console.info("Redirecting to brewing station...");
                    setTimeout(function(){ window.location.href = "/teapot"; }, 1000);
                    break;

                case 'tfgui_rainbow':
                case 'tfgui_gay': //TODO: FIX FOR IE 11 USERS. DOES NOT WORK ON IE, SUCH A SHAME, NO GAY MODE FOR THE TWO INTERNET EXPLORER USERS );
                    var state = (arg === '1');
                    if (state) {
                        if (!window.rainbowInterval) {
                            var hue = 0;
                            window.rainbowInterval = setInterval(function() {
                                hue = (hue + 10) % 360; // the cycle of life.
                                document.body.style.webkitFilter = "hue-rotate(" + hue + "deg)"; // For browsers you'd like to actually use.
                                document.body.style.filter = "hue-rotate(" + hue + "deg)";
                            }, 50);
                            console.info("Rainbow Mode: ENABLED");
                                        unlockAchievement('gay'); //fake and gyaaay
                        }
                    } else {
                        clearInterval(window.rainbowInterval);
                        window.rainbowInterval = null;
                        document.body.style.filter = "";
                        document.body.style.webkitFilter = "";
                        console.info("Rainbow Mode: DISABLED");
                    }
                    break;
              case 'cl_drawhud':
                    var hud = document.getElementById('mainHudContainer');
                    var state = (arg === '1');
                    if (hud) {
                        hud.style.display = state ? 'block' : 'none';
                        console.info("HUD Display: " + (state ? "ON" : "OFF"));
                    } else {
                        console.error("HUD container not found.");
                    }
                    break;
              case 'cl_show_pos':
                    var state = (arg === '1');
                    var posBox = document.getElementById('tfguiPos');
                    
                    if (state) {
                        if (!posBox) {
                            posBox = document.createElement('div');
                            posBox.id = 'tfguiPos';
                            posBox.style.cssText = "position:fixed; bottom:10px; right:10px; color:#f5d042 !important; font-family:monospace; font-size:12px; z-index:999999 !important; background:rgba(0,0,0,0.8); padding:4px 8px; border:1px solid #555; pointer-events:none;";
                            document.body.appendChild(posBox);
                        }

                        if (window.removeEventListener) window.removeEventListener('mousemove', window.updateMousePos);
                        
                        window.updateMousePos = function(e) {
                            var x = e.clientX;
                            var y = e.clientY;
                            if (posBox) posBox.innerText = "pos: " + x + ", " + y;
                        };

                        if (window.addEventListener) {
                            window.addEventListener('mousemove', window.updateMousePos, false);
                        } else if (window.attachEvent) { 
                            window.attachEvent('onmousemove', window.updateMousePos);
                        }
                        console.info("TFGUI Position: ON");
                    } else {
                        if (posBox && posBox.parentNode) posBox.parentNode.removeChild(posBox);
                        if (window.removeEventListener) {
                            window.removeEventListener('mousemove', window.updateMousePos, false);
                        } else if (window.detachEvent) {
                            window.detachEvent('onmousemove', window.updateMousePos);
                        }
                        console.info("TFGUI Position: OFF");
                    }
                    break;

                case 'tfgui_drawtree':
                    var all = document.getElementsByTagName('*');
                    var active = (arg === '1');
                    
                    // IE/Chrome sometimes refuse to show 'outline' if it's not specific enough, They are bitches. We all hate bitches.
                    for (var i = 0; i < all.length; i++) {
                        if (active) {
                            all[i].style.setProperty("outline", "1px solid #00ff00", "important");
                        } else {
                            all[i].style.outline = "";
                        }
                    }
                    console.info("TFGUI DrawTree: " + (active ? "ENABLED" : "DISABLED"));
                    break;

                case 'cl_ent_info':
    var domNodes = document.getElementsByTagName('*').length;
    var scripts = document.getElementsByTagName('script');
    var links = document.getElementsByTagName('a');
    
    console.info("--- ENTITY & DOM INFO ---");
    console.log("  Total DOM Nodes: " + domNodes);
    console.log("  Images Loaded: " + document.getElementsByTagName('img').length);
    console.log("  Anchors (Links): " + links.length);
    
    console.info("--- ACTIVE SCRIPTS (" + scripts.length + ") ---");
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].src;
        if (src) {
            // Shorten the URL for cleaner console output
            var shortSrc = src.substring(src.lastIndexOf('/') + 1);
            console.log("  -> " + shortSrc);
        } else {
            console.log("  -> [Inline Script]");
        }
    }
    break;

                case 'status':
                    console.info("--- SYSTEM STATUS ---");
                    console.log("  Host: Neocities");
                    console.log("  Protocol: " + window.location.protocol);
                    console.log("  Path: " + window.location.pathname);
                    console.log("  Connection: " + (navigator.onLine ? "ONLINE" : "OFFLINE"));
                    break;
                    
                  case 'playsound':
    if (!arg) {
        console.error("USAGE: playsound <id>");
        break;
    }

    // IE Compatibility Check
    // documentMode is an IE-only property. Meaning it can catch IE even if the UA is faked.
    var isIE = !!document.documentMode || /MSIE|Trident/.test(navigator.userAgent);
    if (isIE) {
        console.error("ERR_BROWSER:OUTDATED"); //IE cant use FETCH thats why this is here even, while i could change it to use the xml https request thing
        break;
    }

    var trackId = arg;
    console.info("Fetching sound data for '" + trackId + "'...");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sounds/" + trackId + ".json", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    // Parse the JSON string into an object
                    var track = JSON.parse(xhr.responseText);

                    if (track.title && track.url) {
                        console.info("--- PLAYING SOUND ---");
                        console.log("Title:  " + track.title);
                        console.log("Length: " + (track.length || "Unknown"));
                        console.log("Format: " + (track.format || "Unknown"));
                        
                        if (track.metadata) {
                            console.log("Codec:  " + (track.metadata.codec || "N/A"));
                        }

                        // stop all audio playing
                        if (window._currentPlayingSound) {
                            window._currentPlayingSound.pause();
                            window._currentPlayingSound.currentTime = 0;
                        }

                        //create audio
                        window._currentPlayingSound = new Audio(track.url);

                        var playPromise = window._currentPlayingSound.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(function(e) {
                                console.error("AUDIO_ERROR: " + e.message);
                                console.log("Make sure the URL is correct, and that your internet settings arent blocking it, ERR_SOUND:NOTFOUND");
                            });
                        }
                    } else {
                        console.error("FS_ERROR: '" + trackId + ".json' is missing required fields (title/url).");
                    }
                } catch (e) {
                    console.error("FS_ERROR: Failed to parse '" + trackId + ".json'. File might be malformed JSON.");
                }
            } else {
                console.error("FS_ERROR: Sound ID '" + trackId + "' not found in /sounds/.");
            }
        }
    };
    xhr.send();
    break;
    //this commmand is for how much stuff you want the console to output when hovering over elements.
case 'cl_hover_log':
    if (!arg) {
        var currentLevel = localStorage.getItem('cl_hover_log');
        if (currentLevel === null) currentLevel = '1'; //default level is "1"
        
        console.info("cl_hover_log = " + currentLevel);
        console.log("  0 = MUTE (No hover output)");
        console.log("  1 = STANDARD (Only logs links/anchors)");
        console.log("  2 = VERBOSE (Logs links, IDs, and element classes)");
        break;
    }
    
    // Validate that input is exactly 0, 1, or 2
    if (arg === '0' || arg === '1' || arg === '2') {
        localStorage.setItem('cl_hover_log', arg);
        
        var modeName = "STANDARD";
        if (arg === '0') modeName = "MUTED";
        if (arg === '2') modeName = "VERBOSE";
        
        console.info("cl_hover_log changed to " + arg + " (" + modeName + ")");
    } else {
        console.error("ENGINE_ERR: Invalid parameter. Usage: cl_hover_log <0|1|2>");
    }
    break;
    case 'mat_wireframe': //TODO, fix weird behaviour with dragging the settings menu specifically while in WIREFRAME mode, starts dragging the settings box to the bottom right for some reason.
                    var state = (arg === '1');
                    var styleId = 'wireframe-style';
                    
                    if (state) {
                        if (!document.getElementById(styleId)) {
                            var style = document.createElement('style');
                            style.id = styleId;
                            style.innerHTML = "* { background: rgba(0,0,0,0.1) !important; box-shadow: none !important; border: 1px solid #00ff00 !important; color: #00ff00 !important; }";
                            document.head.appendChild(style);
                            console.info("Wireframe rendering: ENABLED");
                        }
                    } else {
                        var styleEl = document.getElementById(styleId);
                        if (styleEl) styleEl.parentNode.removeChild(styleEl);
                        console.info("Wireframe rendering: DISABLED");
                    }
                    break;
                    case 'whoami':
                    console.info("--- CLIENT IDENTITY ---");
                    // navigator.userAgent is supported by basically every browser ever made
                    console.log("User Agent: " + navigator.userAgent);
                    
                    //shit for ie11 users (god why do i care about worthless things like this, it just makes this site more confusing to work on)
                    if (!!document.documentMode) {
                        console.warn("STATUS: Authenticated as Legacy Trident Client (IE " + document.documentMode + ")");
                    } else {
                        console.info("STATUS: Authenticated as Modern Engine Client");
                    }
                    break;
                    case 'ui_toggle':
    var target = parts[1] ? parts[1].toLowerCase() : null;
    
    if (target === "settings") {
        var modal = document.getElementById('settingsModal');
        if (modal) {
            var isHidden = (modal.style.display === 'none' || modal.style.display === '');
            toggleSettings(isHidden);
            console.info("UI: Settings modal " + (isHidden ? "OPENED" : "CLOSED"));
        } else {
            console.error("UI_ERROR: Settings modal not found.");
        }
    } 
    else if (target === "toast") {
        // Look for an existing toast to animate for testing
        var toast = document.querySelector('.achievement-toast');
        if (toast) {
            toast.classList.add('show');
            console.info("UI: Achievement toast triggered.");
            setTimeout(function() { toast.classList.remove('show'); }, 3000);
        } else {
            console.warn("UI_WARN: No .achievement-toast found on this page.");
        }
    }
    else {
        console.error("USAGE: ui_toggle <settings | toast>");
    }
    break;
                    case 'test_compat':
case 'cl_validate_host':
    console.info("--- STARTING SYSTEM COMPATIBILITY VALIDATION ---");

    // IE check
    var isIE = !!document.documentMode;
    var version = document.documentMode;
    if (isIE) {
        if (version < 11) {
            console.error("ENGINE_FAIL: Trident V" + version + " detected. This site requires IE 11 for stable console execution.");
        } else {
            console.warn("ENGINE_WARN: IE 11 Trident detected. Shit may fail!");
        }
    } else {
        console.info("ENGINE: Modern engine detected (Non-Trident). Full feature parity expected.");
    }

    // localstorage check
    var storageAvailable = false;
    try {
        var testKey = "__test__" + Date.now();
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        storageAvailable = true;
        console.info("FILESYSTEM: LocalStorage is RW-ENABLED.");
    } catch (e) {
        console.error("FILESYSTEM_FAIL: LocalStorage is BLOCKED or FULL.");
        console.log("  > REASON: Likely 'InPrivate' browsing or security settings. Settings will not save across sessions.");
    }

    // BLOB checks
    if (window.Blob && window.URL && window.URL.createObjectURL) {
        console.info("SUBSYSTEM: Blob/URL API available. Log exporting is functional.");
    } else {
        console.warn("SUBSYSTEM_WARN: Blob API missing.");
        console.log("  > REASON: Old browser build. 'export_logs' will fail to generate files.");
    }

    // animation frames
    if (window.requestAnimationFrame) {
        console.info("VIDEO: requestAnimationFrame available. High-precision timing enabled.");
    } else {
        console.error("VIDEO_FAIL: requestAnimationFrame MISSING.");
        console.log("  > REASON: Outdated engine.");
    }

    // Check for Filter support
    var testEl = document.createElement('div');
    var supportsFilter = testEl.style.filter !== undefined || testEl.style.webkitFilter !== undefined;
    if (supportsFilter) {
        console.info("RENDER: CSS Filters supported. Visual FX (Rainbow Mode) active."); //yknow this gets activated on IE 11 even when gaymode doenst work so??? TODO maybe? TECHNICALLY IE has the filters however they barely do anything, however that still trips this into thinking that works well so.
    } else {// i probably should just add in a hardcoded check for ie here saying the filters just dont work
        console.warn("RENDER_WARN: CSS Filter support missing.");
        console.log("  > REASON: Legacy Trident renderer. 'tfgui_rainbow' may not render.");
    }

    console.info("--- VALIDATION COMPLETE ---");
    break;
case 'impulse101':
                    window._gunModeActive = !window._gunModeActive;

                    if (!document.getElementById('gunModeStyles')) {
                        var style = document.createElement('style');
                        style.id = 'gunModeStyles';
                        style.type = 'text/css';
                        var css = 
                            ".gun-mode-active, .gun-mode-active * { cursor: url('https://thenonfun.neocities.org/images/assets/cursor/gun1.png'), crosshair !important; }\n" +
                            ".gun-mode-firing, .gun-mode-firing * { cursor: url('https://thenonfun.neocities.org/images/assets/cursor/gun2.png'), crosshair !important; }";
                        
                        if (style.styleSheet) {
                            style.styleSheet.cssText = css; 
                        } else {
                            style.appendChild(document.createTextNode(css));
                        }
                        document.getElementsByTagName('head')[0].appendChild(style);
                    }

                    if (window._gunModeActive) {
                        console.info("GO SHOOT SOME SHIIITT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                        
                        document.body.classList.add('gun-mode-active');

                        window._gunModeHandler = function(e) {
                            e = e || window.event;
                            var targ = e.target || e.srcElement;

                            var pageX = e.pageX !== undefined ? e.pageX : (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
                            var pageY = e.pageY !== undefined ? e.pageY : (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));

                            if (e.preventDefault) e.preventDefault();
                            if (e.stopPropagation) e.stopPropagation();

                            document.body.classList.remove('gun-mode-active');
                            document.body.classList.add('gun-mode-firing');

                            try {
                                var shootSnd = new Audio('https://raw.githubusercontent.com/thenonfun-poopy-piss-shit/gm_website-assets/refs/heads/main/gunshot.mp3');
                                shootSnd.play();
                            } catch(err) {
                                console.error("AUDIO_ERROR: Could not play firing sound.");
                            }

                            var hole = document.createElement('img');
                            hole.src = 'https://thenonfun.neocities.org/images/assets/cursor/bullethole.png';
                            hole.className = 'bullet-hole';
                            hole.style.position = 'absolute';
                            hole.style.width = '24px';
                            hole.style.height = '24px';
                            hole.style.left = (pageX - 12) + 'px'; 
                            hole.style.top = (pageY - 12) + 'px';
                            hole.style.pointerEvents = 'none'; 
                            hole.style.zIndex = '9998'; 
                            document.body.appendChild(hole);

                            var isBackdrop = (targ === document.body || targ === document.documentElement || targ.id === 'vignette' || (targ.classList && targ.classList.contains('bullet-hole')));
                            var isConsoleUI = (targ.id === 'onScreenConsole' || targ.id === 'engineCmdInput' || targ.id === 'engineCmdContainer');

                            if (!isBackdrop && !isConsoleUI) {
                                targ.classList.add('physics-fall');

                                if (typeof unlockAchievement === "function") {
                                    if (targ.id === 'mainTitle') {
                                        unlockAchievement('logo_death');
                                    } else {
                                        unlockAchievement('ent_kill');
                                    }
                                }

                                console.log("Entity neutralized: " + (targ.id || targ.tagName || "unknown"));
                            }

                            setTimeout(function() {
                                if (window._gunModeActive) {
                                    document.body.classList.remove('gun-mode-firing');
                                    document.body.classList.add('gun-mode-active');
                                }
                            }, 150);
                        };

                        if (document.addEventListener) {
                            document.addEventListener('click', window._gunModeHandler, true);
                        } else if (document.attachEvent) {
                            document.attachEvent('onclick', window._gunModeHandler);
                        }

                    } else {
                        console.info("disabled");
                        
                        document.body.classList.remove('gun-mode-active');
                        document.body.classList.remove('gun-mode-firing');

                        if (document.removeEventListener) {
                            document.removeEventListener('click', window._gunModeHandler, true);
                        } else if (document.detachEvent) {
                            document.detachEvent('onclick', window._gunModeHandler);
                        }
                        window._gunModeHandler = null;
                    }
                    break;
    case 'debugmenu':
                    if (document.getElementById('debugMenuMain')) {
                        console.warn("SYSTEM: Debug menu is already open.");
                        break;
                    }

                    console.info("SYSTEM: Initializing TFGUI Debug Menu...");

                    var menuId = 'debugMenu_' + new Date().getTime();
                    var menuDiv = document.createElement('div');
                    menuDiv.id = 'debugMenuMain';
                    menuDiv.className = 'source-modal';
                    
                    // Sizing and centering (Matched to view_code)
                    var mWidth = Math.min(750, window.innerWidth * 0.9);
                    var mHeight = Math.min(500, window.innerHeight * 0.8);
                    var mLeft = (window.innerWidth - mWidth) / 2;
                    var mTop = (window.innerHeight - mHeight) / 2;
                    
                    menuDiv.style.width = mWidth + 'px';
                    menuDiv.style.height = mHeight + 'px';
                    menuDiv.style.left = mLeft + 'px';
                    menuDiv.style.top = mTop + 'px';
                    menuDiv.style.transform = 'none';
                    menuDiv.style.display = 'block';
                    menuDiv.style.zIndex = '10006'; 
                    menuDiv.style.overflow = 'hidden';
                    menuDiv.style.boxSizing = 'border-box';
                    
                    var html = "";
                    
                    html += "<div class='source-header' id='" + menuId + "_header'>";
                    html += "<span>// TriMess Debugger Tools</span>";
                    html += "<button class='close-x' style='background:none;border:none;' onclick='document.body.removeChild(document.getElementById(\"debugMenuMain\"))'>X</button>";
                    html += "</div>";
                    
                    html += "<div class='source-body' style='padding: 15px; height: calc(100% - 35px); overflow: auto;'>";

                    function createBtn(label, cmdToRun) {
                        return "<button class='source-btn' style='margin: 4px; padding: 6px 12px;' onclick='executeCommand(\"" + cmdToRun + "\")'>" + label + "</button>";
                    }

                    html += "<h3 style='color: #d386ff; margin: 0 0 10px 0; border-bottom: 1px solid #444; padding-bottom: 5px; text-align: left;'>System & Diagnostics</h3>";
                    html += createBtn("JS State", "js_state");
                    html += createBtn("Sys Info", "sys_info");
                    html += createBtn("Ent Info", "cl_ent_info");
                    html += createBtn("UI Inspect", "ui_inspect");
                    html += createBtn("Test Compat", "test_compat");
                    html += createBtn("Export Logs", "export_logs");
                    
                    html += "<h3 style='color: #d386ff; margin: 15px 0 10px 0; border-bottom: 1px solid #444; padding-bottom: 5px; text-align: left;'>Developer Overlays</h3>";
                    html += createBtn("Show Pos [ON]", "cl_show_pos 1") + createBtn("Show Pos [OFF]", "cl_show_pos 0") + "<br>";
                    html += createBtn("Wireframe [ON]", "mat_wireframe 1") + createBtn("Wireframe [OFF]", "mat_wireframe 0") + "<br>";
                    html += createBtn("DrawTree [ON]", "tfgui_drawtree 1") + createBtn("DrawTree [OFF]", "tfgui_drawtree 0") + "<br>";
                    html += createBtn("Draw HUD [ON]", "cl_drawhud 1") + createBtn("Draw HUD [OFF]", "cl_drawhud 0");

                    html += "<h3 style='color: #d386ff; margin: 15px 0 10px 0; border-bottom: 1px solid #444; padding-bottom: 5px; text-align: left;'>Camera & Layout</h3>";
                    html += createBtn("Firstperson", "firstperson") + createBtn("Thirdperson", "thirdperson") + "<br>";
                    html += createBtn("Read Mode [ON]", "readmode 1") + createBtn("Read Mode [OFF]", "readmode 0");

                    html += "<h3 style='color: #d386ff; margin: 15px 0 10px 0; border-bottom: 1px solid #444; padding-bottom: 5px; text-align: left;'>Fun & TFGUI FX</h3>";
                    html += createBtn("Spin [ON]", "tfgui_spin 1") + createBtn("Spin [OFF]", "tfgui_spin 0") + "<br>";
                    html += createBtn("Bob [ON]", "tfgui_bob 1") + createBtn("Bob [OFF]", "tfgui_bob 0") + "<br>";
                    html += createBtn("Rainbow [ON]", "tfgui_rainbow 1") + createBtn("Rainbow [OFF]", "tfgui_rainbow 0") + "<br><br>";
                    
                    html += createBtn("Trigger Degub", "degub");
                    html += createBtn("Kill Logo", "ent_kill mainTitle");
                    
                    html += "</div>";
                    
                    menuDiv.innerHTML = html;
                    document.body.appendChild(menuDiv);
                    
                    (function() {
                        var vDiv = document.getElementById("debugMenuMain");
                        var vHeader = document.getElementById(menuId + "_header");
                        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                        
                        vHeader.onmousedown = function(e) {
                            e = e || window.event;
                            e.preventDefault();
                            pos3 = e.clientX;
                            pos4 = e.clientY;
                            document.onmouseup = function() {
                                document.onmouseup = null;
                                document.onmousemove = null;
                            };
                            document.onmousemove = function(e) {
                                e = e || window.event;
                                pos1 = pos3 - e.clientX;
                                pos2 = pos4 - e.clientY;
                                pos3 = e.clientX;
                                pos4 = e.clientY;
                                vDiv.style.top = (vDiv.offsetTop - pos2) + "px";
                                vDiv.style.left = (vDiv.offsetLeft - pos1) + "px";
                            };
                        };
                    })();
                    break;
                    case 'export_logs':
                    var logText = "--- gm_website 'TriMess' system logs ---\r\n";
                    logText += "Build: " + SITE_VERSION + "\r\n";
                    logText += "User Agent: " + navigator.userAgent + "\r\n";
                    logText += "------------------------------\r\n\r\n";
                    
                    var logContainer = document.getElementById('devLogContainer');
                    if (logContainer) {
                        var lines = logContainer.children;
                        for (var i = 0; i < lines.length; i++) {
                            logText += lines[i].innerText + "\r\n";
                        }
                    }

                    // handle IE stuff
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        var blob = new Blob([logText], { type: 'text/plain;charset=utf-8;' });
                        window.navigator.msSaveOrOpenBlob(blob, 'gm_website_logs.txt');
                        console.info("FS: Logs exported via MS-BLOB."); //export it via MS blob
                    } 
                 // handle new browsers
else {
    var blob = new Blob([logText], { type: 'text/plain;charset=utf-8;' });
    var url = window.URL.createObjectURL(blob);
    
    // poopy and stinky
    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "gm_website_logs.txt";
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    setTimeout(function() {
        window.URL.revokeObjectURL(url);
    }, 1000); // 1000ms delay
    
    console.info("FS: Logs exported via BLOB-URI.");
}
                    break;
                    case 'readmode':
                    var state = (arg === '1');
                    var images = document.getElementsByTagName('img');
                    var pictures = document.getElementsByTagName('picture');
                    
                    // IE is a shitty browser, so instead i have to use this.
                    for (var i = 0; i < images.length; i++) {
                        images[i].style.display = state ? 'none' : '';
                    }
                    for (var p = 0; p < pictures.length; p++) {
                        pictures[p].style.display = state ? 'none' : '';
                    }
                    
                    if (state) {
                        // overrides for this useless command whatev
                        document.body.style.fontFamily = "Georgia, serif";
                        document.body.style.maxWidth = "800px";
                        document.body.style.margin = "0 auto";
                        console.info("Reading mode: ENABLED (Images hidden, layout focused)");
                    } else {
                        // revert said overrides (i mean you could just refresh too lazy fuck)
                        document.body.style.fontFamily = "";
                        document.body.style.maxWidth = "";
                        document.body.style.margin = "";
                        console.info("Reading mode: DISABLED");
                    }
                    break;
                case 'tfgui_drawtree':
                    // Usage: tfgui_drawtree 1 to highlight layout boxes
                    var all = document.getElementsByTagName('*');
                    var active = (arg === '1');
                    
                    for (var i = 0; i < all.length; i++) {
                        // Using outline so it doesn't shift the actual layout
                        all[i].style.outline = active ? "1px solid #00ff00" : "";
                    }
                    console.info("TFGUI DrawTree: " + (active ? "ENABLED" : "DISABLED"));
                    break;
                    case 'echo':
                    // parts.slice(1) takes everything after the command itself
                    var textToEcho = parts.slice(1).join(' ');
                    console.log(textToEcho);
                    break;
              case 'setconvar':
                    // Usage: setconvar [varname] [true/false]
                    var varName = arg; 
                    var val = parts[2] ? parts[2].toLowerCase() : null;

                    if (!varName || !val) {
                        console.error("USAGE: setconvar <varname> <true/false>, use command listconvars to find convars.");
 //this part had a "variables" section printed out into the console, however i figured thats slightly pointless now, especially when the command "listconvars" exists instead.
                    } else {
                        var boolVal = (val === 'true');
                        var storageKey = "";
                        var elementId = "";

                        // Mapping nicknames to Storage Keys AND Element IDs
                        if (varName === 'disableteapot') {
                            storageKey = 'disableTeapot';
                            elementId = 'disableTeapot';
                        }
                        else if (varName === 'disablesplashes') {
    storageKey = 'disableSplashes';
    elementId = 'disableSplashesToggle';
}
                        else if (varName === 'devmode') {
                            storageKey = 'devMode';
                            elementId = 'devModeToggle';
                        }
                        else if (varName === 'mutewarnings' || varName === 'hidewarnings') {
                            storageKey = 'hideWarnings';
                            elementId = 'muteWarnings';
                        }
                        else if (varName === 'disabletransitions') {
    storageKey = 'disableTransitions';
    elementId = 'disableTransitionsToggle';
}

                        if (storageKey !== "") {
                            // update localstorage
                            localStorage.setItem(storageKey, boolVal);
                            
                            // sync checkbox
                            var checkbox = document.getElementById(elementId);
                            if (checkbox) {
                                checkbox.checked = boolVal;
                            }

                            console.info("CONVAR: " + varName + " set to " + boolVal);
                            
                            
                            if (storageKey === 'devMode') {
                                console.warn("Developer Mode change staged. Refresh to apply.");
                            }
                        } else {
                            console.error("Unknown variable: " + varName);
                        }
                    }
                    break;
             case 'help':
                    console.info("--- AVAILABLE COMMANDS ---");
                    console.log("  help               - Dumps this text");
                    console.log("  clear / cls        - Clear the console output");
                    console.log("  version            - Display engine build info");
                    console.log("  specs / sys_info   - Display client specifications");
                    console.log("  whoami             - Display client identity");
                    console.log("  status             - Connection and host status");
                    console.log("  goto [url]         - Navigate to a different page");
                    console.log("  dir [path]         - Dumps contents of the path selected");
                    console.log("  refresh / reload   - Reload the current page");
                    console.log("  echo [text]        - Echoes text to the console");
                    console.log("  make_coffee        - Redirects to brewing station");
                    console.log("  readmode [1/0]     - Toggles reading mode (hides images)");
                    console.log("  playsound [id]     - Plays a specific sound track by ID");
                    
                    console.info("--- DEVELOPER & DEBUG TOOLS ---");
                    console.log("  js_state           - Display JavaScript engine state");
                    console.log("  ui_inspect         - Inspect UI elements");
                    console.log("  ui_toggle [item]   - Toggle specific UI elements (settings/toast)");
                    console.log("  cl_ent_info        - Dump DOM element counts");
                    console.log("  cl_show_pos [1/0]  - Show mouse coordinates");
                    console.log("  cl_drawhud [1/0]   - Toggle HUD display");
                    console.log("  cl_hover_log [0-2] - Set hover log verbosity");
                    console.log("  tfgui_drawtree [1/0]- Highlight layout containers");
                    console.log("  mat_wireframe [1/0]- Toggle wireframe rendering");
                    console.log("  view_code [file]   - View source code of a file in a TFGUI window");
                    console.log("  view_asset [file]  - View an asset in a TFGUI window");
                    console.log("  test_compat        - Run system compatibility validation");
                    console.log("  export_logs        - Export console logs to a local file");
                    console.log("  ent_kill [id,class]- Kills the class or id you give it")
                    
                    console.info("--- CONFIGURATION & DATA ---");
                    console.log("  listconvars        - List available console variables");
                    console.log("  setconvar [var]    - Set variables (devmode, mutewarnings, etc)");
                    console.log("  remove_achievement - Revoke a specific achievement by ID");
                    console.log("  reset_achievements - Completely reset all unlocked achievements");
                    console.log("  reset_chat_consent - Force the chatbox legal disclaimer to reappear");
                    break;
                    case 'clear':
                case 'cls':
                    document.getElementById('devLogContainer').innerHTML = '';
                    break;
                    case 'version':
                    console.info("gm_website 'TriMess'");
                    console.log("Build: " + SITE_VERSION); 
                    break;
                case 'specs':
                case 'sys_info':
                    console.info("Gathering system specifications...");
                    
                    populateClientInfo(); 
                    
                    var infoLines = document.getElementById('clientInfoContainer').children;
                    for (var i = 0; i < infoLines.length; i++) {
                        console.log("  " + infoLines[i].innerText);
                    }
                    break;

                case 'goto':
                    if (!arg) { console.error("USAGE: goto <path>"); }
                    else { console.info("Navigating..."); setTimeout(function(){ window.location.href = arg; }, 500); }
                    break;
                 
                case 'refresh': //why do these even exist they are pointless LMFAO
                case 'reload': //and why is there two
                    console.info("Reloading..."); setTimeout(function(){ window.location.reload(); }, 500);
                    break;
                    case 'degub':
    // i might remove/change this in the future
    console.error("you failed english.");
                unlockAchievement('degub');
    
    document.body.style.overflow = "hidden";
    document.body.style.position = "relative";

    // The shake (twerk)
    var shakeIntensity = 10;
    var shakeCounter = 0;
    var shakeInterval = setInterval(function() {
        var x = (Math.random() - 0.5) * shakeIntensity;
        var y = (Math.random() - 0.5) * shakeIntensity;
        document.body.style.left = x + "px";
        document.body.style.top = y + "px";
        
        shakeCounter++;
        if (shakeCounter > 20) shakeIntensity += 2;
    }, 30);

    var entities = document.getElementsByTagName('*');
    for (var i = 0; i < entities.length; i++) {
        var ent = entities[i];
        
        if (ent.tagName !== 'SCRIPT' && ent.tagName !== 'STYLE' && ent.id !== 'onScreenConsole' && ent.id !== 'devLogContainer') {
            ent.style.transition = "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
            
            var rot = (Math.random() * 720 - 360) + "deg";
            var tx = (Math.random() * 1000 - 500) + "px";
            var ty = (Math.random() * 1000 - 500) + "px";
            
            ent.style.transform = "translate(" + tx + ", " + ty + ") rotate(" + rot + ") scale(0.1)";
            ent.style.opacity = "0";
        }
    }

    setTimeout(function() {
        clearInterval(shakeInterval);
        
        // there was a BSOD feature here, however it failed to work, so ill just remove it to save on lines.
            
        console.error("CRITICAL_PROCESS_DIED");
    }, 1500);
    break;
case 'view_asset':
    if (!arg) {
        console.error("USAGE: view_asset <filepath>");
        break;
    }

    var assetPath = arg;
    var assetExtSplit = assetPath.split('.');
    var assetExt = assetExtSplit.length > 1 ? assetExtSplit[assetExtSplit.length - 1].toLowerCase() : '';

    var imageExts = ['png','jpg','jpeg','gif','webp','svg','bmp','ico'];
    var audioExts = ['mp3','wav','ogg','m4a'];
    var videoExts = ['mp4','webm','ogv'];

    console.info("Fetching asset for " + assetPath + "...");

    var buildAssetWindow = function(previewHtml) {
        var viewerId = 'assetViewer_' + new Date().getTime();
        var viewerDiv = document.createElement('div');
        viewerDiv.id = viewerId;
        viewerDiv.className = 'source-modal';

        var winWidth = Math.min(750, window.innerWidth * 0.9);
        var winHeight = Math.min(500, window.innerHeight * 0.8);
        var initialLeft = (window.innerWidth - winWidth) / 2;
        var initialTop = (window.innerHeight - winHeight) / 2;

        viewerDiv.style.width = winWidth + 'px';
        viewerDiv.style.height = winHeight + 'px';
        viewerDiv.style.left = initialLeft + 'px';
        viewerDiv.style.top = initialTop + 'px';
        viewerDiv.style.transform = 'none';
        viewerDiv.style.display = 'block';
        viewerDiv.style.zIndex = '10005';
        viewerDiv.style.overflow = 'hidden';
        viewerDiv.style.boxSizing = 'border-box';

        var html = "";
        html += "<div class='source-header' id='" + viewerId + "_header'>";
        html += "<span>// Viewing: " + assetPath + "</span>";
        html += "<button class='close-x' style='background:none;border:none;' onclick='document.body.removeChild(document.getElementById(\"" + viewerId + "\"))'>X</button>";
        html += "</div>";

        html += "<div class='source-body' style='padding:15px; background-color:#1e1e1e; height: calc(100% - 35px); overflow: auto; display:flex; align-items:center; justify-content:center; text-align:center;'>";
        html += previewHtml;
        html += "</div>";

        viewerDiv.innerHTML = html;
        document.body.appendChild(viewerDiv);

        (function() {
            var vDiv = document.getElementById(viewerId);
            var vHeader = document.getElementById(viewerId + "_header");
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

            vHeader.onmousedown = function(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = function() {
                    document.onmouseup = null;
                    document.onmousemove = null;
                };
                document.onmousemove = function(e) {
                    e = e || window.event;
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    vDiv.style.top = (vDiv.offsetTop - pos2) + "px";
                    vDiv.style.left = (vDiv.offsetLeft - pos1) + "px";
                };
            };
        })();

        console.info("SYSTEM: Asset view opened in TFGUI.");
    };

    if (imageExts.indexOf(assetExt) !== -1) {
        var previewImg = new Image();
        previewImg.onload = function() {
            buildAssetWindow("<img src='" + assetPath + "' style='max-width:100%; max-height:100%; object-fit:contain;'>");
        };
        previewImg.onerror = function() {
            console.error("FS_ERROR: Could not load '" + assetPath + "'.");
        };
        previewImg.src = assetPath;
    } else if (audioExts.indexOf(assetExt) !== -1) {
        buildAssetWindow("<audio controls src='" + assetPath + "' style='width:100%;'></audio>");
    } else if (videoExts.indexOf(assetExt) !== -1) {
        buildAssetWindow("<video controls src='" + assetPath + "' style='max-width:100%; max-height:100%;'></video>");
    } else {
        console.error("USAGE: view_asset only supports images/audio/video (got ." + assetExt + ")");
    }
    break;
                case 'dir':
                case 'ls':
                    var dirTarget = arg ? arg + "/files.txt" : "files.txt";
                    console.info("Fetching directory: " + (arg || "root") + "...");

                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", dirTarget, true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) { // 4 means "DONE"
                            if (xhr.status === 200) {
                                console.log("Listing for " + (arg || "/") + ":");
                                console.log(xhr.responseText);
                                            unlockAchievement('dir');
                            } else {
                                console.error("FS_ERROR: " + xhr.status + " - File not found.");
                                console.log("Make sure " + dirTarget + " exists!");
                            }
                        }
                    };
                    xhr.send();
                    break;
                    
                    case 'kill_the_entire_site_for_no_reason_at_all_i_know_you_opened_the_sites_sourcecode_to_learn_about_this_command_too_this_command_serves_no_point_or_use_bye': //yeah you fucker did the hacker in a blockbuster and opened the source code... poopy stinky pants, stinky little FUCK.
    console.warn("bitch");
                    unlockAchievement('bigcommand'); //BEST ACHIEVEMENT ID EVER!!!! 
    
    setTimeout(function() {
        // THE SITE IS DEAD.
        document.body.innerHTML = '';
        // OOPS
        document.body.style.backgroundColor = "#000";
        //RIP
    }, 100);
    break;
             
             default:
                    if (cmd !== "") {
                        console.error('Unknown command: "' + cmd + '"');
                        console.log('Type "help" for a list of available commands.');
                    }
                    break;      
                    
                    
            }
        }
        // ui shit
function switchTab(tab) {
    var contentIds = ['content-site', 'content-about', 'creditsContent', 'content-client', 'content-dev'];
    
    for (var i = 0; i < contentIds.length; i++) {
        var el = document.getElementById(contentIds[i]);
        if (el) el.style.display = 'none';
    }
    
    var tabs = document.querySelectorAll('.source-tab-item');
    for (var j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove('active');
    }

    var footer = document.querySelector('.source-footer');
    footer.style.display = 'flex'; // Reset to visible by default

    // button shit
    if (tab === 'site') {
        document.getElementById('content-site').style.display = 'block';
        document.getElementById('tab-site').classList.add('active');
        footer.innerHTML = '<button class="source-btn" onclick="saveSettings()">OK</button>' +
                           '<button class="source-btn" onclick="toggleSettings(false)">Cancel</button>';
    } 
    else if (tab === 'about') {
        document.getElementById('content-about').style.display = 'block';
        document.getElementById('tab-about').classList.add('active');
        footer.innerHTML = '<button class="source-btn" onclick="toggleSettings(false)">Close</button>';
    } 
    else if (tab === 'credits') {
        document.getElementById('creditsContent').style.display = 'block';
        document.getElementById('tab-credits').classList.add('active');
        footer.innerHTML = '<button class="source-btn" onclick="toggleSettings(false)">Close</button>';
    } 
    else if (tab === 'client') {
        document.getElementById('content-client').style.display = 'block';
        document.getElementById('tab-client').classList.add('active');
 footer.innerHTML = '<button class="source-btn" onclick="toggleSettings(false)">Close</button>';
    } 
    else if (tab === 'dev') {
        document.getElementById('content-dev').style.display = 'block';
        document.getElementById('tab-dev').classList.add('active');
        footer.innerHTML = '<button class="source-btn" onclick="toggleSettings(false)">Close</button>';
    }
}
// Switches the sub-categories inside the Site Settings tab
function switchSiteSub(cat) {
    var cats = ['general', 'splashes', 'advanced'];
    
    for (var i = 0; i < cats.length; i++) {
        var c = cats[i];
        var el = document.getElementById('sub-' + c);
        var btn = document.getElementById('subbtn-' + c);
        
        // Toggle visibility
        if (el) el.style.display = (c === cat) ? 'block' : 'none';
        
        // Toggle active button styling
        if (btn) {
            if (c === cat) {
                btn.style.border = "1px solid #f5d042";
                btn.style.color = "#f5d042";
            } else {
                btn.style.border = "";
                btn.style.color = "";
            }
        }
    }
}
        // ua shit
        function populateClientInfo() {
            var container = document.getElementById('clientInfoContainer');
            if (!container) return;

            var ua = navigator.userAgent;
            var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
            var isIE = !!document.documentMode || false;
            var noWebP = false;
try {
    noWebP = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') !== 0;
    
    // EdgeHTML 18 renders WebP perfectly, but fails the canvas encoding test, this is fix should be applied for other browsers too but im lazzyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
    if (noWebP && /Edge\/18/.test(navigator.userAgent)) {
        noWebP = false;
    }
} catch(e) { 
    noWebP = true; 
}

            var rows = [
                { label: "Browser",    value: getBrowserName() },
                { label: "Engine",     value: getEngineName() },
                { label: "Mobile",     value: isMobile ? "Yes" : "No" },
                { label: "WebP",       value: noWebP ? "FAIL" : "OK",  color: noWebP ? "#ff4c4c" : "#55ff55" },
                { label: "Resolution", value: window.screen.width + "x" + window.screen.height },
                { label: "Viewport",   value: window.innerWidth + "x" + window.innerHeight },
                { label: "Color Depth",value: window.screen.colorDepth + "-bit" },
                { label: "Platform",   value: navigator.platform || "Unknown" },
                { label: "Language",   value: navigator.language || "Unknown" },
                { label: "UA",         value: ua, wrap: true }
            ];

            container.innerHTML = '';
            for (var i = 0; i < rows.length; i++) {
                var r = rows[i];
                var line = document.createElement('div');
                line.style.marginBottom = '4px';
                if (r.wrap) line.style.wordBreak = 'break-all';
                var labelSpan = document.createElement('span');
                labelSpan.style.color = '#f5d042';
                labelSpan.innerText = r.label + ': ';
                var valSpan = document.createElement('span');
                valSpan.style.color = r.color || '#e1e1e1';
                valSpan.innerText = r.value;
                line.appendChild(labelSpan);
                line.appendChild(valSpan);
                container.appendChild(line);
            }
        }

        function toggleSettings(show) {
            var modal = document.getElementById('settingsModal');
            modal.style.display = show ? 'block' : 'none';
            if (show) {
                if (getVal('devMode')) console.log("UI_EVENT: Options modal -> OPEN");
                document.getElementById('muteWarnings').checked = getVal('hideWarnings');
                document.getElementById('muteSoundsToggle').checked = getVal('muteSounds');
                document.getElementById('disableTeapot').checked = getVal('disableTeapot');
                document.getElementById('devModeToggle').checked = getVal('devMode');
                document.getElementById('disableSplashesToggle').checked = getVal('disableSplashes');
                document.getElementById('disableTransitionsToggle').checked = getVal('disableTransitions');
                document.getElementById('blockedSplashLines').value = localStorage.getItem('blockedSplashLines') || '';
                document.getElementById('forcedSplashLine').value = localStorage.getItem('forcedSplashLine') || '0';
                document.getElementById('filterSplashesToggle').checked = getVal('filterSplashes');

                var devTab    = document.getElementById('tab-dev');
                var clientTab = document.getElementById('tab-client');

                if (getVal('devMode')) {
                    devTab.style.display    = 'block';
                    clientTab.style.display = 'block';
                    populateClientInfo();
                    // Dev output dump on open
                    console.log("--- Requesting Client Info ---");
                    console.log("Browser: " + getBrowserName());
                    console.log("Engine: " + getEngineName());
                    console.log("Res: " + window.screen.width + "x" + window.screen.height);
                    console.log("UA: " + navigator.userAgent);
                } else {
                    devTab.style.display    = 'none';
                    clientTab.style.display = 'none';
                }
                switchTab('site');
            } else if (getVal('devMode')) {
                console.log("UI_EVENT: Options modal -> CLOSE");
            }
        }
function clearAllSiteData() {
    if (!confirm("This will permanently delete ALL saved data.\n\nThis includes every setting and every achievement unlock.\n\nThis CANNOT be undone. Are you sure?")) return;
    if (!confirm("All data will be gone forever. Are you sure?")) return;
    try {
        localStorage.clear();
    } catch(e) {}
    toggleSettings(false);
    window.location.reload();
}
        function saveSettings() { //the sites "save file" for the settings found here
            localStorage.setItem('hideWarnings', document.getElementById('muteWarnings').checked);
            localStorage.setItem('muteSounds', document.getElementById('muteSoundsToggle').checked);
            localStorage.setItem('disableTeapot', document.getElementById('disableTeapot').checked);
            localStorage.setItem('devMode', document.getElementById('devModeToggle').checked);
            localStorage.setItem('disableSplashes', document.getElementById('disableSplashesToggle').checked);
            localStorage.setItem('disableTransitions', document.getElementById('disableTransitionsToggle').checked);
            localStorage.setItem('blockedSplashLines', document.getElementById('blockedSplashLines').value);
            localStorage.setItem('forcedSplashLine', document.getElementById('forcedSplashLine').value);
            localStorage.setItem('filterSplashes', document.getElementById('filterSplashesToggle').checked);
            toggleSettings(false);
            window.location.reload();
        }

        // settings shit
        function makeDraggable(elmnt) {
            var p1 = 0, p2 = 0, p3 = 0, p4 = 0;
            var initialized = false;
            var header = document.getElementById("modalHeader");
            if (header) { header.onmousedown = dragMouseDown; }

            function initPosition() {
    if (initialized) return;
    
    var rect = elmnt.getBoundingClientRect();
    
    elmnt.style.top    = rect.top + "px";
    elmnt.style.left   = rect.left + "px";
    
    elmnt.style.marginLeft = "0";
    elmnt.style.marginTop  = "0";
    

    elmnt.style.transform = "none";
    
    initialized = true;
}

            function dragMouseDown(e) {
                e = e || window.event;
                if (e.preventDefault) e.preventDefault();
                initPosition();
                p3 = e.clientX;
                p4 = e.clientY;
                document.onmouseup   = closeDrag;
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                p1 = p3 - e.clientX;
                p2 = p4 - e.clientY;
                p3 = e.clientX;
                p4 = e.clientY;
                elmnt.style.top  = (elmnt.offsetTop  - p2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - p1) + "px";
            }

            function closeDrag() {
                document.onmouseup   = null;
                document.onmousemove = null;
            }
        }

        // trackers shit performance shit & other shit shit shit poo
        (function initTrackers() {
            if (!getVal('devMode')) return;
            var lastHovered = null;
            var hoverHandler = function(e) {
                var logLevel = localStorage.getItem('cl_hover_log');
                if (logLevel === null) {
                    logLevel = '1'; 
                }
                
                if (logLevel === '0') return;

                var targ = e.target || e.srcElement;
                var a = getClosestAnchor(targ);
                
                if (a && a !== lastHovered) {
                    lastHovered = a;
                    console.log("Entity focus: [LINK] " + a.href);
                } 
                else if (logLevel === '2' && !a) {
                    if (targ !== lastHovered) {
                        lastHovered = targ;
                        if (targ.id && targ.id !== "onScreenConsole" && targ.id !== "devLogContainer") {
                            console.log("Entity focus: [ID] " + targ.id);
                        } else if (targ.className && typeof targ.className === 'string') {
                            console.log("Entity focus: [CLASS] " + targ.className.split(' ')[0]);
                        }
                    }
                }
            };
            document.attachEvent ? document.attachEvent('onmouseover', hoverHandler) : document.addEventListener('mouseover', hoverHandler);

            var changeHandler = function(e) {
                var targ = e.target || e.srcElement;
                if (targ.type === 'checkbox') {
                    console.log("ConVar '" + targ.id + "' changed to " + targ.checked);
                }
            };
            document.attachEvent ? document.attachEvent('onchange', changeHandler) : document.addEventListener('change', changeHandler);

            var resizeTimeout;
            window.onresize = function() {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function() {
                    console.log("Viewport resized: " + window.innerWidth + "x" + window.innerHeight);
                }, 500);
            };
            //tab shit
            var visHandler = function() {
                console.info("Document State: " + (document.hidden ? "Background" : "Foreground"));
            };
            document.addEventListener("visibilitychange", visHandler);

            // page loading shit
            var navStart = (window.performance && window.performance.timing)
                ? window.performance.timing.navigationStart
                : null;

            window.onload = function() {
                if (window.performance && window.performance.timing && navStart) {
                    var poll = setInterval(function() {
                        var end = window.performance.timing.loadEventEnd;
                        if (end > 0) {
                            clearInterval(poll);
                            var loadTime = end - navStart;
                            console.info("Performance: Page fully loaded in " + loadTime + "ms");
                        }
                    }, 10);
                    setTimeout(function() { clearInterval(poll); }, 3000);
                } else {
                    console.log("Page fully loaded.");
                }

                // img fallback check
                setTimeout(function() {
                    var images = document.getElementsByTagName('img');
                    for (var i = 0; i < images.length; i++) {
                        var src = images[i].currentSrc || images[i].src;
                        if (src && src.toLowerCase().indexOf('.png') !== -1) {
                            console.warn("Resource Warning: " + (images[i].id || "unnamed_img") + " loaded PNG fallback.");
                        }
                    }
                }, 500);
            };
        })();

        (function() {
            var ua = navigator.userAgent;
            var isIE = !!document.documentMode || false;
            var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

            var modal = document.getElementById("settingsModal");
            if (!isMobile) {
                makeDraggable(modal);
            } else if (getVal('devMode')) {
                console.warn("Settings window drag function locked (Mobile detected.)");
            }

            var noWebP = false;
            try {
                noWebP = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') !== 0;
                
                // EdgeHTML 18 fallback
                if (noWebP && /Edge\/18/.test(navigator.userAgent)) {
                    noWebP = false;
                }
            } catch(e) { 
                noWebP = true; 
            }

            if (noWebP && getVal('devMode')) console.error("WARN_BROWSER: WEBPFAIL");
            else if (!noWebP && getVal('devMode')) console.info("WebP successfully loaded.");

            // Check using your existing getVal setup which targets 'hideWarnings'
            var isMuted = getVal('hideWarnings');

            if (!isMuted) {
                if (noWebP || isIE || isMobile) {
                    var warnings = [];
                    if (noWebP) warnings.push("WARN_BROWSER:WEBPFAIL");
                    if (isMobile) warnings.push("WARN_DEVICE:MOBILECLIENT");
                    if (isIE) warnings.push("WARN_BROWSER:OUTDATED");
                    
                    // --- TFGUI WARNING MODAL ---
                    var warningText = warnings.join("<br>") + "<br><br><span style='color:#888;'>Go to Options > About to learn more.</span>";
                    
                    var alertId = 'tfgui_warning_' + new Date().getTime();
                    var alertDiv = document.createElement('div');
                    alertDiv.id = alertId;
                    alertDiv.className = 'source-modal';
                    
                    var winWidth = Math.min(400, window.innerWidth * 0.9);
                    var initialLeft = (window.innerWidth - winWidth) / 2;
                    var initialTop = window.innerHeight * 0.25;
                    
                    alertDiv.style.width = winWidth + 'px';
                    alertDiv.style.height = 'auto';
                    alertDiv.style.left = initialLeft + 'px';
                    alertDiv.style.top = initialTop + 'px';
                    alertDiv.style.transform = 'none';
                    alertDiv.style.display = 'block';
                    alertDiv.style.zIndex = '10010';
                    alertDiv.style.boxSizing = 'border-box';
                    alertDiv.style.border = '1px solid #444';
                    
                    var html = "";
                    html += "<div class='source-header' id='" + alertId + "_header'>";
                    html += "<span>// SYSTEM WARNING</span>";
                    html += "<button class='close-x' id='" + alertId + "_close' style='background:none;border:none;'>X</button>";
                    html += "</div>";
                    
                    html += "<div class='source-body' style='padding: 20px; background-color: #1e1e1e; font-family: monospace; font-size: 14px; text-align: center; color: #e1e1e1;'>";
                    html += warningText;
                    
                    // Checkbox element
                    html += "<div style='margin-top: 15px; font-size: 12px; color: #aaa;'>";
                    html += "<label style='cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;'>";
                    html += "<input type='checkbox' id='" + alertId + "_chk' style='vertical-align: middle; margin-right: 6px;'>";
                    html += "Don't show this warning again";
                    html += "</label>";
                    html += "</div>";
                    
                    html += "<br><button class='source-btn' id='" + alertId + "_ack' style='padding: 6px 16px; margin-top: 5px;'>Acknowledge</button>";
                    html += "</div>";
                    
                    alertDiv.innerHTML = html;
                    document.body.appendChild(alertDiv);
                    
                    // Close & Sync Mute to ConVar + Options Checkbox
                    function closeAndCheckMute() {
                        var chk = document.getElementById(alertId + '_chk');
                        if (chk && chk.checked) {
                            // Save to your actual localStorage key
                            try { localStorage.setItem('hideWarnings', 'true'); } catch(e) {}
                            
                            // Visually check the box in your Options menu if it's currently loaded in the DOM
                            var optChk = document.getElementById('muteWarnings');
                            if (optChk) optChk.checked = true;

                            if (getVal('devMode')) console.info("CONVAR: hideWarnings set to 'true'.");
                        }
                        if (alertDiv && alertDiv.parentNode) {
                            alertDiv.parentNode.removeChild(alertDiv);
                        }
                    }

                    // Attach handlers (IE11 safe)
                    var closeBtn = document.getElementById(alertId + '_close');
                    var ackBtn = document.getElementById(alertId + '_ack');
                    if (closeBtn) closeBtn.onclick = closeAndCheckMute;
                    if (ackBtn) ackBtn.onclick = closeAndCheckMute;
                    
                    // Drag handler
                    (function() {
                        var vDiv = document.getElementById(alertId);
                        var vHeader = document.getElementById(alertId + "_header");
                        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                        
                        vHeader.onmousedown = function(e) {
                            e = e || window.event;
                            e.preventDefault();
                            pos3 = e.clientX;
                            pos4 = e.clientY;
                            document.onmouseup = function() {
                                document.onmouseup = null;
                                document.onmousemove = null;
                            };
                            document.onmousemove = function(e) {
                                e = e || window.event;
                                pos1 = pos3 - e.clientX;
                                pos2 = pos4 - e.clientY;
                                pos3 = e.clientX;
                                pos4 = e.clientY;
                                vDiv.style.top = (vDiv.offsetTop - pos2) + "px";
                                vDiv.style.left = (vDiv.offsetLeft - pos1) + "px";
                            };
                        };
                    })();
                    
                } else if (getVal('devMode')) {
                    console.info("Client passed all compatibility tests cleanly.");
                }
            }
        })();

        document.onclick = function(e) {
            e = e || window.event;
            var targ = e.target || e.srcElement;
            var a = getClosestAnchor(targ);
            if (a && a.href && a.href.indexOf('javascript') === -1) {
                if (getVal('devMode')) console.log("Client clicked link: " + a.href);
            }
            // Teapot, oh the teapot
            if (getVal('disableTeapot')) return;
            if (a && a.href && a.href.indexOf('javascript') === -1) {
                if (Math.floor(Math.random() * 10000) + 1 === 418) {
                    if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
                    window.location.href = "/teapot";
                }
            }
        };
        (function() {
    // first visit achievement
    unlockAchievement('first_visit');

    // browser and device check for the phone and trident achievements
    const ua = navigator.userAgent;
    const isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua); //WHO THE FUCK IS GONNA USE THE SITE ON AN IPOD 

    if (isIE) unlockAchievement('ie_user');
    if (isMobile) unlockAchievement('mobile_user');

    // Developer mode check for achievement
    if (typeof getVal === 'function' && getVal('devMode')) {
        unlockAchievement('dev_mode');
    }
})();
// splashes
(function loadSplashText() {
    if (getVal('disableSplashes')) return;
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "splashes.txt", true); 
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var lines = xhr.responseText.split(/\r?\n/);
                var validSplashes = [];
                var splashHeader = document.getElementById('splashText');
                
                var rawBlocked = localStorage.getItem('blockedSplashLines') || "";
                var forcedLine = parseInt(localStorage.getItem('forcedSplashLine'), 10) || 0;
                
                var blockedArray = [];
                var splitBlocked = rawBlocked.split(',');
                for (var b = 0; b < splitBlocked.length; b++) {
                    var parsed = parseInt(splitBlocked[b].trim(), 10);
                    if (!isNaN(parsed)) {
                        blockedArray.push(parsed);
                    }
                }
if (localStorage.getItem('filterSplashes') === 'true') {
    var filteredLines = [23,26,37,44,62,67,68,80,81,82,83,88,89,91,92,99,103,107,111,114,115,118,120,124,126,128,129,134,138,142,153,154,162]; //best way to handle this surely, to be completly honest its not THAT bad, however i need to make sure i don't add a line to the splashes.txt file below any one of these, or else shit hits the fan.
    for (var f = 0; f < filteredLines.length; f++) {
        if (blockedArray.indexOf(filteredLines[f]) === -1) {
            blockedArray.push(filteredLines[f]);
        }
    }
    if (getVal('devMode')) console.info("SPLASH: Inappropriate filter active. " + filteredLines.length + " lines suppressed.");
}
                for (var i = 0; i < lines.length; i++) {
                    var lineStr = lines[i].trim();
                    var lineNum = i + 1; 
                    
                    if (lineStr.length > 0) {
                        if (forcedLine === lineNum) {
                            if (splashHeader) splashHeader.innerText = lineStr;
                            if (getVal('devMode')) console.info("SPLASH: Forced line " + forcedLine + " loaded.");
                            return; 
                        }
                        
                        if (blockedArray.indexOf(lineNum) === -1) {
                            validSplashes.push({text: lineStr, num: lineNum});
                        }
                    }
                }
                
                if (validSplashes.length > 0) {
                    var randomIndex = Math.floor(Math.random() * validSplashes.length);
                    if (splashHeader) {
                        splashHeader.innerText = validSplashes[randomIndex].text;
                        if (getVal('devMode')) console.log("SPLASH: Line " + validSplashes[randomIndex].num + " selected.");
                    }
                } else if (splashHeader) {
                    // Fallback just in case they accidentally blocked every single line
                    splashHeader.innerText = "Welcome!";
                }
                
            } else if (getVal('devMode')) {
                console.error("FS_ERROR: Could not load splashes.txt. HTTP Status: " + xhr.status);
            }
        }
    };
    xhr.send();
})();
//rest easy, kopi