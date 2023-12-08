<script>
	import { onMount } from "svelte";
	import { is_empty } from "svelte/internal";

	import ButtonGroup from "./components/ButtonGroup.svelte";
	import TeamGrid from "./components/TeamGrid.svelte";
	import SaveTournament from "./components/SaveTournament.svelte";
	import LoginModal from "./components/LoginModal.svelte";
	import InfoHeader from "./components/InfoHeader.svelte";

	import {
		currentArchiveStore,
		archiveIdListStore,
		loadAllArchives,
	} from "./func/store";
	import { currentUser } from "./func/auth";

	let archive;
	let curentArchiveId;
	let curentArchiveDate;
	let availableIdList = [];
	let isAdmin = false;

	let isSaveModalOpen = false;
	const saveToggle = () => (isSaveModalOpen = !isSaveModalOpen);

	let isLoginModalOpen = false;
	const loginToggle = () => (isLoginModalOpen = !isLoginModalOpen);

	currentUser.subscribe((value) => {
		if (!is_empty(value)) {
			isAdmin = true;
		}
	});

	currentArchiveStore.subscribe((value) => {
		archive = value;
		if (!is_empty(value)) {
			curentArchiveId = value.id;
			curentArchiveDate = value.data.date;
		}
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

<SaveTournament {archive} isOpen={isSaveModalOpen} toggle={saveToggle} />
<LoginModal isOpen={isLoginModalOpen} toggle={loginToggle} />

<ButtonGroup
	{availableIdList}
	{curentArchiveId}
	{curentArchiveDate}
	{isAdmin}
	initSignIn={loginToggle}
	initSaving={saveToggle}
/>
{#if archive.data}
	<TeamGrid teams={archive.data.teams} finalist={archive.finalist} />
{/if}
