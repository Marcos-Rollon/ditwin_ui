<script>
    import DeepComponent from "./DeepComponent.svelte";
	import SliderWithInput from "../../components/slider-with-input/SliderWithInput.svelte";
    let {box} = $props();
    const MAX_SIZE = 200;
</script>

<label>
	<input type="range" bind:value={box.width} min={0} max={MAX_SIZE} />
	{box.width}
</label>

<label>
	<input type="range" bind:value={box.height} min={0} max={MAX_SIZE} />
	{box.height}
</label>

<button onclick={() => box.embiggen(10)}>embiggen</button>
<hr>
<div
	class="box"
	style:width="{box.width}px"
	style:height="{box.height}px"
	style:background-color={box.properties.color}
>
	{box.area}
</div>
<DeepComponent bind:controller={box}/>
<SliderWithInput label="Value" unit=".." min={-180} max={180} step={1} bind:value={box.properties.value} />

<style>
    label {
		display: flex;
		align-items: center;
	}

	hr {
		margin: 1em 0;
		border: none;
		border-bottom: 1px solid #888;
	}

	.box {
		/* background: radial-gradient(at 25% 25%, hsl(15 100 60), hsl(15 100 50)) ; */
		border-radius: 2px;
		filter: drop-shadow(0 0 10px hsl(15 100 50 / 0.3));
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
</style>