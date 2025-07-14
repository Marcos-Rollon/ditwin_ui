<script>
  import MinimalistCard from '../../../components/minimalist-card/MinimalistCard.svelte'
  import AnimatedButton from '../../../components/animated-button/AnimatedButton.svelte'

  let { controller } = $props()

  function remove_FromName(name) {
    return name.replace(/_/g, ' ')
  }
</script>

<div class="env-selection-container">
  {#each controller.enviroments as env (env.name)}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div onclick={() => controller.onEnviromentSelected(env)}>
      <MinimalistCard title={remove_FromName(env.name)} body={env.description} />
    </div>
  {/each}
  {#if controller.enviroments.length === 0}
    <div class="no-env-container">
      <div class="no-env-text">
        Can't find enviroments. Please check if the DiTwin is running and hit reload
      </div>
    </div>
  {/if}
  <AnimatedButton type="reload" label="Reload" onclick={controller.getEnviromentInfo} />
</div>

<style>
  .env-selection-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-start;
    padding: 1rem;
  }
</style>
