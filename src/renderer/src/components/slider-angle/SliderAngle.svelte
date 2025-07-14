<script>
  import AngleDisplay from '../angle-display/AngleDisplay.svelte'
  let {
    value = $bindable(0),
    label = '',
    unit = 'deg',
    min = -180,
    max = 180,
    step = 1,
    disabled = $bindable(false)
  } = $props()

  const id = `${label}-${unit}`.replace(/\s+/g, '-').toLowerCase()
</script>

<div class="slider-container">
  <div class="slider-section">
    <label for={id}>{label} ({unit})</label>
    <div class="slider-wrapper">
      <input {id} type="range" bind:value {min} {max} {step} {disabled} />
    </div>
  </div>
  <AngleDisplay angle={value} size={60} strokeWidth={8} />
</div>

<style>
  .slider-container {
    display: flex;
    gap: 0.5rem;
    color: var(--main-text-color, #f0f0e0);
    background-color: var(--main-bg-color);
    /* box-shadow: 6px 6px 0px 0px rgba(88, 88, 88, 0.366); */
    filter: drop-shadow(4px 4px 4px rgba(33, 33, 33, 0.674));
    border-radius: 4px;
    padding: 8px;
    font-family: sans-serif;
    align-items: center;
    overflow: hidden;
    width: 100%;
    transition: all 0.2s ease-in-out;
  }

  .slider-container:hover {
    filter: drop-shadow(6px 6px 6px rgba(33, 33, 33, 0.674));
    background-color: rgb(37, 29, 29);
  }
  .slider-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  label {
    font-size: 0.9rem;
  }

  .slider-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
  }

  input[type='range'] {
    width: 100%;
    accent-color: var(--main-accent-color-blue);
    height: 4px;
    background: var(--main-bg-color);
    border-radius: 2px;
    /* border: none; */
    outline: none;
    /* appearance: none; */
  }
  /* Webkit browsers (Chrome, Safari, Electron) */
  input[type='range']::-webkit-slider-track {
    background: var(--main-bg-color, #e0e0e0);
    height: 4px;
    border-radius: 2px;
    border: none;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: var(--main-accent-color-blue, #668cff);
    height: 16px;
    width: 16px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
</style>
