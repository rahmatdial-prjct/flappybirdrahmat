# 🚀 Quick Start Guide - Flappy Bird

Get your Flappy Bird game up and running in 60 seconds!

## ⚡ Fastest Way to Play

### Option 1: Double-Click (Instant)
1. Navigate to the project folder
2. Double-click `index.html`
3. The game opens in your default browser
4. Click "START GAME" and play!

**Note**: Sounds may not work with this method in some browsers due to security restrictions.

---

## 🔊 For Full Experience with Sounds

### Step 1: Add Sound Files (Optional but Recommended)

#### Quick Method - Use Placeholder Sounds
You can create simple beep sounds or download free sounds:

**Free Sound Resources:**
- Visit https://www.bfxr.net/ to generate retro game sounds
- Download from https://freesound.org/ (search for "flap", "coin", "hit")
- Use https://mixkit.co/free-sound-effects/game/

**Required Files:**
Place these in `assets/sounds/` folder:
- `flap.mp3` - Bird flap sound
- `score.mp3` - Score point sound  
- `hit.mp3` - Collision sound
- `background.mp3` - Background music (optional)

See `assets/sounds/README.md` for detailed instructions.

### Step 2: Run a Local Server

**Using Node.js (if installed):**
```bash
npx http-server -p 8000
```

**Using PHP (if installed):**
```bash
php -S localhost:8000
```

**Using VS Code:**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Click "Open with Live Server"

### Step 3: Open in Browser
Navigate to `http://localhost:8000`

---

## 🎮 Game Controls

| Action | Control |
|--------|---------|
| Flap/Jump | SPACE key |
| Flap/Jump | Mouse Click |
| Flap/Jump | Screen Tap (mobile) |
| Toggle Sound | Sound button on start screen |
| View Skins | "SKINS" button |

---

## 🎨 Unlocking Skins

Play the game and reach these scores to unlock new bird skins:

- ✅ **Classic** (Yellow) - Available from start
- 🔓 **Red Bird** - Score 5 points
- 🔓 **Blue Bird** - Score 10 points
- 🔓 **Green Bird** - Score 15 points
- 🔓 **Purple Bird** - Score 20 points
- 🔓 **Golden Bird** - Score 30 points
- 🔓 **Rainbow Bird** - Score 50 points (special!)

**Your progress is automatically saved!**

---

## ❓ Troubleshooting

### Game doesn't start?
- Make sure JavaScript is enabled in your browser
- Try a different browser (Chrome, Firefox, Edge)
- Check browser console (F12) for errors

### No sound?
- Sounds are optional - game works without them
- Add sound files to `assets/sounds/` folder
- Use a local server instead of opening file directly
- Click the sound toggle button to check if it's enabled
- Some browsers block autoplay - click on the page first

### Skins not saving?
- Make sure you're not in private/incognito mode
- Check if localStorage is enabled in browser settings
- Try clearing browser cache

### Game is too hard/easy?
- Edit `game.js` and adjust these values:
  - `GRAVITY` - Higher = bird falls faster
  - `JUMP_VELOCITY` - More negative = bird jumps higher
  - `PIPE_GAP` - Larger = easier to pass through
  - `PIPE_SPEED` - Lower = slower pipes

---

## 📱 Mobile Play

The game works great on mobile devices!

1. Open `index.html` on your phone's browser
2. Tap anywhere on the screen to make the bird flap
3. Use the "FLY (Flap)" button at the bottom if needed
4. Add to home screen for app-like experience

---

## 🎯 Tips for High Scores

1. **Don't spam** - Tap rhythmically, not constantly
2. **Stay centered** - Aim for the middle of gaps
3. **Plan ahead** - Look at the next pipe while passing current one
4. **Practice patience** - The bird has momentum, time your taps
5. **Unlock skins** - Try different skins for motivation!

---

## 📂 Project Files

```
├── index.html          ← Open this file to play
├── styles.css          ← Game styling
├── game.js             ← Game logic
├── README.md           ← Full documentation
├── QUICKSTART.md       ← This file
└── assets/
    ├── sounds/         ← Add sound files here
    └── images/         ← Optional images
```

---

## 🎉 You're Ready!

**Just open `index.html` and start playing!**

For more details, see the full `README.md` file.

---

**Have fun and try to beat your high score! 🏆**

