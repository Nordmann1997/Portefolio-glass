function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}




class Ball {
    constructor(x, y, vx, vy, radius, imageUrl, productUrl) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.imageUrl = imageUrl;
        this.mass = radius;
        this.productUrl = productUrl;
        this.isDragging = false;
        this.movedEnough = false;

        // Create div for the ball
        this.div = document.createElement('div');
        this.div.classList.add('ball');
        this.div.style.backgroundImage = `url('${imageUrl}')`;
        document.getElementById('gameContainer').appendChild(this.div);

        // Add event listeners for dragging
        this.div.addEventListener('pointerdown', (e) => this.startDrag(e));
        document.addEventListener('pointermove', (e) => this.drag(e));
        document.addEventListener('pointerup', () => this.stopDrag());

        // Click event - Initially added
        this.div.addEventListener('click', this.handleClick.bind(this));
    }

    startDrag(e) {
        this.isDragging = true;
        this.movedEnough = false;
        this.vx = 0;
        this.vy = 0;

        // Store initial pointer position
        this.startX = e.clientX;
        this.startY = e.clientY;

        this.offsetX = e.clientX - this.x;
        this.offsetY = e.clientY - this.y;

        // Temporarily disable click to prevent unwanted navigation
        this.div.removeEventListener('click', this.handleClick);
    }

    drag(e) {
        if (this.isDragging) {
            let dx = e.clientX - this.startX;
            let dy = e.clientY - this.startY;

            // If movement is significant, consider it a drag
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                this.movedEnough = true;
            }

            this.x = e.clientX - this.offsetX;
            this.y = e.clientY - this.offsetY;

            this.div.style.left = `${this.x - this.radius}px`;
            this.div.style.top = `${this.y - this.radius}px`;
        }

        repositionBalls();
    }

    stopDrag() {
        if (this.isDragging) {
            this.isDragging = false;

            // Re-enable click event after a short delay if it wasn't a drag
            setTimeout(() => {
                if (!this.movedEnough) {
                    this.div.addEventListener('click', this.handleClick.bind(this));
                }
            }, 100); // Small delay to prevent accidental clicks
        }
    }

    handleClick() {
        if (!this.isDragging && !this.movedEnough) {
            window.location.href = this.productUrl;
        }
    }

    update(secondsPassed) {
        if (!this.isDragging) {
            this.vy += 9,81 * secondsPassed; // Apply gravity
            this.x += this.vx * secondsPassed;
            this.y += this.vy * secondsPassed;
        }

        this.div.style.left = `${this.x - this.radius}px`;
        this.div.style.top = `${this.y - this.radius}px`;
    }
}

// Funksjon for å oppdatere ballstørrelsen basert på vinduets størrelse
function updateBallSizes() {
    let ballSizeVW = 15; // Størrelse i vw (f.eks. 15vw)
    let ballSize = (ballSizeVW / 100) * window.innerWidth; // Konverterer vw til piksler

    // Ensure the ball size does not exceed 163px
    if (ballSize > 163) {
        ballSize = 163;
    }

    let newRadius = ballSize / 2;

    gameObjects.forEach(ball => {
        ball.radius = newRadius;
        ball.div.style.width = `${ballSize}px`;
        ball.div.style.height = `${ballSize}px`;
    });
    
    // Etter at størrelsen er oppdatert, sjekk og juster posisjonene slik at de ikke overlapper.
    repositionBalls();
}

// Funksjon for å sjekke om noen baller overlapper og justere posisjonene deres
function repositionBalls() {
    // Enkel iterasjon: for hver ball, sjekk med hver annen ball.
    for (let i = 0; i < gameObjects.length; i++) {
        for (let j = i + 1; j < gameObjects.length; j++) {
            let ball1 = gameObjects[i];
            let ball2 = gameObjects[j];

            if (rectIntersect(ball1.x, ball1.y, ball1.radius, ball2.x, ball2.y, ball2.radius)) {
                // Beregn avstanden og overflødig overlapp
                let dx = ball2.x - ball1.x;
                let dy = ball2.y - ball1.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // Unngå deling med 0 hvis ballene er nøyaktig på samme sted
                if (distance === 0) {
                    dx = Math.random() - 0.5;
                    dy = Math.random() - 0.5;
                    distance = Math.sqrt(dx * dx + dy * dy);
                }

                // Hvor mye overlapper de?
                let overlap = ball1.radius + ball2.radius - distance;

                // Normaliser kollisjonsvektoren
                let nx = dx / distance;
                let ny = dy / distance;

                // Flytt hver ball halvparten av overlappen bort fra hverandre
                ball1.x -= nx * overlap / 2;
                ball1.y -= ny * overlap / 2;
                ball2.x += nx * overlap / 2;
                ball2.y += ny * overlap / 2;
            }
        }
    }
}

