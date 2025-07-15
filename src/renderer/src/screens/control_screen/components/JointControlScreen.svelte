<script lang="ts">
  import AnimatedButton from '../../../components/animated-button/AnimatedButton.svelte'
  import SliderAngle from '../../../components/slider-angle/SliderAngle.svelte'

  /** @type {{controller: ControlScreenController}} */
  let { controller } = $props()
</script>

<div class="control-screen">
  <div class="slider-container">
    <SliderAngle label="Theta 1" bind:value={controller.joints.theta1} />
    <SliderAngle label="Theta 2" bind:value={controller.joints.theta2} />
    <SliderAngle label="Theta 3" bind:value={controller.joints.theta3} />
    <SliderAngle label="Theta 4" bind:value={controller.joints.theta4} />
    <SliderAngle label="Theta 5" bind:value={controller.joints.theta5} />
    <SliderAngle label="Theta 6" bind:value={controller.joints.theta6} />
    <h3 style="display: {!controller.isMoving ? 'none' : 'block'}">⚠️ Robot is moving</h3>
  </div>
  <div class="button-container">
    <div style="display: flex; gap: 1rem;">
      <AnimatedButton
        type="send"
        label="Send"
        onclick={controller.onJointsSendButtonClicked}
        disabled={controller.isMoving}
      />
      <!-- <button
        class="button-primary"
        disabled={controller.auto}
        onclick={controller.onPoseSendButtonClicked}>Send</button
      > -->
      <!-- <ToggleSwitch label="Auto" design="slider" bind:checked={controller.auto} /> -->
    </div>
    <AnimatedButton
      type="stop"
      label="Stop"
      onclick={controller.onStopButtonClicked}
      disabled={!controller.isMoving}
    />
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
