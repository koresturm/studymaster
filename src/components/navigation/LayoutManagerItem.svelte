<script lang="ts">
  import { getContext, onMount } from 'svelte'
  import { GAMEPAD_AXIS, GAMEPAD_BUTTONS, type LAYOUT_ITEM, type SCREEN_CONTEXT } from '../../lib'
  import { gamepadController } from '../GamepadInitiator.svelte'
  import { SFX } from '../../lib/sound'
  import { keyboardController } from '../KeyboardInitiator.svelte'

  export let layout_item: LAYOUT_ITEM

  const { active_layout_item_id } = getContext<SCREEN_CONTEXT>('screen')

  let subscribe_to_active_item: () => void

  let unsub_axis: (() => void)[]

  let unsub_select: (() => void)[]

  const init = () => {
    //Subscribe to select event
    if (layout_item.events?.select) {

      unsub_select?.map((u) => u())

      unsub_select = [
        keyboardController.on('select', () => {
          
          layout_item.events?.select?.(layout_item)
        }),

        gamepadController.on('buttonpress', ({ button_index, pressed }) => {
          if (!pressed && button_index == GAMEPAD_BUTTONS.CROSS_BUTTON) {

            layout_item.events?.select?.(layout_item)
          }
        })
      ]
    }

    //Subscribe to axis events
    unsub_axis?.map((u) => u())

    unsub_axis = [
      keyboardController.on('right', () => {
        SFX.play('navigate')

        layout_item.events?.right?.(layout_item)
      }),

      keyboardController.on('left', () => {
        SFX.play('navigate')

        layout_item.events?.left?.(layout_item)
      }),

      keyboardController.on('up', () => {
        SFX.play('navigate')

        layout_item.events?.up?.(layout_item)
      }),

      keyboardController.on('down', () => {
        SFX.play('navigate')

        layout_item.events?.down?.(layout_item)
      }),

      gamepadController.on('axismove', ({ axis_index, value }) => {
        let val = Math.round(value) == -0 ? 0 : Math.round(value)

        if (axis_index == GAMEPAD_AXIS.X_AXIS) {
          if (val > 0 || val < 0) SFX.play('navigate')

          if (val > 0) layout_item.events?.right?.(layout_item)

          if (val < 0) layout_item.events?.left?.(layout_item)
        }

        if (axis_index == GAMEPAD_AXIS.Y_AXIS) {
          if (val > 0 || val < 0) SFX.play('navigate')

          if (val < 0) layout_item.events?.up?.(layout_item)

          if (val > 0) layout_item.events?.down?.(layout_item)
        }
      })
    ]
  }

  onMount(() => {
    subscribe_to_active_item = active_layout_item_id.subscribe((v) => {
      if (v == layout_item.id) {
        layout_item.events?.focus?.(layout_item)

        init()
      } else {
        unsub_axis?.map((u) => u())
        unsub_select?.map((u) => u())
      }
    })

    return () => {
      subscribe_to_active_item?.()
      unsub_select?.map((u) => u())
      unsub_axis?.map((u) => u())
    }
  })
</script>

<slot />
