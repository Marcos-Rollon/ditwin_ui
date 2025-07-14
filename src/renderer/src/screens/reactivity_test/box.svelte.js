	export default class Box {
		width = $state(0);
		height = $state(0);
		area = $derived(this.width * this.height);
		properties = $state({
			color: "red",
			value: 0
		});

		constructor(width, height) {
			this.width = width;
			this.height = height;
		}

		embiggen(amount) {
			this.width += amount;
			this.height += amount;
		}
	}