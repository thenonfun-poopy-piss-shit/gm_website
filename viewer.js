document.addEventListener('DOMContentLoaded', function() {
    var items = document.querySelectorAll('.gallery-item');
    var revertBtn = document.getElementById('revertBtn');

    var overlay = document.createElement('div');
    overlay.className = 'grid-overlay';
    document.body.appendChild(overlay);

    for (var i = 0; i < items.length; i++) {
        (function(index) {
            var item = items[index];
            item.onclick = function() {
                for (var j = 0; j < items.length; j++) {
                    items[j].className = 'gallery-item';
                }
                item.className = 'gallery-item expanded';
                if (revertBtn) revertBtn.style.display = 'block';
                overlay.style.display = 'block';
            };
        })(i);
    }

    var revert = function() {
        for (var k = 0; k < items.length; k++) {
            items[k].className = 'gallery-item';
        }
        if (revertBtn) revertBtn.style.display = 'none';
        overlay.style.display = 'none';
    };

    if (revertBtn) revertBtn.onclick = revert;
    overlay.onclick = revert;
});