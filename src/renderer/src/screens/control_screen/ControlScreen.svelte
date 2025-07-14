<script>
  import LinearControlScreen from './components/LinearControlScreen.svelte'
  import JointControlScreen from './components/JointControlScreen.svelte'
  import IOControlScreen from './components/IOControlScreen.svelte'
  import EnvriomentSelectorScreen from './components/EnvriomentSelectorScreen.svelte'
  import RadioMenu from '../../components/radio-menu/RadioMenu.svelte'

  let { controller } = $props()

  // Tab control
  let selectedTabIndex = $state(0)

  const handleClick = (index) => {
    selectedTabIndex = index
  }
</script>

<div class="control-screen">
  <RadioMenu selectedIndex={selectedTabIndex} onSelectedIndex={handleClick} />

  {#if selectedTabIndex === 0}
    <LinearControlScreen bind:controller />
  {/if}

  {#if selectedTabIndex === 1}
    <JointControlScreen bind:controller />
  {/if}

  {#if selectedTabIndex === 2}
    <IOControlScreen bind:controller />
  {/if}

  {#if selectedTabIndex === 3}
    <EnvriomentSelectorScreen bind:controller />
  {/if}
</div>

<style>
  .control-screen {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    padding: 1rem;
  }
</style>
