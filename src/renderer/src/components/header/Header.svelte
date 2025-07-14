<script>
    import  OnlineIndicator from "../online-indicator/OnlineIndicator.svelte";
    import logo from "../../assets/dtwin-logo.png";

    export let online = false;
</script>
<div class="header">
    <img src={logo} alt="logo" class="logo" />
    <OnlineIndicator bind:online />
</div>
    
<style>
    .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 8px;
    }
    img.logo{
        width: 100px;
        height: 40px;
    }

</style>