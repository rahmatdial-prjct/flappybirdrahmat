/* ===================================
   FLAPPY BIRD - GAME LOGIC
   Complete game with optimizations, sounds, and skins
   =================================== */

// ============================================
// GAME CONFIGURATION & CONSTANTS
// ============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// DOM Elements
const scoreDisplay = document.getElementById('scoreDisplay');
const startOverlay = document.getElementById('startOverlay');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const skinsOverlay = document.getElementById('skinsOverlay');
const finalScore = document.getElementById('finalScore');
const highScoreDisplay = document.getElementById('highScoreDisplay');
const unlockMessage = document.getElementById('unlockMessage');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const flapButton = document.getElementById('flapButton');
const skinsButton = document.getElementById('skinsButton');
const skinsButtonGameOver = document.getElementById('skinsButtonGameOver');
const closeSkins = document.getElementById('closeSkins');
const soundToggle = document.getElementById('soundToggle');
const skinsContainer = document.getElementById('skinsContainer');

// Audio Elements
const flapSound = document.getElementById('flapSound');
const scoreSound = document.getElementById('scoreSound');
const hitSound = document.getElementById('hitSound');
const bgMusic = document.getElementById('bgMusic');

// Canvas dimensions - will be set dynamically
let GAME_WIDTH = 400;
let GAME_HEIGHT = 640;
let scale = 1;

// Game Physics Constants
const GRAVITY = 0.6;
const JUMP_VELOCITY = -10;
const PIPE_SPEED = 3;
const PIPE_WIDTH = 52;
const PIPE_GAP = 140;
const GROUND_HEIGHT = 80;
const PIPE_SPAWN_INTERVAL = 2000; // milliseconds
const INITIAL_PIPE_DELAY = 1500;

// Colors
const COLORS = {
    pipe: '#74bf2e',
    pipeBorder: '#55802d',
    ground: '#ded895',
    groundBorder: '#55802d'
};

// ============================================
// GAME STATE
// ============================================

let gameRunning = false;
let gameOver = true;
let score = 0;
let highScore = 0;
let bird = null;
let pipes = [];
let animationFrameId = null;
let pipeSpawnTimer = null;
let soundEnabled = true;
let currentSkin = 'classic';
let previousScreen = 'start'; // Track which screen we came from when opening skins menu

// ============================================
// SKINS SYSTEM
// ============================================

const SKINS = {
    classic: {
        name: 'Classic',
        color: '#ffd800',
        unlockScore: 0,
        unlocked: true,
        beak: '#f00',
        eye: '#000'
    },
    red: {
        name: 'Red Bird',
        color: '#ff4444',
        unlockScore: 5,
        unlocked: false,
        beak: '#8b0000',
        eye: '#fff'
    },
    blue: {
        name: 'Blue Bird',
        color: '#4444ff',
        unlockScore: 10,
        unlocked: false,
        beak: '#000080',
        eye: '#fff'
    },
    green: {
        name: 'Green Bird',
        color: '#44ff44',
        unlockScore: 15,
        unlocked: false,
        beak: '#006400',
        eye: '#000'
    },
    purple: {
        name: 'Purple Bird',
        color: '#9944ff',
        unlockScore: 20,
        unlocked: false,
        beak: '#4b0082',
        eye: '#fff'
    },
    gold: {
        name: 'Golden Bird',
        color: '#ffd700',
        unlockScore: 30,
        unlocked: false,
        beak: '#ff8c00',
        eye: '#000'
    },
    rainbow: {
        name: 'Rainbow Bird',
        color: '#ff00ff',
        unlockScore: 50,
        unlocked: false,
        beak: '#00ffff',
        eye: '#ffff00',
        special: true
    }
};

// ============================================
// BIRD OBJECT
// ============================================

