<script>
	import Team from "./Team.svelte";

	export let teams;
	export let finalist;

	function sortByFinalists(list) {
		function find(place) {
			if (finalist != undefined && place in finalist) {
				return finalist[place];
			} else {
				return "";
			}
		}
		return list
			.map((el) => {
				if (el.name == find("first_place")) {
					el.place = 1;
					el.border_class = "gold";
				} else if (el.name == find("second_place")) {
					el.place = 2;
					el.border_class = "silver";
				} else if (el.name == find("third_place")) {
					el.place = 3;
					el.border_class = "bronze";
				} else {
					el.place = 4;
					el.border_class = "default";
				}
				return el;
			})
			.sort((a, b) => a.place - b.place);
	}
</script>

<div class="teams-grid">
	{#if teams}
		{#each sortByFinalists(teams) as team}
			<Team {team} />
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
