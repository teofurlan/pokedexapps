<script lang="ts">
  import { createEventDispatcher } from "svelte";
  // const dispatch = createEventDispatcher();
  export const dispatch = createEventDispatcher<{
    removedTag: string;
  }>();
  import { getTypeColor } from "../../utility/tools";

  export let type: string;
  const removeTag = (event: Event) => {
    (
      (event.target as HTMLElement).parentNode as HTMLElement
    ).parentElement?.remove();
    dispatch("removedTag", type);
  };
</script>

<div
  class="flex flex-row items-center justify-center rounded-lg my-1 px-2"
  style="background-color: {getTypeColor(type)};"
  data-tag=""
>
  <span class="mr-2">{type}</span>
  <button
    class="flex items-center justify-center text-black size-[1.2rem]"
    on:click={removeTag}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      ><path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"
      ></path></svg
    ></button
  >
</div>
