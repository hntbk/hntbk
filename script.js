/**
 * Modern interactions with Intersection Observer API
 */

document.addEventListener('DOMContentLoaded', () => {
    // スクロールアニメーション（Intersection Observer）
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を監視
    document.querySelectorAll('.section, .hero-image').forEach(el => {
        el.classList.add('fade-in-up');
        fadeInObserver.observe(el);
    });

    // ヘッダーのスクロール時の影
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 10) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // 活動内容リストのスタガーアニメーション
    const activitiesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');
                items.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.1}s`;
                    item.classList.add('is-visible');
                });
                activitiesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const activitiesList = document.querySelector('.activities');
    if (activitiesList) {
        activitiesObserver.observe(activitiesList);
    }
});