function createBird() {
    const skin = SKINS[currentSkin];
    return {
        x: 60,
        y: GAME_HEIGHT / 2,
        radius: 12,
        velocity: 0,
        rotation: 0,
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            // Rotate bird based on velocity for more realistic animation
            const maxRotation = Math.PI / 4;
            this.rotation = Math.max(-maxRotation, Math.min(maxRotation, this.velocity * 0.05));
            ctx.rotate(this.rotation);
            
            // Draw bird body
            if (skin.special) {
                // Rainbow effect for special skin
                const gradient = ctx.createLinearGradient(-this.radius, -this.radius, this.radius, this.radius);
                gradient.addColorStop(0, '#ff0000');
                gradient.addColorStop(0.2, '#ff7f00');
                gradient.addColorStop(0.4, '#ffff00');
                gradient.addColorStop(0.6, '#00ff00');
                gradient.addColorStop(0.8, '#0000ff');
                gradient.addColorStop(1, '#8b00ff');
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = skin.color;
            }
            
            ctx.fillRect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);
            
            // Draw beak
            ctx.fillStyle = skin.beak;
            ctx.fillRect(this.radius, -4, 6, 4);
            
            // Draw eye
            ctx.fillStyle = skin.eye;
            ctx.fillRect(4, -6, 4, 4);
            
            ctx.restore();
        },
        
        update() {
            this.velocity += GRAVITY;
            this.y += this.velocity;
            
            // Clamp velocity to prevent extreme speeds
            this.velocity = Math.min(this.velocity, 15);
        },
        
        flap() {
            if (gameRunning) {
                this.velocity = JUMP_VELOCITY;
                playSound(flapSound);
            }
        }
    };
}

// ============================================
// PIPE OBJECT
// ============================================

function createPipe(gapY) {
    return {
        x: GAME_WIDTH,
        width: PIPE_WIDTH,
        gap: PIPE_GAP,
        gapY: gapY,
        topHeight: gapY - PIPE_GAP / 2,
        bottomY: gapY + PIPE_GAP / 2,
        bottomHeight: GAME_HEIGHT - (gapY + PIPE_GAP / 2) - GROUND_HEIGHT,
        scored: false,
        
        draw() {
            // Draw top pipe
            this.drawSinglePipe(this.x, 0, this.topHeight, true);
            // Draw bottom pipe
            this.drawSinglePipe(this.x, this.bottomY, this.bottomHeight, false);
        },
        
        drawSinglePipe(px, py, h, isTop) {
            // Pipe body
            ctx.fillStyle = COLORS.pipe;
            ctx.fillRect(px, py, this.width, h);
            
            // Pipe border
            ctx.strokeStyle = COLORS.pipeBorder;
            ctx.lineWidth = 4;
            ctx.strokeRect(px, py, this.width, h);
            
            // Pipe cap
            const capHeight = 30;
            const capWidth = this.width + 12;
            const capX = px - 6;
            
            if (isTop) {
                const capY = py + h - capHeight;
                ctx.fillRect(capX, capY, capWidth, capHeight);
                ctx.strokeRect(capX, capY, capWidth, capHeight);
            } else {
                ctx.fillRect(capX, py, capWidth, capHeight);
                ctx.strokeRect(capX, py, capWidth, capHeight);
            }
        },
        
        update() {
            this.x -= PIPE_SPEED;
        }
    };
}

// ============================================
// GAME FUNCTIONS
// ============================================

function initGame() {
    bird = createBird();
    pipes = [];
    score = 0;
    scoreDisplay.textContent = 0;
    gameOver = false;
    gameRunning = false;
    
    // Load saved data
    loadGameData();
    
    startOverlay.classList.remove('hidden');
    gameOverOverlay.classList.add('hidden');
    skinsOverlay.classList.add('hidden');
    
    // Stop background music
    bgMusic.pause();
    bgMusic.currentTime = 0;
    
    draw();
}

function startGame() {
    // Only start if game is not already running
    if (gameRunning) return;

    gameRunning = true;
    gameOver = false;
    startOverlay.classList.add('hidden');

    // Start background music
    playSound(bgMusic);

    // Schedule first pipe
    pipeSpawnTimer = setTimeout(spawnPipe, INITIAL_PIPE_DELAY);

    // Start game loop
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    gameLoop();
}

function endGame() {
    gameRunning = false;
    gameOver = true;
    
    // Cancel animation and timers
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    if (pipeSpawnTimer) {
        clearTimeout(pipeSpawnTimer);
    }
    
    // Play hit sound
    playSound(hitSound);
    
    // Stop background music
    bgMusic.pause();
    
    // Update high score
    if (score > highScore) {
        highScore = score;
    }
    
    // Check for newly unlocked skins
    const newlyUnlocked = checkUnlockedSkins();
    
    // Save game data
    saveGameData();
    
    // Update UI
    finalScore.textContent = score;
    highScoreDisplay.textContent = `BEST: ${highScore}`;
    
    if (newlyUnlocked.length > 0) {
        unlockMessage.textContent = `🎉 NEW SKIN UNLOCKED: ${newlyUnlocked.join(', ')}!`;
        unlockMessage.classList.remove('hidden');
    } else {
        unlockMessage.classList.add('hidden');
    }
    
    gameOverOverlay.classList.remove('hidden');
}

