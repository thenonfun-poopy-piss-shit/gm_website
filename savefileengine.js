//TRIMESS SAVE FILE JS

//shit thats saved
var SAVE_KEYS = [
    'achievements',
    'hideWarnings',
    'muteSounds',
    'disableTeapot',
    'devMode',
    'disableSplashes',
    'disableTransitions',
    'blockedSplashLines',
    'forcedSplashLine',
    'filterSplashes'
];

//exporting
function exportSaveData() {
    var saveObj = {};

    for (var i = 0; i < SAVE_KEYS.length; i++) {
        var key = SAVE_KEYS[i];
        var val = null;
        try { val = localStorage.getItem(key); } catch(e) {}
        if (val !== null) {
            saveObj[key] = val;
        }
    }

    if (Object.keys(saveObj).length === 0) {
        alert("Nothing to export. No save data found.");
        return;
    }

    var jsonStr = JSON.stringify(saveObj, null, 2);

    var isIE = !!document.documentMode || /MSIE|Trident/.test(navigator.userAgent);

    if (isIE && window.navigator && window.navigator.msSaveBlob) {
        // msblob makes ts easy on ie11
        try {
            var blob = new Blob([jsonStr], { type: 'application/octet-stream' });
            window.navigator.msSaveBlob(blob, 'gm_website_save.gmws');
        } catch(e) {
            alert("Export failed: " + e.message);
        }

    } else if (window.showSaveFilePicker) {
        // for everything else
        window.showSaveFilePicker({
            suggestedName: 'gm_website_save.gmws',
            types: [{
                description: 'gm_website Save File',
                accept: { 'application/octet-stream': ['.gmws'] }
            }]
        }).then(function(fileHandle) {
            return fileHandle.createWritable();
        }).then(function(writable) {
            writable.write(jsonStr);
            return writable.close();
        }).then(function() {
            if (typeof console !== 'undefined') console.info("SAVEDATA: Export complete.");
        })['catch'](function(e) {
            if (e.name !== 'AbortError') alert("Export failed: " + e.message);
        });
        return;

    } else {
        try {
            var blob = new Blob([jsonStr], { type: 'application/octet-stream' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.setAttribute('download', 'gm_website_save.gmws');
            a.style.position = 'absolute';
            a.style.left = '-9999px';
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                if (a.parentNode) a.parentNode.removeChild(a);
                URL.revokeObjectURL(url);
            }, 5000);
        } catch(e) {
            alert("Export failed: " + e.message);
        }
    }

    if (typeof console !== 'undefined') {
        console.info("SAVEDATA: Export complete.");
    }
}

// importing
function importSaveData() {
    var input = document.createElement('input');
    input.type = 'file';
    // accept .gmws or .json, chai tea
    input.accept = '.gmws,.json';

    input.onchange = function(e) {
        var file = (e.target || e.srcElement).files[0];
        if (!file) return;

        var reader = new FileReader();

        reader.onload = function(evt) {
            var raw = evt.target.result;
            var parsed;

            try {
                parsed = JSON.parse(raw);
            } catch(parseErr) {
                alert("Import failed: Invalid save file. (Not valid JSON)");
                return;
            }

            if (typeof parsed !== 'object' || parsed === null) {
                alert("Import failed: Save file is malformed.");
                return;
            }

            //achievements importing
            if (parsed['achievements']) {
                var existingRaw = null;
                try { existingRaw = localStorage.getItem('achievements'); } catch(e2) {}
                var existing = {};
                try { existing = JSON.parse(existingRaw || '{}'); } catch(e3) {}

                var incoming;
                try { incoming = JSON.parse(parsed['achievements']); } catch(e4) { incoming = {}; }

                for (var achKey in incoming) {
                    if (incoming.hasOwnProperty(achKey)) {
                        if (!existing[achKey]) {
                            existing[achKey] = incoming[achKey];
                        }
                    }
                }
                try { localStorage.setItem('achievements', JSON.stringify(existing)); } catch(e5) {}
            }

            // import settings keys
            var settingsKeys = [
                'hideWarnings', 'muteSounds', 'disableTeapot', 'devMode',
                'disableSplashes', 'disableTransitions', 'blockedSplashLines',
                'forcedSplashLine', 'filterSplashes'
            ];

            for (var s = 0; s < settingsKeys.length; s++) {
                var sKey = settingsKeys[s];
                if (parsed.hasOwnProperty(sKey)) {
                    try { localStorage.setItem(sKey, parsed[sKey]); } catch(e6) {}
                }
            }

            if (typeof console !== 'undefined') {
                console.info("SAVEDATA: Import complete. Reloading...");
            }

            alert("Save data imported successfully!\n\nThe page will now reload to apply changes.");
            window.location.reload();
        };

        reader.onerror = function() {
            alert("Import failed: Could not read file.");
        };

        reader.readAsText(file);
    };

    input.style.display = 'none';
    document.body.appendChild(input);
    input.click();
    // clean up
    setTimeout(function() {
        if (input.parentNode) input.parentNode.removeChild(input);
    }, 10000);
}