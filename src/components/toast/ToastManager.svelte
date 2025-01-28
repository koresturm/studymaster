<script context="module" lang="ts">
  import { writable } from "svelte/store"
  import ToastBox from "./Toast.svelte"


    export interface ToastType {
        message: string
        type?: string
        duration?: number
        id?: number
    }

    export const toast_history = writable<ToastType[]>([])

    export const toast = (data: ToastType) => {
        toast_history.update((arr) => [...arr, {...data, id: Math.floor(Math.random() * 10000)}])
    }
</script>

<script lang="ts">
    
</script>

{#each $toast_history as data}
    <ToastBox {data} />
{/each}