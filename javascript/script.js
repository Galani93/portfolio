"use strict";

document.addEventListener("DOMContentLoaded", () => {
    /*** Переменные ***/
    const header = document.getElementById("header-wrap");
    const scrollTopBtn = document.querySelector(".scroll-top");
    const themeToggle = document.getElementById("theme-toggle");
    const themeLink = document.getElementById("theme-link");
    const mobileMenu = document.querySelector(".wrap-mobilemenu");
    const overlay = document.querySelector(".overlay-fade");
    const typedElement = document.getElementById("typed-text");

    if (!header) return;

    /*** Обработчик скролла ***/
    window.addEventListener("scroll", () => {
        const scrolled = window.scrollY > 300;
        header.classList.toggle("fixed", scrolled);
        scrollTopBtn?.classList.toggle("show", scrolled);
    });

    /*** Переключение темы ***/
    if (themeLink && themeToggle) {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            themeLink.href = savedTheme;
            themeToggle.checked = savedTheme === "dark.css";
        }

        themeToggle.addEventListener("change", () => {
            const newTheme = themeToggle.checked ? "dark.css" : "themes.css";
            themeLink.href = newTheme;
            localStorage.setItem("theme", newTheme);
        });
    }

    /*** Мобильное меню ***/
    document.getElementById("openmenu")?.addEventListener("click", () => {
        mobileMenu.style.display = "block";
        setTimeout(() => {
            mobileMenu.style.right = "0px";
        }, 10);
        overlay.style.display = "block";
    });

    document.getElementById("closesmenu")?.addEventListener("click", () => {
        mobileMenu.style.right = "-100%";
        overlay.style.display = "none";
        setTimeout(() => {
            mobileMenu.style.display = "none";
        }, 500);
    });

    document.querySelectorAll(".menu-mobile .navigation-list li a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            mobileMenu.style.right = "-100%";
            overlay.style.display = "none";
            document.querySelector(link.getAttribute("href"))?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    /*** Анимация печатающегося текста ***/
    if (typedElement) {
        const texts = ["UI/UX Designer", "Web Developer", "Front End Designer"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = texts[textIndex];
            typedElement.textContent = currentText.substring(0, charIndex);

            if (!isDeleting && charIndex < currentText.length) {
                charIndex++;
                setTimeout(typeEffect, 220);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(typeEffect, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    textIndex = (textIndex + 1) % texts.length;
                }
                setTimeout(typeEffect, 2000);
            }
        }
        typeEffect();
    }

    /*** Закрытие WebSocket перед уходом со страницы ***/
    if (typeof socket !== "undefined") {
        window.addEventListener("pagehide", () => {
            socket.close();
        });
    }
});
