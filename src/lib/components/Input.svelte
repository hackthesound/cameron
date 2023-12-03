<script lang="ts">
  export let placeholder: string = "";
  export let helpText: string = "";
  export let type: string = "text";
  export let name: string = "";
  export let required: boolean = true;

  export let value = "";
</script>

<div class="both">
  <label for={name}><b>{helpText}</b></label>
  {#if type === "text"}
    <input type="text" {placeholder} {name} {required} bind:value />
  {:else if type === "password"}
    <input type="password" {placeholder} {name} {required} bind:value />
  {:else if type === "email"}
    <input type="email" {placeholder} {name} {required} bind:value />
  {/if}
</div>

<style lang="scss">
  .both {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 2px solid $buttons;
    border-radius: 5px;
    box-sizing: border-box;
    color: $text-color;
    background-color: $input-bg;

    &:focus {
      outline: none;
    }
  }
</style>
