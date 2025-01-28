<script lang="ts">
  import { TriangleIcon, XIcon } from 'lucide-svelte'
  import { translate } from '../lib/custom-transitions'
  import { onMount } from 'svelte'
  import { GAMEPAD_BUTTONS } from '../lib'
  import { SFX } from '../lib/sound'
  import { gamepadController } from './GamepadInitiator.svelte'
  import { pop_screen } from './navigation/ScreenManager.svelte'

  onMount(() => {
    return gamepadController.on('buttonpress', ({ button_index, pressed }) => {
      if(!pressed && button_index === GAMEPAD_BUTTONS.TRIANGLE_BUTTON) {
        pop_screen()
        SFX.play('select')
      }
    })
  })
</script>

<div transition:translate={{ axis: 'y' }} class="h-[50px] w-full fixed bottom-0 flex justify-between items-center text-white px-8">
  <div></div>

  <div class="flex gap-8 justify-center items-center">
    <div class="flex gap-2">
      <XIcon />
      <p>SELECT</p>
    </div>

    <div class="flex gap-2">
      <TriangleIcon />
      <p>BACK</p>
    </div>
  </div>
</div>
