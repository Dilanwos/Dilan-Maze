/* ==========================================
   SISTEMA DE AUDIO - PAC-MAN
   ========================================== */

class AudioSystem {
    constructor() {
        this.audioContext = null;
        this.isMuted = false;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (e) {
            console.warn('Web Audio API no soportado:', e);
        }
    }

    // Obtener contexto de audio (crea si es necesario por interacción del usuario)
    getAudioContext() {
        if (!this.audioContext) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        }
        // Reanudar si está suspendido (por restricciones del navegador)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        return this.audioContext;
    }

    // Sonido de comer punto (beep corto)
    playEatSound() {
        if (this.isMuted) return;
        try {
            const ctx = this.getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.frequency.value = 600;
            osc.type = 'triangle';
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.05);
        } catch (e) {
            console.warn('Error al reproducir sonido:', e);
        }
    }

    // Sonido de recolectar power-up
    playPowerUpSound() {
        if (this.isMuted) return;
        try {
            const ctx = this.getAudioContext();
            const notes = [880, 1100, 1320]; // Tonos ascendentes

            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.frequency.value = freq;
                osc.type = 'sine';

                const startTime = ctx.currentTime + (i * 0.1);
                gain.gain.setValueAtTime(0.2, startTime);
                gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);

                osc.start(startTime);
                osc.stop(startTime + 0.1);
            });
        } catch (e) {
            console.warn('Error al reproducir sonido:', e);
        }
    }

    // Sonido de muerte
    playDeathSound() {
        if (this.isMuted) return;
        try {
            const ctx = this.getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5);

            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.5);
        } catch (e) {
            console.warn('Error al reproducir sonido:', e);
        }
    }

    // Sonido de victoria / nivel completado
    playVictorySound() {
        if (this.isMuted) return;
        try {
            const ctx = this.getAudioContext();
            const notes = [523, 659, 784, 1047]; // C-E-G-C (acorde Do mayor)

            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.frequency.value = freq;
                osc.type = 'sine';

                const startTime = ctx.currentTime + (i * 0.15);
                gain.gain.setValueAtTime(0.15, startTime);
                gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

                osc.start(startTime);
                osc.stop(startTime + 0.3);
            });
        } catch (e) {
            console.warn('Error al reproducir sonido:', e);
        }
    }

    // Sonido de inicio de juego
    playGameStartSound() {
        if (this.isMuted) return;
        try {
            const ctx = this.getAudioContext();

            // Primera nota
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.frequency.value = 392;
            gain1.gain.setValueAtTime(0.2, ctx.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            osc1.start(ctx.currentTime);
            osc1.stop(ctx.currentTime + 0.2);

            // Segunda nota
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.frequency.value = 587;
            gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.3);
            gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            osc2.start(ctx.currentTime + 0.3);
            osc2.stop(ctx.currentTime + 0.5);
        } catch (e) {
            console.warn('Error al reproducir sonido:', e);
        }
    }

    // Sonido de que fantasma es comido
    playGhostEatenSound() {
        if (this.isMuted) return;
        try {
            const ctx = this.getAudioContext();
            const notes = [262, 294, 330, 349]; // Tonos ascendentes cortos

            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.frequency.value = freq;
                osc.type = 'triangle';

                const startTime = ctx.currentTime + (i * 0.08);
                gain.gain.setValueAtTime(0.15, startTime);
                gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.08);

                osc.start(startTime);
                osc.stop(startTime + 0.08);
            });
        } catch (e) {
            console.warn('Error al reproducir sonido:', e);
        }
    }

    // Toggle mute
    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    // Beep genérico
    playBeep(frequency = 800, duration = 0.1, volume = 0.3) {
        if (this.isMuted) return;
        try {
            const ctx = this.getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.frequency.value = frequency;
            osc.type = 'sine';
            gain.gain.setValueAtTime(volume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            console.warn('Error al reproducir sonido:', e);
        }
    }
}

// Crear instancia global
const audioSystem = new AudioSystem();
