# Sound Assets for Flappy Bird

This folder contains all the sound effects and background music for the Flappy Bird game.

## Required Sound Files

You need to add the following audio files to this directory:

### 1. **flap.mp3** and **flap.ogg**
- **Description**: Sound played when the bird flaps/jumps
- **Trigger**: When player presses SPACE, clicks, or taps the screen
- **Recommended**: Short "whoosh" or "flap" sound (0.1-0.3 seconds)
- **Example sources**:
  - https://freesound.org/people/qubodup/sounds/442827/ (Wing Flap)
  - https://freesound.org/people/InspectorJ/sounds/415209/ (Swoosh)

### 2. **score.mp3** and **score.ogg**
- **Description**: Sound played when successfully passing through a pipe
- **Trigger**: When bird passes a pipe and score increases
- **Recommended**: Pleasant "ding" or "coin" sound (0.1-0.5 seconds)
- **Example sources**:
  - https://freesound.org/people/LittleRobotSoundFactory/sounds/270303/ (Pickup Coin)
  - https://freesound.org/people/plasterbrain/sounds/242857/ (Coin)

### 3. **hit.mp3** and **hit.ogg**
- **Description**: Sound played when bird collides with pipe or ground (game over)
- **Trigger**: When collision is detected
- **Recommended**: "Thud" or "crash" sound (0.2-0.5 seconds)
- **Example sources**:
  - https://freesound.org/people/InspectorJ/sounds/448226/ (Thud)
  - https://freesound.org/people/deleted_user_877451/sounds/76376/ (Game Over)

### 4. **background.mp3** and **background.ogg** (Optional)
- **Description**: Looping background music during gameplay
- **Trigger**: Starts when game begins, stops on game over
- **Recommended**: Upbeat, retro 8-bit style music (loopable)
- **Example sources**:
  - https://freesound.org/people/joshuaempyre/sounds/251461/ (8-bit Loop)
  - https://incompetech.com/ (Royalty-free music)

## File Format Notes

- **MP3**: Widely supported, good compression
- **OGG**: Better quality at same file size, good browser support
- Both formats are provided for maximum browser compatibility

## How to Add Sound Files

1. Download or create your sound files
2. Convert them to both MP3 and OGG formats (use online converters like https://cloudconvert.com/)
3. Place them in this `assets/sounds/` directory
4. Ensure file names match exactly:
   - `flap.mp3` and `flap.ogg`
   - `score.mp3` and `score.ogg`
   - `hit.mp3` and `hit.ogg`
   - `background.mp3` and `background.ogg`

## Free Sound Resources

### Sound Effect Libraries
- **Freesound.org**: https://freesound.org/ (Creative Commons licensed sounds)
- **Zapsplat**: https://www.zapsplat.com/ (Free sound effects)
- **Mixkit**: https://mixkit.co/free-sound-effects/ (Free game sounds)
- **OpenGameArt**: https://opengameart.org/ (Game assets including sounds)

### Music Libraries
- **Incompetech**: https://incompetech.com/ (Royalty-free music by Kevin MacLeod)
- **FreePD**: https://freepd.com/ (Public domain music)
- **Bensound**: https://www.bensound.com/ (Free music with attribution)

## Creating Your Own Sounds

You can also create simple 8-bit sounds using:
- **Bfxr**: https://www.bfxr.net/ (Browser-based retro sound generator)
- **ChipTone**: https://sfbgames.itch.io/chiptone (Retro game sound effects)
- **Audacity**: https://www.audacityteam.org/ (Free audio editor)

## Testing

The game will work without sound files, but you'll see console warnings. To test:
1. Add at least one sound file (e.g., flap.mp3)
2. Open the game in a browser
3. Check the browser console for any audio loading errors
4. Test the sound toggle button to ensure sounds play correctly

## License Reminder

Make sure any sounds you use are:
- Royalty-free or Creative Commons licensed
- Properly attributed if required
- Suitable for your project's use case (personal/commercial)

---

**Note**: The game is fully functional without sound files. Sounds enhance the experience but are not required for gameplay.

