// Store the current images to avoid constant lookups
let currentRodImage = null;
let currentBucketImage = null;
let currentMp3Image = null;
let lastInsanityLevel = -1; // Track last insanity
let fishSizeCache = new Map();

function drawStartUI()
{
    if (gameY + gameH < 0 || gameY > height) return;

    // Title
    fill(255);
    textAlign(CENTER, CENTER);
    textFont("'Press Start 2P', cursive");
    textSize(max(width * 0.03, 20));
    text("QUIET WATERS", width / 2, height * 0.15);

    // Button sizing
    btnW = width * 0.2;
    btnH = btnW * 0.4;
    btnX = width / 2 - btnW / 2;
    btnY = height * 0.75;

    if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH)
    {
        tint(200, 255, 200);
        cursor(HAND);
    }
    else
    {
        noTint();
        cursor(ARROW);
    }
    image(buttonImg, btnX, btnY, btnW, btnH);
    noTint();
}

function drawIdleUI()
{
    if (gameY + gameH < 0 || gameY > height) return;

    // Text
    fill(255);
    textAlign(CENTER);
    textFont("'Press Start 2P', cursive");
    textSize(max(gameW * 0.02, 14));
    text("Press SPACE to cast", width / 2, gameY + gameH * 0.05);

    // Rod
    rodW = gameW * 0.2;
    rodH = rodW * 2.3;
    rodX = gameX + (gameW * 0.50);
    rodY = gameY + (gameH * 0.20);
    let idleBob = sin(frameCount * 0.03) * 5;

    drawCorrectRodImage("idle", rodX, rodY + idleBob, rodW, rodH);
}

function drawWaitUI()
{
    if (gameY + gameH < 0 || gameY > height) return;

    // Text
    fill(255);
    textAlign(CENTER);
    textFont("'Press Start 2P', cursive");
    textSize(max(gameW * 0.02, 14));
    text("Waiting for a bite...", width / 2, gameY + gameH * 0.05);
    textSize(max(gameW * 0.01, 12));
    text("(press ESC to exit)", width / 2, gameY + gameH * 0.10);

    // Ripple
    rippleW = gameW * 0.08;
    rippleH = rippleW * 0.45;
    rippleX = gameX + (gameW * 0.47);
    rippleY = gameY + (gameH * 0.68);
    push();
    image(waitRippleImg, rippleX, rippleY, rippleW, rippleH);
    noTint();
    pop();

    // Rod
    rodW = gameW * 0.15;
    rodH = rodW * 2.5;
    rodX = gameX + (gameW * 0.50);
    rodY = gameY + (gameH * 0.35);
    let waitBob = sin(frameCount * 0.03) * 5;

    drawCorrectRodImage("wait", rodX, rodY + waitBob, rodW, rodH);
}

function drawPullUI()
{
    if (gameY + gameH < 0 || gameY > height) return;

    // Text
    fill(255);
    textAlign(CENTER);
    textFont("'Press Start 2P', cursive");
    textSize(max(gameW * 0.02, 14));
    text("REEL IT IN!", width / 2, gameY + gameH * 0.05);
    textSize(max(gameW * 0.01, 12));
    text("(spam SPACE)", width / 2, gameY + gameH * 0.10);

    // Progress bar
    drawProgressBar();

    // Ripple
    rippleW = gameW * 0.15;
    rippleH = rippleW * 0.55;
    rippleX = gameX + (gameW * 0.43);
    rippleY = gameY + (gameH * 0.61);
    let shake = random(-2, 2);
    image(pullRippleImg, rippleX + shake, rippleY + shake, rippleW, rippleH);

    // Rod
    rodW = gameW * 0.22;
    rodH = rodW * 1.9;
    rodX = gameX + (gameW * 0.49);
    rodY = gameY + (gameH * 0.26);

    drawCorrectRodImage("pull", rodX, rodY, rodW, rodH);
}

function drawProgressBar()
{
    if (gameY + gameH < 0 || gameY > height) return;

    rectMode(CENTER);
    noFill();
    stroke(255);
    strokeWeight(4);
    rect(width / 2, gameY + gameH * 0.85, barWidth, barHeight);

    noStroke();
    fill(139, 0, 0);
    let currentBarWidth = map(gameState.reelProgress, 0, 100, 0, barWidth);
    rectMode(CORNER);
    rect(width / 2 - barWidth / 2, gameY + gameH * 0.85 - barHeight / 2, currentBarWidth, barHeight);
}

