<script lang="ts">
    
    export let cols: number = 1
    export let rows: number = 1

    let class_name = ''

    export { class_name as class }
</script>

<div style:--cols={cols} style:--rows={rows} class="grid grid-cols-[repeat(var(--cols),1fr)] grid-rows-[repeat(var(--rows),1fr)] {class_name}">
    <slot />
</div>