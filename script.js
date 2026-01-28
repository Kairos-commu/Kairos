/* =====================================================
   KAIROS - La mécanique fine de la résonance conversationnelle
   JavaScript - Navigation & Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----- Éléments DOM -----
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // =====================================================
    // SMOOTH SCROLL
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                // Fermer le menu mobile si ouvert
                closeMobileMenu();

                // Scroll vers la cible
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =====================================================
    // NAVIGATION ACTIVE STATE
    // =====================================================
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Desktop nav
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                // Mobile nav
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id) {
            navObserver.observe(section);
        }
    });

    // =====================================================
    // SECTION REVEAL ANIMATION
    // =====================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });

    sections.forEach(section => {
        revealObserver.observe(section);
    });

    // =====================================================
    // HEADER SCROLL EFFECT
    // =====================================================
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Ajouter classe scrolled si on a défilé
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // =====================================================
    // MOBILE MENU
    // =====================================================
    function openMobileMenu() {
        mobileNavOverlay.classList.add('active');
        mobileNavOverlay.setAttribute('aria-hidden', 'false');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        // Animation du hamburger
        const hamburger = mobileMenuBtn.querySelector('.hamburger');
        hamburger.style.background = 'transparent';
        hamburger.style.transform = 'translate(-50%, -50%)';
    }

    function closeMobileMenu() {
        mobileNavOverlay.classList.remove('active');
        mobileNavOverlay.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        // Reset hamburger
        const hamburger = mobileMenuBtn.querySelector('.hamburger');
        hamburger.style.background = '';
        hamburger.style.transform = '';
    }

    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Fermer en cliquant sur l'overlay
    mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target === mobileNavOverlay) {
            closeMobileMenu();
        }
    });

    // =====================================================
    // CHART.JS - GRAPHIQUE BASELINE
    // =====================================================
    const baselineCanvas = document.getElementById('baselineChart');

    if (baselineCanvas && typeof Chart !== 'undefined') {
        const ctx = baselineCanvas.getContext('2d');

        // Données de la baseline (linéarisation)
        // Reste à 1.0 jusqu'au tour 11, puis chute à 0.0
        const labels = Array.from({ length: 27 }, (_, i) => i);
        const data = labels.map(tour => {
            if (tour <= 11) return 1.0;
            return 0.0;
        });

        // Gradient pour la zone
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
        gradient.addColorStop(0.5, 'rgba(239, 68, 68, 0.1)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.1)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Linéarisation',
                    data: data,
                    borderColor: '#667eea',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#667eea',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(26, 31, 46, 0.95)',
                        titleColor: '#e4e6eb',
                        bodyColor: '#9ca3af',
                        borderColor: 'rgba(102, 126, 234, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            title: (items) => `Tour ${items[0].label}`,
                            label: (item) => {
                                const value = item.raw;
                                const status = value >= 0.5 ? 'Anti-résonance' : 'Résonance';
                                return `Linéarisation: ${value.toFixed(1)} (${status})`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Tours de conversation',
                            color: '#9ca3af',
                            font: {
                                size: 12,
                                weight: 500
                            }
                        },
                        grid: {
                            color: 'rgba(102, 126, 234, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        min: 0,
                        max: 1,
                        title: {
                            display: true,
                            text: 'Linéarisation',
                            color: '#9ca3af',
                            font: {
                                size: 12,
                                weight: 500
                            }
                        },
                        grid: {
                            color: 'rgba(102, 126, 234, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 11
                            },
                            stepSize: 0.25
                        }
                    }
                }
            }
        });

        // Ajouter les zones de référence (annotations manuelles via CSS)
        const chartWrapper = baselineCanvas.closest('.chart-wrapper');
        if (chartWrapper) {
            const zoneIndicator = document.createElement('div');
            zoneIndicator.className = 'chart-zones';
            zoneIndicator.innerHTML = `
                <span class="zone zone-negative">Zone d'anti-résonance</span>
                <span class="zone zone-positive">Zone de résonance</span>
            `;
            chartWrapper.appendChild(zoneIndicator);
        }
    }

    // =====================================================
    // VARIABLE CARDS - TOOLTIP INTERACTION
    // =====================================================
    const variableCards = document.querySelectorAll('.variable-card');

    variableCards.forEach(card => {
        const tooltip = card.getAttribute('data-tooltip');
        if (tooltip) {
            card.setAttribute('title', tooltip);
            card.style.cursor = 'help';
        }
    });

    // =====================================================
    // EQUATION HOVER EFFECT
    // =====================================================
    const equationFormula = document.querySelector('.equation-formula');

    if (equationFormula) {
        // Ajouter des spans autour des variables pour l'interactivité
        const formulaText = equationFormula.textContent;
        const variables = {
            'R': 'Résonance - Le score global de qualité de l\'échange',
            'I': 'Investissement - Engagement cognitif et émotionnel',
            'E': 'Effort - Charge cognitive nécessaire',
            'O': 'Ouverture - Disposition à l\'altérité',
            'A': 'Authenticité - Degré de présence authentique',
            'L': 'Linéarisation - Tendance à simplifier excessivement'
        };

        let newHTML = formulaText;
        Object.keys(variables).forEach(variable => {
            const regex = new RegExp(`\\b${variable}\\b`, 'g');
            newHTML = newHTML.replace(regex,
                `<span class="equation-var" data-var="${variable}" title="${variables[variable]}">${variable}</span>`
            );
        });

        equationFormula.innerHTML = newHTML;

        // Style pour les variables
        const style = document.createElement('style');
        style.textContent = `
            .equation-var {
                cursor: help;
                transition: color 0.2s ease, transform 0.2s ease;
                display: inline-block;
            }
            .equation-var:hover {
                color: #f59e0b;
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);
    }

    // =====================================================
    // STYLE ADDITIONNEL POUR LES ZONES DU GRAPHIQUE
    // =====================================================
    const chartZonesStyle = document.createElement('style');
    chartZonesStyle.textContent = `
        .chart-zones {
            display: flex;
            justify-content: center;
            gap: 24px;
            margin-top: 16px;
        }
        .zone {
            font-size: 0.75rem;
            font-weight: 500;
            padding: 4px 12px;
            border-radius: 4px;
        }
        .zone-negative {
            color: #ef4444;
            background: rgba(239, 68, 68, 0.1);
        }
        .zone-positive {
            color: #10b981;
            background: rgba(16, 185, 129, 0.1);
        }
    `;
    document.head.appendChild(chartZonesStyle);

    // =====================================================
    // PRINT STYLES - Optimisation pour impression
    // =====================================================
    window.addEventListener('beforeprint', () => {
        document.querySelectorAll('.section').forEach(s => s.classList.add('visible'));
    });

    console.log('KAIROS - Site initialisé avec succès');
});
