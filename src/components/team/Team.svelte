<script>
    import MemberEntry from "../member/MemberEntry.svelte";
    import Medal from "../../icons/Medal.svelte";
    import { sortByRole } from ".";
    
    export let team;
</script>

<div class="team {team.border_class}">
    <div class="team-name">
        <h2>{team.name}</h2>
        {#key team}
            <Medal placement={team.place} />
        {/key}
    </div>
    <ul>
        <li>
            <div>
                <strong>Average SR: </strong>
                {team.avgSr} <strong>Total SR:</strong>
                {team.totalSr}
            </div>
        </li>
        {#each sortByRole(team.members) as member}
            <li>
                <MemberEntry {member} />
            </li>
        {/each}
    </ul>
</div>

<style>
    .team-name {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .team {
        display: inline-block;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 5px;
        transition: box-shadow 0.3s ease-in-out;
        margin: 10px; /* Add margin for spacing between boxes */
    }

    .default {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .gold {
        box-shadow: 0 0 15px rgb(255, 215, 0);
    }

    .silver {
        box-shadow: 0 0 15px rgb(189, 182, 182);
    }

    .bronze {
        box-shadow: 0 0 15px rgb(205, 127, 50);
    }

    h2 {
        margin-bottom: 10px;
        font-size: 1.2em; /* Adjust font size as needed */
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        border-bottom: 1px solid #ddd;
        margin-bottom: 5px;
        font-size: 1em; /* Adjust font size as needed */
    }
</style>
