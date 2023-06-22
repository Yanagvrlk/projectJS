function startGame(level) {
    switch (level) {
        case 'easy':
            window.location.href = 'map_easy.html';
            break;
        case 'medium':
            window.location.href = 'map_medium.html';
            break;
        case 'hard':
            window.location.href = 'map_hard.html';
            break;
        default:
            break;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    function getRandomPosition() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const randomX = Math.floor(Math.random() * windowWidth);
        const randomY = Math.floor(Math.random() * windowHeight);

        return { x: randomX, y: randomY };
    }

    function createWally() {
        const wallyImage = document.createElement('img');
        wallyImage.src = 'img/wally.png';
        wallyImage.alt = 'Wally';
        wallyImage.classList.add('wally-image');

        const position = getRandomPosition();
        wallyImage.style.left = position.x + 'px';
        wallyImage.style.top = position.y + 'px';
        wallyImage.style.width = '10%'; 
        wallyImage.style.height = '14%'; 

        document.body.appendChild(wallyImage);

        setTimeout(() => {
            wallyImage.classList.add('show');
        }, 10);
    }

    function animateWally() {
        const maxWallyCount = 500;

        for (let i = 0; i < maxWallyCount; i++) {
            setTimeout(createWally, i * 30);
        }
    }

    animateWally();

    
    
});
