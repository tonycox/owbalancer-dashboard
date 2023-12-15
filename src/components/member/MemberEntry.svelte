<script>
    import Division from "../../icons/Division.svelte";
    import { getMemberInfo } from "../../func/store.js";
    import { getRoleIcon } from ".";
    import MemberModal from "./MemberModal.svelte";

    export let member;

    let isModelOpen = false;
    const toggleModal = () => (isModelOpen = !isModelOpen)
</script>

{#if member}
    <MemberModal memberInfo={getMemberInfo(member.name)} {isModelOpen} {toggleModal} />
{/if}

{#if member}
    <div class="member" on:mousedown={toggleModal}>
        <svelte:component this={getRoleIcon(member.role)} />
        {#key member.name}
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
