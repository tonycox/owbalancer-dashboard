<script>
    export let rank;

    function findImage() {
        if (rank <= 199) {
            return "/divisions/div20.png";
        } else if (rank <= 299) {
            return "/divisions/div19.png";
        } else if (rank <= 399) {
            return "/divisions/div18.png";
        } else if (rank <= 499) {
            return "/divisions/div17.png";
        } else if (rank <= 599) {
            return "/divisions/div16.png";
        } else if (rank <= 699) {
            return "/divisions/div15.png";
        } else if (rank <= 799) {
            return "/divisions/div14.png";
        } else if (rank <= 899) {
            return "/divisions/div13.png";
        } else if (rank <= 999) {
            return "/divisions/div12.png";
        } else if (rank <= 1099) {
            return "/divisions/div11.png";
        } else if (rank <= 1199) {
            return "/divisions/div10.png";
        } else if (rank <= 1299) {
            return "/divisions/div9.png";
        } else if (rank <= 1399) {
            return "/divisions/div8.png";
        } else if (rank <= 1499) {
            return "/divisions/div7.png";
        } else if (rank <= 1599) {
            return "/divisions/div6.png";
        } else if (rank <= 1699) {
            return "/divisions/div5.png";
        } else if (rank <= 1799) {
            return "/divisions/div4.png";
        } else if (rank <= 1899) {
            return "/divisions/div3.png";
        } else if (rank <= 1999) {
            return "/divisions/div2.png";
        } else {
            return "/divisions/div1.png";
        }
    }
</script>

<img src={findImage()} class="s-2em" alt="division" />

<style>
    .s-2em {
        width: 2em;
        height: 2em;
    }
</style>
