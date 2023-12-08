<script>
	import {
		Button,
		ButtonGroup,
		ButtonDropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
	} from "sveltestrap";

	import { reloadArchive, importArchive } from "../func/store.js";
	import { formatDate } from "../func/dates.js";

	export let availableIdList;
	export let curentArchiveId;
	export let curentArchiveDate;
	export let initSaving;
	export let initSignIn;
	export let isAdmin;
</script>

<ButtonGroup>
	{#if isAdmin}
		<Button on:click={importArchive}>Import</Button>
		<Button on:click={initSaving}>Save</Button>
	{/if}
	{#if !isAdmin}
		<Button on:click={initSignIn}>Admin</Button>
	{/if}

	{#if availableIdList.length > 0}
		<ButtonDropdown>
			<DropdownToggle caret>
				Tournament # {curentArchiveId} ({formatDate(curentArchiveDate)})
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
