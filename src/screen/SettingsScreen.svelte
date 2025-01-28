<script lang="ts">
  import Screen from "@components/navigation/Screen.svelte"
  import StatusBar from "@components/StatusBar.svelte"
</script>

<Screen name="settings" class="flex flex-col relative z-0" active="0" let:active let:change_active_item>

  <div class="size-full absolute top-0 left-0 right-0 bottom-0 -z-10">
    <img src="./assets/images/settings.jpg" alt="New Reality" class="size-full object-cover" />
  </div>

  <div class="flex flex-col justify-center items-center flex-1 text-white bg-[#00000050] backdrop-blur-3xl">
      <h1 class="text-3xl">Settings</h1>
  </div>

  <StatusBar />
</Screen>