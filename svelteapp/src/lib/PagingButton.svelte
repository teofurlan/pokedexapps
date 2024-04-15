<script lang="ts">
    export let textContent:string
    export let action: Function
</script>


<button class="bg-sky-500 w-14 h-10 font-bold text-2xl rounded-md" on:click={() => action()} >
    {textContent}
</button>