function spawnPipe() {
    if (!gameRunning) return;
    
    // Random gap position
    const minGapY = 150;
    const maxGapY = GAME_HEIGHT - GROUND_HEIGHT - 150;
    const gapY = Math.random() * (maxGapY - minGapY) + minGapY;
    
    pipes.push(createPipe(gapY));
    
    // Schedule next pipe
    pipeSpawnTimer = setTimeout(spawnPipe, PIPE_SPAWN_INTERVAL);
}

function checkCollisions() {
    // Check ground and ceiling collision
    if (bird.y + bird.radius >= GAME_HEIGHT - GROUND_HEIGHT || bird.y - bird.radius <= 0) {
        return true;
    }
    
    // Check pipe collision
    for (const pipe of pipes) {
        // Horizontal overlap check
        if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipe.width) {
            // Vertical collision check
            const hitTop = bird.y - bird.radius < pipe.topHeight;
            const hitBottom = bird.y + bird.radius > pipe.bottomY;
            
            if (hitTop || hitBottom) {
                return true;
            }
        }
    }
    
    return false;
}

function updateScoreAndPipes() {
    // Update pipes and check for scoring
    for (let i = pipes.length - 1; i >= 0; i--) {
        const pipe = pipes[i];
        
        // Score when bird passes pipe
        if (!pipe.scored && pipe.x + pipe.width < bird.x) {
            score++;
            scoreDisplay.textContent = score;
            pipe.scored = true;
            playSound(scoreSound);
        }
        
        // Remove off-screen pipes
        if (pipe.x + pipe.width < 0) {
            pipes.splice(i, 1);
        }
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Draw pipes
    for (const pipe of pipes) {
        pipe.draw();
    }
    
    // Draw bird
    bird.draw();
}

function gameLoop() {
    if (!gameRunning) return;
    
    // Update game objects
    bird.update();
    for (const pipe of pipes) {
        pipe.update();
    }
    
    // Check collisions
    if (checkCollisions()) {
        endGame();
        return;
    }
    
    // Update score and clean up pipes
    updateScoreAndPipes();
    
    // Render
    draw();
    
    // Continue loop
    animationFrameId = requestAnimationFrame(gameLoop);
}

// ============================================
// SOUND FUNCTIONS
// ============================================

function playSound(audio) {
    if (!soundEnabled || !audio) return;
    
    try {
        audio.currentTime = 0;
        audio.play().catch(err => {
            console.log('Audio play failed:', err);
        });
    } catch (err) {
        console.log('Audio error:', err);
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';
    
    if (!soundEnabled) {
        bgMusic.pause();
    } else if (gameRunning) {
        playSound(bgMusic);
    }
    
    saveGameData();
}

// ============================================
// SKINS SYSTEM FUNCTIONS
// ============================================

function checkUnlockedSkins() {
    const newlyUnlocked = [];
    
    for (const [key, skin] of Object.entries(SKINS)) {
        if (!skin.unlocked && score >= skin.unlockScore) {
            skin.unlocked = true;
            newlyUnlocked.push(skin.name);
        }
    }
    
    return newlyUnlocked;
}

function renderSkinsMenu() {
    skinsContainer.innerHTML = '';
    
    for (const [key, skin] of Object.entries(SKINS)) {
        const skinCard = document.createElement('div');
        skinCard.className = 'skin-card';
        
        if (currentSkin === key) {
            skinCard.classList.add('selected');
        }
        
        if (!skin.unlocked) {
            skinCard.classList.add('locked');
        }
        
        // Create canvas for bird preview
        const previewCanvas = document.createElement('canvas');
        previewCanvas.className = 'skin-preview';
        previewCanvas.width = 40;
        previewCanvas.height = 40;
        const previewCtx = previewCanvas.getContext('2d');
        
        // Draw bird preview
        previewCtx.fillStyle = skin.color;
        if (skin.special) {
            const gradient = previewCtx.createLinearGradient(0, 0, 40, 40);
            gradient.addColorStop(0, '#ff0000');
            gradient.addColorStop(0.33, '#00ff00');
            gradient.addColorStop(0.66, '#0000ff');
            gradient.addColorStop(1, '#ff00ff');
            previewCtx.fillStyle = gradient;
        }
        previewCtx.fillRect(8, 8, 24, 24);
        previewCtx.fillStyle = skin.beak;
        previewCtx.fillRect(32, 16, 4, 4);
        previewCtx.fillStyle = skin.eye;
        previewCtx.fillRect(20, 12, 4, 4);
        
        const skinName = document.createElement('div');
        skinName.className = 'skin-name';
        skinName.textContent = skin.name;
        
        const skinUnlock = document.createElement('div');
        skinUnlock.className = 'skin-unlock';
        
        if (skin.unlocked) {
            skinUnlock.textContent = currentSkin === key ? '✓ SELECTED' : 'UNLOCKED';
        } else {
            skinUnlock.textContent = `Unlock at ${skin.unlockScore}`;
            const lockIcon = document.createElement('div');
            lockIcon.className = 'lock-icon';
            lockIcon.textContent = '🔒';
            skinCard.appendChild(lockIcon);
        }
        
        skinCard.appendChild(previewCanvas);
        skinCard.appendChild(skinName);
        skinCard.appendChild(skinUnlock);
        
        // Click handler
        if (skin.unlocked) {
            skinCard.addEventListener('click', () => {
                currentSkin = key;
                saveGameData();
                renderSkinsMenu();
                if (bird) {
                    bird = createBird();
                    draw();
                }
            });
        }
        
        skinsContainer.appendChild(skinCard);
    }
}

function showSkinsMenu() {
    renderSkinsMenu();

    // Track which screen we're coming from
    if (!startOverlay.classList.contains('hidden')) {
        previousScreen = 'start';
    } else if (!gameOverOverlay.classList.contains('hidden')) {
        previousScreen = 'gameOver';
    }

    // Hide all overlays and show skins menu
    startOverlay.classList.add('hidden');
    gameOverOverlay.classList.add('hidden');
    skinsOverlay.classList.remove('hidden');
}

function hideSkinsMenu() {
    skinsOverlay.classList.add('hidden');

    // Return to the screen we came from
    if (previousScreen === 'gameOver') {
        gameOverOverlay.classList.remove('hidden');
        startOverlay.classList.add('hidden');
    } else {
        // Default to start screen
        startOverlay.classList.remove('hidden');
        gameOverOverlay.classList.add('hidden');
    }
}

// ============================================
// LOCAL STORAGE FUNCTIONS
// ============================================

function saveGameData() {
    const data = {
        highScore: highScore,
        soundEnabled: soundEnabled,
        currentSkin: currentSkin,
        unlockedSkins: {}
    };
    
    for (const [key, skin] of Object.entries(SKINS)) {
        data.unlockedSkins[key] = skin.unlocked;
    }
    
    localStorage.setItem('flappyBirdData', JSON.stringify(data));
}

function loadGameData() {
    try {
        const data = JSON.parse(localStorage.getItem('flappyBirdData'));
        
        if (data) {
            highScore = data.highScore || 0;
            soundEnabled = data.soundEnabled !== undefined ? data.soundEnabled : true;
            currentSkin = data.currentSkin || 'classic';
            
            if (data.unlockedSkins) {
                for (const [key, unlocked] of Object.entries(data.unlockedSkins)) {
                    if (SKINS[key]) {
                        SKINS[key].unlocked = unlocked;
                    }
                }
            }
            
            soundToggle.textContent = soundEnabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';
        }
    } catch (err) {
        console.log('Failed to load game data:', err);
    }
}

// ============================================
// EVENT HANDLERS
// ============================================

function handleFlap() {
    if (gameOver && !skinsOverlay.classList.contains('hidden')) {
        return; // Don't flap when skins menu is open
    }
    
    if (gameOver) {
        startGame();
    } else if (gameRunning) {
        bird.flap();
    }
}

// Button event listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', initGame);
flapButton.addEventListener('click', handleFlap);
skinsButton.addEventListener('click', showSkinsMenu);
skinsButtonGameOver.addEventListener('click', showSkinsMenu);
closeSkins.addEventListener('click', hideSkinsMenu);
soundToggle.addEventListener('click', toggleSound);

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        handleFlap();
    }
});

// Canvas click
canvas.addEventListener('click', handleFlap);

// ============================================
// RESPONSIVE CANVAS SIZING
// ============================================

function resizeCanvas() {
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Set canvas internal resolution (always 400x640 for consistent game logic)
    canvas.width = 400;
    canvas.height = 640;

    // Canvas will automatically scale to fit container via CSS (width: 100%, height: 100%)
    // The aspect-ratio in CSS ensures proper proportions

    // Update game dimensions (keep constant for game logic)
    GAME_WIDTH = 400;
    GAME_HEIGHT = 640;

    // Calculate scale for reference (not currently used but available for future features)
    scale = Math.min(containerWidth / 400, containerHeight / 640);

    // Redraw if game is initialized
    if (bird) {
        draw();
    }
}

// ============================================
// INITIALIZATION
// ============================================

window.addEventListener('load', () => {
    resizeCanvas();
    initGame();
});

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
});