function drawFailUI()
{
    if (gameY + gameH < 0 || gameY > height) return;

    // Text
    fill(255);
    textAlign(CENTER);
    textFont("'Press Start 2P', cursive");
    textSize(max(gameW * 0.02, 14));
    text("The fish got away...", width / 2, gameY + gameH * 0.05);
    textSize(max(gameW * 0.01, 12));
    text("(press ESC to exit)", width / 2, gameY + gameH * 0.10);

    // Rod
    rodW = gameW * 0.2;
    rodH = rodW * 2.3;
    rodX = gameX + (gameW * 0.50);
    rodY = gameY + (gameH * 0.20);
    let idleBob = sin(frameCount * 0.03) * 5;

    drawCorrectRodImage("idle", rodX, rodY + idleBob, rodW, rodH);
}

function drawCaughtUI()
{
    if (gameY + gameH < 0 || gameY > height) return;

    // Text
    fill(255);
    textAlign(CENTER);
    textFont("'Press Start 2P', cursive");
    textSize(max(gameW * 0.02, 14));
    text("YOU CAUGHT: " + gameState.currentCaughtItem.toUpperCase(), width / 2, gameY + gameH * 0.05);
    textSize(max(gameW * 0.01, 12));
    text(gameState.subtitle, width / 2, gameY + gameH * 0.10);

    textSize(10);
    fill(200, 255, 200);
    text("[E] TO KEEP", width / 2 - 120, gameY + gameH * 0.15);
    fill(255, 200, 200);
    text("[ESC] TO DISCARD", width / 2 + 120, gameY + gameH * 0.15);

    // Rod
    rodW = gameW * 0.2;
    rodH = rodW * 2.3;
    rodX = gameX + (gameW * 0.50);
    rodY = gameY + (gameH * 0.20);
    drawCorrectRodImage("idle", rodX, rodY, rodW, rodH);

    if (gameState.targetFish)
    {
        drawFishOnHook();
    }
}

function updateCurrentImages()
{
    // Only update when insanity level changes
    let insanityLevel = Math.floor(gameState.insanity);
    if (insanityLevel === lastInsanityLevel && currentRodImage) return;

    lastInsanityLevel = insanityLevel;

    if (gameState.insanity < 1)
    {
        currentRodImage = [idleImg, waitImg, pullImg];
        currentBucketImage = bucketImg;
        currentMp3Image = mp3Img;
    }
    else if (gameState.insanity < 2)
    {
        currentRodImage = [mildlyInfectedIdleImg, mildlyInfectedWaitImg, mildlyInfectedPullImg];
        currentBucketImage = mildlyInfectedBucketImg;
        currentMp3Image = mildlyInfectedMp3Img;
    }
    else
    {
        currentRodImage = [infectedIdleImg, infectedWaitImg, infectedPullImg];
        currentBucketImage = infectedBucketImg;
        currentMp3Image = infectedMp3Img;
    }
}

function drawCorrectRodImage(type, x, y, w, h)
{
    if (gameY + gameH < 0 || gameY > height) return;

    updateCurrentImages();

    if (!currentRodImage) return;

    let index = type === 'idle' ? 0 : type === 'wait' ? 1 : 2;
    let img = currentRodImage[index];

    if (img)
    {
        if (cachedTintColor)
        {
            tint(cachedTintColor);
        }
        image(img, x, y, w, h);
        noTint();
    }
}

function drawMp3()
{
    if (gameY + gameH < 0 || gameY > height) return;

    mp3W = gameW * 0.05;

    let currentMp3Img;
    if (gameState.insanity < 1)
    {
        currentMp3Img = mp3Img;
    }
    else if (gameState.insanity >= 1 && gameState.insanity < 2)
    {
        currentMp3Img = mildlyInfectedMp3Img;
    }
    else
    {
        currentMp3Img = infectedMp3Img;
    }

    let aspect = currentMp3Img.height / currentMp3Img.width;
    mp3H = mp3W * aspect;

    mp3X = gameX + (gameW * 0.15);
    mp3Y = gameY + gameH - mp3H;

    push();
    if (dist(mouseX, mouseY, mp3X + mp3W/2, mp3Y + mp3H/2) < mp3W/2)
    {
        tint(230);
        cursor(HAND);
    }
    else
    {
        tint(cachedTintColor);
    }

    image(currentMp3Img, mp3X, mp3Y, mp3W, mp3H);
    pop();
}

