/* ==========================================
   PAC-MAN GAME - LÓGICA PRINCIPAL
   ========================================== */

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Estado del juego
        this.gameState = 'menu'; // menu, playing, paused, gameOver
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.hardMode = false;
        this.isPowerUpActive = false;
        this.powerUpTimer = 0;
        this.powerUpDuration = 10; // segundos

        // Configuración del mapa
        this.cellSize = 30;
        this.mapWidth = 21;
        this.mapHeight = 21;

        // Crear el mapa
        this.createMap();

        // Crear jugador
        this.player = new Player(1, 1, this);

        // Crear fantasmas
        this.ghosts = [
            new Ghost(10, 10, '#ff0000', this, 'red'),      // Rojo
            new Ghost(10, 11, '#ffb897', this, 'pink'),     // Rosa
            new Ghost(11, 10, '#00ffff', this, 'cyan'),     // Cian
            new Ghost(11, 11, '#ffa500', this, 'orange')    // Naranja
        ];

        // Control de entrada
        this.keys = {};
        this.nextDirection = null;
        this.setupKeyboardControls();
        this.setupMobileControls();
        this.setupButtonControls();

        // Loop del juego
        this.frameCount = 0;
        this.targetFPS = 60;
        this.frameTime = 1000 / this.targetFPS;
        this.lastFrameTime = Date.now();

        // Alta scores
        this.loadHighScores();
    }

    // ==================== MAPA ====================

    createMap() {
        // Crear laberinto 21x21 con paredes (1) y espacios abiertos (0)
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 0, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
            [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        // Crear capa de items (2 = fantasma spawn, 3 = poder-up, 4 = punto normal, 5 = punto grande)
        this.items = [];
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                if (this.map[y][x] === 0) {
                    // Puntos grandes en las esquinas
                    if ((y === 1 && x === 1) || (y === 1 && x === 19) ||
                        (y === 19 && x === 1) || (y === 19 && x === 19)) {
                        this.items.push({ x, y, type: 'power', eaten: false });
                    } else if (Math.random() < 0.85) { // 85% puntos normales
                        this.items.push({ x, y, type: 'point', eaten: false });
                    }
                }
            }
        }

        // Agregar algunos items adicionales de fruta
        for (let i = 0; i < 5; i++) {
            let x, y, valid;
            do {
                x = Math.floor(Math.random() * this.mapWidth);
                y = Math.floor(Math.random() * this.mapHeight);
                valid = this.map[y][x] === 0 && !this.items.find(item => item.x === x && item.y === y);
            } while (!valid);
            this.items.push({ x, y, type: 'fruit', eaten: false });
        }
    }

    // ==================== CONTROLES ====================

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toUpperCase();

            if (key === ' ') { // Espacio = Pausa
                e.preventDefault();
                this.togglePause();
            } else if (key === 'R') { // R = Reiniciar
                this.restartGame();
            } else if (['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'W', 'A', 'S', 'D'].includes(key)) {
                e.preventDefault();
                this.keys[key] = true;
                this.updatePlayerDirection();
            }
        });

        document.addEventListener('keyup', (e) => {
            const key = e.key.toUpperCase();
            if (['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'W', 'A', 'S', 'D'].includes(key)) {
                this.keys[key] = false;
            }
        });
    }

    setupMobileControls() {
        const dpadButtons = document.querySelectorAll('.d-btn');
        dpadButtons.forEach(btn => {
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const dir = btn.dataset.dir;
                this.setPlayerDirection(dir);
            });
        });

        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
    }

    setupButtonControls() {
        // Menú inicial
        document.getElementById('playBtn').addEventListener('click', () => this.startGame(false));
        document.getElementById('hardModeBtn').addEventListener('click', () => this.startGame(true));
        document.getElementById('scoresBtn').addEventListener('click', () => this.showHighScores());

        // Game Over
        document.getElementById('retryBtn').addEventListener('click', () => this.startGame(this.hardMode));
        document.getElementById('menuBtn').addEventListener('click', () => this.goToMenu());

        // Pausa
        document.getElementById('resumeBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('restartFromPauseBtn').addEventListener('click', () => this.restartGame());
        document.getElementById('menuFromPauseBtn').addEventListener('click', () => this.goToMenu());

        // Botones flotantes
        document.getElementById('backBtn').addEventListener('click', () => this.goToMenu());

        // Modal de récords
        document.getElementById('closeScoresBtn').addEventListener('click', () => this.hideHighScores());
        document.getElementById('closeScoresBtn2').addEventListener('click', () => this.hideHighScores());
        document.getElementById('clearScoresBtn').addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas limpiar todos los récords?')) {
                localStorage.removeItem('pacmanScores');
                this.loadHighScores();
                this.showHighScores();
                audioSystem.playBeep(1000, 0.2);
            }
        });
    }

    updatePlayerDirection() {
        if (this.gameState !== 'playing') return;

        if (this.keys['ARROWUP'] || this.keys['W']) {
            this.setPlayerDirection('up');
        } else if (this.keys['ARROWDOWN'] || this.keys['S']) {
            this.setPlayerDirection('down');
        } else if (this.keys['ARROWLEFT'] || this.keys['A']) {
            this.setPlayerDirection('left');
        } else if (this.keys['ARROWRIGHT'] || this.keys['D']) {
            this.setPlayerDirection('right');
        }
    }

    setPlayerDirection(direction) {
        this.nextDirection = direction;
    }

    // ==================== ESTADO DEL JUEGO ====================

    startGame(hardMode = false) {
        this.hardMode = hardMode;
        this.gameState = 'playing';
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.isPowerUpActive = false;
        this.powerUpTimer = 0;
        this.frameCount = 0;

        this.createMap();
        this.player = new Player(1, 1, this);
        this.ghosts = [
            new Ghost(10, 10, '#ff0000', this, 'red'),
            new Ghost(10, 11, '#ffb897', this, 'pink'),
            new Ghost(11, 10, '#00ffff', this, 'cyan'),
            new Ghost(11, 11, '#ffa500', this, 'orange')
        ];

        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'flex';
        document.getElementById('gameOverScreen').style.display = 'none';
        document.getElementById('pauseScreen').style.display = 'none';

        this.updateHUD();
        audioSystem.playGameStartSound();
        this.gameLoop();
    }

    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            document.getElementById('pauseScreen').style.display = 'flex';
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            document.getElementById('pauseScreen').style.display = 'none';
            this.gameLoop();
        }
    }

    restartGame() {
        this.startGame(this.hardMode);
    }

    goToMenu() {
        this.gameState = 'menu';
        document.getElementById('mainMenu').style.display = 'flex';
        document.getElementById('gameContainer').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';
        document.getElementById('pauseScreen').style.display = 'none';
    }

    // ==================== GAME OVER ====================

    gameOver(won = false) {
        this.gameState = 'gameOver';

        if (won) {
            audioSystem.playVictorySound();
            document.getElementById('gameOverTitle').textContent = '¡GANASTE!';
            this.score += 1000;
        } else {
            audioSystem.playDeathSound();
            document.getElementById('gameOverTitle').textContent = 'GAME OVER';
        }

        document.getElementById('finalScore').textContent = `Puntuación: ${this.score}`;
        document.getElementById('levelReached').textContent = `Nivel alcanzado: ${this.level}`;
        document.getElementById('gameOverScreen').style.display = 'flex';

        this.saveHighScore();
    }

    // ==================== COLISIONES ====================

    isWall(x, y) {
        if (x < 0 || x >= this.mapWidth || y < 0 || y >= this.mapHeight) return true;
        return this.map[y][x] === 1 || this.map[y][x] === 2;
    }

    checkItemCollision(x, y) {
        for (let item of this.items) {
            if (item.x === x && item.y === y && !item.eaten) {
                item.eaten = true;

                if (item.type === 'point') {
                    this.score += 10;
                    audioSystem.playEatSound();
                } else if (item.type === 'power') {
                    this.score += 50;
                    this.activatePowerUp();
                    audioSystem.playPowerUpSound();
                } else if (item.type === 'fruit') {
                    this.score += 100;
                    audioSystem.playPowerUpSound();
                }

                return true;
            }
        }
        return false;
    }

    checkPlayerGhostCollision() {
        for (let ghost of this.ghosts) {
            if (this.player.x === ghost.x && this.player.y === ghost.y) {
                if (this.isPowerUpActive) {
                    // Comer fantasma
                    audioSystem.playGhostEatenSound();
                    this.score += 200;
                    ghost.reset();
                } else {
                    // Perder vida
                    this.loseLife();
                }
                return;
            }
        }
    }

    loseLife() {
        audioSystem.playDeathSound();
        this.lives--;
        this.updateHUD();

        if (this.lives <= 0) {
            this.gameOver(false);
        } else {
            this.player = new Player(1, 1, this);
            this.ghosts.forEach(g => g.reset());
            this.isPowerUpActive = false;
            this.powerUpTimer = 0;
        }
    }

    activatePowerUp() {
        this.isPowerUpActive = true;
        this.powerUpTimer = this.powerUpDuration;
        this.ghosts.forEach(g => g.setScared(true));
    }

    // ==================== HUD ====================

    updateHUD() {
        document.getElementById('score').textContent = this.score.toString().padStart(6, '0');
        document.getElementById('level').textContent = this.level;

        let livesDisplay = '';
        for (let i = 0; i < this.lives; i++) {
            livesDisplay += '●';
        }
        document.getElementById('lives').textContent = livesDisplay;
    }

    // ==================== ALTA SCORES ====================

    loadHighScores() {
        const stored = localStorage.getItem('pacmanScores');
        this.highScores = stored ? JSON.parse(stored) : [];
    }

    saveHighScore() {
        this.highScores.push({
            score: this.score,
            level: this.level,
            date: new Date().toLocaleDateString()
        });

        this.highScores.sort((a, b) => b.score - a.score);
        this.highScores = this.highScores.slice(0, 10); // Top 10

        localStorage.setItem('pacmanScores', JSON.stringify(this.highScores));
    }

    showHighScores() {
        document.getElementById('scoresModal').style.display = 'flex';
        this.updateHighScoresTable();
    }

    hideHighScores() {
        document.getElementById('scoresModal').style.display = 'none';
    }

    updateHighScoresTable() {
        const tbody = document.getElementById('scoresTableBody');
        tbody.innerHTML = '';

        if (this.highScores.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #999;">Sin récords aún</td></tr>';
            return;
        }

        this.highScores.forEach((score, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${score.score.toString().padStart(6, '0')}</td>
                <td>${score.level}</td>
                <td>${score.date}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // ==================== RENDERIZADO ====================

    render() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.renderMap();
        this.renderItems();
        this.player.render(this.ctx, this.cellSize);
        this.ghosts.forEach(g => g.render(this.ctx, this.cellSize));
    }

    renderMap() {
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                if (this.map[y][x] === 1) {
                    this.ctx.fillStyle = '#0066ff';
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);

                    // Borde glow
                    this.ctx.strokeStyle = '#00ffff';
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(x * this.cellSize + 1, y * this.cellSize + 1, this.cellSize - 2, this.cellSize - 2);
                }
            }
        }
    }

    renderItems() {
        for (let item of this.items) {
            if (!item.eaten) {
                const x = item.x * this.cellSize + this.cellSize / 2;
                const y = item.y * this.cellSize + this.cellSize / 2;

                if (item.type === 'point') {
                    this.ctx.fillStyle = '#ffb897';
                    this.ctx.fillRect(x - 2, y - 2, 4, 4);
                } else if (item.type === 'power') {
                    this.ctx.fillStyle = '#ffff00';
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, 6, 0, Math.PI * 2);
                    this.ctx.fill();

                    // Animación de glow
                    const glow = Math.sin(this.frameCount * 0.1) * 2 + 8;
                    this.ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, glow, 0, Math.PI * 2);
                    this.ctx.stroke();
                } else if (item.type === 'fruit') {
                    const fruitColors = ['#ff0000', '#ff6600', '#00ff00', '#0066ff', '#ff00ff'];
                    this.ctx.fillStyle = fruitColors[this.items.indexOf(item) % fruitColors.length];
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, 5, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
        }
    }

    // ==================== GAME LOOP ====================

    gameLoop = () => {
        const now = Date.now();
        const delta = now - this.lastFrameTime;

        if (delta < this.frameTime) {
            requestAnimationFrame(this.gameLoop);
            return;
        }

        this.frameCount++;
        this.lastFrameTime = now;

        // Actualizar poder-up
        if (this.isPowerUpActive) {
            this.powerUpTimer -= delta / 1000;
            if (this.powerUpTimer <= 0) {
                this.isPowerUpActive = false;
                this.ghosts.forEach(g => g.setScared(false));
            }
        }

        // Actualizar jugador
        this.player.update(this.nextDirection);
        this.checkItemCollision(this.player.x, this.player.y);

        // Actualizar fantasmas
        this.ghosts.forEach(g => g.update());

        // Detección de colisiones
        this.checkPlayerGhostCollision();

        // Verificar victoria
        const allEaten = this.items.every(item => item.eaten);
        if (allEaten && this.gameState === 'playing') {
            this.level++;
            this.startGame(this.hardMode); // Reiniciar con siguiente nivel
            return;
        }

        // Renderizar
        this.render();
        this.updateHUD();

        if (this.gameState === 'playing') {
            requestAnimationFrame(this.gameLoop);
        }
    }
}

