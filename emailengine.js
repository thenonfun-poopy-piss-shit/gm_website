//TRIMESS EMAIL ENGINE
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('bugReportForm');
    var statusMessage = document.getElementById('formStatus');
    var submitBtn = document.getElementById('submitBtn');
    var categorySelect = document.getElementById('category');
    var clientInfoGroup = document.getElementById('clientInfoGroup');
    var includeClientInfoCheckbox = document.getElementById('includeClientInfo');

    var siteVersion = "Unknown";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/version.txt', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                siteVersion = xhr.responseText.replace(/^\s+|\s+$/g, '');
            } else {
                console.error("FS_ERROR: Error loading site build parameters.");
            }
        }
    };
    xhr.send();

    if (categorySelect && clientInfoGroup) {
        categorySelect.addEventListener('change', function() {
            if (categorySelect.value === 'Bug report') {
                clientInfoGroup.style.display = 'block';
            } else {
                clientInfoGroup.style.display = 'none';
                if (includeClientInfoCheckbox) {
                    includeClientInfoCheckbox.checked = false;
                }
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false; 
            }

            submitBtn.innerText = "PREPARING TRANSMISSION...";
            submitBtn.style.pointerEvents = "none"; 
            statusMessage.innerText = "";

            var category = categorySelect.value;
            var title = document.getElementById('title').value;
            var message = document.getElementById('message').value;
            var emailClient = document.getElementById('emailClient').value; //drop down shit

            var finalMessage = message;

            if (category === 'Bug report' && includeClientInfoCheckbox && includeClientInfoCheckbox.checked) {
                var ua = navigator.userAgent;
                var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
                var noWebP = false;
                
                try {
                    noWebP = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') !== 0;
                    if (noWebP && /Edge\/18/.test(navigator.userAgent)) {
                        noWebP = false;
                    }
                } catch(e) {
                    noWebP = true;
                }

                function getBrowserName() {
                    var s = navigator.userAgent;
                    if (s.indexOf("Windows Phone") !== -1 || s.indexOf("IEMobile") !== -1) return "Internet Explorer (Mobile)";
                    if (s.indexOf("MSIE") !== -1 || !!document.documentMode === true) return "Internet Explorer";
                    if (s.indexOf("Edg") !== -1) return "Edge";
                    if (s.indexOf("OPR") !== -1 || s.indexOf("Opera") !== -1) return "Opera";
                    if (s.indexOf("Firefox") !== -1) return "Firefox";
                    if (s.indexOf("Chrome") !== -1) return "Chrome";
                    if (s.indexOf("Safari") !== -1) return "Safari";
                    return "Unknown Engine";
                }

                function getEngineName() {
                    var s = navigator.userAgent;
                    if (s.indexOf("Trident") !== -1 || !!document.documentMode) return "Trident";
                    if (s.indexOf("Edge") !== -1) return "EdgeHTML";
                    if (s.indexOf("Firefox") !== -1) return "Gecko";
                    if (s.indexOf("Chrome") !== -1) return "Chromium";
                    if (s.indexOf("Safari") !== -1 && s.indexOf("Chrome") === -1) return "WebKit";
                    return "Unknown";
                }

                finalMessage += "\n\n=================================";
                finalMessage += "\n       CLIENT INFO       ";
                finalMessage += "\n=================================";
                finalMessage += "\nTriMess Build:  " + siteVersion;
                finalMessage += "\nBrowser:     " + getBrowserName();
                finalMessage += "\nEngine:      " + getEngineName();
                finalMessage += "\nMobile:      " + (isMobile ? "Yes" : "No");
                finalMessage += "\nWebP Spec:   " + (noWebP ? "FAIL" : "OK");
                finalMessage += "\nResolution:  " + window.screen.width + "x" + window.screen.height;
                finalMessage += "\nViewport:    " + window.innerWidth + "x" + window.innerHeight;
                finalMessage += "\nColor Depth: " + window.screen.colorDepth + "-bit";
                finalMessage += "\nPlatform:    " + (navigator.platform || "Unknown");
                finalMessage += "\nLanguage:    " + (navigator.language || "Unknown");
                finalMessage += "\nUser Agent:  " + ua;
                finalMessage += "\n=================================";
            }

            var targetEmail = "thenonfunwebsite@gmail.com";
            var subjectText = "[" + category + "] " + title;
            var confirmationText = "";

            if (emailClient === 'gmail') {
                var gmailLink = "https://mail.google.com/mail/?view=cm&fs=1&to=" + targetEmail + "&su=" + encodeURIComponent(subjectText) + "&body=" + encodeURIComponent(finalMessage);
                window.open(gmailLink, '_blank'); //gmail
                confirmationText = "Handed off to Gmail web client.";
            } else if (emailClient === 'outlook') { //outlook
                var outlookLink = "https://outlook.live.com/mail/0/deeplink/compose?to=" + targetEmail + "&subject=" + encodeURIComponent(subjectText) + "&body=" + encodeURIComponent(finalMessage);
                window.open(outlookLink, '_blank');
                confirmationText = "Handed off to Outlook web client.";
            } else if (emailClient === 'yahoo') { //yahoo
                var yahooLink = "https://compose.mail.yahoo.com/?to=" + targetEmail + "&subj=" + encodeURIComponent(subjectText) + "&body=" + encodeURIComponent(finalMessage);
                window.open(yahooLink, '_blank');
                confirmationText = "Handed off to Yahoo mail client.";
            } else {
                //other fake and gyaaay emails
                var mailtoLink = "mailto:" + targetEmail + "?subject=" + encodeURIComponent(subjectText) + "&body=" + encodeURIComponent(finalMessage);
                window.location.href = mailtoLink;
                confirmationText = "Handed off to default system handler.";
            }

            setTimeout(function() {
                statusMessage.style.color = "#55ff55";
                statusMessage.innerText = confirmationText;
                submitBtn.innerText = "TRANSMIT REPORT";
                submitBtn.style.pointerEvents = "auto";
                form.reset();
                if (clientInfoGroup) {
                    clientInfoGroup.style.display = 'none';
                }
            }, 1200);
        });
    }
});