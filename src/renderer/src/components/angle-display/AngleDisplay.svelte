<script>
  import { onMount } from 'svelte'
  let {
    angle = $bindable(0),
    strokeWidth = 16,
    backgroundColor = 'rgb(38, 42, 53)',
    arcColor = 'rgb(115, 25, 147)',
    dotColor = 'rgb(189, 36, 247)',
    size = 200 // Make size a prop so it can be changed
  } = $props()

  let pathD = $state('')
  let dot = $state({ x: 0, y: 0 })

  // Make center reactive to size changes
  let center = $derived(size / 2)
  let radius = $derived(center - strokeWidth)
  let dotRadius = $derived(strokeWidth - 10 > 0 ? strokeWidth - 10 : 1)

  onMount(() => {
    dot = polarToCartesian(center, center, radius, angle)
  })

  $effect(() => {
    // Round angle to nearset integer
    angle = Math.round(angle)
    updatePath()
  })

  function polarToCartesian(cx, cy, r, deg) {
    const rad = ((deg - 90) * Math.PI) / 180
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    }
  }

  function updatePath() {
    let startPt = polarToCartesian(center, center, radius, 0)
    let endPt = polarToCartesian(center, center, radius, angle)
    let xAxisRotation = 0
    let largeArcFlag, sweepFlag
    if (angle > 0) {
      if (angle <= 180) {
        largeArcFlag = false
        sweepFlag = true
      } else {
        largeArcFlag = true
        sweepFlag = true
      }
    } else {
      if (angle >= -180) {
        largeArcFlag = false
        sweepFlag = false
      } else {
        largeArcFlag = true
        sweepFlag = false
      }
    }

    pathD = `M ${startPt.x} ${startPt.y}
    A ${radius} ${radius} ${xAxisRotation} ${largeArcFlag ? '1' : '0'} ${sweepFlag ? '1' : '0'} ${endPt.x} ${endPt.y}`
    dot = endPt
  }

  function onInput(e) {
    const val = parseFloat(e.target.value)

    if (!isNaN(val)) angle = val
    updatePath()
  }
</script>

<div class="container" style="width: {size}px; height: {size}px;">
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    <circle
      cx={center}
      cy={center}
      r={radius}
      stroke={backgroundColor}
      stroke-width={strokeWidth}
      fill="none"
    />
    <path
      d={pathD}
      stroke={arcColor}
      stroke-width={strokeWidth}
      fill="none"
      stroke-linecap="round"
    />
    <circle cx={dot.x} cy={dot.y} r={dotRadius} fill={dotColor} />
  </svg>

  <input
    type="number"
    value={angle}
    oninput={onInput}
    class="angle-input"
    style="font-size: {12 + size * 0.1}px;"
  />
</div>

<style>
  .container {
    position: relative;
    background: rgb(34, 34, 34);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  .angle-input {
    width: 180px;
    text-align: center;
    font-weight: bold;
    background: transparent;
    border: none;
    color: var(--main-text-color, #f87e6a);
    outline: none;
  }

  .angle-input::-webkit-outer-spin-button,
  .angle-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
