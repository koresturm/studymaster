<script context="module" lang="ts">
    export let gamepadController: GamepadController
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import GamepadController from '../lib/gamepad'
  import { toast } from './toast/ToastManager.svelte'

  onMount(() => {

    gamepadController = new GamepadController({ deadzone: 0.5 })

    gamepadController.on('connect', (gamepad) => {
      toast({
        message: `Gamepad connected: ${(gamepad as any).id}`,
        type: 'success',
        duration: 2000
      })
    })
  
    gamepadController.on('disconnect', (gamepad) => {
      toast({
        message: `Gamepad disconnected: ${(gamepad as any).id}`,
        type: 'error',
        duration: 2000
      })
    })
  
    
    function gameLoop() {
      gamepadController.update()
      requestAnimationFrame(gameLoop)
    }
  
    gameLoop()
  })

</script>
