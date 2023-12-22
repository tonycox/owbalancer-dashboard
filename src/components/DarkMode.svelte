<script>
    import { Button } from "sveltestrap";
    import { preferences } from "../func/localstore";

    let isDarkMode = null;
    let color = null;
    let text = null;

    preferences.subscribe((value) => {
        if (value.theme === "dark") {
            isDarkMode = true;
            window.document.body.classList.add("dark-mode");
        } else {
            isDarkMode = false;
            window.document.body.classList.remove("dark-mode");
        }
        color = isDarkMode ? "light" : "dark";
        text = isDarkMode ? "Light" : "Dark";
    });

    const toggleMode = () => {
        preferences.set({ theme: !isDarkMode ? "dark" : "light" });
    };
</script>

<Button on:click={toggleMode} {color} size="sm" outline={false}>
    {text}
</Button>

<style>
    :global(body) {
        background-color: #fff;
        color: #333;
        transition: background-color 0.3s;
    }
    :global(body.dark-mode) {
        background-color: #2c3034 !important;
        color: #cdcfd5;
    }
</style>
