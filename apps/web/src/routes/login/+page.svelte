<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';

  let email = $state('');
  let password = $state('');
  let submitting = $state(false);
  let error = $state<string | null>(null);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    submitting = true;
    error = null;
    try {
      const res = await fetch('http://localhost:4322/api/v1/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        error = `Login failed: ${res.status}`;
      }
    } catch (err) {
      error = `Network error: ${(err as Error).message}`;
    } finally {
      submitting = false;
    }
  }
</script>

<Card title="Sign in to argismonitor">
  <form onsubmit={handleSubmit} class="space-y-4 max-w-md">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        id="email"
        type="email"
        required
        bind:value={email}
        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="you@example.com"
      />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input
        id="password"
        type="password"
        required
        bind:value={password}
        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    {#if error}
      <p class="text-sm text-red-600">{error}</p>
    {/if}
    <Button type="submit" disabled={submitting}>
      {submitting ? 'Signing in...' : 'Sign in'}
    </Button>
  </form>
</Card>
