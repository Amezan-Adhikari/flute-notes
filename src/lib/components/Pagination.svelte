<script>
    import { createEventDispatcher } from 'svelte';
    
    export let currentPage;
    export let totalPages;
    export let goToPage;
    
    const dispatch = createEventDispatcher();
    
    function prevPage() {
        if (currentPage > 1) {
            dispatch('prev');
        }
    }
    
    function nextPage() {
        if (currentPage < totalPages) {
            dispatch('next');
        }
    }
</script>

<div class="flex justify-center items-center mt-6 gap-2">
    <button 
        class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        on:click={prevPage}
        disabled={currentPage === 1}
    >
        &lt;
    </button>
    
    {#if totalPages <= 7}
        {#each Array(totalPages) as _, i}
            <button 
                class="px-3 py-1 rounded {currentPage === i+1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}"
                on:click={() => goToPage(i+1)}
            >
                {i+1}
            </button>
        {/each}
    {:else}
        <!-- First page -->
        <button 
            class="px-3 py-1 rounded {currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}"
            on:click={() => goToPage(1)}
        >
            1
        </button>
        
        <!-- Ellipsis for start (if needed) -->
        {#if currentPage > 4}
            <span class="px-2">...</span>
        {/if}
        
        <!-- Pages around current page -->
        {#each Array(3).fill().map((_, idx) => Math.max(2, Math.min(currentPage - 1 + idx, totalPages - 1))) as pageNum}
            {#if pageNum > 1 && pageNum < totalPages}
                <button 
                    class="px-3 py-1 rounded {currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}"
                    on:click={() => goToPage(pageNum)}
                >
                    {pageNum}
                </button>
            {/if}
        {/each}
        
        <!-- Ellipsis for end (if needed) -->
        {#if currentPage < totalPages - 3}
            <span class="px-2">...</span>
        {/if}
        
        <!-- Last page -->
        <button 
            class="px-3 py-1 rounded {currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}"
            on:click={() => goToPage(totalPages)}
        >
            {totalPages}
        </button>
    {/if}
    
    <button 
        class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        on:click={nextPage}
        disabled={currentPage === totalPages}
    >
        &gt;
    </button>
</div>