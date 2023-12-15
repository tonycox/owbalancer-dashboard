<script>
	import { onMount } from "svelte";
	import { is_empty } from "svelte/internal";

	import InfoHeader from "./components/InfoHeader.svelte";
	import MainMenu from "./components/menu/MainMenu.svelte";
	import TeamGrid from "./components/TeamGrid.svelte";

	import {
		currentArchiveStore,
		archiveIdListStore,
		loadAllArchives,
	} from "./func/store";
	import { currentUser } from "./func/auth";

	let archive;
	let availableIdList = [];
	let isAdmin = false;

	currentUser.subscribe((value) => {
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

	const setInitialCurrent = (list) => {
		currentArchiveStore.set(list[0]);
	};

	onMount(() => {
		loadAllArchives().then((result) => {
			setInitialCurrent(result);
		});
	});
</script>

<InfoHeader />

{#if archive.data}
	<MainMenu
		{archive}
		{availableIdList}
		{isAdmin}
	/>
	<TeamGrid teams={archive.data.teams} finalist={archive.finalist} />
{/if}
