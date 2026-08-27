(function() {
    var disableTrans = false;
    try { 
        disableTrans = localStorage.getItem('disableTransitions') === 'true'; 
    } catch(e) {}

    if (disableTrans) {
        document.documentElement.classList.add('no-transitions');
    }

    var animTime = 60;
    var buffer = 15;
    var totalDelay = animTime + buffer;

    function getClosestAnchor(el) {
        while (el && el !== document.body) {
            if (el.tagName === 'A') return el;
            el = el.parentElement;
        }
        return null;
    }

    function interceptClicks(e) {
        if (disableTrans) return;

        var targ = (e.target || e.srcElement);
        var a = getClosestAnchor(targ);

        if (!a || !a.href) return;

        var href = a.getAttribute('href') || "";
        var target = a.getAttribute('target');
        
        if (target === '_blank' || 
            href.indexOf('javascript:') === 0 || 
            href.indexOf('mailto:') === 0 || 
            href.charAt(0) === '#' ||
            e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
            return;
        }

        var destination = a.href;
        if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
        
        requestAnimationFrame(function() {
            document.body.classList.add('snap-exit');
        });
        
        setTimeout(function() {
            window.location.href = destination;
        }, totalDelay);
    }

    if (document.addEventListener) {
        document.addEventListener('click', interceptClicks, false);
    } else { 
        document.attachEvent('onclick', interceptClicks);
    }
    
    window.addEventListener('pageshow', function(event) {
        if (event.persisted || document.body.classList.contains('snap-exit')) {
            document.body.classList.remove('snap-exit');
        }
    });
})();