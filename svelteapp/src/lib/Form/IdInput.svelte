<script lang="ts">
  import InputError from "./InputError.svelte";
  // Exports the variable that is through which the error will be passed, if any.
  export let error: string = "";
  export let value: string = '';
</script>

{#if error}
  <InputError>{error}</InputError>
{/if}
<!-- ID's input -->
<input
  type="number"
  min="1"
  name="id"
  placeholder="ID"
  class="my-1 w-full p-2 border border-gray-300 rounded-lg"
  bind:value={value}
  on:focus={() => {
    error = "";
  }}
/>
