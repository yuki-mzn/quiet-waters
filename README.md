# Quiet Waters [CS50 Final Project]
> Cast your line into the deceptive calm of Quiet Waters, a retro-inspired pixel art fishing game. <br>
> What starts as a peaceful day on the lake slowly unravels as the depths yield more than just fish. <br>
> As you pull strange trinkets and unsettling remains from the blue, the very world around you begins to shift. <br>
> How long can you stay on the water before the insanity takes hold? <br>

#### Video Demo:  <https://youtu.be/PUzRuD-4Uc0>

#### NOTE: This game may not be suitable for those with epilepsy, as one scene involves rapid flashing lights.

## How To Run The Project
#### Method 1:
1. Go to.
#### Method 2:
1. Clone the respository.
2. Open index.html in a local server (like Live Server in VS Code).

## Files In My Project
* **assets** - Contains all the artwork and sprites used in the game.
* **js** - Contains all the Javascript files of the game.
    * **constants.js** - This file has the constants of game states, fish sizes, display ratio, timers and image cache.
    * **gameLogic.js** - This file handles the 'fishing' game logic and features, like the UI for reeling in the fish and the randomising system to determine which fish was caught.
    * **sketch.js** - This file contains the main functions for the game: loading the assets, initialising the fish sizes, the main draw function for different game states, calculating the aspect ratio for the game, drawing the background image, and the functions for scrolling, clicking sprites, and pressing keys.
    * **state.js** - This file initialises the variables for various game states.
    * **ui.js** - This file has the functions used to display and position the UI elements. It arranges the background text, fishing rod, bucket, and MP3 player, as well as positions the fish at the fishing hook and resizes the fish sprites as set in constants.js. It also draws the inventory menu in a way which allows for scrolling through the menu.
* **index.html** - Main file to display the game content. It contains links to the p5.js and p5 sound libraries and the pixel font used in the game, along with the styles.css file and all the Javascript files.
* **styles.css** - Styling for index.html to center the game backgrounds and prevent a scrollbar from appearing on the screen.

## Inspiration And Conception
Quiet Waters is a psychological horror fishing simulator built with p5.js that explores the mechanical representation of a descending spiral into madness. Inspired by online discussions regarding this idea of blending these two vastly different game genres, I wanted to subvert the traditionally relaxing genre of fishing by including a variety of 'mutated' fish and unsettling items one would certainly not expect to find in the sea. At the same time, I intended to keep the atmosphere of a calm fishing game by using pixel art to draw the game's assets, styling the game in a way reminiscent of retro-style arcade games. I added my own background music into the game as well to truly set the initial scenario for Quiet Waters: a typical, mundane day of fishing for leisure, nothing too exciting.

## Features and Implementations
Spoilers ahead regarding game contents!

### Insanity Levels
I used three 'insanity' levels of increasing horror in order to blend the horror and fishing genres, rather than instantly introducing the player to the horror aspect in full force. When the game starts at level 0, nothing appears to be out of the ordinary. Most of the fish or items you catch will be typical of a fishing game, too. Two odd items will appear in this level though; these add to your 'insanity'. At higher insanity levels, more strange, unsettling items or mutated fish will appear and continue to increase your 'insanity', gradually increasing in gruesomeness with each level. The highest level, level 3, contains the grisliest items. <br> <br>
For levels 0 and 1, each time you catch an item that increases your 'insanity', the background is ever so slightly tinted darker or redder. With my background music playing, I planned for the player to be lulled into a false sense of security. Even with the slight tints, the change would be so subtle that the player would likely be unaware of it, especially with the first few colour shifts. Another more obvious change takes place when the player reaches levels 1 and 2: the fishing rod, MP3 player and bucket sprites are changed, appearing as though they have been 'infected'. Flesh seems to take over the rod and MP3 player, while the water in the bucket seems to get murkier. Apart from indicating that the next insanity level has been reached, I used these changes to further emphasise the increasing horror factor at each insanity level.

### Random Selection Of Fish
At all insanity levels, a 'gacha' system is used to select which item the player gets. In gameLogic.js, by assigning the items a range of numbers between 0 and 100 using random(100), the random number generated will fall in a range belonging to a certain item, which will be selected and displayed on-screen as the player's catch. The ranges belonging to each item are changed according to what items can be caught at specific insanity levels.

### Pity System
With the system utilised for choosing what the player would get, I realised that without something to make sure the player would eventually catch an insanity-raising item, the chance that the player could cast their line hundreds of times without ever catching one was certain to occur. To avoid this and ensure that the player can progress through the game, every fifth time the player casts their line, they are guaranteed to get an insanity-raising item and thus increase their insanity. This 'forced catch' feature makes sure that the player can experience every level of horror the game has to offer, as well as preventing stagnation of progress. However, this system is not applied to level 2, as every item caught will raise insanity, and level 3, the highest level.

### Inventory System
When the player catches something, they can choose to either let go of it by pressing 'Esc' or keep it by pressing 'E'. The latter option will push the name of the item to the inventory array in state.js. By clicking on the bucket sprite, the player can access the inventory menu where they can view all the items they chose to keep. The contents of the inventory menu can be scrolled through, with the most recently caught items placed at the bottom of the list, as they are appended to the inventory array.

### Music Toggle
I only have one settings toggle for this game, that being whether background music is turned on. Rather than having a settings icon to open up a menu to switch off the background music, I decided to add the MP3 player. Clicking its sprite will turn the music on or off, depending on its previous state. The appearance of the MP3 player shifts along with the other elements in the game, too.

## 'Fishables' - Items That Can Be Collected In-Game
### Level 0 Insanity
* Bluestripe Snapper
* Red Snapper
* Blackfin Tuna
* Canary Blenny
* Black Toupee
* Soggy Wallet
* Wiggling Ribbon Eel
* Human Tooth
### Level 1 Insanity
* Bluestripe Snapper
* Red Snapper
* Blackfin Tuna
* Canary Blenny
* Black Toupee
* Soggy Wallet
* Oily Tuna
* Pale Snapper
* Bloated Blenny
* Rotten Sardine
* Sinuous Seer
* Human Tooth
### Level 2 Insanity
* Oily Tuna
* Pale Snapper
* Bloated Blenny
* Rotten Sardine
* Sinuous Seer
* Human Tooth
* Eyeball
* Hollow Mask
* Ossified Jellyfish
* Gaping Tin
### Level 3 Insanity
* Oily Tuna
* Pale Snapper
* Rotten Sardine
* Sinuous Seer
* Human Tooth
* Eyeball
* Hollow Mask
* Ossified Jellyfish
* Gaping Tin
* Pale Pedestal
* Heart of the Sea
