const SoundMap = {
    navigate: './assets/audio/sfx/navigate-sfx.mp3',
    select: './assets/audio/sfx/select-sfx.mp3',
    back: './assets/audio/sfx/back-sfx.mp3',
}

type SFXTypes = keyof typeof SoundMap

const audio = new Audio()

export const SFX = {
    play(name: SFXTypes , sep = false) {
        const a = (sep ? new Audio() : audio)

        a.src = SoundMap[name]

        a.play()
    }
}