let lastPullUpdate = 0;
const PULL_UPDATE_INTERVAL = 16; // ~60fps

function updatePullMechanics()
{
    let now = millis();
    if (now - lastPullUpdate < PULL_UPDATE_INTERVAL) return;
    lastPullUpdate = now;

    // Slowly lose progress over time
    gameState.reelProgress -= 0.2;
    gameState.reelProgress = constrain(gameState.reelProgress, 0, 100);

    // Escape logic
    if (gameState.reelProgress <= 0)
    {
        gameState.escapeTimer++;
        fill(139, 0, 0);
        textSize(12);
        text("THE LINE IS SLACK!", width / 2, gameY + gameH * 0.8);
    }
    else
    {
        gameState.escapeTimer = 0;
    }

    if (gameState.escapeTimer >= ESCAPE_THRESHOLD)
    {
        if (reelSFX && reelSFX.isPlaying()) reelSFX.stop();
        outSFX.rate(1.0);
        outSFX.setVolume(0.3);
        outSFX.rate(1.3);
        outSFX.play();

        gameState.current = GAME_STATE.FAIL;
        gameState.escapeTimer = 0;
    }

    // Check if caught
    if (gameState.reelProgress >= 100)
    {
        catchFish();
    }
}

function catchFish()
{
    outSFX.rate(1.0);
    outSFX.setVolume(0.5);
    outSFX.rate(1.1);
    outSFX.play();

    // Determine catch based on insanity level
    determineCatch();

    // Check for death condition
    if (gameState.hasHeart)
    {
        gameState.heartPulls++;
        if (gameState.heartPulls >= 5)
        {
            gameState.current = GAME_STATE.DEATH;
            reelSFX.stop();
            return;
        }
    }

    gameState.current = GAME_STATE.CAUGHT;
    reelSFX.stop();
    gameState.reelProgress = 0;
}

function handleDeathState()
{
    // Stop all audio
    gameState.isMusicPlaying = false;
    if (waterAmbiance && waterAmbiance.isPlaying()) waterAmbiance.stop();
    if (reelSFX && reelSFX.isPlaying()) reelSFX.stop();
    if (bgm && bgm.isPlaying()) bgm.stop();

    if (staticSFX)
    {
        staticSFX.rate(1.0); // Reset to normal rate
        if (!staticSFX.isPlaying())
        {
            staticSFX.setVolume(0.5);
            staticSFX.play();
        }
    }

    gameState.deathTimer++;

    // Flash animation
    if (gameState.deathTimer < 60)
    {
        fill(102, 0, 0);
        rect(gameX, gameY, gameW, gameH);

        let shake = random(-15, 15);
        translate(shake, shake);

        if (random() > 0.8)
        {
            fill(255, 100);
            rect(gameX, gameY, gameW, gameH);
        }
    }
    else
    {
        staticSFX.stop();
        imageMode(CENTER);
        if (deathHeartImg)
        {
            image(deathHeartImg, width / 2, height / 2, gameW * 0.2, gameW * 0.2);
        }

        fill(255);
        textAlign(CENTER, CENTER);
        textFont("'Press Start 2P', cursive");
        textSize(max(gameW * 0.015, 12));
        text("THIS HEART HAS STOPPED BEATING.", width / 2, height / 2 - 160);
        text("AND SO HAS YOURS.", width / 2, height / 2 + 160);
    }
}

function determineCatch()
{
    if (gameState.insanity < 1)
    {
        determineLevel0Catch();
    }
    else if (gameState.insanity >= 1 && gameState.insanity < 2)
    {
        determineLevel1Catch();
    }
    else if (gameState.insanity >= 2 && gameState.insanity < 3)
    {
        determineLevel2Catch();
    }
    else if (gameState.insanity >= 3)
    {
        determineLevel3Catch();
    }
}

function determineLevel0Catch()
{
    gameState.drySpell++;

    let r = random(100);
    let forcedCatch = (gameState.drySpell >= PITY_THRESHOLD);

    if (forcedCatch || r >= 80)
    {
        let forcedR = random(100);
        if (forcedR < 50)
        {
            gameState.targetFish = eelImg;
            gameState.currentCaughtItem = "Wiggling Ribbon Eel";
            gameState.subtitle = "A friendly little ribbon of the reeds. It has an extra eye just to see how much it likes you.";
        }
        else
        {
            gameState.targetFish = toothImg;
            gameState.currentCaughtItem = "Human Tooth";
            gameState.subtitle = "Looks like a molar. Seems to still have a bit of gum attached.";
        }
        gameState.insanity += 0.2;
        gameState.drySpell = 0;
    }
    else
    {
        if (r < 10)
        {
            gameState.targetFish = blueSnapperImg;
            gameState.currentCaughtItem = "Bluestripe Snapper";
            gameState.subtitle = "A vibrant fish with electric blue stripes. Its eye never seems to blink.";
        }
        else if (r < 20)
        {
            gameState.targetFish = redSnapperImg;
            gameState.currentCaughtItem = "Red Snapper";
            gameState.subtitle = "A heavy, crimson prize from the deep.";
        }
        else if (r < 30)
        {
            gameState.targetFish = sardineImg;
            gameState.currentCaughtItem = "Innocent Sardine";
            gameState.subtitle = "A small silver flash. It's still twitching.";
        }
        else if (r < 40)
        {
            gameState.targetFish = tunaImg;
            gameState.currentCaughtItem = "Blackfin Tuna";
            gameState.subtitle = "A massive torpedo of muscle and silver. Your arms ache just from looking at it.";
        }
        else if (r < 50)
        {
            gameState.targetFish = blennyImg;
            gameState.currentCaughtItem = "Canary Blenny";
            gameState.subtitle = "Sun-yellow and far too cheerful for these depths.";
        }
        else if (r < 65)
        {
            gameState.targetFish = toupeeImg;
            gameState.currentCaughtItem = "Black Toupee";
            gameState.subtitle = "A jet-black hairpiece. It's surprisingly well-groomed.";
        }
        else if (r < 80)
        {
            gameState.targetFish = walletImg;
            gameState.currentCaughtItem = "Soggy Wallet";
            gameState.subtitle = "Dripping and almost empty, yet strangely heavy.";
        }
    }
}

