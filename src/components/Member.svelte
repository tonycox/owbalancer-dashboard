<script>
    import { Modal, Table } from "sveltestrap";
    import TankIcon from "../icons/Tank.svelte";
    import SupportIcon from "../icons/Support.svelte";
    import DamageIcon from "../icons/Damage.svelte";
    import Division from "./Division.svelte";
    import { getMemberInfo } from "../func/store.js";
    import { formatDate } from "../func/dates.js";

    export let member;

    function getRoleIcon(role) {
        switch (role) {
            case "tank":
                return TankIcon;
            case "dps":
                return DamageIcon;
            case "support":
                return SupportIcon;
            default:
                return undefined;
        }
    }

    let memberInfo;
    let isModelOpen = false;
    const toggleModal = () => {
        isModelOpen = !isModelOpen;
        memberInfo = getMemberInfo(member.name);
    };

    function sortById(seasons) {
        return seasons.sort((a, b) => b.id.localeCompare(a.id));
    }
</script>

<Modal body header={member.name} isOpen={isModelOpen} toggle={toggleModal}>
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

{#if member}
    <div class="member" on:mousedown={toggleModal}>
        <svelte:component this={getRoleIcon(member.role)} />
        {#key member.rank}
            <Division rank={member.rank} />
        {/key}
        {member.name}
    </div>
{/if}

<style>
    .member {
        display: inline-flexbox;
    }

    .member:hover {
        box-shadow: 0 0 15px rgba(6, 0, 0, 0.2);
        cursor: pointer;
    }
</style>
