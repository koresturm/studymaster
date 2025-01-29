<script lang="ts">
  import GridLayoutManager from "@components/navigation/GridLayoutManager.svelte";
import LayoutManagerItem from "@components/navigation/LayoutManagerItem.svelte";
  import Screen from "@components/navigation/Screen.svelte";
  import { push_screen } from "@components/navigation/ScreenManager.svelte";
  import StatusBar from "@components/StatusBar.svelte";
  import checkForAppUpdates from "@lib/updater";
</script>

<Screen
  name="settings"
  class="flex flex-col relative z-0"
  active="0"
  let:active
  let:change_active_item
>
  <div class="size-full absolute top-0 left-0 right-0 bottom-0 -z-10">
    <img
      src="./assets/images/menu.jpg"
      alt="Menu"
      class="size-full object-cover"
    />
  </div>

  <div
    class="flex flex-col justify-center items-center flex-1 text-white bg-[#00000050] backdrop-blur-3xl"
  >
    <GridLayoutManager cols={2} class="h-[500px] w-[800px] flex flex-col gap-8">
        <LayoutManagerItem
            layout_item={{
                id: '0',
                events: {
                    select: () => push_screen('settings'),
                    right: () => change_active_item('1'),
                    left: () => change_active_item('1')
                }
            }}
        >
            <div class="shadow-lg flex w-full p-4 {active == '0'
              ? 'bg-white text-black'
              : 'bg-[#00000050]'}">
                <h1 class="text-3xl uppercase">Settings</h1>
            </div>
        </LayoutManagerItem>

        <LayoutManagerItem
            layout_item={{
                id: '1',
                events: {
                    select: () => checkForAppUpdates(true),
                    right: () => change_active_item('0'),
                    left: () => change_active_item('0')
                }
            }}
        >
            <div class="shadow-lg flex w-full p-4 {active == '1'
              ? 'bg-white text-black'
              : 'bg-[#00000050]'}">
                <h1 class="text-3xl uppercase">Check for updates</h1>
            </div>
        </LayoutManagerItem>
    </GridLayoutManager>
  </div>

  <StatusBar />
</Screen>
