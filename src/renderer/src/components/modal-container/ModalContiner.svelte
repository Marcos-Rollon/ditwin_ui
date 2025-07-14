<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  /**
   * @type {
   *    {
   *        show: boolean,
   *        onAccept: () => void,
   *        onCancel: () => void,
   *        cancelLabel: string,
   *        acceptLabel: string,
   *        children: any
   *    }
   * }
   */
  let {
    show = $bindable(false),
    onAccept,
    onCancel,
    cancelLabel = 'Cancel',
    acceptLabel = 'Accept',
    children
  } = $props()
  onMount(() => {})
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class="modal-container {show ? '' : 'hidden'}"
  onclick={() => {
    onCancel?.()
    show = false
  }}
>
  <div transition:fade class="modal-menu" onclick={(e) => e.stopPropagation()}>
    {@render children?.()}
    <div class="button-container">
      <button
        class="modal-button modal-close-button"
        onclick={() => {
          onCancel?.()
          show = false
        }}>{cancelLabel}</button
      >
      <button
        class="modal-button modal-accept-button"
        onclick={() => {
          onAccept?.()
          show = false
        }}>{acceptLabel}</button
      >
    </div>
  </div>
</div>

<style>
  .modal-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    backdrop-filter: blur(3px);
  }
  .modal-menu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 80%;

    border-radius: 8px;
    background-color: var(--main-bg-color);
    z-index: 10;

    padding: 16px;
  }
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
  .modal-button {
    margin-top: 16px;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 16px;
    padding-right: 16px;
    border: none;
    color: var(--white-color);
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
  }
  .modal-close-button {
    background-color: var(--error-red);
  }
  .modal-close-button:hover {
    background-color: var(--error-red-dark);
    filter: drop-shadow(4px 4px 0px var(--shadow-color));
  }
  .modal-accept-button {
    background-color: var(--success-green);
  }
  .modal-accept-button:hover {
    background-color: var(--success-green-dark);
    filter: drop-shadow(4px 4px 0px var(--shadow-color));
  }
  .hidden {
    display: none;
  }
</style>
