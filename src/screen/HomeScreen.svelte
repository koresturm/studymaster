<script lang="ts">
  import Screen from '@components/navigation/Screen.svelte'
  import GridLayoutManager from '@components/navigation/GridLayoutManager.svelte'
  import LayoutManagerItem from '@components/navigation/LayoutManagerItem.svelte'
  import { push_screen } from '@components/navigation/ScreenManager.svelte'
  import StatusBar from '@components/StatusBar.svelte'
  import { translate } from '@lib/custom-transitions'

  const items = [
    {
      title: 'New Reality',
      description: 'Reality refers to a subject like Mathematics, Chemistry, Physics, etc. Which can have sub realities like Calculus, IUPAC, Energy, etc.',
      image: './assets/images/new-reality.jpg',
      select: () => push_screen('new reality')
    },
    {
      title: 'Play',
      description: 'Pick a Reality to play',
      image: './assets/images/play.jpg',
      select: () => push_screen('select reality')
    },
    {
      title: 'Menu',
      select: () => push_screen('menu'),
      image: './assets/images/menu.jpg',
      description: 'Settings, updates, and other options',
    },
    {
      title: 'Exit',
      image: './assets/images/exit.jpg',
      select: () => push_screen('exit')
    },
  ]
</script>

<Screen
  name="home"
  class="home-screen flex flex-col bg-black"
  active="0"
  let:active
  let:change_active_item
>
  <GridLayoutManager cols={items.length} class="size-full">
    {#each items as { title, select , description , image }, i}
      <LayoutManagerItem
        layout_item={{
          id: i.toString(),
          events: {
            select,
            right: () => change_active_item((i == items.length - 1 ? 0 : i + 1).toString()),
            left: () => change_active_item((i == 0 ? items.length - 1 : i - 1).toString())
          }
        }}
      >
        <div
          class="flex flex-col justify-between p-4 text-white transition-colors duration-300 z-0 relative"
        >
          <div class="size-full absolute top-0 left-0 right-0 bottom-0 -z-10">
            <img src={image} alt={title} class="size-full object-cover" />
            <div class="absolute top-0 left-0 right-0 bottom-0 size-full {active == i.toString() ? 'bg-gradient-to-b from-transparent to-black' : 'bg-black opacity-90'}">
            </div>
          </div>

          <h1 class="text-3xl uppercase">{title}</h1>

          {#if description && active == i.toString()}
            <p transition:translate={{ axis: 'y' }} class="text-sm">{description}</p>
          {/if}
        </div>
      </LayoutManagerItem>
    {/each}
  </GridLayoutManager>

  <StatusBar />
</Screen>
