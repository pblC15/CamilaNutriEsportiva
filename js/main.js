(function () {
    "use strict";

    var header = document.querySelector(".header_contant");
    var menuToggle = document.getElementById("menuMobile");
    var mobileMenu = document.getElementById("catMobile");

    /* Header fixo ao rolar */
    function onScrollHeader() {
        if (window.scrollY > 30) {
            header.classList.add("menu-fixo");
        } else {
            header.classList.remove("menu-fixo");
        }
    }
    window.addEventListener("scroll", onScrollHeader, { passive: true });
    onScrollHeader();

    /* Menu mobile */
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function () {
            var isOpen = menuToggle.classList.toggle("is-open");
            mobileMenu.style.display = isOpen ? "block" : "none";
            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        mobileMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                menuToggle.classList.remove("is-open");
                mobileMenu.style.display = "none";
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* Scroll suave com compensação da altura do header */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            var id = this.getAttribute("href");
            if (id.length < 2) return;
            var target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            var headerHeight = header ? header.offsetHeight : 0;
            var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            window.scrollTo({ top: top, behavior: "smooth" });
        });
    });

    /* Animações ao entrar na viewport */
    var animatedEls = document.querySelectorAll(".anime, .anime2, .anime3");
    if ("IntersectionObserver" in window && animatedEls.length) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var el = entry.target;
                        if (el.classList.contains("anime")) el.classList.add("anime-start");
                        if (el.classList.contains("anime2")) el.classList.add("anime2-start");
                        if (el.classList.contains("anime3")) el.classList.add("anime3-start");
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.15 }
        );
        animatedEls.forEach(function (el) {
            observer.observe(el);
        });

        /* Rede de segurança: garante que o conteúdo nunca fique invisível
           caso o IntersectionObserver não dispare a tempo (ex.: captura de
           tela de página inteira, navegadores antigos, JS lento). */
        window.setTimeout(function () {
            animatedEls.forEach(function (el) {
                el.classList.add("anime-start", "anime2-start", "anime3-start");
            });
        }, 2500);
    } else {
        animatedEls.forEach(function (el) {
            el.classList.add("anime-start", "anime2-start", "anime3-start");
        });
    }
})();
