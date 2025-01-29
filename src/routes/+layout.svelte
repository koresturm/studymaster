<script lang="ts">
  import UpdateChecker from '@components/UpdateChecker.svelte';
    import '../main.css'
    import '@fontsource/luckiest-guy';

    let { children } = $props()
</script>


<!-- <UpdateChecker /> -->

{@render children()}