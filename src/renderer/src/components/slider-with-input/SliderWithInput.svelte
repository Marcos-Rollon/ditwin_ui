<script>
  let {
    label,
    value = $bindable(0),
    unit = 'mm',
    min = -180,
    max = 180,
    step = 1,
    disabled = $bindable(false)
  } = $props()

  const id = `${label}-${unit}`.replace(/\s+/g, '-').toLowerCase()
  // const handleUpdate = (e) => {
  //   value = parseFloat(e.target.value);
  // };
</script>

<div class="slider-container">
  <label for={id}>{label} ({unit})</label>
  <div class="slider-wrapper">
    <input {id} type="range" bind:value {min} {max} {step} {disabled} />
    <div class="value-box">{value.toFixed(4)}</div>
  </div>
</div>

<style>
  .slider-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: #f0f0e0;
    font-family: sans-serif;
    color: var(--main-text-color, #f0f0e0);
    background-color: var(--main-bg-color);
    filter: drop-shadow(4px 4px 4px rgba(33, 33, 33, 0.674));
    border-radius: 4px;
    padding: 8px;
  }

  .slider-container:hover {
    filter: drop-shadow(6px 6px 6px rgba(33, 33, 33, 0.674));
    background-color: rgb(37, 29, 29);
  }

  label {
    font-size: 0.9rem;
  }

  .slider-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  input[type='range'] {
    flex: 1;
    accent-color: #668cff;
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
  }

  .value-box {
    background-color: #2b2f38;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    color: #fff;
    font-variant-numeric: tabular-nums;
    font-family: monospace;
    width: 90px; /* enough for '10.0000' */
    text-align: right;
  }
</style>
