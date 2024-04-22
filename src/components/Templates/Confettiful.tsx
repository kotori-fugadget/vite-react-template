import { useEffect, useState } from "react";

const Confettiful = () => {
    const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

    const confettiFrequency = 30
    ;
    const confettiTime= 8000;
    const confettiColors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];
    const confettiAnimations = ['slow', 'medium', 'fast'];

    useEffect(() => {
        const el = document.querySelector('.Confettiful') as HTMLDivElement;
        setContainerEl(el);
    }, []);

    useEffect(() => {
        if (!containerEl) return;
        const confettiInterval = setInterval(() => {
            const confettiEl = document.createElement('div');
            const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
            const confettiBackground = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            const confettiLeft = (Math.floor(Math.random() * containerEl.offsetWidth)) + 'px';
            const confettiAnimation = confettiAnimations[Math.floor(Math.random() * confettiAnimations.length)];

            confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
            confettiEl.style.left = confettiLeft;
            confettiEl.style.width = confettiSize;
            confettiEl.style.height = confettiSize;
            confettiEl.style.backgroundColor = confettiBackground;

            containerEl.appendChild(confettiEl);

            const removeConfetti = () => {
                containerEl.removeChild(confettiEl);
            };

            const removeTimeout = setTimeout(() => {
                removeConfetti();
                clearInterval(confettiInterval);
            }, confettiTime);

            return () => {
                clearInterval(confettiInterval);
                clearTimeout(removeTimeout);
            };
        }, confettiFrequency);

        return () => clearInterval(confettiInterval);
    }, [containerEl]);

    return (
        <div className="Confettiful">
            <div className="confetti-container" ref={setContainerEl}></div>
        </div>
    )
}

export default Confettiful