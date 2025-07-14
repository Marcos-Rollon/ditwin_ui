<script>
  import ToggleSwitch from '../../../components/toggle-switch/ToggleSwitch.svelte'
  import CircularIndicator from '../../../components/circular-indicator/CircularIndicator.svelte'
  import closeGripperIcon from '../../../assets/icons/gripper_closed.svg'
  import openGripperIcon from '../../../assets/icons/gripper_open.svg'
  import proximitysensorOnIcon from '../../../assets/icons/proximity_sensor_on.svg'
  import proximitysensorOffIcon from '../../../assets/icons/proximity_sensor_off.svg'
  import AnimatedConveyor from '../../../components/animated-conveyor/AnimatedConveyor.svelte'

  /** @type {{controller: ControlScreenController}} */
  let { controller } = $props()
</script>

<div class="main-container">
  <div class="card">
    <h1>Digital Outputs</h1>
    <div class="icon-row">
      <div>
        <div class="io-container">
          <h3>Digital Output 0</h3>
          <ToggleSwitch label="" design="slider" bind:checked={controller.digitalOutput0} />
        </div>
        <div class="io-container">
          <h3>Digital Output 1</h3>
          <ToggleSwitch label="" design="slider" bind:checked={controller.digitalOutput1} />
        </div>
      </div>
      <AnimatedConveyor
        direction={!controller.digitalOutput1 ? 'up' : 'down'}
        running={controller.digitalOutput0}
      />
    </div>
  </div>
  <div class="card">
    <h1>Digital Inputs</h1>
    <div class="icon-row">
      <div class="io-container">
        <h3>Digital Input 0</h3>
        <CircularIndicator value={controller.digitalInput0 ? 'ok' : 'error'} />
      </div>
      {#if !controller.digitalInput0}
        <img
          src={proximitysensorOffIcon}
          alt="proximity sensor off"
          class="proximity-sensor-icon"
        />
      {:else}
        <img src={proximitysensorOnIcon} alt="proximity sensor on" class="proximity-sensor-icon" />
      {/if}
    </div>
  </div>
  <div class="card">
    <h1>Tool</h1>
    <div class="icon-row">
      <div class="io-container">
        <h3>Tool State</h3>
        <ToggleSwitch label="" design="slider" bind:checked={controller.tool} />
      </div>
      {#if controller.tool}
        <img src={openGripperIcon} alt="Open Gripper" class="gripper-icon" />
      {:else}
        <img src={closeGripperIcon} alt="Close Gripper" class="gripper-icon" />
      {/if}
    </div>
  </div>
</div>

<style>
  .main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  .card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: var(--main-bg-color);
    border-radius: 8px;
    padding: 8px;
    padding-bottom: 16px;
    filter: drop-shadow(6px 6px 6px rgba(33, 33, 33, 0.674));
    color: var(--main-text-color);
    h1 {
      color: var(--main-accent-color-blue);
      font-size: 1.5rem;
      font-weight: 500;
      padding-bottom: 8px;
    }
    h3 {
      color: var(--main-text-color);
      font-size: 1rem;
      width: 140px;
    }
  }
  .io-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: flex-start;
  }

  .icon-row {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
  }

  .gripper-icon {
    width: 80px;
    height: 80px;
    transition: all 0.2s ease-in-out;
  }
  .proximity-sensor-icon {
    width: 80px;
    height: 80px;
  }
</style>
