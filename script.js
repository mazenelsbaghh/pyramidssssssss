
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

    const sections = gsap.utils.toArray('section');
    let currentSectionIndex = 0;
    let isScrolling = false;

    // --- Main function to scroll to a section ---
    function goToSection(index, immediate = false) {
        index = gsap.utils.clamp(0, sections.length - 1, index);

        if (isScrolling && !immediate) return;
        isScrolling = true;

        currentSectionIndex = index;

        gsap.to(window, {
            scrollTo: { y: sections[index], autoKill: false },
            duration: immediate ? 0 : 1.2,
            ease: "power2.inOut",
            onComplete: () => {
                isScrolling = false;
                // Update the URL hash without jumping
                history.pushState(null, null, `#${sections[index].id}`);
            }
        });
    }

    // --- Link up all the scroll buttons ---
    const scrollButtons = document.querySelectorAll('[data-target]');
    scrollButtons.forEach(button => {
        const handleClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const targetId = button.getAttribute('data-target');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const targetIndex = sections.indexOf(targetSection);
                if (targetIndex !== -1) {
                    goToSection(targetIndex);
                }
            }
        };
        button.addEventListener('click', handleClick);
        button.addEventListener('touchend', handleClick, { passive: false });
    });

    // --- Hero scroll button ---
    const heroScrollBtn = document.querySelector('.scroll-down-indicator');
    if (heroScrollBtn) {
        const handleHeroClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            goToSection(1); // Go to the first slide after hero
        };
        heroScrollBtn.addEventListener('click', handleHeroClick);
        heroScrollBtn.addEventListener('touchend', handleHeroClick, { passive: false });
    }


    // --- Keyboard navigation (n for next, p/ح for previous) ---
    document.addEventListener('keydown', (e) => {
        // Ignore keydown events if the user is typing in an input field
        if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
            return;
        }
        if (e.key.toLowerCase() === 'n') {
            goToSection(currentSectionIndex + 1);
        }
        if (e.key.toLowerCase() === 'p' || e.key.toLowerCase() === 'ح') {
            goToSection(currentSectionIndex - 1);
        }
    });

    // --- Navigation Buttons Logic ---
    const navUp = document.querySelector('.nav-up');
    const navDown = document.querySelector('.nav-down');

    function updateNavButtons(index) {
        navUp.classList.toggle('hidden', index === 0);
        navDown.classList.toggle('hidden', index === sections.length - 1);
    }

    navUp.addEventListener('click', () => goToSection(currentSectionIndex - 1));
    navDown.addEventListener('click', () => goToSection(currentSectionIndex + 1));

    // --- Update current section on scroll ---
    sections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => {
                currentSectionIndex = index;
                updateNavButtons(index);
            },
            onEnterBack: () => {
                currentSectionIndex = index;
                updateNavButtons(index);
            },
        });
    });

    // --- Animate content when it scrolls into view ---
    sections.forEach((section) => {
        const content = section.querySelector('.slide-content-text, .hero-content, .sphinx-timeline-panel');
        if (content) {
            gsap.from(content, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%", // Start animation a bit earlier
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 50,
                duration: 1
            });
        }
    });

    // --- Schools Cup Side Panel Logic ---
    function initSchoolsPopup() {
        const popupTriggers = document.querySelectorAll('#schools-cup .popup-trigger');
        const sideOverlay = document.getElementById('schools-side-overlay');
        const sideOverlayContent = document.getElementById('side-overlay-content');
        const sideOverlayClose = document.querySelector('.side-overlay-close');

        const detailsData = [
            {
                title: '🎯 الرؤية',
                html: `<h3>🎯 الرؤية</h3><p>إطلاق بطولة مدارس على مستوى محافظات الصعيد بنظام احترافي، تخلق روح التنافس والانتماء، وتجعل كل مدرسة تحلم ترفع كأس بيراميدز.</p>`
            },
            {
                title: '⚽ نظام البطولة',
                html: `<h3>⚽ نظام البطولة</h3><div class='tournament-system'><div class='system-step'><h4>1. الدور التمهيدي</h4><ul><li>كل مدرسة تنظم دورة داخلية.</li><li>الفريق الفائز يمثل المدرسة.</li></ul></div><div class='system-step'><h4>2. البطولة الكبرى</h4><ul><li>الفرق الفائزة تشارك في بطولة على مستوى المحافظة.</li></ul></div><div class='system-step'><h4>3. النهائيات الكبرى</h4><ul><li>أفضل الفرق من المحافظات تتأهل للنهائيات.</li><li>كل فريق يرتبط بنجم من نجوم بيراميدز.</li></ul></div></div>`
            },
            {
                title: '🏆 الجوائز',
                html: `<h3>🏆 الجوائز والمكافآت</h3><div class='rewards-section'><div class='reward-category'><h4>الفريق الفائز:</h4><ul><li>كأس بيراميدز للمدارس.</li><li>تيشيرتات أصلية.</li><li>يوم كامل مع الفريق الأول.</li><li>منح تدريبية مجانية.</li></ul></div><div class='reward-category'><h4>الفرق الوصيفة:</h4><ul><li>ميداليات وجوائز رياضية.</li></ul></div></div>`
            },
            {
                title: '📈 الأثر',
                html: `<h3>📈 الأثر المتوقع</h3><ul class='impact-list'><li>بناء ولاء حقيقي بين المدارس والنادي.</li><li>كل طالب في الصعيد يحلم باللعب في بطولة بيراميدز.</li><li>المدارس تتنافس للانتماء للنادي.</li></ul>`
            }
        ];

        if (!popupTriggers.length || !sideOverlay) return;

        function showOverlay(step) {
            const idx = parseInt(step, 10);
            if (detailsData[idx]) {
                sideOverlayContent.innerHTML = detailsData[idx].html;
                sideOverlay.classList.add('active');
                popupTriggers.forEach((btn, i) => btn.classList.toggle('active', i === idx));
            }
        }

        function hideOverlay() {
            sideOverlay.classList.remove('active');
            popupTriggers.forEach(btn => btn.classList.remove('active'));
        }

        popupTriggers.forEach(trigger => {
            trigger.addEventListener('click', function () {
                const step = this.getAttribute('data-step');
                showOverlay(step);
            });
        });

        sideOverlayClose.addEventListener('click', hideOverlay);
        document.addEventListener('keydown', e => (e.key === 'Escape') && hideOverlay());
    }
    // --- Sphinx Army Accordion Logic (GSAP) ---
    function initSphinxAccordion() {
        const accordionItems = document.querySelectorAll('.accordion-item');

        // Set initial state for all content areas to be closed
        gsap.set(accordionItems, { height: "auto" }); // Set height to auto to calculate the natural height
        gsap.set(document.querySelectorAll('.accordion-content'), { height: 0, opacity: 0, visibility: 'hidden' });

        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');

            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items with animation
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        gsap.to(otherItem.querySelector('.accordion-content'), {
                            height: 0,
                            opacity: 0,
                            visibility: 'hidden',
                            duration: 0.4,
                            ease: 'power2.inOut'
                        });
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle the clicked item with animation
                if (isActive) {
                    gsap.to(content, {
                        height: 0,
                        opacity: 0,
                        visibility: 'hidden',
                        duration: 0.4,
                        ease: 'power2.inOut'
                    });
                    item.classList.remove('active');
                } else {
                    gsap.to(content, {
                        height: 'auto',
                        opacity: 1,
                        visibility: 'visible',
                        duration: 0.6,
                        ease: 'power2.out'
                    });
                    item.classList.add('active');
                }
            });
        });
    }

    // --- Stadium Details Overlay Logic ---
    function initStadiumDetails() {
        const usageCards = document.querySelectorAll('.usage-card');
        const stadiumOverlay = document.getElementById('stadium-details-overlay');
        const stadiumDetailsInner = document.getElementById('stadium-details-inner');
        const stadiumCloseBtn = document.querySelector('.stadium-close-btn');

        const stadiumDetailsData = {
            'first-team': {
                title: '⚽ مباريات الفريق الأول',
                content: `
                    <h3>⚽ مباريات الفريق الأول</h3>
                    <p>استاد بني سويف سيكون المقر الرسمي لمباريات بيراميدز في الصعيد، مما يوفر:</p>
                    <ul>
                        <li>استضافة مباريات الدوري المصري الممتاز</li>
                        <li>مباريات كأس مصر والبطولات المحلية</li>
                        <li>مباريات ودية وترويجية</li>
                        <li>تقريب النادي من جماهير الصعيد</li>
                        <li>خلق بيئة مناسبة للجماهير المحلية</li>
                    </ul>
                `
            },
            'schools-cup': {
                title: '🏆 نهائيات دوري المدارس',
                content: `
                    <h3>🏆 نهائيات دوري المدارس</h3>
                    <p>الاستاد سيكون مقراً لنهائيات بطولة المدارس السنوية:</p>
                    <ul>
                        <li>استضافة نهائيات البطولة على مستوى الصعيد</li>
                        <li>حفل افتتاح وختام احتفالي</li>
                        <li>حضور نجوم الفريق الأول</li>
                        <li>توزيع الجوائز والميداليات</li>
                        <li>تغطية إعلامية مكثفة</li>
                    </ul>
                `
            },
            'academies': {
                title: '🎯 تدريبات الأكاديميات الكبرى',
                content: `
                    <h3>🎯 تدريبات الأكاديميات الكبرى</h3>
                    <p>الاستاد سيكون مركز تدريب للمواهب الشابة:</p>
                    <ul>
                        <li>تدريب المواهب الشابة في بيئة احترافية</li>
                        <li>معسكرات تدريبية دورية</li>
                        <li>تقنيات حديثة ومعدات متطورة</li>
                        <li>متابعة من مدربين محترفين</li>
                        <li>اكتشاف المواهب الجديدة</li>
                    </ul>
                `
            },
            'events': {
                title: '🎪 الفعاليات الجماهيرية',
                content: `
                    <h3>🎪 الفعاليات الجماهيرية</h3>
                    <p>الاستاد سيكون مقراً للفعاليات والمناسبات:</p>
                    <ul>
                        <li>حفلات توقيع عقود اللاعبين</li>
                        <li>عروض تقديم الفريق الجديد</li>
                        <li>فعاليات جماهيرية وترويجية</li>
                        <li>مناسبات خاصة بالنادي</li>
                        <li>معارض رياضية وتجارية</li>
                    </ul>
                `
            }
        };

        function showStadiumDetails(usageType) {
            const details = stadiumDetailsData[usageType];
            if (details) {
                stadiumDetailsInner.innerHTML = details.content;
                stadiumOverlay.classList.add('active');
            }
        }

        function hideStadiumDetails() {
            stadiumOverlay.classList.remove('active');
        }

        usageCards.forEach(card => {
            card.addEventListener('click', function () {
                const usageType = this.getAttribute('data-usage');
                showStadiumDetails(usageType);
            });
        });

        stadiumCloseBtn.addEventListener('click', hideStadiumDetails);
        document.addEventListener('keydown', e => (e.key === 'Escape') && hideStadiumDetails());
    }

    // Initialize all components
    initSchoolsPopup();
    initSphinxAccordion();
    initStadiumDetails();

    // Go to section from URL hash if present
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const targetIndex = sections.indexOf(targetSection);
            if (targetIndex !== -1) {
                // Use a timeout to ensure the page is fully loaded and laid out
                setTimeout(() => {
                    goToSection(targetIndex, true); // immediate scroll
                }, 100);
            }
        }
    }
});
