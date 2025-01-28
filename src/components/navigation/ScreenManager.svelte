<script context="module" lang="ts">
  import { writable } from 'svelte/store'

  const screen_history = writable(['home'])

  export const push_screen = (screen: string) => {
    screen_history.update((v) => v[v.length - 1] == screen ? [...v] : [...v, screen])
    SFX.play('select', true)
  }

  export const pop_screen = () => {
    screen_history.update((v) => v.length > 1 ? v.slice(0, v.length - 1) : [...v])
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { gamepadController } from '../GamepadInitiator.svelte'
  import { GAMEPAD_BUTTONS } from '../../lib'
  import { SFX } from '../../lib/sound'

  $: active_screen = $screen_history[$screen_history.length - 1]

  onMount(() => {

    return gamepadController.on('buttonpress', ({ button_index, pressed }) => {

      if(!pressed && button_index === GAMEPAD_BUTTONS.SQUARE_BUTTON) {
        console.clear()
      }
    })
  })
</script>

<slot {active_screen}/>
