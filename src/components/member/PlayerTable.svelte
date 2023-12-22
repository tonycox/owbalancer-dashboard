<script>
    import { Table } from "sveltestrap";
    import MemberModal from "./MemberModal.svelte";
    import Division from "../../icons/Division.svelte";
    import Medal from "../../icons/Medal.svelte";

    import { preferences } from "../../func/localstore";
    import { allPlayersStore, getMemberInfo } from "../../func/statistics.js";
    import { sortByPlace } from "../../func/placement";

    let players = [];

    allPlayersStore.subscribe((value) => {
        players = sortByPlace(value, (p) => {
            return p.latest_score;
        });
    });

    let sekectedPlayer = null;
    let isModelOpen = false;
    const toggleModal = () => (isModelOpen = !isModelOpen);

    let tableClass = null;
    preferences.subscribe((value) => {
        tableClass = value.theme === "dark" ? "table-dark" : "table-light";
    });
</script>

{#if sekectedPlayer}
    <MemberModal
        memberInfo={getMemberInfo(sekectedPlayer.name)}
        {isModelOpen}
        {toggleModal}
    />
{/if}

<div>
    <Table hover striped responsive={false} size="sm" class={tableClass}>
        <thead>
            <tr>
                <th>BTag</th>
                <th>Tournaments Played</th>
                <th>Latest Division</th>
                <th>Latest Score</th>
                <th>Highest Division</th>
                <th>Highest Score</th>
            </tr>
        </thead>
        <tbody>
            {#each players as player}
                <tr
                    class="player"
                    on:mousedown={() => {
                        toggleModal();
                        sekectedPlayer = player;
                    }}
                >
                    <th scope="row">{player.name}</th>
                    <td>{player.tournaments_played}</td>
                    <td>
                        {#key player.name}
                            <Division rank={player.latest_div} />
                        {/key}
                    </td>
                    <td><Medal place={player.latest_score} /></td>
                    <td>
                        {#key player.name}
                            <Division rank={player.highest_div} />
                        {/key}
                    </td>
                    <td><Medal place={player.highest_score} /></td>
                </tr>
            {/each}
        </tbody>
    </Table>
</div>

<style>
    .player:hover {
        cursor: pointer;
    }
</style>
