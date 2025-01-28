<script lang="ts">
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type { LAYOUT_ITEM } from '../../lib'
  import { fade } from 'svelte/transition'
  import { translate } from '../../lib/custom-transitions'

  export let name: string

  export let active = ''

  let class_name = ''

  const active_layout_item_id = writable(active)

  const layout_items = writable<LAYOUT_ITEM[]>([])

  const change_active_item = (id: string) => {
    if ($active_layout_item_id !== id) active_layout_item_id.set(id)
  } 

  setContext('screen', { active_layout_item_id, layout_items })

  export { class_name as class }
</script>

<div data-name="{name}" transition:translate|local={{duration: 300}} class="size-full {class_name}">
  <slot active={$active_layout_item_id} {change_active_item} />
</div>