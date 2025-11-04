# 🐦 Flappy Bird - Classic Game

A complete, feature-rich Flappy Bird clone built with vanilla JavaScript, HTML5 Canvas, and CSS. This game includes sound effects, unlockable skins, localStorage persistence, and optimized performance.

![Flappy Bird Game](https://img.shields.io/badge/Game-Flappy%20Bird-yellow?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-blue?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange?style=for-the-badge)

## ✨ Features

### Core Gameplay
- **Classic Flappy Bird mechanics** - Authentic physics and controls
- **Smooth 60 FPS animations** - Optimized game loop using `requestAnimationFrame`
- **Responsive design** - Works on desktop and mobile devices
- **Multiple control options** - Keyboard (SPACE), mouse click, or touch controls
- **Score tracking** - Real-time score display with high score persistence

### Sound System 🔊
- **Flap sound** - Plays when bird jumps
- **Score sound** - Plays when passing through pipes
- **Hit sound** - Plays on collision (game over)
- **Background music** - Optional looping music during gameplay
- **Sound toggle** - Mute/unmute all sounds with one button
- **Graceful fallback** - Game works perfectly without sound files

### Unlockable Skins System 🎨
- **7 unique bird skins** - Each with distinct colors and styles
- **Progressive unlocking** - Unlock skins by reaching score milestones:
  - 🟡 **Classic** (Yellow) - Unlocked by default
  - 🔴 **Red Bird** - Unlock at 5 points
  - 🔵 **Blue Bird** - Unlock at 10 points
  - 🟢 **Green Bird** - Unlock at 15 points
  - 🟣 **Purple Bird** - Unlock at 20 points
  - 🟠 **Golden Bird** - Unlock at 30 points
  - 🌈 **Rainbow Bird** - Unlock at 50 points (special animated gradient)
- **Skin selection menu** - Visual preview of all skins with lock/unlock status
- **Persistent progress** - Unlocked skins saved to localStorage
- **Unlock notifications** - Get notified when you unlock new skins

### Performance Optimizations ⚡
- **Efficient rendering** - Only redraws what's necessary
- **Object pooling** - Pipes are removed when off-screen
- **Clamped physics** - Prevents extreme velocity values
- **Optimized collision detection** - Early exit conditions for better performance
- **Canvas optimization** - Proper use of `save()`/`restore()` and transforms

## 📁 Project Structure

```
flappy-bird/
├── index.html              # Main HTML file with semantic structure
├── styles.css              # All CSS styling and animations
├── game.js                 # Complete game logic and mechanics
├── README.md               # This file
├── assets/
│   ├── sounds/             # Audio files directory
│   │   ├── README.md       # Sound files guide and resources
│   │   ├── flap.mp3        # (Add your sound file here)
│   │   ├── flap.ogg        # (Add your sound file here)
│   │   ├── score.mp3       # (Add your sound file here)
│   │   ├── score.ogg       # (Add your sound file here)
│   │   ├── hit.mp3         # (Add your sound file here)
│   │   ├── hit.ogg         # (Add your sound file here)
│   │   ├── background.mp3  # (Add your sound file here)
│   │   └── background.ogg  # (Add your sound file here)
│   └── images/             # Image assets directory (optional)
│       └── README.md       # Image assets guide
└── prototype.md            # Original prototype (reference)
```

## 🚀 How to Run

### Option 1: Direct File Opening (Easiest)
1. Simply open `index.html` in any modern web browser
2. Click "START GAME" button or press SPACE to begin
3. Play immediately!

### Option 2: Local Server (Recommended for sound)
For better audio support, run a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (npx):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## 🎮 How to Play

### Controls
- **SPACE** - Make the bird flap (jump)
- **CLICK** - Make the bird flap (works on desktop and mobile)
- **TAP** - Make the bird flap (mobile touch)

### Objective
- Navigate the bird through gaps between pipes
- Each pipe you pass increases your score by 1
- Avoid hitting pipes, the ground, or the ceiling
- Try to beat your high score!

### Tips
- Timing is everything - don't spam the flap button
- The bird has momentum - plan your flaps ahead
- Unlock all 7 skins by reaching higher scores
- Use the sound toggle if you prefer silent gameplay

## 🎨 Skins System Explained

### How It Works
1. **Play the game** and achieve score milestones
2. **Unlock skins** automatically when you reach the required score
3. **Access the skins menu** from the start screen or game over screen
4. **Select your favorite skin** - your choice is saved automatically
5. **Progress persists** - unlocked skins remain available even after closing the browser

### Unlock Requirements
| Skin | Color | Unlock Score | Special Feature |
|------|-------|--------------|-----------------|
| Classic | Yellow | 0 (Default) | Original bird |
| Red Bird | Red | 5 points | - |
| Blue Bird | Blue | 10 points | - |
| Green Bird | Green | 15 points | - |
| Purple Bird | Purple | 20 points | - |
| Golden Bird | Gold | 30 points | - |
| Rainbow Bird | Multi-color | 50 points | Animated gradient! |

### Technical Implementation
- Skins are stored in the `SKINS` object in `game.js`
- Unlock status is saved to `localStorage`
- Each skin has unique colors for body, beak, and eyes
- The Rainbow skin features a special animated gradient effect

## 🔊 Adding Sound Files

The game is **fully functional without sound files**, but sounds greatly enhance the experience.

### Quick Setup
1. Navigate to `assets/sounds/`
2. Read the `README.md` file for detailed instructions
3. Download or create sound files (see resources below)
4. Add files with exact names: `flap.mp3`, `score.mp3`, `hit.mp3`, `background.mp3`
5. Optionally add `.ogg` versions for better browser compatibility

### Free Sound Resources
- **Freesound.org** - https://freesound.org/ (Creative Commons sounds)
- **Bfxr** - https://www.bfxr.net/ (Generate retro game sounds)
- **Mixkit** - https://mixkit.co/free-sound-effects/game/
- **OpenGameArt** - https://opengameart.org/

See `assets/sounds/README.md` for detailed sound specifications and more resources.

## 🛠️ Technical Details

### Technologies Used
- **HTML5 Canvas** - For rendering game graphics
- **Vanilla JavaScript (ES6+)** - No frameworks or libraries
- **CSS3** - Styling and animations
- **Tailwind CSS (CDN)** - Utility classes for layout
- **Web Audio API** - Sound effects and music
- **localStorage API** - Persistent data storage

### Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Responsive Design
- ✅ Desktop (1920x1080 and above)
- ✅ Laptop (1366x768)
- ✅ Tablet Portrait (768x1024)
- ✅ Tablet Landscape (1024x768)
- ✅ Mobile Portrait (375x667 and up)
- ✅ Mobile Landscape (667x375 and up)
- ✅ Automatically adapts to screen size
- ✅ Maintains aspect ratio on all devices

### Performance Features
- Consistent 60 FPS on modern devices
- Efficient collision detection with early exits
- Proper cleanup of off-screen objects
- Optimized canvas rendering with transforms
- Velocity clamping to prevent physics glitches

## 📝 Code Structure

### game.js Organization
1. **Configuration & Constants** - Game settings and physics values
2. **Game State** - Variables tracking current game status
3. **Skins System** - Skin definitions and unlock logic
4. **Bird Object** - Bird creation, drawing, and physics
5. **Pipe Object** - Pipe creation, drawing, and movement
6. **Game Functions** - Core game loop and logic
7. **Sound Functions** - Audio playback and management
8. **Skins Functions** - Skin menu and selection
9. **Storage Functions** - localStorage save/load
10. **Event Handlers** - User input handling
11. **Initialization** - Game startup

### Key Functions
- `gameLoop()` - Main game loop (60 FPS)
- `checkCollisions()` - Detects bird-pipe and bird-ground collisions
- `createBird()` - Factory function for bird objects
- `createPipe()` - Factory function for pipe objects
- `saveGameData()` / `loadGameData()` - Persistence layer

## 🎯 Future Enhancement Ideas

- [ ] Add particle effects for collisions
- [ ] Implement difficulty levels (faster pipes, smaller gaps)
- [ ] Add achievements system
- [ ] Create leaderboard with online storage
- [ ] Add day/night cycle backgrounds
- [ ] Implement power-ups (shield, slow-motion, etc.)
- [ ] Add sprite-based graphics option
- [ ] Create level progression system
- [ ] Add social sharing for high scores
- [ ] Implement gamepad support

## 🐛 Troubleshooting

### Sounds Not Playing
- Check browser console for errors
- Ensure sound files are in `assets/sounds/` with correct names
- Try using a local server instead of opening file directly
- Check if sound is enabled (toggle button)
- Some browsers block autoplay - interact with page first

### Game Not Starting
- Check browser console for JavaScript errors
- Ensure all files are in correct locations
- Try hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Verify browser supports HTML5 Canvas

### Skins Not Saving
- Check if localStorage is enabled in browser
- Clear browser cache and try again
- Check browser console for storage errors
- Ensure you're not in private/incognito mode

## 📄 License

This project is open source and available for personal and educational use. 

**Sound files** (if you add them) must comply with their respective licenses. See `assets/sounds/README.md` for licensing information on sound resources.

## 🙏 Credits

- **Original Flappy Bird** - Created by Dong Nguyen
- **This Implementation** - Built from scratch with modern web technologies
- **Font** - "Press Start 2P" by CodeMan38 (Google Fonts)
- **Tailwind CSS** - Utility-first CSS framework

## 📧 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the code comments in `game.js`
3. Check browser console for error messages
4. Ensure all files are properly linked

---

**Enjoy the game! 🎮 Try to unlock all skins and beat your high score!** 🏆

