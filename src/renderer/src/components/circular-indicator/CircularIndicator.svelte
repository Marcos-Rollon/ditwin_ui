<script>
    export let size = 30;
    export let value = 'error';

    let colors = {
        error: '#ef3933',
        warning: '#ff8000',
        ok: '#4caf84',
        unknown: '#00ffff',
    }

    $: color = colors[value];
</script>

<div class="circular-indicator" style="width: {size}px; height: {size}px;">
    <div class="indicator" style="width: {size}px; height: {size}px; border-radius: {size / 2}px; background-color: {color};" ></div>
</div>

<style>
    .circular-indicator{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .indicator{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #ff0000;
        transition: background-color 0.2s;
    }
</style>