<script lang="ts">
  import Screen from '@components/navigation/Screen.svelte'
  import StatusBar from '@components/StatusBar.svelte'
  import LayoutManagerItem from '@components/navigation/LayoutManagerItem.svelte'
  import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-svelte'
  import type { QUESTION } from '@lib'

  let file_input: HTMLInputElement

  const difficulty_options = ['easy', 'medium', 'hard']

  let difficulty_index = 0

  let number_of_questions = 5

  //@ts-ignore
  let questions: QUESTION[] = []

  let active_item = '0'

  let loading: 'idle' | 'loading' | 'success' | 'error' = 'idle'

  const handle_change = async (e: Event) => {

    const file = (e.target as HTMLInputElement).files?.[0]

    if (!file) return

    loading = 'loading'

    // questions = await window.api.extract_questions(file.path , number_of_questions , difficulty_options[difficulty_index] as any)

    loading = 'success'
  }
</script>

<input bind:this={file_input} on:change={handle_change} type="file" accept=".pdf" class="hidden" />

<Screen
  name="new reality"
  class="flex flex-col justify-center items-center relative z-0"
  active={active_item}
  let:active
  let:change_active_item
>
  <div class="size-full absolute top-0 left-0 right-0 bottom-0 -z-10">
    <img src="./assets/images/new-reality.jpg" alt="New Reality" class="size-full object-cover" />
  </div>

  <section
    class="flex justify-center items-center size-full text-white bg-[#00000050] backdrop-blur-3xl"
  >
    {#if loading == 'loading'}
    <h2 class="text-4xl uppercase flex items-center gap-8 animate-pulse w-max">
      Parsing and generating questions...
    </h2>
    {/if}
    {#if loading == 'idle'}
      <div class="h-[90%] w-[600px] flex flex-col gap-8">
        <h1 class="text-3xl uppercase">New Reality</h1>

        <LayoutManagerItem
          layout_item={{
            id: '0',
            events: {
              up: () => {
                change_active_item('2')
              },
              down: () => {
                change_active_item('1')
              },
              right: () => {
                if(difficulty_index < difficulty_options.length - 1) difficulty_index += 1
              },
              left: () => {
                if(difficulty_index > 0) difficulty_index -= 1
              },
            }
          }}
        >
          <div
            class="flex items-center justify-center w-full p-4 {active == '0'
              ? 'bg-white text-black'
              : 'bg-[#00000050]'}"
          >
            <h2 class="text-2xl uppercase flex-1 flex items-center gap-8">
              <span>💪</span>
              Difficulty
            </h2>
            <div class="flex flex-1 justify-between items-center">
              <ChevronLeftIcon />
              <h1 class="text-2xl uppercase">{difficulty_options[difficulty_index]}</h1>
              <ChevronRightIcon />
            </div>
          </div></LayoutManagerItem
        >

        <LayoutManagerItem
          layout_item={{
            id: '1',
            events: {
              up: () => {
                change_active_item('0')
              },
              down: () => {
                change_active_item('2')
              },
              right: () => {
                if(number_of_questions < 10) number_of_questions += 1
              },
              left: () => {
                if(number_of_questions > 1) number_of_questions -= 1
              },
            }
          }}
        >
          <div
            class="flex items-center justify-center w-full p-4 {active == '1'
              ? 'bg-white text-black'
              : 'bg-[#00000050]'}"
          >
            <h2 class="text-2xl uppercase flex-1 flex items-center gap-8">
              <span>🎯</span>
              Questions
            </h2>
            <div class="flex flex-1 justify-between items-center">
              <ChevronLeftIcon />
              <h1 class="text-2xl uppercase">{number_of_questions}</h1>
              <ChevronRightIcon />
            </div>
          </div></LayoutManagerItem
        >

        <LayoutManagerItem
          layout_item={{
            id: '2',
            events: {
              up: () => {
                change_active_item('1')
              },
              down: () => {
                change_active_item('0')
              },
              select: () => {
                file_input.click()
              }
            }
          }}
        >
          <div
            class="flex items-center justify-center w-full p-4 {active == '2'
              ? 'bg-white text-black'
              : 'bg-[#00000050]'}"
          >
              <h1 class="text-2xl uppercase">Select a file</h1>
          </div></LayoutManagerItem
        >
      </div>
    {/if}

    {#if loading == 'success'}
    <h2 class="text-5xl uppercase flex items-center gap-8 w-max">
      Reality generated!
    </h2>
    {/if}
  </section>

  {#if loading == 'idle' || loading == 'success'}
    <StatusBar />
  {/if}
</Screen>
