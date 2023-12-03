<script lang="ts">
  import { Input, Button, Link, Error } from "$lib/components/stuff";
  import db from "$lib/db";

  import { goto } from "$app/navigation";

  let email: string = "";
  let password: string = "";

  let errorMessage: string;

  async function submitForm() {
    let res = await db.signIn(email, password);
    if (res.error) {
      errorMessage = res.error.message;
      return;
    } else {
      goto("/app");
    }
  }
</script>

<div class="center">
  {#if errorMessage}
    <Error>{errorMessage}</Error>
  {/if}

  <h2>Welcome to Journey!</h2>
  <form on:submit|preventDefault={submitForm}>
    <Input
      name="email"
      placeholder="Email Address"
      helpText="Email Address"
      type="email"
      bind:value={email}
    ></Input>
    <Input
      name="password"
      placeholder="Password"
      helpText="Password"
      type="password"
      bind:value={password}
    ></Input>
    <div class="form-footer">
      <div class="align-left">
        <Link href="/auth/register">Need an account?</Link>
      </div>
      <div class="align-right">
        <Button>Login</Button>
      </div>
    </div>
  </form>
</div>

<style lang="scss">
  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
