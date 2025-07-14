To use this component, do something like this:

```html
<script>
	import Tab1 from "./Tab1.svelte";
	import Tab2 from "./Tab2.svelte";
	import Tab3 from "./Tab3.svelte";
  import Tabs from "./Tabs.svelte";

  // List of tab items with labels, values and assigned components
  let items = [
    { label: "Content",
		 value: 1,
		 component: Tab1
		},
    { label: "Interactions",
		 value: 2,
		 component: Tab2
		},
    { label: "Tab 3",
		 value: 3,
		 component: Tab3
		}
  ];
</script>

<Tabs {items} />
```