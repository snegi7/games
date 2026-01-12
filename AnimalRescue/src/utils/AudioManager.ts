/**
 * AudioManager - Singleton for reliable mobile audio playback
 * 
 * Mobile browsers (especially iOS Safari) require:
 * 1. Audio elements to be "blessed" by a direct user gesture
 * 2. The first play() to happen synchronously in the gesture handler
 * 3. Reusing the same audio element (not creating new ones)
 */

class AudioManagerClass {
  private bgMusicElement: HTMLAudioElement | null = null;
  private sfxElements: Map<string, HTMLAudioElement> = new Map();
  private isUnlocked = false;
  private pendingBgMusic: string | null = null;
  private bgMusicVolume = 0.25;
  private isMuted = false;

  constructor() {
    // Set up user interaction listeners immediately
    this.setupUnlockListeners();
  }

  private setupUnlockListeners() {
    const events = ['touchstart', 'touchend', 'click', 'pointerdown', 'keydown'];
    
    const unlockHandler = () => {
      if (this.isUnlocked) return;
      this.unlock();
    };

    // Use capture phase to ensure we get the event first
    events.forEach(event => {
      document.addEventListener(event, unlockHandler, { capture: true, passive: true });
    });
  }

  /**
   * Unlock audio - called on first user interaction
   * This "blesses" our audio elements for future playback
   */
  private unlock() {
    if (this.isUnlocked) return;

    // Create the background music element if it doesn't exist
    if (!this.bgMusicElement) {
      this.bgMusicElement = new Audio();
      this.bgMusicElement.loop = true;
      this.bgMusicElement.volume = this.bgMusicVolume;
      this.bgMusicElement.preload = 'auto';
    }

    // The key trick: play a silent/short audio to unlock
    // We set the src to empty and play - this "blesses" the element
    const silentDataUrl = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
    
    this.bgMusicElement.src = silentDataUrl;
    this.bgMusicElement.volume = 0;
    
    const playPromise = this.bgMusicElement.play();
    if (playPromise) {
      playPromise
        .then(() => {
          this.isUnlocked = true;
          this.bgMusicElement!.pause();
          this.bgMusicElement!.volume = this.bgMusicVolume;
          
          console.log('🔊 Audio unlocked!');
          
          // If there was pending background music, play it now
          if (this.pendingBgMusic) {
            this.playBgMusic(this.pendingBgMusic);
          }
        })
        .catch((err) => {
          console.log('Audio unlock failed:', err);
        });
    }
  }

  /**
   * Check if audio is unlocked
   */
  isAudioUnlocked(): boolean {
    return this.isUnlocked;
  }

  /**
   * Play background music
   * @param src - The audio source URL
   */
  playBgMusic(src: string) {
    if (!this.bgMusicElement) {
      this.bgMusicElement = new Audio();
      this.bgMusicElement.loop = true;
      this.bgMusicElement.volume = this.bgMusicVolume;
      this.bgMusicElement.preload = 'auto';
    }

    // If not unlocked yet, queue it for later
    if (!this.isUnlocked) {
      this.pendingBgMusic = src;
      console.log('🎵 Background music queued, waiting for user tap...');
      return;
    }

    // If already playing this source, don't restart
    if (this.bgMusicElement.src === src && !this.bgMusicElement.paused) {
      return;
    }

    this.pendingBgMusic = null;
    
    // Stop current playback
    this.bgMusicElement.pause();
    
    // Set new source and play
    this.bgMusicElement.src = src;
    this.bgMusicElement.volume = this.isMuted ? 0 : this.bgMusicVolume;
    this.bgMusicElement.currentTime = 0;
    
    this.bgMusicElement.play().catch((err) => {
      console.log('Background music play failed:', err);
    });
  }

  /**
   * Stop background music
   */
  stopBgMusic() {
    this.pendingBgMusic = null;
    if (this.bgMusicElement) {
      this.bgMusicElement.pause();
      this.bgMusicElement.currentTime = 0;
    }
  }

  /**
   * Pause background music (keeps position)
   */
  pauseBgMusic() {
    if (this.bgMusicElement) {
      this.bgMusicElement.pause();
    }
  }

  /**
   * Resume background music
   */
  resumeBgMusic() {
    if (this.bgMusicElement && this.bgMusicElement.src && this.isUnlocked) {
      this.bgMusicElement.play().catch(() => {});
    }
  }

  /**
   * Set background music volume
   */
  setBgMusicVolume(volume: number) {
    this.bgMusicVolume = Math.max(0, Math.min(1, volume));
    if (this.bgMusicElement && !this.isMuted) {
      this.bgMusicElement.volume = this.bgMusicVolume;
    }
  }

  /**
   * Play a sound effect
   * @param src - The audio source URL
   * @param volume - Volume (0-1)
   */
  playSfx(src: string, volume = 0.7): HTMLAudioElement | null {
    if (!this.isUnlocked) {
      console.log('🔇 SFX skipped - audio not unlocked yet');
      return null;
    }

    // Reuse existing audio element if available, otherwise create new one
    let audio = this.sfxElements.get(src);
    
    if (!audio) {
      audio = new Audio(src);
      audio.preload = 'auto';
      this.sfxElements.set(src, audio);
    }

    audio.volume = this.isMuted ? 0 : volume;
    audio.currentTime = 0;
    
    audio.play().catch((err) => {
      console.log('SFX play failed:', err);
    });

    return audio;
  }

  /**
   * Mute/unmute all audio
   */
  setMuted(muted: boolean) {
    this.isMuted = muted;
    
    if (this.bgMusicElement) {
      this.bgMusicElement.volume = muted ? 0 : this.bgMusicVolume;
    }
    
    this.sfxElements.forEach((audio) => {
      audio.volume = muted ? 0 : 0.7;
    });
  }

  /**
   * Check if muted
   */
  isMutedState(): boolean {
    return this.isMuted;
  }

  /**
   * Preload an audio file
   */
  preload(src: string) {
    if (!this.sfxElements.has(src)) {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = src;
      this.sfxElements.set(src, audio);
    }
  }
}

// Export singleton instance
export const AudioManager = new AudioManagerClass();
