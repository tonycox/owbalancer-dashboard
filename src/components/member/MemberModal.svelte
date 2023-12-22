<script>
    import { Modal, Popover, Table } from "sveltestrap";
    import Division from "../../icons/Division.svelte";
    import Medal from "../../icons/Medal.svelte";
    import MemberEntry from "./MemberEntry.svelte";

    import { preferences } from "../../func/localstore";
    import { formatDate } from "../../func/dates.js";
    import { unsafeRetrieveArchive } from "../../func/store.js";
    import { getRoleIcon } from ".";

    export let memberInfo;
    export let isModelOpen;
    export let toggleModal;

    function sortById(seasons) {
        return seasons.sort((a, b) => b.id.localeCompare(a.id));
    }

    let tableClass = null;
    let modalClass = null;
    preferences.subscribe((value) => {
        tableClass = value.theme === "dark" ? "table-dark" : "table-light";
        modalClass = value.theme === "dark" ? "bg-dark" : "bg-light";
    });

    const poppedSeasons = {};

    function updatePoppedSeasons(id) {
        const season = unsafeRetrieveArchive(id);
        poppedSeasons[id] = season;
    }

    function getMembers(season) {
        return poppedSeasons[season.id]["data"]["teams"].filter(
            (team) => team["name"] == season.captain,
        )[0]["members"];
    }
</script>

<Modal
    body
    header={memberInfo.name}
    isOpen={isModelOpen}
    toggle={toggleModal}
    returnFocusAfterClose={false}
    size="lg"
    contentClassName={modalClass}
>
    <Table hover striped responsive={false} class={tableClass}>
        <thead>
            <tr>
                <th>#</th>
                <th></th>
                <th>Role</th>
                <th>Division</th>
                <th>Score</th>
                <th>Team</th>
            </tr>
        </thead>
        <tbody>
            {#each sortById(memberInfo.seasons) as season}
                {#if poppedSeasons}
                    <Popover
                        placement="right"
                        target="season-entry-{season.id}"
                        title="Players"
                    >
                        {#each getMembers(season) as member}
                            <MemberEntry {member} />
                        {/each}
                    </Popover>
                {/if}

                <tr
                    id="season-entry-{season.id}"
                    class="modal-tr"
                    on:mousedown={() => {
                        updatePoppedSeasons(season.id);
                    }}
                >
                    <th scope="row">{season.id}</th>
                    <td>({formatDate(season.date)})</td>
                    <td><svelte:component this={getRoleIcon(season.role)} /></td
                    >
                    <td><Division rank={season.rank} /></td>
                    <td><Medal place={season.place} /></td>
                    <td><strong>{season.captain}</strong></td>
                </tr>
            {/each}
        </tbody>
    </Table>
</Modal>

<style>
    .modal-tr:hover {
        /* box-shadow: 0 0 15px rgba(16, 33, 7, 0.2); */
        cursor: pointer;
    }
</style>
