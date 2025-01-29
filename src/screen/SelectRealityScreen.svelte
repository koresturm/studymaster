<script lang="ts">
  import Screen from "@components/navigation/Screen.svelte"
  import StatusBar from "@components/StatusBar.svelte"

  
</script>

<Screen name="select reality" class="flex flex-col relative z-0" active="0" let:active>

    <div class="size-full absolute top-0 left-0 right-0 bottom-0 -z-10">
      <img src="./assets/images/play.jpg" alt="Play" class="size-full object-cover" />
    </div>

    <div class="flex-1 flex flex-col justify-center items-center text-white bg-[#00000050] backdrop-blur-3xl">

        <h1 class="text-3xl uppercase">Select a reality</h1>

    </div>

    <StatusBar />
</Screen>