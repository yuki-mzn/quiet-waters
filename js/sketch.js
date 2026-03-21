// Images
let startImg, boatImg, buttonImg, bucketImg, mildlyInfectedBucketImg, infectedBucketImg,
    idleImg, mildlyInfectedIdleImg, infectedIdleImg, waitImg, mildlyInfectedWaitImg,
    infectedWaitImg, waitRippleImg, pullImg, mildlyInfectedPullImg, infectedPullImg,
    pullRippleImg, mp3Img, mildlyInfectedMp3Img, infectedMp3Img, deathHeartImg;

let redSnapperImg, sardineImg, walletImg, toothImg, eyeballImg, toupeeImg, tunaImg,
    blueSnapperImg, blennyImg, rottenSardineImg, bloatedBlennyImg, paleSnapperImg,
    oilyTunaImg, faceImg, jellyfishImg, legImg, eelImg, canImg, heartImg;

// Audio
let waterAmbiance, clickSFX, splashSFX, reelSFX, outSFX, staticSFX, bgm;

// UI Position variables
let btnX, btnY, btnW, btnH;
let bucketX, bucketY, bucketW, bucketH;
let mp3X, mp3Y, mp3W, mp3H;
let rodX, rodY, rodW, rodH;
let rippleX, rippleY, rippleW, rippleH;
let fishX, fishY, fishW, fishH;
let gameW, gameH, gameX, gameY;

// Pull Bar settings
let barWidth = 300;
let barHeight = 30;

// Colors
let normalColor, currentColor, mildlyInfectedColor, infectedColor;
let cachedTintColor = null;
let lastInsanityForTint = -1;

// Inventory
let lastInventoryLength = -1;
let cachedInventoryText = [];
let lastState = "";
let lastShowInventory = false;

function preload()
{
    // Images
    startImg = loadImage('assets/background/start.png');
    buttonImg = loadImage('assets/background/startBtn.png');
    boatImg = loadImage('assets/background/boat.png');
    waitRippleImg = loadImage('assets/background/rippleWait.png');
    pullRippleImg = loadImage('assets/background/ripplePull.png');
    deathHeartImg = loadImage('assets/background/deathHeart.png');

    // Bucket, rod and mp3 player sprites
    bucketImg = loadImage('assets/equipment/bucket.png');
    mildlyInfectedBucketImg = loadImage('assets/equipment/mildlyInfectedBucket.png');
    infectedBucketImg = loadImage('assets/equipment/infectedBucket.png');
    idleImg = loadImage('assets/equipment/idleRod.png');
    mildlyInfectedIdleImg = loadImage('assets/equipment/mildlyInfectedIdleRod.png');
    infectedIdleImg = loadImage('assets/equipment/infectedIdleRod.png');
    waitImg = loadImage('assets/equipment/waitRod.png');
    mildlyInfectedWaitImg = loadImage('assets/equipment/mildlyInfectedWaitRod.png');
    infectedWaitImg = loadImage('assets/equipment/infectedWaitRod.png');
    pullImg = loadImage('assets/equipment/pullRod.png');
    mildlyInfectedPullImg = loadImage('assets/equipment/mildlyInfectedPullRod.png');
    infectedPullImg = loadImage('assets/equipment/infectedPullRod.png');
    mp3Img = loadImage('assets/equipment/mp3.png');
    mildlyInfectedMp3Img = loadImage('assets/equipment/mildlyInfectedMp3.png');
    infectedMp3Img = loadImage('assets/equipment/infectedMp3.png');

    // Fishable items
    blueSnapperImg = loadImage('assets/fishables/blueSnapper.png');
    redSnapperImg = loadImage('assets/fishables/redSnapper.png');
    sardineImg = loadImage('assets/fishables/sardine.png');
    walletImg = loadImage('assets/fishables/wallet.png');
    toothImg = loadImage('assets/fishables/tooth.png');
    eyeballImg = loadImage('assets/fishables/eyeball.png');
    toupeeImg = loadImage('assets/fishables/toupee.png');
    tunaImg = loadImage('assets/fishables/tuna.png');
    blennyImg = loadImage('assets/fishables/blenny.png');
    rottenSardineImg = loadImage('assets/fishables/rottenSardine.png');
    bloatedBlennyImg = loadImage('assets/fishables/bloatedBlenny.png');
    paleSnapperImg = loadImage('assets/fishables/paleSnapper.png');
    oilyTunaImg = loadImage('assets/fishables/oilyTuna.png');
    faceImg = loadImage('assets/fishables/face.png');
    jellyfishImg = loadImage('assets/fishables/jellyfish.png');
    legImg = loadImage('assets/fishables/leg.png');
    eelImg = loadImage('assets/fishables/eel.png');
    canImg = loadImage('assets/fishables/can.png');
    heartImg = loadImage('assets/fishables/heart.png');

    // Audio
    waterAmbiance = loadSound('assets/audio/water.mp3', audioLoaded);
    clickSFX = loadSound('assets/audio/bubble.mp3', audioLoaded);
    splashSFX = loadSound('assets/audio/splash.mp3', audioLoaded);
    reelSFX = loadSound('assets/audio/reel.mp3', audioLoaded);
    outSFX = loadSound('assets/audio/outOfWater.mp3', audioLoaded);
    staticSFX = loadSound('assets/audio/static.mp3', audioLoaded);
    bgm = loadSound('assets/audio/bgm.mp3', audioLoaded);
}

