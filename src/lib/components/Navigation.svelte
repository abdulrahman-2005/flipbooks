<script>
  import { auth } from '$lib/firebase';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { signOut as firebaseSignOut } from 'firebase/auth';
  import { goto } from '$app/navigation';
  import toast from 'svelte-french-toast';

  let user = null;
  let mounted = false;

  onMount(() => {
    mounted = true;
    return auth.onAuthStateChanged((u) => {
      user = u;
    });
  });

  async function signOut() {
    try {
      await firebaseSignOut(auth);
      goto('/login');
    } catch (error) {
      toast.error('Error signing out');
    }
  }
</script>

{#if mounted}
<nav class="bg-white shadow">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="text-2xl font-bold text-primary-600">Flipbooks</a>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <a
            href="/"
            class="inline-flex items-center px-1 pt-1 {$page.url.pathname === '/' ? 'border-b-2 border-primary-500 text-gray-900' : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
          >
            Home
          </a>
          {#if user}
            <a
              href="/dashboard"
              class="inline-flex items-center px-1 pt-1 {$page.url.pathname === '/dashboard' ? 'border-b-2 border-primary-500 text-gray-900' : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
            >
              Dashboard
            </a>
            <a
              href="/new"
              class="inline-flex items-center px-1 pt-1 {$page.url.pathname === '/new' ? 'border-b-2 border-primary-500 text-gray-900' : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
            >
              Create Flipbook
            </a>
          {/if}
        </div>
      </div>
      <div class="flex items-center">
        {#if user}
          <button
            on:click={signOut}
            class="ml-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Sign out
          </button>
        {:else}
          <a
            href="/login"
            class="ml-4 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in
          </a>
          <a
            href="/signup"
            class="ml-4 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
          >
            Sign up
          </a>
        {/if}
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <div class="sm:hidden">
    <div class="pt-2 pb-3 space-y-1">
      <a
        href="/"
        class="block pl-3 pr-4 py-2 {$page.url.pathname === '/' ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700' : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}"
      >
        Home
      </a>
      {#if user}
        <a
          href="/dashboard"
          class="block pl-3 pr-4 py-2 {$page.url.pathname === '/dashboard' ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700' : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}"
        >
          Dashboard
        </a>
        <a
          href="/new"
          class="block pl-3 pr-4 py-2 {$page.url.pathname === '/new' ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-700' : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}"
        >
          Create Flipbook
        </a>
      {/if}
    </div>
  </div>
</nav>
{/if} 