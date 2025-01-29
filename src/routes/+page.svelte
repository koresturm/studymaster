<script lang="ts">
  import GamepadInitiator from "@components/GamepadInitiator.svelte"
  import ScreenManager from "@components/navigation/ScreenManager.svelte"
  import ToastManager from "@components/toast/ToastManager.svelte"
  import KeyboardInitiator from "@components/KeyboardInitiator.svelte"
  
  import ExitScreen from "@screen/ExitScreen.svelte"
  import HomeScreen from "@screen/HomeScreen.svelte"
  import NewRealityScreen from "@screen/NewRealityScreen.svelte"
  import SettingsScreen from "@screen/SettingsScreen.svelte"
  import SelectRealityScreen from "@screen/SelectRealityScreen.svelte"
  import MenuScreen from "@screen/MenuScreen.svelte";
</script>

<KeyboardInitiator />

<GamepadInitiator />

<ToastManager />

<ScreenManager let:active_screen>
  {#if active_screen == 'home'}
    <HomeScreen />
  {/if}
  {#if active_screen == 'new reality'}
    <NewRealityScreen />
  {/if}
  {#if active_screen == 'select reality'}
    <SelectRealityScreen />
  {/if}
  {#if active_screen == 'settings'}
    <SettingsScreen />
  {/if}
  {#if active_screen == 'menu'}
    <MenuScreen />
  {/if}
  {#if active_screen == 'exit'}
    <ExitScreen />
  {/if}
</ScreenManager>