// ==========================================
// CLASE PLAYER - PAC-MAN
// ==========================================

class Player {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.nextX = x;
        this.nextY = y;
        this.mouthOpen = true;
        this.mouthFrame = 0;
        this.direction = 'right';
        this.nextDirection = 'right';
        this.speed = 2;
    }

    update(nextDir) {
        if (nextDir) {
            this.nextDirection = nextDir;
        }

        // Intentar mover en dirección siguiente
        const newX = this.x + this.getDirectionX(this.nextDirection);
        const newY = this.y + this.getDirectionY(this.nextDirection);

        if (!this.game.isWall(newX, newY)) {
            this.x = newX;
            this.y = newY;
            this.direction = this.nextDirection;
        } else {
            // Si no puede ir en dirección siguiente, intentar seguir en dirección actual
            const currX = this.x + this.getDirectionX(this.direction);
            const currY = this.y + this.getDirectionY(this.direction);
            if (!this.game.isWall(currX, currY)) {
                this.x = currX;
                this.y = currY;
            }
        }

        // Animación de boca
        this.mouthFrame++;
        if (this.mouthFrame > 10) {
            this.mouthOpen = !this.mouthOpen;
            this.mouthFrame = 0;
        }
    }

    getDirectionX(dir) {
        return dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
    }

    getDirectionY(dir) {
        return dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
    }

    render(ctx, cellSize) {
        const x = this.x * cellSize + cellSize / 2;
        const y = this.y * cellSize + cellSize / 2;
        const radius = cellSize / 2 - 2;

        // Cuerpo amarillo
        ctx.fillStyle = '#ffff00';

        // Angulo para la boca
        let startAngle, endAngle;
        const mouthSize = this.mouthOpen ? 0.4 : 0.2;

        if (this.direction === 'right') {
            startAngle = -mouthSize * Math.PI;
            endAngle = mouthSize * Math.PI;
        } else if (this.direction === 'left') {
            startAngle = Math.PI - mouthSize * Math.PI;
            endAngle = Math.PI + mouthSize * Math.PI;
        } else if (this.direction === 'up') {
            startAngle = -Math.PI / 2 - mouthSize * Math.PI;
            endAngle = -Math.PI / 2 + mouthSize * Math.PI;
        } else {
            startAngle = Math.PI / 2 - mouthSize * Math.PI;
            endAngle = Math.PI / 2 + mouthSize * Math.PI;
        }

        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.lineTo(x, y);
        ctx.fill();

        // Ojos
        ctx.fillStyle = '#0066ff';
        const eyeOffset = radius / 3;
        ctx.fillRect(x - eyeOffset - 1, y - eyeOffset - 1, 2, 2);
        ctx.fillRect(x + eyeOffset - 1, y - eyeOffset - 1, 2, 2);

        // Glow
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// ==========================================
// CLASE GHOST - FANTASMA
// ==========================================

class Ghost {
    constructor(x, y, color, game, name) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.game = game;
        this.name = name;
        this.startX = x;
        this.startY = y;
        this.scared = false;
        this.speed = 1;
        this.moveCounter = 0;
        this.direction = 'left';
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
        this.scared = false;
    }

    setScared(scared) {
        this.scared = scared;
    }

    update() {
        this.moveCounter++;

        // Movimiento ralentizado
        const speedFactor = this.game.hardMode ? 1.2 : 1;
        const effectiveSpeed = Math.ceil(this.speed * speedFactor);

        if (this.moveCounter % effectiveSpeed === 0) {
            this.move();
        }
    }

    move() {
        if (this.scared) {
            // IA: Huir del jugador
            this.moveAwayFromPlayer();
        } else {
            // IA: Perseguir al jugador (búsqueda simple)
            this.moveTowardPlayer();
        }
    }

    moveTowardPlayer() {
        const directions = ['up', 'down', 'left', 'right'];
        let bestDir = this.direction;
        let minDistance = Infinity;

        for (let dir of directions) {
            const newX = this.x + this.getDirX(dir);
            const newY = this.y + this.getDirY(dir);

            if (!this.game.isWall(newX, newY)) {
                const dist = Math.abs(newX - this.game.player.x) +
                    Math.abs(newY - this.game.player.y);

                if (dist < minDistance) {
                    minDistance = dist;
                    bestDir = dir;
                }
            }
        }

        const newX = this.x + this.getDirX(bestDir);
        const newY = this.y + this.getDirY(bestDir);

        if (!this.game.isWall(newX, newY)) {
            this.x = newX;
            this.y = newY;
            this.direction = bestDir;
        }
    }

    moveAwayFromPlayer() {
        const directions = ['up', 'down', 'left', 'right'];
        let bestDir = this.direction;
        let maxDistance = -Infinity;

        for (let dir of directions) {
            const newX = this.x + this.getDirX(dir);
            const newY = this.y + this.getDirY(dir);

            if (!this.game.isWall(newX, newY)) {
                const dist = Math.abs(newX - this.game.player.x) +
                    Math.abs(newY - this.game.player.y);

                if (dist > maxDistance) {
                    maxDistance = dist;
                    bestDir = dir;
                }
            }
        }

        const newX = this.x + this.getDirX(bestDir);
        const newY = this.y + this.getDirY(bestDir);

        if (!this.game.isWall(newX, newY)) {
            this.x = newX;
            this.y = newY;
            this.direction = bestDir;
        }
    }

    getDirX(dir) {
        return dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
    }

    getDirY(dir) {
        return dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
    }

    render(ctx, cellSize) {
        const x = this.x * cellSize + cellSize / 2;
        const y = this.y * cellSize + cellSize / 2;
        const size = cellSize / 2 - 2;

        // Color del fantasma
        if (this.scared) {
            ctx.fillStyle = '#0066ff';
            ctx.strokeStyle = '#00ffff';
        } else {
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
        }

        // Cuerpo
        ctx.fillRect(x - size, y - size, size * 2, size * 2);
        ctx.lineWidth = 2;
        ctx.strokeRect(x - size, y - size, size * 2, size * 2);

        // Ojos blancos
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x - size / 2 - 2, y - size / 2 - 1, 3, 3);
        ctx.fillRect(x + size / 2 - 1, y - size / 2 - 1, 3, 3);

        // Glow
        ctx.strokeStyle = this.scared ? 'rgba(0, 255, 255, 0.5)' : `rgba(255, 255, 255, 0.3)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x - size - 1, y - size - 1, size * 2 + 2, size * 2 + 2);
    }
}

// ==========================================
// INICIALIZAR JUEGO
// ==========================================

window.addEventListener('load', () => {
    const game = new Game();
});
