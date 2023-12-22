<script>
	import { TabContent, TabPane } from "sveltestrap";

	import { onMount } from "svelte";
	import { is_empty } from "svelte/internal";

	import InfoHeader from "./components/InfoHeader.svelte";
	import MainMenu from "./components/menu/MainMenu.svelte";
	import TeamGrid from "./components/team/TeamGrid.svelte";
	import PlayerTable from "./components/member/PlayerTable.svelte";

	import {
		currentArchiveStore,
		archiveIdListStore,
		reloadArchive,
	} from "./func/store";
	import { currentUserStore } from "./func/auth";

	let archive;
	let availableIdList = [];
	let isAdmin = false;

	currentUserStore.subscribe((value) => {
		if (!is_empty(value)) {
			isAdmin = true;
		}
	});
	currentArchiveStore.subscribe((value) => {
		archive = value;
	});
	archiveIdListStore.subscribe((value) => {
		availableIdList = value;
	});

	onMount(() => {
		reloadArchive(null);
	});
</script>

<InfoHeader />

{#if archive.data}
	<MainMenu {archive} {availableIdList} {isAdmin} />
	<TabContent>
		<TabPane tabId="teams" tab="Teams" active>
			<TeamGrid teams={archive.data.teams} />
		</TabPane>
		<TabPane tabId="players" tab="Players">
			<PlayerTable />
		</TabPane>
	</TabContent>
{/if}