function audioLoaded()
{
    console.log("Audio loaded successfully");
    // Set properties for all audio
    let allAudio = [waterAmbiance, clickSFX, splashSFX, reelSFX, outSFX, staticSFX, bgm];
    allAudio.forEach(sound => {
        if (sound)
        {
            sound.setVolume(0.3);
            // Prevents audio from being garbage collected
            sound.onended(() => {
                // Let audio end naturally
            });
        }
    });
}

function initializeFishSizeCache()
{
    const fishSizeMap =
    [
        [toothImg, FISH_SIZES.TINY],
        [blennyImg, FISH_SIZES.SMALL],
        [bloatedBlennyImg, FISH_SIZES.SMALL],
        [blueSnapperImg, FISH_SIZES.MEDIUM],
        [sardineImg, FISH_SIZES.MEDIUM],
        [rottenSardineImg, FISH_SIZES.MEDIUM],
        [eyeballImg, FISH_SIZES.LARGE],
        [canImg, FISH_SIZES.LARGE],
        [walletImg, FISH_SIZES.XLARGE],
        [toupeeImg, FISH_SIZES.XLARGE],
        [eelImg, FISH_SIZES.XXLARGE],
        [heartImg, FISH_SIZES.XXLARGE],
        [redSnapperImg, FISH_SIZES.HUGE],
        [paleSnapperImg, FISH_SIZES.HUGE],
        [legImg, FISH_SIZES.HUGE],
        [tunaImg, FISH_SIZES.MASSIVE],
        [oilyTunaImg, FISH_SIZES.MASSIVE],
        [jellyfishImg, FISH_SIZES.MASSIVE],
        [faceImg, FISH_SIZES.GIGANTIC]
    ];

    for (let [img, size] of fishSizeMap)
    {
        if (img) fishSizeCache.set(img, size);
    }
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    noSmooth();
    textFont("'Press Start 2P', cursive");
    calculateGameSize();
    frameRate(60);
    imageMode(CORNER);
    initializeFishSizeCache();

    // Initialize UI position variables
    btnX = btnY = btnW = btnH = 0;
    bucketX = bucketY = bucketW = bucketH = 0;
    mp3X = mp3Y = mp3W = mp3H = 0;
    rodX = rodY = rodW = rodH = 0;
    rippleX = rippleY = rippleW = rippleH = 0;
    fishX = fishY = fishW = fishH = 0;

    getAudioContext().resume();

    // Insanity tints
    normalColor = color(255);
    mildlyInfectedColor = color(220, 180, 180);
    infectedColor = color(180, 120, 120);
}

function draw()
{
    background(0);
    cursor(ARROW);

    if (frameCount % 2 === 0 || gameState.current !== lastState || gameState.showInventory !== lastShowInventory)
    {
        switch(gameState.current)
        {
            case GAME_STATE.START:
                drawBackground(startImg);
                drawStartUI();
                break;

            case GAME_STATE.IDLE:
                drawBackground(boatImg);
                drawIdleUI();
                drawMp3();
                drawBucket();
                if (gameState.showInventory) drawInventoryMenu();
                break;

            case GAME_STATE.WAIT:
                drawBackground(boatImg);
                drawWaitUI();
                drawMp3();
                drawBucket();
                if (gameState.showInventory) drawInventoryMenu();

                gameState.waitTimer--;
                if (gameState.waitTimer <= 0)
                {
                    gameState.current = GAME_STATE.PULL;
                    gameState.reelProgress = 20;
                }
                break;

            case GAME_STATE.PULL:
                drawBackground(boatImg);
                drawPullUI();
                drawMp3();
                drawBucket();
                if (gameState.showInventory) drawInventoryMenu();

                updatePullMechanics();
                break;

            case GAME_STATE.FAIL:
                drawBackground(boatImg);
                drawFailUI();
                drawMp3();
                drawBucket();
                if (gameState.showInventory) drawInventoryMenu();
                break;

            case GAME_STATE.CAUGHT:
                drawBackground(boatImg);
                drawCaughtUI();
                drawMp3();
                drawBucket();
                if (gameState.showInventory) drawInventoryMenu();
                break;

            case GAME_STATE.DEATH:
                handleDeathState();
                break;
        }

        // Debugging UI
        /* fill(200);
        textSize(10);
        textAlign(LEFT);
        text("Insanity: " + nfc(gameState.insanity, 2), gameX + 10, gameY + 20);
        text("Pity Counter: " + gameState.drySpell, gameX + 10, gameY + 40);
        text("Heart Pulls: " + gameState.heartPulls, gameX + 10, gameY + 60) */
    }
}

