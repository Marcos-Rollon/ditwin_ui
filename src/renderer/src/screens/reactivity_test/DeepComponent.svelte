<script>
    let {controller} = $props();

    let someColors = ["red", "blue", "green", "yellow", "purple"];
</script>

<h1>This is a deep component</h1>
<h1>And the width of the box is {controller.width}</h1>
<h1>The color of the box is {controller.properties.color}</h1>
<button onclick={
    () => {
        controller.properties.color = someColors[Math.floor(Math.random() * someColors.length)];
    }
}>Change color</button>
<h1>The value of the box is {controller.properties.value}</h1>
<button onclick={
    () => {
        controller.properties.value = Math.random() * 100;
    }
}>Change value</button>