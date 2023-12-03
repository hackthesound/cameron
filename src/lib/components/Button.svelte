<script>
  export let href = "";
</script>

{#if href == ""}
  <button class="btn"><slot /></button>
{:else}
  <a {href} class="btn"><slot /></a>
{/if}

<style lang="scss">
  a {
    text-decoration: none;
  }

  .btn {
    background-color: $buttons;
    color: $text-color;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition:
      background-color 0.3s,
      box-shadow 0.3s;

    &:hover {
      background-color: darken($buttons, 10%);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px lighten($buttons, 10%);
    }

    &:active {
      background-color: lighten($buttons, 10%);
    }
  }
</style>