function calculateGameSize()
{
    if (width / height > TARGET_RATIO)
    {
        gameH = height;
        gameW = height * TARGET_RATIO;
    }
    else
    {
        gameW = width;
        gameH = width / TARGET_RATIO;
    }
    gameX = (width - gameW) / 2;
    gameY = (height - gameH) / 2;
}

function drawBackground(img)
{
    push();
    imageMode(CORNER);

    // Only recalculate tint color when insanity changes
    if (gameState.insanity !== lastInsanityForTint)
    {
        if (gameState.insanity <= 1)
        {
            cachedTintColor = lerpColor(normalColor, mildlyInfectedColor, gameState.insanity);
        }
        else if (gameState.insanity > 1 && gameState.insanity <= 2)
        {
            let fadeAmount = constrain(gameState.insanity - 1, 0, 1);
            cachedTintColor = lerpColor(mildlyInfectedColor, infectedColor, fadeAmount);
        }
        else
        {
            cachedTintColor = infectedColor;
        }
        lastInsanityForTint = gameState.insanity;
    }

    tint(cachedTintColor);
    image(img, gameX, gameY, gameW, gameH);
    pop();
}

function transitionToState(newState)
{
    // Clean up audio based on state transition
    switch(newState)
    {
        case GAME_STATE.IDLE:
            if (reelSFX && reelSFX.isPlaying()) reelSFX.stop();
            if (outSFX && outSFX.isPlaying()) outSFX.stop();
            if (waterAmbiance && !waterAmbiance.isPlaying())
            {
                waterAmbiance.loop();
            }
            break;

        case GAME_STATE.DEATH:
            break;

        default:
            // Reset any weird rates
            if (outSFX) outSFX.rate(1.0);
            if (reelSFX) reelSFX.rate(1.0);
            if (staticSFX) staticSFX.rate(1.0);
            break;
    }

    gameState.current = newState;
}

function mouseWheel(event)
{
    if (gameState.showInventory)
    {
        let scrollSpeed = 0.5;
        gameState.scrollY -= event.delta * scrollSpeed;
        gameState.scrollY = constrain(gameState.scrollY, -gameState.maxScroll, 0);

        // Prevent page from scrolling
        return false;
    }
}

function mousePressed()
{
    if (gameState.current === GAME_STATE.START)
    {
        if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH)
        {
            transitionToState(GAME_STATE.IDLE);
            userStartAudio();
            clickSFX.setVolume(0.3);
            clickSFX.play();
            waterAmbiance.loop();
            waterAmbiance.setVolume(0.2);
            if (gameState.isMusicPlaying)
            {
                bgm.loop();
                bgm.setVolume(0.3);
            }
        }
    }

    // Check for bucket click
    if (dist(mouseX, mouseY, bucketX + bucketW/2, bucketY + bucketH/2) < bucketW/2)
    {
        clickSFX.setVolume(0.3);
        clickSFX.play();
        gameState.showInventory = !gameState.showInventory;
    }

    // Check for mp3 player click
    if (dist(mouseX, mouseY, mp3X + mp3W/2, mp3Y + mp3H/2) < mp3W/2)
    {
        clickSFX.setVolume(0.3);
        clickSFX.play();
        gameState.isMusicPlaying = !gameState.isMusicPlaying;
        if (gameState.isMusicPlaying)
        {
            bgm.loop();
        }
        else
        {
            bgm.pause();
        }
    }
}

function keyPressed()
{
    if (gameState.current === GAME_STATE.IDLE && key === ' ')
    {
        transitionToState(GAME_STATE.WAIT);
        splashSFX.setVolume(0.5);
        splashSFX.play();
        gameState.showInventory = false;
        gameState.waitTimer = int(random(120, 300));
    }

    if (gameState.current === GAME_STATE.WAIT && keyCode === ESCAPE)
    {
        outSFX.setVolume(0.3);
        outSFX.rate(1.3);
        outSFX.play();
        transitionToState(GAME_STATE.IDLE);
    }

    if (gameState.current === GAME_STATE.PULL && key === ' ')
    {
        reelSFX.setVolume(0.3);
        reelSFX.play();
        gameState.reelProgress += 5;
    }

    if (gameState.current === GAME_STATE.FAIL && keyCode === ESCAPE)
    {
        transitionToState(GAME_STATE.IDLE);
    }

    if (gameState.current === GAME_STATE.CAUGHT)
    {
        if (key === 'e' || key === 'E')
        {
            clickSFX.setVolume(0.3);
            clickSFX.play();
            gameState.inventory.push(gameState.currentCaughtItem);
            if (gameState.currentCaughtItem === "Heart of the Sea")
            {
                gameState.hasHeart = true;
                gameState.heartPulls = 0;
            }
            transitionToState(GAME_STATE.IDLE);
        }
        if (keyCode === ESCAPE)
        {
            clickSFX.setVolume(0.3);
            clickSFX.play();
            transitionToState(GAME_STATE.IDLE);
        }
    }
}

function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
    calculateGameSize();
}
