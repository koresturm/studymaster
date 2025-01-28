
<script lang="ts">
  import { onMount } from "svelte";
  import { toast_history, type ToastType } from "./ToastManager.svelte"
  import { translate } from "../../lib/custom-transitions"

  export let data: ToastType;

  let timeout: any;

  onMount(() => {
    timeout = setTimeout(() => {
      toast_history.update((arr) => arr.filter((item) => item.id !== data.id))
    }, data.duration || 2000);
  });
</script>

  <div
    class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#00000050] backdrop-blur-lg w-[50%] p-4 text-white border border-white shadow-2xl pointer-events-none z-50"
    in:translate={{ axis: "y", duration: 200 }}
    out:translate={{ axis: "y", duration: 200 }}
  >
    <div class="flex items-center">
      <p>{data.message}</p>
    </div>
  </div>