function determineLevel1Catch()
{
    gameState.drySpell++;

    let r = random(100);
    let forcedCatch = (gameState.drySpell >= PITY_THRESHOLD);

    if (forcedCatch || r >= 60)
    {
        let forcedR = random(100);
        if (forcedR < 20)
        {
            gameState.targetFish = oilyTunaImg;
            gameState.currentCaughtItem = "Oily Tuna";
            gameState.subtitle = "A massive carcass covered in a thick, dark film. Doesn't look like it died of natural causes.";
            gameState.insanity += 0.2;
        }
        else if (forcedR < 40)
        {
            gameState.targetFish = paleSnapperImg;
            gameState.currentCaughtItem = "Pale Snapper";
            gameState.subtitle = "The vibrant scales have sloughed off. Its eye is a crater of rot.";
            gameState.insanity += 0.1;
        }
        else if (forcedR < 60)
        {
            gameState.targetFish = bloatedBlennyImg;
            gameState.currentCaughtItem = "Bloated Blenny";
            gameState.subtitle = "Its skin is stretched thin over a gas-filled belly. It looks ready to burst.";
            gameState.insanity += 0.1;
        }
        else if (forcedR < 80)
        {
            gameState.targetFish = rottenSardineImg;
            gameState.currentCaughtItem = "Rotten Sardine";
            gameState.subtitle = "Dull, grey, and falling apart. It smells like old copper and stagnant water.";
            gameState.insanity += 0.1;
        }
        else if (forcedR < 90)
        {
            gameState.targetFish = eelImg;
            gameState.currentCaughtItem = "Sinuous Seer";
            gameState.subtitle = "The three eyes don't blink; they just track your heartbeat through the wood of the boat.";
            gameState.insanity += 0.1;
        }
        else if (forcedR < 100)
        {
            gameState.targetFish = toothImg;
            gameState.currentCaughtItem = "Human Tooth";
            gameState.subtitle = "Freshly pulled. It's still vibrating with a dull, rhythmic ache.";
            gameState.insanity += 0.2;
        }
        gameState.drySpell = 0;
    }
    else
    {
        if (r < 10)
        {
            gameState.targetFish = blueSnapperImg;
            gameState.currentCaughtItem = "Bluestripe Snapper";
            gameState.subtitle = "The blue stripes pulse like veins. It's watching you back.";
        }
        else if (r < 20)
        {
            gameState.targetFish = redSnapperImg;
            gameState.currentCaughtItem = "Red Snapper";
            gameState.subtitle = "It feels far heavier than it should. It smells of old copper.";
        }
        else if (r < 30)
        {
            gameState.targetFish = sardineImg;
            gameState.currentCaughtItem = "Innocent Sardine";
            gameState.subtitle = "It's screaming, though you can't hear it. It won't stop twitching.";
        }
        else if (r < 40)
        {
            gameState.targetFish = tunaImg;
            gameState.currentCaughtItem = "Blackfin Tuna";
            gameState.subtitle = "A cold, muscular weight. It feels like pulling a corpse from the silt.";
        }
        else if (r < 50)
        {
            gameState.targetFish = blennyImg;
            gameState.currentCaughtItem = "Canary Blenny";
            gameState.subtitle = "Yellow like a sick man's eyes. It hurts to look at.";
        }
        else if (r < 55)
        {
            gameState.targetFish = toupeeImg;
            gameState.currentCaughtItem = "Black Toupee";
            gameState.subtitle = "Roots have begun to grow from the underside.";
        }
        else if (r < 60)
        {
            gameState.targetFish = walletImg;
            gameState.currentCaughtItem = "Soggy Wallet";
            gameState.subtitle = "It holds... is that a picture of you?";
        }
    }
}

