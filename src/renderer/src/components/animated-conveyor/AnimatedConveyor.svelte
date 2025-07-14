<script>
  /** @type {{direction: string, running: boolean}} */
  let { direction = 'down', running } = $props()

  const containerSize = 80
  const arrowSize = containerSize / 4
</script>

<div class="container" style="--container-size: {containerSize}px;">
  <div class="side"></div>
  <div class="center {direction != 'up' ? 'rotate-180' : ''}">
    <div class="arrow-container {running ? 'animate' : ''}">
      <!-- First set of arrows -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={arrowSize}
        height={arrowSize}
        fill="currentColor"
        class="bi bi-triangle arrow"
        viewBox="0 0 16 16"
      >
        <path
          d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={arrowSize}
        height={arrowSize}
        fill="currentColor"
        class="bi bi-triangle arrow"
        viewBox="0 0 16 16"
      >
        <path
          d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={arrowSize}
        height={arrowSize}
        fill="currentColor"
        class="bi bi-triangle arrow"
        viewBox="0 0 16 16"
      >
        <path
          d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"
        ></path>
      </svg>

      <!-- Second set of arrows for seamless loop -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={arrowSize}
        height={arrowSize}
        fill="currentColor"
        class="bi bi-triangle arrow"
        viewBox="0 0 16 16"
      >
        <path
          d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={arrowSize}
        height={arrowSize}
        fill="currentColor"
        class="bi bi-triangle arrow"
        viewBox="0 0 16 16"
      >
        <path
          d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={arrowSize}
        height={arrowSize}
        fill="currentColor"
        class="bi bi-triangle arrow"
        viewBox="0 0 16 16"
      >
        <path
          d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"
        ></path>
      </svg>
    </div>
  </div>
  <div class="side"></div>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: var(--container-size);
    height: var(--container-size);
  }

  .center {
    position: relative;
    width: calc(var(--container-size) * 0.7);
    height: calc(var(--container-size) * 0.95);
    background-color: var(--main-bg-color-light);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    overflow: hidden; /* This is crucial for the conveyor effect */
  }

  .arrow-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    transition: all 0.2s ease-in-out;
    gap: calc(var(--container-size) * 0.1); /* Space between arrows */
  }

  .arrow {
    flex-shrink: 0; /* Prevent arrows from shrinking */
  }

  .side {
    width: calc(var(--container-size) * 0.1);
    height: calc(var(--container-size) * 0.95);
    background-color: var(--main-accent-color-blue);
    border-radius: 5px;
  }

  .rotate-180 {
    transform: rotate(180deg);
  }

  .animate {
    animation: scroll 1.5s linear infinite;
  }

  @keyframes scroll {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(
        calc(var(--container-size) * -0.7)
      ); /* Reduced distance so second set appears earlier */
    }
  }
</style>
