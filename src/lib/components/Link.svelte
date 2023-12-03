<script>
  export let href = "";
</script>

<a {href}><slot /></a>

<style lang="scss">
  a {
    color: $link-color;
    text-decoration: none;
  }
</style>
