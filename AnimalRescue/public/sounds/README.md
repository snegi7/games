# Sound Files for Animal Rescue

This directory contains sound effects for the game. The game uses Web Audio API synthesized sounds as fallbacks when audio files aren't available.

## Required Sound Files

### Background Music
- `forest-fire-suspense.mp3` - Suspenseful music for forest fire plot (loop)
- `ocean-crisis-suspense.mp3` - Suspenseful music for ocean oil spill plot (loop)

### UI Sounds
- `clock-tick.mp3` - Clock tick sound (plays every second when timer < 6s)
- `success-chime.mp3` - Happy chime when answering correctly
- `wrong-buzzer.mp3` - Buzzer sound for wrong answers
- `failure-sad.mp3` - Sad sound when game ends in failure

### Animal Sounds (in `animals/` subfolder)
- `lion-roar.mp3` - Lion roar
- `elephant-trumpet.mp3` - Elephant trumpet
- `zebra-neigh.mp3` - Zebra neigh/whinny
- `monkey-chatter.mp3` - Monkey chattering
- `giraffe-hum.mp3` - Giraffe humming
- `bubbles.mp3` - Bubble sounds (for clownfish)
- `splash.mp3` - Splash sound (for turtle)
- `dolphin-click.mp3` - Dolphin clicks and whistles
- `underwater-bubbles.mp3` - Underwater bubbles (for octopus)
- `whale-song.mp3` - Whale song

## Recommended Sources for Free Sounds

1. **Freesound.org** - https://freesound.org
   - Large library of Creative Commons sounds
   - Search for "lion roar", "clock tick", etc.

2. **Pixabay** - https://pixabay.com/sound-effects/
   - Free sound effects, no attribution required

3. **Zapsplat** - https://www.zapsplat.com
   - Free with attribution

## Audio Format

- Format: MP3 (best compatibility)
- Sample Rate: 44100 Hz
- Bit Rate: 128-192 kbps
- Duration: 
  - Music loops: 30-60 seconds
  - Sound effects: 0.1-2 seconds
  - Animal sounds: 1-3 seconds

## Fallback

If audio files are not present, the game uses Web Audio API to generate synthesized sounds. These work but real audio files provide a much better experience!
