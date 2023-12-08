<script>
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

    export let isOpen;
    export let toggle;

    import { signIn } from "../func/auth";

    let isLoading = false;
    let isFailed = false;

    let emailValue;
    let passwordValue;

    function loginHandler() {
        isLoading = true;
        isFailed = false;
        signIn(emailValue, passwordValue)
            .then(() => {
                isFailed = false;
                isLoading = !isLoading;
            })
            .then(() => {
                isOpen = !isOpen;
            })
            .catch((error) => {
                console.error(error)
                isFailed = true;
                isLoading = !isLoading;
            });
    }
</script>

<div>
    <Modal body header="Signing in" {isOpen} {toggle}>
        <Form>
            <FormGroup>
                <Label for="email">email</Label>
                <Input required
                    id="email"
                    type="email"
                    placeholder="email"
                    bind:value={emailValue}
                />
                <Label for="password">password</Label>
                <Input required
                    name
                    id="password"
                    type="password"
                    placeholder="password"
                    bind:value={passwordValue}
                />
            </FormGroup>
            {#if isLoading}
                <Spinner secondary class="m-1" />
            {/if}
            {#if !isLoading}
                <Button type="button" on:click={loginHandler}>Login</Button>
            {/if}
            {#if isFailed}
                <Alert color=danger>Failed to login</Alert>
            {/if}
        </Form>
    </Modal>
</div>
