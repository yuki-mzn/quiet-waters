// Manage game variables
let gameState =
{
    current: "START",

    // Player stats
    insanity: 0,
    drySpell: 0,
    hasHeart: false,
    heartPulls: 0,
    deathTimer: 0,

    // Fishing state
    waitTimer: 0,
    reelProgress: 0,
    escapeTimer: 0,
    targetFish: null,

    // Inventory
    currentCaughtItem: "",
    subtitle: "",
    inventory: [],
    showInventory: false,

    // Scroll for inventory
    scrollY: 0,
    maxScroll: 0,
    menuContentH: 0,

    // Music
    isMusicPlaying: true
};
