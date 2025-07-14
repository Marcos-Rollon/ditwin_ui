<script>
  export let items = [];
  export let activeTabValue = 1;

  const handleClick = tabValue => () => (activeTabValue = tabValue);
</script>

<main>
  <div class="tab-buttons">
    {#each items as item}
      <button
        class="tab-button {activeTabValue === item.value ? 'active' : ''}"
        on:click={handleClick(item.value)}
      >
        {item.label}
      </button>
    {/each}
  </div>

  {#each items as item}
    {#if activeTabValue === item.value}
      <div class="box">
        <svelte:component this={item.component} />
      </div>
    {/if}
  {/each}
</main>

<style>

  main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .tab-buttons {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    flex-shrink: 0;
  }

  .tab-button {
    border: none;
    border-radius: 9999px;
    padding: 0.5rem 1.5rem;
    font-weight: bold;
    cursor: pointer;
    background-color: #2c3e50;
    color: #bdc3c7;
    transition: background-color 0.2s, color 0.2s;
  }

  .tab-button.active {
    background-color: #4caf84;
    color: #ffffff;
  }

  .box {
    flex: 1;
    padding: 8px;
    border-radius: 4px;
    background-color: #384253;
    overflow: auto;
  }
</style>


<!-- <script>
  export let items = [];
  export let activeTabValue = 1;

  const handleClick = tabValue => () => (activeTabValue = tabValue);
</script>

<ul>
{#each items as item}
	<li class={activeTabValue === item.value ? 'active' : ''}>
		<span on:click={handleClick(item.value)}>{item.label}</span>
	</li>
{/each}
</ul>
{#each items as item}
	{#if activeTabValue == item.value}
	<div class="box">
		<svelte:component this={item.component}/>
	</div>
	{/if}
{/each}
<style>
  :root{
    width: 100%;
  }
	.box {
		margin-bottom: 10px;
		padding: 40px;
		border: 1px solid #dee2e6;
    border-radius: 0 0 .5rem .5rem;
    border-top: 0;
	}
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    border-bottom: 1px solid #dee2e6;
  }
	li {
		margin-bottom: -1px;
	}

  span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }

  li.active > span {
    color: #495057;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }
</style> -->