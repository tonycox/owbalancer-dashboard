<script>
	import Team from "./Team.svelte";
	import { sortByPlace, adjustPlacementBorder } from ".";

	export let teams;

</script>

<div class="teams-grid">
	{#if teams}
		{#each sortByPlace(teams) as team}
			<Team team={adjustPlacementBorder(team)} />
		{/each}
	{/if}
</div>

<style>
	.teams-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 20px;
	}
</style>
