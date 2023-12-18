<script>
    import { afterUpdate } from "svelte";
    import {
        Form,
        FormGroup,
        Input,
        Label,
        Button,
        Modal,
        Spinner,
        Alert,
    } from "sveltestrap";
    import { saveArchive, loadAllArchives } from "../../func/store.js";

    export let archive;
    export let isOpen;
    export let toggle;

    let tournamentIdValue = "";

    afterUpdate(() => {
        tournamentIdValue = "id" in archive ? archive.id : tournamentIdValue;
    });

    let isLoading = false;
    let isFailed = false;

    function saveHandler() {
        isLoading = true;
        isFailed = false;
        saveArchive(tournamentIdValue, archive)
            .then(() => (isLoading = !isLoading))
            .then(() => loadAllArchives())
            .then(() => (isOpen = !isOpen))
            .catch((error) => {
                isLoading = !isLoading;
                isFailed = true;
            });
    }
</script>

<Modal body header="Saving new tournament" {isOpen} {toggle}>
    <Form>
        <FormGroup>
            <Label for="number">Tournament Id</Label>
            <Input
                required
                id="tournamentId"
                placeholder="tournament number or name"
                bind:value={tournamentIdValue}
            />
        </FormGroup>

        {#if isLoading}
            <Spinner secondary class="m-1" />
        {/if}
        {#if !isLoading}
            <Button type="button" on:click={saveHandler}>Save</Button>
        {/if}
        {#if isFailed}
            <Alert color="danger">Failed to save</Alert>
        {/if}
    </Form>
</Modal>
