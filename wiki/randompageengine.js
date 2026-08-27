(function() {
    function setupRandomLink() {
        // 1. List every page in your wiki here
        var wikiPages = [
            "https://thenonfun.neocities.org/wiki/faces/MyDumbassFriend",
            "https://thenonfun.neocities.org/wiki/maps/gm_latola",
            "https://thenonfun.neocities.org/wiki/faces/panman",
            "https://thenonfun.neocities.org/wiki/faces/ThenonFun",
            "https://thenonfun.neocities.org/wiki/projects/trimess",
            "https://thenonfun.neocities.org/wiki/projects/fatdadclan",
            "https://thenonfun.neocities.org/wiki/projects/fatsonclan",
            "https://thenonfun.neocities.org/wiki/maps/gm_housewithbasement",
            "https://thenonfun.neocities.org/wiki/faces/fatdad",
            "https://thenonfun.neocities.org/wiki/faces/dante",
            "https://thenonfun.neocities.org/wiki/faces/horse",
            "https://thenonfun.neocities.org/wiki/projects/redacted.comalbum",
            "https://thenonfun.neocities.org/wiki/faces/lovephonk666",
            "https://thenonfun.neocities.org/wiki/maps/gm_wayremake"
        ];

        // 2. Find the link
        var randomLink = document.getElementById("random-page-link");
        
        // 3. Give it a random destination
        if (randomLink) {
            var randomDest = wikiPages[Math.floor(Math.random() * wikiPages.length)];
            randomLink.href = randomDest;
        }
    }

    // IE11 safe DOM ready check
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupRandomLink);
    } else {
        setupRandomLink(); // DOM is already parsed, run immediately
    }
})();