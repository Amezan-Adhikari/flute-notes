<!-- src/routes/popular/components/CategoryFilter.svelte -->
<script lang="ts">
  export let name: string;
  export let icon: string;
  export let active: boolean = false;
  export let onClick: () => void;
</script>

<button 
  class="flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 {active ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}"
  on:click={onClick}
>
  <span class="mr-2">{icon}</span>
  <span>{name}</span>
</button>