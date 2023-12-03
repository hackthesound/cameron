<script>
  export let isOpen = false;
  export let title = "";
  export let onClose = () => {};

  function closeDialog() {
    onClose();
  }
</script>

{#if isOpen}
  <div class="backdrop open">
    <div class="dialog">
      <h1>{title}</h1>
      <slot />
      <button class="close-button" on:click={closeDialog}>Close</button>
    </div>
  </div>
{/if}

<style lang="scss">
  .backdrop {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
    visibility: hidden;
    opacity: 0;
    transition:
      visibility 0s,
      opacity 0.3s linear;
  }

  .backdrop.open {
    visibility: visible;
    opacity: 1;
  }

  .dialog {
    background: $bg-color;
    color: $text-color;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    width: 100ch;
  }

  .close-button {
    background-color: $destructive;
    color: $text-color;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    float: right;
    border-radius: 5px;
  }
</style>
