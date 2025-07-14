<!-- Adapted from https://uiverse.io/vinodjangid07/smart-emu-83 -->
<script>
  let { type, label, onclick, disabled } = $props()
</script>

<button
  class="button"
  class:delete={type === 'delete'}
  class:reload={type === 'reload'}
  class:send={type === 'send'}
  class:stop={type === 'stop'}
  data-label={label}
  {onclick}
  {disabled}
>
  {#if type === 'delete'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      class="bi bi-trash3 svgIcon"
      viewBox="0 0 16 16"
    >
      <path
        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
      ></path>
    </svg>
    <!-- Copied from https://copyandpastesvg.com/ -->
  {:else if type === 'reload'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="white"
      class="bi bi-arrow-repeat svgIcon"
      viewBox="0 0 16 16"
    >
      <path
        d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"
      ></path>
      <path
        fill-rule="evenodd"
        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
      ></path>
    </svg>
  {:else if type === 'send'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      class="svgIcon"
      fill="none"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"
      ></path>
      <path d="M6 12h16"></path>
    </svg>
  {:else if type === 'stop'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      class="bi bi-sign-stop svgIcon"
      viewBox="0 0 16 16"
    >
      <path
        d="M3.16 10.08c-.931 0-1.447-.493-1.494-1.132h.653c.065.346.396.583.891.583.524 0 .83-.246.83-.62 0-.303-.203-.467-.637-.572l-.656-.164c-.61-.147-.978-.51-.978-1.078 0-.706.597-1.184 1.444-1.184.853 0 1.386.475 1.436 1.087h-.645c-.064-.32-.352-.542-.797-.542-.472 0-.77.246-.77.6 0 .261.196.437.553.522l.654.161c.673.164 1.06.487 1.06 1.11 0 .736-.574 1.228-1.544 1.228Zm3.427-3.51V10h-.665V6.57H4.753V6h3.006v.568H6.587Z"
      ></path>
      <path
        fill-rule="evenodd"
        d="M11.045 7.73v.544c0 1.131-.636 1.805-1.661 1.805-1.026 0-1.664-.674-1.664-1.805V7.73c0-1.136.638-1.807 1.664-1.807s1.66.674 1.66 1.807Zm-.674.547v-.553c0-.827-.422-1.234-.987-1.234-.572 0-.99.407-.99 1.234v.553c0 .83.418 1.237.99 1.237.565 0 .987-.408.987-1.237m1.15-2.276h1.535c.82 0 1.316.55 1.316 1.292 0 .747-.501 1.289-1.321 1.289h-.865V10h-.665zm1.436 2.036c.463 0 .735-.272.735-.744s-.272-.741-.735-.741h-.774v1.485z"
      ></path>
      <path
        fill-rule="evenodd"
        d="M4.893 0a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146A.5.5 0 0 0 11.107 0zM1 5.1 5.1 1h5.8L15 5.1v5.8L10.9 15H5.1L1 10.9z"
      ></path>
    </svg>
    <!-- Copied from https://copyandpastesvg.com/ -->
  {/if}
</button>

<style>
  .button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--main-bg-color-light);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    position: relative;
  }

  .svgIcon {
    /* width: 12px; */
    transition-duration: 0.3s;
  }

  .svgIcon path {
    fill: white;
  }

  .button:hover {
    width: 140px;
    border-radius: 50px;
    transition-duration: 0.3s;
    /* background-color: rgb(255, 69, 69); */
    align-items: center;
  }

  .button:hover .svgIcon {
    width: 50px;
    transition-duration: 0.3s;
    transform: translateY(60%);
  }

  .button::before {
    position: absolute;
    top: -20px;
    content: attr(data-label);
    color: white;
    transition-duration: 0.3s;
    font-size: 2px;
  }

  .button:hover::before {
    font-size: 13px;
    opacity: 1;
    transform: translateY(30px);
    transition-duration: 0.3s;
  }

  .button:active {
    background-color: var(--main-accent-color-blue);
  }

  .button:active .svgIcon {
    transform: translateY(60%) scale(0.95);
  }

  /* SET THE COLOR OF THE ICONS HERE */
  .button:hover.delete {
    background-color: var(--error-red);
  }
  .button:active.delete {
    transform: translateY(10%) scale(0.95);
  }

  .button:hover.reload {
    background-color: var(--main-accent-color-blue);
  }
  .button:active.reload {
    transform: translateY(10%) scale(0.95);
  }

  .button:hover.send {
    background-color: var(--main-accent-color-pink);
  }
  .button:active.send {
    transform: translateY(10%) scale(0.95);
  }

  .button:hover.stop {
    background-color: var(--error-red);
  }
  .button:active.stop {
    transform: translateY(10%) scale(0.95);
  }
</style>
