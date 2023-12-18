<script>
    export let place;

    function findImage() {
        switch (place) {
            case 1:
                return "/medals/gold.png";
            case 2:
                return "/medals/silver.png";
            case 3:
                return "/medals/bronze.png";
            default:
                return null;
        }
    }

    const source = findImage()

</script>

{#if source}
    <img src={source} class="s-2em" alt="medal" />
{:else}
    <p>{place ? place : "group"}</p>
{/if}

<style>
    .s-2em {
        width: 2em;
        height: 2em;
    }

    p {
        font-weight: 700;
        font-family: "Chakra Petch", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        font-size: 1em;
    }
</style>