function drawBucket()
{
    if (gameY + gameH < 0 || gameY > height) return;

    bucketW = gameW * 0.15;

    let currentBucketImg;
    if (gameState.insanity < 1)
    {
        currentBucketImg = bucketImg;
    }
    else if (gameState.insanity >= 1 && gameState.insanity < 2)
    {
        currentBucketImg = mildlyInfectedBucketImg;
    }
    else
    {
        currentBucketImg = infectedBucketImg;
    }

    let aspect = currentBucketImg.height / currentBucketImg.width;
    bucketH = bucketW * aspect;

    bucketX = gameX + (gameW * 0.82);
    bucketY = gameY + gameH - bucketH;

    push();
    if (dist(mouseX, mouseY, bucketX + bucketW/2, bucketY + bucketH/2) < bucketW/2)
    {
        tint(230);
        cursor(HAND);
    }
    else
    {
        tint(cachedTintColor);
    }

    image(currentBucketImg, bucketX, bucketY, bucketW, bucketH);
    pop();
}

function drawFishOnHook()
{
    if (gameY + gameH < 0 || gameY > height) return;

    push();
    imageMode(CENTER);

    let hookX = rodX + (rodW * 0.06);
    let hookY = rodY + (rodH * 0.52);

    // Set width based on fish type
    fishW = getFishSize(gameState.targetFish);

    // Calculate height automatically
    let aspect = gameState.targetFish.height / gameState.targetFish.width;
    fishH = fishW * aspect;

    // Swing animation
    let swing = sin(frameCount * 0.04) * 0.05;

    translate(hookX, hookY + (fishH / 2));
    rotate(swing);

    image(gameState.targetFish, 0, 30, fishW, fishH);
    pop();
}

function getFishSize(fish)
{
    return gameW * (fishSizeCache.get(fish) || FISH_SIZES.XLARGE);
}

function drawInventoryMenu()
{
    push();
    let menuW = width * 0.4;
    let menuH = height * 0.6;
    let menuX = width / 2;
    let menuY = height / 2;

    // Background Box
    rectMode(CENTER);
    fill(0, 0, 0, 180);
    stroke(255);
    strokeWeight(4);
    rect(menuX, menuY, menuW, menuH, 10);

    // Only rebuild inventory text cache when inventory changes
    if (gameState.inventory.length !== lastInventoryLength)
    {
        cachedInventoryText = [];
        for (let i = 0; i < gameState.inventory.length; i++)
        {
            cachedInventoryText.push(gameState.inventory[i]);
        }
        lastInventoryLength = gameState.inventory.length;
    }

    // Set up clipping
    push();
    drawingContext.beginPath();
    drawingContext.rect(menuX - menuW/2, menuY - menuH/2 + 60, menuW, menuH - 80);
    drawingContext.clip();

    // Draw list
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(12);

    if (cachedInventoryText.length === 0)
    {
        text("Empty...", menuX, menuY);
    }
    else
    {
        translate(0, gameState.scrollY);

        let startY = menuY - menuH * 0.2;
        let spacing = 40;

        // Use cached text array
        for (let i = 0; i < cachedInventoryText.length; i++)
        {
            let itemY = startY + (i * spacing);
            text(cachedInventoryText[i], menuX, itemY);
        }

        gameState.menuContentH = cachedInventoryText.length * spacing;
        gameState.maxScroll = max(0, gameState.menuContentH - (menuH * 0.4));
    }
    pop();

    // Text (outside clip)
    noStroke();
    fill(255);
    textSize(18);
    text("- BUCKET -", menuX, menuY - menuH * 0.4);

    if (gameState.maxScroll > 0)
    {
        noStroke();
        textSize(10);
        fill(150);
        text("Scroll to see more", menuX, menuY + menuH * 0.45);
    }
    pop();
}

