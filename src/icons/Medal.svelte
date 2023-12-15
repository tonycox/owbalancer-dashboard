<script>
    export let placement;

    function findImage() {
        switch (placement) {
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
{/if}

<style>
    .s-2em {
        width: 2em;
        height: 2em;
    }
</style>
