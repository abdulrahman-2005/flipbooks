<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import ControlPanel from '$lib/components/ControlPanel.svelte';
    import MainContent from '$lib/components/MainContent.svelte';
    import { flipbookStore } from '$lib/stores/flipbook-store';
    

    // Initialize jsPDF when in browser
    onMount(() => {
        if (browser) {
            import('jspdf').then(module => {
                window.jsPDF = module.jsPDF;
            });
        }
    });
</script>

<svelte:head>
    <title>Flipbook Studio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
</svelte:head>

<main>
    <div class="container">
        <ControlPanel />
        <MainContent />
    </div>
</main>

<style>
    main {
        width: 100%;
        min-height: 100vh;
    }

    .container {
        display: grid;
        grid-template-columns: 380px 1fr;
        width: 100%;
        min-height: 100vh;
        gap: 20px;
        padding: 20px;
        box-sizing: border-box;
    }

    @media (max-width: 768px) {
        .container {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            padding: 10px;
            gap: 10px;
        }
    }
</style>
