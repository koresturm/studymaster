<script lang="ts">
  import GridLayoutManager from '@components/navigation/GridLayoutManager.svelte'
  import LayoutManagerItem from '@components/navigation/LayoutManagerItem.svelte'
  import Screen from '@components/navigation/Screen.svelte'
  import { pop_screen } from '@components/navigation/ScreenManager.svelte'
  import StatusBar from '@components/StatusBar.svelte'
  import { getCurrentWindow } from '@tauri-apps/api/window';


  const exit = () => getCurrentWindow().close()
</script>

<Screen
  name="exit"
  class="flex flex-col items-center justify-center relative z-0"
  active="0"
  let:active
  let:change_active_item
>
  <div class="size-full absolute top-0 left-0 right-0 bottom-0 -z-10">
    <img src="./assets/images/exit.jpg" alt="Exit" class="size-full object-cover" />
  </div>

  <section class="size-full grid place-items-center bg-[#00000050] backdrop-blur-3xl">


      <div class="flex flex-col justify-center items-center gap-4 text-white w-[600px]">
        <h1 class="text-3xl uppercase">Are you sure you want to exit?</h1>
    
        <GridLayoutManager cols={2} class="w-full h-[50px] gap-4">
          <LayoutManagerItem
            layout_item={{
              id: '0',
              events: {
                select: exit,
                right: () => change_active_item('1'),
                left: () => change_active_item('1')
              }
            }}
          >
            <button class="flex flex-col justify-center items-center p-4 w-full {active == '0'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-white'}">
              <h1
                class="text-3xl"
              >
                YES
              </h1>
            </button>
          </LayoutManagerItem>
    
          <LayoutManagerItem
            layout_item={{
              id: '1',
              events: {
                select: pop_screen,
                right: () => change_active_item('0'),
                left: () => change_active_item('0')
              }
            }}
          >
            <button
              class="flex flex-col justify-center items-center p-4 {active == '1'
                ? 'bg-white text-black'
                : 'bg-transparent text-white'}"
            >
              <h1 class="text-3xl">NO</h1>
            </button>
          </LayoutManagerItem>
        </GridLayoutManager>
      </div>
  </section>

  <StatusBar />
</Screen>
