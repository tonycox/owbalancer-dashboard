<script>
    import Division from "../../icons/Division.svelte";
    import { getRoleIcon } from ".";

    export let member;
</script>

<div class="member" on:mousedown>
    <svelte:component this={getRoleIcon(member.role)} />
    {#key member.name}
        <Division rank={member.rank} />
    {/key}
    {member.name}
</div>

<style>
    .member {
        display: inline-flexbox;
    }
</style>
