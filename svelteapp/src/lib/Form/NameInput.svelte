<script lang="ts">
  import InputError from "./InputError.svelte";
  // Exports the variable that is through which the error will be passed, if any.
  export let error:string = ''
</script>

{#if error}
  <InputError>{error}</InputError>
{/if}
<!-- Name's Input -->
<input
  type="text"
  name="name"
  placeholder="Name"
  class="my-1 w-full p-2 border border-gray-300 rounded-lg"
  on:focus={() => error=''}
/>