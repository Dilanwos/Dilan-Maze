/* PAC-MAN GAME - VERSIÓN SIMPLIFICADA Y FUNCIONAL */

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;

        this.gameState = 'menu';
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.hardMode = false;
        this.isPowerUpActive = false;
        this.powerUpTimer = 0;
        this.powerUpDuration = 10;

        this.cellSize = 30;
        this.mapWidth = 21;
        this.mapHeight = 21;

        this.frameCount = 0;
        this.targetFPS = 60;
        this.frameTime = 1000 / this.targetFPS;
        this.lastFrameTime = Date.now();
        this.isGameLoopRunning = false;

        this.keys = {};
        this.nextDirection = null;

        if (this.canvas && this.ctx) {
            this.setupKeyboardControls();
            this.loadHighScores();
            this.attachButtonListeners();
        }
    }

    attachButtonListeners() {
        console.log('[GAME] Adjuntando listeners a botones...');

        // Menú
        const playBtn = document.getElementById('playBtn');
        const hardBtn = document.getElementById('hardModeBtn');
        const scoresBtn = document.getElementById('scoresBtn');

        console.log('[BTN] playBtn:', playBtn ? 'ENCONTRADO' : 'NO ENCONTRADO');
        console.log('[BTN] hardBtn:', hardBtn ? 'ENCONTRADO' : 'NO ENCONTRADO');
        console.log('[BTN] scoresBtn:', scoresBtn ? 'ENCONTRADO' : 'NO ENCONTRADO');

        if (playBtn) {
            playBtn.onclick = () => {
                console.log('[CLICK] JUGAR presionado');
                this.startGame(false);
            };
            console.log('[✓] onclick adjuntado a JUGAR');
        }

        if (hardBtn) {
            hardBtn.onclick = () => {
                console.log('[CLICK] MODO DIFÍCIL presionado');
                this.startGame(true);
            };
            console.log('[✓] onclick adjuntado a MODO DIFÍCIL');
        }

        if (scoresBtn) {
            scoresBtn.onclick = () => {
                console.log('[CLICK] RÉCORDS presionado');
                this.showHighScores();
            };
            console.log('[✓] onclick adjuntado a RÉCORDS');
        }

        // Game Over
        const retryBtn = document.getElementById('retryBtn');
        const menuBtn = document.getElementById('menuBtn');
        if (retryBtn) retryBtn.onclick = () => this.startGame(this.hardMode);
        if (menuBtn) menuBtn.onclick = () => this.goToMenu();

        // Pausa
        const resumeBtn = document.getElementById('resumeBtn');
        const restartFromPauseBtn = document.getElementById('restartFromPauseBtn');
        const menuFromPauseBtn = document.getElementById('menuFromPauseBtn');
        if (resumeBtn) resumeBtn.onclick = () => this.togglePause();
        if (restartFromPauseBtn) restartFromPauseBtn.onclick = () => this.restartGame();
        if (menuFromPauseBtn) menuFromPauseBtn.onclick = () => this.goToMenu();

        // Récords
        const closeScoresBtn = document.getElementById('closeScoresBtn');
        const closeScoresBtn2 = document.getElementById('closeScoresBtn2');
        const clearScoresBtn = document.getElementById('clearScoresBtn');
        const backBtn = document.getElementById('backBtn');

        if (closeScoresBtn) closeScoresBtn.onclick = () => this.hideHighScores();
        if (closeScoresBtn2) closeScoresBtn2.onclick = () => this.hideHighScores();
        if (clearScoresBtn) clearScoresBtn.onclick = () => {
            if (confirm('¿Limpiar todos los récords?')) {
                localStorage.removeItem('pacmanScores');
                this.loadHighScores();
                this.showHighScores();
            }
        };
        if (backBtn) backBtn.onclick = () => this.goToMenu();

        // Móvil
        const pauseBtn = document.getElementById('pauseBtn');
        const restartBtn = document.getElementById('restartBtn');
        if (pauseBtn) pauseBtn.onclick = () => this.togglePause();
        if (restartBtn) restartBtn.onclick = () => this.restartGame();

        const dpadButtons = document.querySelectorAll('.d-btn');
        dpadButtons.forEach(btn => {
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.setPlayerDirection(btn.dataset.dir);
            });
        });

        console.log('[✓] Todos los listeners adjuntados');
    }

    createMap() {
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        this.items = [];
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] === 0) {
                    if ((y === 1 && x === 1) || (y === 1 && x === 19) ||
                        (y === 17 && x === 1) || (y === 17 && x === 19)) {
                        this.items.push({ x, y, type: 'power', eaten: false });
                    } else if (Math.random() < 0.8) {
                        this.items.push({ x, y, type: 'point', eaten: false });
                    }
                }
            }
        }

        for (let i = 0; i < 5; i++) {
            let x, y, valid;
            do {
                x = Math.floor(Math.random() * this.mapWidth);
                y = Math.floor(Math.random() * this.map.length);
                valid = this.map[y] && this.map[y][x] === 0 && !this.items.find(item => item.x === x && item.y === y);
            } while (!valid);
            this.items.push({ x, y, type: 'fruit', eaten: false });
        }
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toUpperCase();
            if (key === ' ') {
                e.preventDefault();
                this.togglePause();
            } else if (key === 'R') {
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

    updatePlayerDirection() {
        if (this.gameState !== 'playing' || !this.player) return;
        if (this.keys['ARROWUP'] || this.keys['W']) this.setPlayerDirection('up');
        else if (this.keys['ARROWDOWN'] || this.keys['S']) this.setPlayerDirection('down');
        else if (this.keys['ARROWLEFT'] || this.keys['A']) this.setPlayerDirection('left');
        else if (this.keys['ARROWRIGHT'] || this.keys['D']) this.setPlayerDirection('right');
    }

    setPlayerDirection(direction) {
        this.nextDirection = direction;
    }

    startGame(hardMode = false) {
        console.log('[GAME] startGame() llamado con hardMode=', hardMode);

        this.hardMode = hardMode;
        this.gameState = 'playing';
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.isPowerUpActive = false;
        this.powerUpTimer = 0;
        this.frameCount = 0;
        this.nextDirection = null;
        this.collisionCheckFrames = 0; // Delay para permitir separación inicial

        this.createMap();
        this.player = new Player(1, 1, this);
        
        // Fantasmas en posiciones separadas y seguras (no adyacentes a Pac-Man)
        this.ghosts = [
            new Ghost(17, 17, '#ff0000', this),      // Abajo-derecha
            new Ghost(17, 3, '#ffb897', this),       // Arriba-derecha
            new Ghost(3, 17, '#00ffff', this),       // Abajo-izquierda
            new Ghost(3, 3, '#ffa500', this)         // Arriba-izquierda
        ];

        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'flex';
        document.getElementById('gameOverScreen').style.display = 'none';
        document.getElementById('pauseScreen').style.display = 'none';
        document.getElementById('scoresModal').style.display = 'none';

        this.updateHUD();

        if (window.audioSystem) {
            audioSystem.playGameStartSound();
        }

        this.lastFrameTime = Date.now();
        this.isGameLoopRunning = true;
        console.log('[GAME] Iniciando game loop...');
        this.gameLoop();
    }

    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            this.isGameLoopRunning = false;
            document.getElementById('pauseScreen').style.display = 'flex';
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            document.getElementById('pauseScreen').style.display = 'none';
            this.lastFrameTime = Date.now();
            this.isGameLoopRunning = true;
            this.gameLoop();
        }
    }

    restartGame() {
        this.startGame(this.hardMode);
    }

    goToMenu() {
        this.gameState = 'menu';
        this.isGameLoopRunning = false;
        document.getElementById('mainMenu').style.display = 'flex';
        document.getElementById('gameContainer').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';
        document.getElementById('pauseScreen').style.display = 'none';
    }

    gameOver(won = false) {
        this.gameState = 'gameOver';
        this.isGameLoopRunning = false;

        if (won) {
            if (window.audioSystem) audioSystem.playVictorySound();
            document.getElementById('gameOverTitle').textContent = '¡GANASTE!';
            this.score += 1000;
        } else {
            if (window.audioSystem) audioSystem.playDeathSound();
            document.getElementById('gameOverTitle').textContent = 'GAME OVER';
        }

        document.getElementById('finalScore').textContent = `Puntuación: ${this.score}`;
        document.getElementById('levelReached').textContent = `Nivel alcanzado: ${this.level}`;
        document.getElementById('gameOverScreen').style.display = 'flex';
        this.saveHighScore();
    }

    isWall(x, y) {
        if (x < 0 || x >= this.mapWidth || y < 0 || y >= this.map.length) return true;
        return this.map[y][x] === 1;
    }

    checkItemCollision(x, y) {
        for (let item of this.items) {
            if (item.x === x && item.y === y && !item.eaten) {
                item.eaten = true;
                if (item.type === 'point') {
                    this.score += 10;
                    if (window.audioSystem) audioSystem.playEatSound();
                } else if (item.type === 'power') {
                    this.score += 50;
                    this.activatePowerUp();
                    if (window.audioSystem) audioSystem.playPowerUpSound();
                } else if (item.type === 'fruit') {
                    this.score += 100;
                    if (window.audioSystem) audioSystem.playPowerUpSound();
                }
                return true;
            }
        }
        return false;
    }

    checkPlayerGhostCollision() {
        // Permite 30 frames (media segundo a 60 FPS) antes de activar colisiones
        if (this.collisionCheckFrames < 30) {
            this.collisionCheckFrames++;
            return;
        }
        
        for (let ghost of this.ghosts) {
            if (this.player.x === ghost.x && this.player.y === ghost.y) {
                if (this.isPowerUpActive) {
                    if (window.audioSystem) audioSystem.playGhostEatenSound();
                    this.score += 200;
                    ghost.reset();
                } else {
                    this.loseLife();
                }
                return;
            }
        }
    }

    loseLife() {
        if (window.audioSystem) audioSystem.playDeathSound();
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

    updateHUD() {
        const scoreEl = document.getElementById('score');
        const levelEl = document.getElementById('level');
        const livesEl = document.getElementById('lives');

        if (scoreEl) scoreEl.textContent = this.score.toString().padStart(6, '0');
        if (levelEl) levelEl.textContent = this.level;
        if (livesEl) {
            let livesDisplay = '';
            for (let i = 0; i < this.lives; i++) livesDisplay += '●';
            livesEl.textContent = livesDisplay || 'MUERTO';
        }
    }

    loadHighScores() {
        const stored = localStorage.getItem('pacmanScores');
        this.highScores = stored ? JSON.parse(stored) : [];
    }

    saveHighScore() {
        this.highScores.push({ score: this.score, level: this.level, date: new Date().toLocaleDateString() });
        this.highScores.sort((a, b) => b.score - a.score);
        this.highScores = this.highScores.slice(0, 10);
        localStorage.setItem('pacmanScores', JSON.stringify(this.highScores));
    }

    showHighScores() {
        console.log('[SCORES] Mostrando tabla de récords');
        document.getElementById('scoresModal').style.display = 'flex';
        this.updateHighScoresTable();
    }

    hideHighScores() {
        document.getElementById('scoresModal').style.display = 'none';
    }

    updateHighScoresTable() {
        const tbody = document.getElementById('scoresTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';
        if (this.highScores.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #999;">Sin récords aún</td></tr>';
            return;
        }

        this.highScores.forEach((score, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${index + 1}</td><td>${score.score.toString().padStart(6, '0')}</td><td>${score.level}</td><td>${score.date}</td>`;
            tbody.appendChild(row);
        });
    }

    render() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderMap();
        this.renderItems();
        this.player.render(this.ctx, this.cellSize);
        this.ghosts.forEach(g => g.render(this.ctx, this.cellSize));
    }

    renderMap() {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] === 1) {
                    this.ctx.fillStyle = '#0066ff';
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
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

    gameLoop = () => {
        if (!this.isGameLoopRunning) return;

        // SIEMPRE renderizar (cada frame del navegador = 60 FPS)
        requestAnimationFrame(this.gameLoop);

        const now = Date.now();
        const delta = now - this.lastFrameTime;

        // Solo actualizar lógica cada frameTime ms
        // Pero SIEMPRE renderizar
        if (delta >= this.frameTime) {
            this.frameCount++;
            this.lastFrameTime = now - (delta % this.frameTime);

            if (this.isPowerUpActive) {
                this.powerUpTimer -= delta / 1000;
                if (this.powerUpTimer <= 0) {
                    this.isPowerUpActive = false;
                    this.ghosts.forEach(g => g.setScared(false));
                }
            }

            this.player.update(this.nextDirection);
            this.checkItemCollision(this.player.x, this.player.y);
            this.ghosts.forEach(g => g.update());  // SIEMPRE actualizar
            this.checkPlayerGhostCollision();

            const allEaten = this.items.every(item => item.eaten);
            if (allEaten && this.gameState === 'playing') {
                this.level++;
                this.startGame(this.hardMode);
                return;
            }
        }

        // SIEMPRE renderizar cada frame del navegador
        this.render();
        this.updateHUD();
    }
}

class Player {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.mouthOpen = true;
        this.mouthFrame = 0;
        this.direction = 'right';
        this.nextDirection = 'right';
        this.moveCounter = 0;      // Contador para controlar velocidad
        this.moveSpeed = 5;        // Se mueve cada 5 frames (MÁS LENTO)
    }

    update(nextDir) {
        if (nextDir) this.nextDirection = nextDir;
        
        // Solo se mueve cada moveSpeed frames
        this.moveCounter++;
        if (this.moveCounter < this.moveSpeed) {
            this.mouthFrame++;
            if (this.mouthFrame > 10) {
                this.mouthOpen = !this.mouthOpen;
                this.mouthFrame = 0;
            }
            return;
        }
        this.moveCounter = 0;

        const newX = this.x + this.getDirectionX(this.nextDirection);
        const newY = this.y + this.getDirectionY(this.nextDirection);
        if (!this.game.isWall(newX, newY)) {
            this.x = newX;
            this.y = newY;
            this.direction = this.nextDirection;
        } else {
            const currX = this.x + this.getDirectionX(this.direction);
            const currY = this.y + this.getDirectionY(this.direction);
            if (!this.game.isWall(currX, currY)) {
                this.x = currX;
                this.y = currY;
            }
        }
        
        this.mouthFrame++;
        if (this.mouthFrame > 10) {
            this.mouthOpen = !this.mouthOpen;
            this.mouthFrame = 0;
        }
    }

    getDirectionX(dir) { return dir === 'left' ? -1 : dir === 'right' ? 1 : 0; }
    getDirectionY(dir) { return dir === 'up' ? -1 : dir === 'down' ? 1 : 0; }

    render(ctx, cellSize) {
        const x = this.x * cellSize + cellSize / 2;
        const y = this.y * cellSize + cellSize / 2;
        const radius = cellSize / 2 - 2;
        ctx.fillStyle = '#ffff00';
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
        ctx.fillStyle = '#0066ff';
        const eyeOffset = radius / 3;
        ctx.fillRect(x - eyeOffset - 1, y - eyeOffset - 1, 2, 2);
        ctx.fillRect(x + eyeOffset - 1, y - eyeOffset - 1, 2, 2);
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
        ctx.stroke();
    }
}

class Ghost {
    constructor(x, y, color, game) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.game = game;
        this.startX = x;
        this.startY = y;
        this.scared = false;
        this.moveCounter = 0;
        this.direction = 'left';
        this.preferredDirection = 'left';
        
        // Velocidad basada en nivel y dificultad
        this.moveInterval = this.calculateMoveInterval(game.level, game.hardMode);
        
        // Para detectar si está atrapado
        this.lastPositions = [];
        this.stuckCounter = 0;
    }

    calculateMoveInterval(level, hardMode) {
        const baseIntervals = [3, 2, 2, 1, 1, 1];
        let interval = baseIntervals[Math.min(level - 1, 5)];
        if (hardMode) {
            interval = Math.max(1, interval - 1);
        }
        return interval;
    }

    // Calcular multiplicador de velocidad según distancia al jugador
    getSpeedMultiplier() {
        const dist = Math.abs(this.x - this.game.player.x) + Math.abs(this.y - this.game.player.y);
        
        if (dist < 5) {
            return 0.4;  // Muy cerca: 2.5x más rápido (máxima presión)
        } else if (dist < 8) {
            return 0.5;  // Cerca: 2x más rápido
        } else if (dist < 12) {
            return 0.67;  // Moderado: 1.5x más rápido
        } else if (dist < 15) {
            return 0.85;  // Un poco lejos: 1.2x más rápido
        } else {
            return 1.0;   // Lejos: velocidad normal
        }
    }

    // Detectar si está atrapado (no se ha movido en varios frames)
    checkIfStuck() {
        this.lastPositions.push({ x: this.x, y: this.y });
        if (this.lastPositions.length > 8) {
            this.lastPositions.shift();
        }

        // Si todos los últimos 8 puntos son iguales, está atrapado
        if (this.lastPositions.length >= 8) {
            const allSame = this.lastPositions.every(p => 
                p.x === this.lastPositions[0].x && p.y === this.lastPositions[0].y
            );
            
            if (allSame) {
                this.stuckCounter++;
                if (this.stuckCounter > 3) {
                    // Forzar exploración: cambiar a dirección aleatoria diferente
                    const directions = ['up', 'down', 'left', 'right'];
                    const validDirs = directions.filter(dir => {
                        const newX = this.x + this.getDirX(dir);
                        const newY = this.y + this.getDirY(dir);
                        return this.isValidMove(newX, newY);
                    });
                    
                    if (validDirs.length > 0) {
                        // Preferir dirección diferente a la actual
                        const newDirs = validDirs.filter(d => d !== this.preferredDirection);
                        const randomDir = newDirs.length > 0 ? 
                            newDirs[Math.floor(Math.random() * newDirs.length)] :
                            validDirs[Math.floor(Math.random() * validDirs.length)];
                        
                        this.preferredDirection = randomDir;
                        this.stuckCounter = 0;
                    }
                }
            } else {
                this.stuckCounter = 0;
            }
        }
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
        this.scared = false;
        this.moveCounter = 0;
        this.preferredDirection = 'left';
        this.lastPositions = [];
        this.stuckCounter = 0;
    }

    setScared(scared) {
        this.scared = scared;
    }

    update() {
        // Detectar si está atrapado y forzar exploración si es necesario
        this.checkIfStuck();
        
        // Se mueve con velocidad dinámica según distancia al jugador
        this.moveCounter++;
        const speedMultiplier = this.getSpeedMultiplier();
        const adjustedInterval = Math.ceil(this.moveInterval * speedMultiplier);
        
        if (this.moveCounter >= adjustedInterval) {
            this.moveCounter = 0;
            this.move();
        }
    }

    move() {
        if (this.scared) this.moveAwayFromPlayer();
        else this.moveTowardPlayer();
    }

    isValidMove(x, y) {
        if (x < 0 || x >= this.game.mapWidth || y < 0 || y >= this.game.mapHeight) {
            return false;
        }
        return !this.game.isWall(x, y);
    }

    getOppositeDirection(dir) {
        const opposites = { 'up': 'down', 'down': 'up', 'left': 'right', 'right': 'left' };
        return opposites[dir];
    }

    moveTowardPlayer() {
        const directions = ['up', 'down', 'left', 'right'];
        let bestDir = this.preferredDirection;
        let bestScore = -Infinity;
        let validMovesExist = false;

        for (let dir of directions) {
            const newX = this.x + this.getDirX(dir);
            const newY = this.y + this.getDirY(dir);
            
            if (this.isValidMove(newX, newY)) {
                validMovesExist = true;
                
                // Calcular distancia Manhattan hacia el jugador
                const dist = Math.abs(newX - this.game.player.x) + Math.abs(newY - this.game.player.y);
                
                // Score: minimizar distancia (coeficiente 2 para que importancia más)
                let score = -dist * 2;
                
                // Bonus MÁS SUAVE por continuar dirección (permite exploración)
                if (dir === this.preferredDirection) {
                    score += 2;
                }
                
                // Penalty por revertir dirección
                if (dir === this.getOppositeDirection(this.preferredDirection)) {
                    score -= 5;
                }
                
                if (score > bestScore) {
                    bestScore = score;
                    bestDir = dir;
                }
            }
        }

        if (!validMovesExist) {
            return;
        }

        const newX = this.x + this.getDirX(bestDir);
        const newY = this.y + this.getDirY(bestDir);
        
        if (this.isValidMove(newX, newY)) {
            this.x = newX;
            this.y = newY;
            this.direction = bestDir;
            this.preferredDirection = bestDir;
        }
    }

    moveAwayFromPlayer() {
        const directions = ['up', 'down', 'left', 'right'];
        let bestDir = this.preferredDirection;
        let bestScore = -Infinity;
        let validMovesExist = false;

        for (let dir of directions) {
            const newX = this.x + this.getDirX(dir);
            const newY = this.y + this.getDirY(dir);
            
            if (this.isValidMove(newX, newY)) {
                validMovesExist = true;
                
                const dist = Math.abs(newX - this.game.player.x) + Math.abs(newY - this.game.player.y);
                
                // Score: maximizar distancia (huir)
                let score = dist * 1.5;
                
                if (dir === this.preferredDirection) {
                    score += 2;
                }
                
                if (dir === this.getOppositeDirection(this.preferredDirection)) {
                    score -= 3;
                }
                
                if (score > bestScore) {
                    bestScore = score;
                    bestDir = dir;
                }
            }
        }

        if (!validMovesExist) {
            return;
        }

        const newX = this.x + this.getDirX(bestDir);
        const newY = this.y + this.getDirY(bestDir);
        
        if (this.isValidMove(newX, newY)) {
            this.x = newX;
            this.y = newY;
            this.direction = bestDir;
            this.preferredDirection = bestDir;
        }
    }

    getDirX(dir) { return dir === 'left' ? -1 : dir === 'right' ? 1 : 0; }
    getDirY(dir) { return dir === 'up' ? -1 : dir === 'down' ? 1 : 0; }

    render(ctx, cellSize) {
        const x = this.x * cellSize + cellSize / 2;
        const y = this.y * cellSize + cellSize / 2;
        const size = cellSize / 2 - 2;
        
        if (this.scared) {
            ctx.fillStyle = '#0066ff';
        } else {
            ctx.fillStyle = this.color;
        }
        
        // Dibujar fantasma como cuadrado simple (sin strokes dobles)
        ctx.fillRect(x - size, y - size, size * 2, size * 2);
        
        // Dibujar ojos blancos simples
        ctx.fillStyle = '#ffffff';
        const eyeSize = 2;
        ctx.fillRect(x - size / 2 - eyeSize, y - size / 2 - eyeSize, eyeSize * 1.5, eyeSize * 1.5);
        ctx.fillRect(x + size / 2 - eyeSize, y - size / 2 - eyeSize, eyeSize * 1.5, eyeSize * 1.5);
    }
}

// ==================== INICIALIZACIÓN ====================

let game;

window.addEventListener('load', () => {
    console.log('[INIT] window.onload disparado');
    game = new Game();
    console.log('[INIT] Juego instanciado correctamente');
});
