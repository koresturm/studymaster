<script context="module" lang="ts">
    export let keyboardController: KeyboardController

</script>

<script lang="ts">
  import { onMount } from "svelte"
  import KeyboardController from "../lib/keyboard"
  import { pop_screen } from "./navigation/ScreenManager.svelte"
  import { SFX } from "../lib/sound"

    onMount(() => {
        keyboardController = new KeyboardController()

        keyboardController.on('y', () => {
            pop_screen()
            SFX.play('select')
        })
    })
</script>