function determineLevel2Catch()
{
    let r = random(100);
    if (r < 10)
    {
        gameState.targetFish = oilyTunaImg;
        gameState.currentCaughtItem = "Oily Tuna";
        gameState.subtitle = "A massive carcass covered in a thick, dark film. Doesn't look like it died of natural causes.";
    }
    else if (r < 20)
    {
        gameState.targetFish = paleSnapperImg;
        gameState.currentCaughtItem = "Pale Snapper";
        gameState.subtitle = "The vibrant scales have sloughed off. Its eye is a crater of rot.";
    }
    else if (r < 30)
    {
        gameState.targetFish = bloatedBlennyImg;
        gameState.currentCaughtItem = "Bloated Blenny";
        gameState.subtitle = "Its skin is stretched thin over a gas-filled belly. It looks ready to burst.";
    }
    else if (r < 40)
    {
        gameState.targetFish = rottenSardineImg;
        gameState.currentCaughtItem = "Rotten Sardine";
        gameState.subtitle = "Dull, grey, and falling apart. It smells like old copper and stagnant water.";
    }
    else if (r < 50)
    {
        gameState.targetFish = eyeballImg;
        gameState.currentCaughtItem = "Eyeball";
        gameState.subtitle = "Wide, dilated, and familiar. It hasn't seen light in a long time.";
    }
    else if (r < 60)
    {
        gameState.targetFish = toothImg;
        gameState.currentCaughtItem = "Human Tooth";
        gameState.subtitle = "Freshly pulled. It's still vibrating with a dull, rhythmic ache.";
    }
    else if (r < 70)
    {
        gameState.targetFish = faceImg;
        gameState.currentCaughtItem = "Hollow Mask";
        gameState.subtitle = "Smells of cheap perfume and old copper. It's still warm on the inside, as if it was just removed.";
    }
    else if (r < 80)
    {
        gameState.targetFish = jellyfishImg;
        gameState.currentCaughtItem = "Ossified Jellyfish";
        gameState.subtitle = "This pulsing cage doesn't swim so much as it scrapes against the water.";
    }
    else if (r < 90)
    {
        gameState.targetFish = canImg;
        gameState.currentCaughtItem = "Gaping Tin";
        gameState.subtitle = "The metal has peeled back into a jagged, screaming maw. It smells like rusted blood and old air.";
    }
    else if (r < 100)
    {
        gameState.targetFish = eelImg;
        gameState.currentCaughtItem = "Sinuous Seer";
        gameState.subtitle = "The three eyes don't blink; they just track your heartbeat through the wood of the boat.";
    }
    gameState.insanity += 0.1;
}

function determineLevel3Catch()
{
    let r = random(100);
    if (r < 5)
    {
        gameState.targetFish = heartImg;
        gameState.currentCaughtItem = "Heart of the Sea";
        gameState.subtitle = "Every pulse feels like a countdown you shouldn't be part of. Throw it back.";
        gameState.hasHeart = true;
    }
    else if (r < 15)
    {
        gameState.targetFish = paleSnapperImg;
        gameState.currentCaughtItem = "Pale Snapper";
        gameState.subtitle = "The vibrant scales have sloughed off. Its eye is a crater of rot.";
    }
    else if (r < 25)
    {
        gameState.targetFish = oilyTunaImg;
        gameState.currentCaughtItem = "Oily Tuna";
        gameState.subtitle = "A massive carcass covered in a thick, dark film. Doesn't look like it died of natural causes.";
    }
    else if (r < 35)
    {
        gameState.targetFish = rottenSardineImg;
        gameState.currentCaughtItem = "Rotten Sardine";
        gameState.subtitle = "Dull, grey, and falling apart. It smells like old copper and stagnant water.";
    }
    else if (r < 45)
    {
        gameState.targetFish = eyeballImg;
        gameState.currentCaughtItem = "Eyeball";
        gameState.subtitle = "Wide, dilated, and familiar. It hasn't seen light in a long time.";
    }
    else if (r < 55)
    {
        gameState.targetFish = toothImg;
        gameState.currentCaughtItem = "Human Tooth";
        gameState.subtitle = "Freshly pulled. It's still vibrating with a dull, rhythmic ache.";
    }
    else if (r < 65)
    {
        gameState.targetFish = faceImg;
        gameState.currentCaughtItem = "Hollow Mask";
        gameState.subtitle = "Smells of cheap perfume and old copper. It's still warm on the inside, as if it was just removed.";
    }
    else if (r < 75)
    {
        gameState.targetFish = jellyfishImg;
        gameState.currentCaughtItem = "Ossified Jellyfish";
        gameState.subtitle = "This pulsing cage doesn't swim so much as it scrapes against the water.";
    }
    else if (r < 85)
    {
        gameState.targetFish = eelImg;
        gameState.currentCaughtItem = "Sinuous Seer";
        gameState.subtitle = "The three eyes don't blink; they just track your heartbeat through the wood of the boat.";
    }
    else if (r < 95)
    {
        gameState.targetFish = canImg;
        gameState.currentCaughtItem = "Gaping Tin";
        gameState.subtitle = "The metal has peeled back into a jagged, screaming maw. It smells like rusted blood and old air.";
    }
    else if (r < 100)
    {
        gameState.targetFish = legImg;
        gameState.currentCaughtItem = "Pale Pedestal";
        gameState.subtitle = "A column of marble-cold flesh. The bone at the top is jagged, like a snapped tree limb.";
    }
}