// Kollisjonsdeteksjon mellom to baller (samme som før)
function rectIntersect(x1, y1, r1, x2, y2, r2) {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance < r1 + r2;
}

// Legg til denne linjen for å oppdatere ballstørrelsen ved vindusendring:
window.addEventListener('resize', updateBallSizes);

function createWorld() {
    let ballSizeVW = 15; // Størrelse i vw (f.eks. 15vw)
    let ballSize = (ballSizeVW / 100) * window.innerWidth; // Konverter til piksler

    gameObjects = [
        new Ball(100, 50, 50, 0, ballSize / 2, 'pictures/index/ball/benk.jpg', 'benk.html'),
        new Ball(400, 100, -50, 0, ballSize / 2, 'pictures/index/ball/dorhondtak.jpg', 'doorhandle.html'),
        new Ball(700, 150, 0, 50, ballSize / 2, 'pictures/index/ball/ludo.jpg', 'ludo.html'),
        new Ball(900, 200, 30, 30, ballSize / 2, 'pictures/index/ball/front_without.jpg', 'woody.html'),
        new Ball(1100, 250, -30, 40, ballSize / 2, 'pictures/index/ball/oval.jpg', 'oval.html'),
        new Ball(1300, 300, 20, -20, ballSize / 2, 'pictures/index/ball/stolen.jpg', 'stolen.html') // Ny ball
    ];

    // Adjust ball sizes immediately after creation
    updateBallSizes();
}

// Kollisjonsdeteksjon mellom to baller
function rectIntersect(x1, y1, r1, x2, y2, r2) {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance < r1 + r2;
}

const ballBounceFactor = 0.7; // 1.0 = perfect bounce, <1.0 = energy loss

function detectCollisions() {
    let obj1, obj2;
    for (let i = 0; i < gameObjects.length; i++) {
        obj1 = gameObjects[i];
        for (let j = i + 1; j < gameObjects.length; j++) {
            obj2 = gameObjects[j];
            if (rectIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                let vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
                let distance = Math.sqrt(vCollision.x ** 2 + vCollision.y ** 2);
                let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};

                let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
                let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

                if (speed < 0) continue;

                let impulse = (2 * speed) / (obj1.mass + obj2.mass);
                obj1.vx -= impulse * obj2.mass * vCollisionNorm.x * ballBounceFactor;
                obj1.vy -= impulse * obj2.mass * vCollisionNorm.y * ballBounceFactor;
                obj2.vx += impulse * obj1.mass * vCollisionNorm.x * ballBounceFactor;
                obj2.vy += impulse * obj1.mass * vCollisionNorm.y * ballBounceFactor;
            }
        }
    }
}

let containerWidth = window.innerWidth;
let containerHeight = window.innerHeight 

window.addEventListener('resize', () => {
    containerWidth = window.innerWidth;
    containerHeight = window.innerHeight 
});
const bounceFactor = 0.7; // 1.0 = perfect bounce, <1.0 = loses energy

function detectEdgeCollisions() {
    for (let obj of gameObjects) {
        if (obj.x < obj.radius) {
            obj.vx = Math.abs(obj.vx) * bounceFactor;
            obj.x = obj.radius;
        } else if (obj.x > containerWidth - obj.radius) {
            obj.vx = -Math.abs(obj.vx) * bounceFactor;
            obj.x = containerWidth - obj.radius;
        }

        if (obj.y < obj.radius) {
            obj.vy = Math.abs(obj.vy) * bounceFactor;
            obj.y = obj.radius;
        } else if (obj.y > containerHeight - obj.radius) {
            obj.vy = -Math.abs(obj.vy) * bounceFactor;
            obj.y = containerHeight - obj.radius;
        }
    }
}

// Spillsløyfe
let lastTime = 0;

function gameLoop(timestamp) {
    let secondsPassed = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    detectEdgeCollisions();
    detectCollisions();

    for (let obj of gameObjects) {
        obj.update(secondsPassed);
    }

    requestAnimationFrame(gameLoop);
}
// Tvinger en refresh når brukeren navigerer tilbake til siden
window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload();
    }
};

// Start spillet
createWorld();
requestAnimationFrame(gameLoop);
