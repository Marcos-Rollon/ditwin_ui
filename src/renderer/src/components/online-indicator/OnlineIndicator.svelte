<script>
    export let online = false;
</script>

<div class="online-indicator">
    <div class="dot" class:online={online}></div>
    <div class="spacer"></div>
    <p>{online ? 'Online' : 'Offline'}</p>
</div>

<style>
    .online-indicator{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        border-radius: 45px;
        background-color: #343434;
        padding: 16px;
    }
    .spacer{
        width: 20px;
        height: 20px;
    }
    .dot{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #ef3933;
        margin-left: auto;
        margin-right: auto;
    }
    .online{
        background-color: #4caf84;
    }
</style>