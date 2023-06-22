window.addEventListener('DOMContentLoaded', () => {
    const map = document.querySelector('.game-map img');
    const totalWallyCount = document.getElementById('total-wally-count');
    const foundWallyCount = document.getElementById('found-wally-count');
    const timerElement = document.getElementById('timer');
    const attemptsElement = document.getElementById('attempts');
    const gameOverElement = document.getElementById('game-over');

    let wallyCount = 5;
    let foundWally = 0;
    let timer;
    let secondsRemaining = 30;

    function getRandomPosition() {
        const mapWidth = map.clientWidth;
        const mapHeight = map.clientHeight;
    
        const minDistance = 100; 
    
        let randomX, randomY;
        let isValidPosition = false;
    
        while (!isValidPosition) {
            randomX = Math.floor(Math.random() * (mapWidth - 100));
            randomY = Math.floor(Math.random() * (mapHeight - 150));
    
            isValidPosition = true;
    
            const existingWallyImages = document.querySelectorAll('.wally-image');
            for (let i = 0; i < existingWallyImages.length; i++) {
                const existingWally = existingWallyImages[i];
                const existingX = parseInt(existingWally.style.left);
                const existingY = parseInt(existingWally.style.top);
    
                const distance = Math.sqrt(Math.pow(existingX - randomX, 2) + Math.pow(existingY - randomY, 2));
    
                if (distance < minDistance) {
                    isValidPosition = false;
                    break;
                }
            }
        }
    
        return { x: randomX, y: randomY };
    }
    

    function createWally() {
        const wallyImage = document.createElement('img');
        wallyImage.src = 'img/wally2.png';
        wallyImage.alt = 'Wally';
        wallyImage.classList.add('wally-image');

        const position = getRandomPosition();
        wallyImage.style.left = position.x + 'px';
        wallyImage.style.top = position.y + 'px';
        wallyImage.style.width = '35px'; 
        wallyImage.style.height = '35px'; 


        wallyImage.addEventListener('click', () => {
            foundWally++;
            if (foundWally === wallyCount) {
                endGame();
                document.getElementById('game-over-message').textContent = 'YOU WIN';
            }
            foundWallyCount.textContent = `Знайдено Воллі: ${foundWally}`;
            wallyImage.remove();
        });

        map.parentElement.appendChild(wallyImage);
    }

    function startGame() {
        for (let i = 0; i < wallyCount; i++) {
            createWally();
        }

        timer = setInterval(() => {
            secondsRemaining--;
            timerElement.textContent = `Час: ${formatTime(secondsRemaining)}`;

            if (secondsRemaining === 0 || attempts === 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(timer);
        gameOverElement.classList.remove('hidden');
        document.getElementById('game-over-message').textContent = 'GAME OVER';
    }
    const restartButton = document.getElementById('restart-button');
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            window.location.reload(); 
        });
    }

    const nextLevelButton = document.getElementById('next-level-button');
    if (nextLevelButton) {
        nextLevelButton.addEventListener('click', () => {
            window.location.href = 'map_hard.html'; 
        });
    }


    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    startGame();
});
