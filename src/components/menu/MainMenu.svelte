<script>
	import {
		Button,
		ButtonGroup,
		ButtonDropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
	} from "sveltestrap";

	import SaveTournament from "./SaveTournament.svelte";
	import LoginModal from "./LoginModal.svelte";

	import { reloadArchive, importArchive, importChallonge } from "../../func/store.js";
	import { formatDate } from "../../func/dates.js";

	export let archive;
	export let availableIdList;
	export let isAdmin;

	let isSaveModalOpen = false;
	const saveToggle = () => (isSaveModalOpen = !isSaveModalOpen);

	let isLoginModalOpen = false;
	const loginToggle = () => (isLoginModalOpen = !isLoginModalOpen);

</script>

<SaveTournament {archive} isOpen={isSaveModalOpen} toggle={saveToggle} />
<LoginModal isOpen={isLoginModalOpen} toggle={loginToggle} />

<ButtonGroup>
	{#if isAdmin}
		<Button on:click={importArchive}>Import Balancer</Button>
		<Button on:click={importChallonge}>Import Challonge</Button>
		<Button on:click={saveToggle}>Save</Button>
	{/if}
	{#if !isAdmin}
		<Button on:click={loginToggle}>Admin</Button>
	{/if}

	{#if availableIdList.length > 0}
		<ButtonDropdown>
			<DropdownToggle caret>
				Tournament # {archive.id} ({formatDate(archive.data.date)})
			</DropdownToggle>
			<DropdownMenu>
				{#each availableIdList as tournament}
					<DropdownItem on:click={reloadArchive(tournament.id)}>
						<strong>{tournament.id}</strong> ({formatDate(tournament.date)})
					</DropdownItem>
				{/each}
			</DropdownMenu>
		</ButtonDropdown>
	{/if}
</ButtonGroup>
