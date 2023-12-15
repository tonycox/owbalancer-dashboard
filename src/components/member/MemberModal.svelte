<script>
    import { Modal, Table } from "sveltestrap";
    import Division from "../../icons/Division.svelte";
    import { formatDate } from "../../func/dates.js";
    import { getRoleIcon } from ".";

    export let memberInfo;
    export let isModelOpen;
    export let toggleModal;

    function sortById(seasons) {
        return seasons.sort((a, b) => b.id.localeCompare(a.id));
    }
</script>

<Modal body header={memberInfo.name} isOpen={isModelOpen} toggle={toggleModal}>
    <Table striped>
        <tbody>
            {#each sortById(memberInfo.seasons) as season}
            <tr>
                <th scope="row">{season.id}</th>
                <td>({formatDate(season.date)})</td>
                <td><svelte:component this={getRoleIcon(season.role)} /></td>
                <td><Division rank={season.rank} /></td>
                <td>team <strong>{season.captain}</strong></td>
            </tr>
            {/each}
        </tbody>
      </Table>
</Modal>
