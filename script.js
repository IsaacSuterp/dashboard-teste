document.addEventListener('DOMContentLoaded', () => {
    
    const animateCounters = () => {
        const counters = document.querySelectorAll('.value[data-target], .gauge-text[data-target]');
        
        const options = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = +el.getAttribute('data-target');
                    const isK = el.innerText.includes('K');
                    
                    let current = 0;
                    const increment = target / 200;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            el.innerText = Math.ceil(current) + (isK ? 'K' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.innerText = target + (isK ? 'K' : '');
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(el);
                }
            });
        }, options);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    };

    const generateWaveform = () => {
        const waveformContainer = document.getElementById('waveform-minim');
        if (!waveformContainer) return;
        
        const bars = 80; // Número de barras na onda
        for (let i = 0; i < bars; i++) {
            const bar = document.createElement('div');
            bar.classList.add('bar');
            
            const delay = Math.sin(i / (bars / Math.PI)) * 0.5 + 0.5;
            bar.style.animationDelay = `${delay}s`;
            
            waveformContainer.appendChild(bar);
        }
    };

    animateCounters();
    generateWaveform();

});