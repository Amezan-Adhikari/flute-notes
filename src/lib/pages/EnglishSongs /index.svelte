<script lang="ts">
	import RightPane from './RightPane.svelte';
	import Leftpane from './Leftpane.svelte';
	import SongPageByCateogory from '$lib/components/SongPageByCateogory.svelte';
</script>

<SongPageByCateogory LeftPaneComponent={Leftpane} RightPaneComponent={RightPane} />
