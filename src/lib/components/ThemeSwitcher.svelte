<script lang="ts">
  import { Icon, Sun, Moon } from "svelte-hero-icons";

  let isDarkMode = false;

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    
    // Logic here
  }
</script>

<div class="bottom-left">
  <button on:click={toggleTheme} class="btn">
    {#if isDarkMode}
      <Icon src={Sun} solid size="30px" />
    {:else}
      <Icon src={Moon} solid size="30px" />
    {/if}
  </button>
</div>

<style lang="scss">
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
