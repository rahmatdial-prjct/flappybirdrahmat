# Image Assets for Flappy Bird

This folder is reserved for any image assets you might want to add to the game in the future.

## Current Implementation

The current game uses **canvas-based rendering** with programmatically drawn shapes (rectangles for birds and pipes). No image files are required for the game to function.

## Potential Future Enhancements

If you want to enhance the game with sprite-based graphics, you could add:

### Bird Sprites
- Animated bird sprites for different skins
- Wing flapping animation frames
- File naming convention: `bird_classic.png`, `bird_red.png`, etc.

### Background Images
- Sky background with clouds
- Parallax scrolling backgrounds
- File naming: `background.png`, `clouds.png`

### Pipe Sprites
- Textured pipe graphics
- Pipe cap variations
- File naming: `pipe_top.png`, `pipe_bottom.png`

### UI Elements
- Custom buttons
- Logo/title image
- Icons for locked/unlocked skins
- File naming: `logo.png`, `button_start.png`, etc.

## Implementation Notes

To use images instead of canvas drawing:
1. Add image files to this directory
2. Preload images in `game.js` using `Image()` objects
3. Replace `ctx.fillRect()` calls with `ctx.drawImage()` in the draw methods
4. Ensure images are loaded before starting the game

## Example Code

```javascript
// Preload images
const birdImage = new Image();
birdImage.src = 'assets/images/bird_classic.png';

// Draw image instead of rectangle
birdImage.onload = () => {
    ctx.drawImage(birdImage, x, y, width, height);
};
```

---

**Note**: The current pixel-art style using canvas shapes maintains the retro aesthetic and keeps the game lightweight without requiring image assets.

