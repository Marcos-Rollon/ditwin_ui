<script>
  import SliderWithInput from '../../../components/slider-with-input/SliderWithInput.svelte'
  import AnimatedButton from '../../../components/animated-button/AnimatedButton.svelte'
  import ModalContiner from '../../../components/modal-container/ModalContiner.svelte'
  import ToggleSwitch from '../../../components/toggle-switch/ToggleSwitch.svelte'

  let { controller } = $props()
  let showConfigurationModal = $state(false)
</script>

<ModalContiner bind:show={showConfigurationModal} onAccept={controller.onSetRobotConfiguration}>
  <p style="color: var(--warning-yellow)">
    There is some math that we are still working on for this feature, this is not the final version.
    Do not use this.
  </p>
  <h1>Configuration</h1>
  <p>Select the robot configuration for the linear solutions</p>
  <br />
  <ToggleSwitch
    label={controller.configuration.shoulder ? 'RIGHTY' : 'LEFTY'}
    design="slider"
    minLabelSize={100}
    bind:checked={controller.configuration.shoulder}
  />
  <ToggleSwitch
    label={controller.configuration.elbow ? 'UP' : 'DOWN'}
    design="slider"
    minLabelSize={100}
    bind:checked={controller.configuration.elbow}
  />
  <ToggleSwitch
    label={controller.configuration.wrist ? 'POSITIVE' : 'NEGATIVE'}
    design="slider"
    minLabelSize={100}
    bind:checked={controller.configuration.wrist}
  />
  <br />
</ModalContiner>
<div class="control-screen">
  <div class="slider-container">
    <SliderWithInput
      label="X"
      unit="mm"
      min={-600}
      max={100}
      step={1}
      bind:value={controller.pose.x}
      bind:disabled={controller.isMoving}
    />
    <SliderWithInput
      label="Y"
      unit="mm"
      min={-500}
      max={600}
      step={1}
      bind:value={controller.pose.y}
      bind:disabled={controller.isMoving}
    />
    <SliderWithInput
      label="Z"
      unit="mm"
      min={-500}
      max={700}
      step={1}
      bind:value={controller.pose.z}
      bind:disabled={controller.isMoving}
    />
    <SliderWithInput
      label="RX"
      unit="mm"
      min={-180}
      max={180}
      step={1}
      bind:value={controller.pose.rx}
      bind:disabled={controller.isMoving}
    />
    <SliderWithInput
      label="RY"
      unit="mm"
      min={-180}
      max={180}
      step={1}
      bind:value={controller.pose.ry}
      bind:disabled={controller.isMoving}
    />
    <SliderWithInput
      label="RZ"
      unit="mm"
      min={-180}
      max={180}
      step={1}
      bind:value={controller.pose.rz}
      bind:disabled={controller.isMoving}
    />
    <button class="button-secondary" onclick={() => (showConfigurationModal = true)}
      >Configuration</button
    >
    <h3 style="display: {!controller.isMoving ? 'none' : 'block'}">⚠️ Robot is moving</h3>
  </div>

  <div class="button-container">
    <div style="display: flex; gap: 1rem;">
      <AnimatedButton
        type="send"
        label="Send"
        onclick={controller.onPoseSendButtonClicked}
        disabled={controller.isMoving}
      />
    </div>
    <AnimatedButton type="stop" label="Stop" onclick={controller.onStopButtonClicked} />
    <!-- <button class="button-error" onclick={controller.onStopButtonClicked}>Stop</button> -->
    <div class="secondary-buttons">
      <button class="button-secondary" onclick={controller.onHomeButtonClicked}>Go Home</button>
      <button class="button-secondary" onclick={controller.onPerpendicularButtonClicked}
        >Perpendicular</button
      >
      <button class="button-secondary" onclick={controller.onSyncSlidersButtonClicked}
        >Sync Sliders</button
      >
    </div>
  </div>
</div>

<style>
  h3 {
    color: var(--warning-yellow);
  }
  .slider-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: flex-end;
  }
  .control-screen {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    padding: 1rem;
  }
  .secondary-buttons {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    flex-direction: column;
  }
</style>
