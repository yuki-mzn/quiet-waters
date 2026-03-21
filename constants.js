// Game states
const GAME_STATE =
{
    START: "START",
    IDLE: "IDLE",
    WAIT: "WAIT",
    CAUGHT: "CAUGHT",
    BUCKET: "BUCKET",
    FAIL: "FAIL",
    DEATH: "DEATH"
};

// UI Constants
const TARGET_RATIO = 16/9;
const ESCAPE_THRESHOLD = 180; // 3 seconds at 60fps
const PITY_THRESHOLD = 5;

// Fish size constants
const FISH_SIZES =
{
    TINY: 0.01,    // tooth
    SMALL: 0.02,   // blenny, bloated blenny
    MEDIUM: 0.025, // blue snapper, sardine, rotten sardine
    LARGE: 0.03,   // eyeball, can
    XLARGE: 0.04,  // wallet, toupee
    XXLARGE: 0.05, // eel, heart
    HUGE: 0.07,    // red snapper, pale snapper, leg
    MASSIVE: 0.09, // tuna, oily tuna, jellyfish
    GIGANTIC: 0.11 // face
};

// Create image cache
let imageCache = {};

// Pre-processed versions of images for each insanity level
let processedImages =
{
    normal: {},
    mild: {},
    infected: {}
};
