<script>
    import { getMemberInfo } from "../../func/statistics.js";
    import MemberModal from "./MemberModal.svelte";
    import MemberEntry from "./MemberEntry.svelte";

    export let member;

    let isModelOpen = false;
    const toggleModal = () => (isModelOpen = !isModelOpen);
</script>

{#if member}
    <MemberModal
        memberInfo={getMemberInfo(member.name)}
        {isModelOpen}
        {toggleModal}
    />
    <div class="member">
        <MemberEntry {member} on:mousedown={toggleModal} />
    </div>
{/if}

<style>
    .member:hover {
        box-shadow: 0 0 15px rgba(6, 0, 0, 0.2);
        cursor: pointer;
    }
</style>
