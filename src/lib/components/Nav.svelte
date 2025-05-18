
<script>
  import { page } from '$app/stores';
  
  let isMenuOpen = false;
  let isMoreMenuOpen = false;
  let innerWidth = 0;

  // Close menus when resizing to desktop
  $: if (innerWidth >= 768) {
    isMenuOpen = false;
    isMoreMenuOpen = false;
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function toggleMoreMenu() {
    isMoreMenuOpen = !isMoreMenuOpen;
  }

  function closeMenus() {
    isMenuOpen = false;
    isMoreMenuOpen = false;
  }

  function closeMoreMenu() {
    isMoreMenuOpen = false;
  }

  // Check if current path matches nav item
  function isActive(href) {
    if (href === '/') {
      return $page.url.pathname === '/';
    }
    return $page.url.pathname.startsWith(href);
  }

  // Main navigation items (horizontal)
  const mainNavItems = [
    { href: '/', label: 'Home' },
    { href: '/all-songs', label: 'All Songs' },
    { href: '/hindi-songs', label: 'Hindi Songs' },
    { href: '/nepali-songs', label: 'Nepali Songs' },
    { href: '/english-songs', label: 'English Songs' },
    { href: '/newari-songs', label: 'Newari Songs' },
    { href: '/sargams', label: 'Sargams' }
  ];

  // Additional navigation items (vertical menu)
  const moreNavItems = [
    { href: '/popular', label: 'Popular' },
    { href: '/blog', label: 'Blog' },
    { href: '/request-a-song', label: 'Request a Song' },
    { href: '/contact', label: 'Contact' },
    { href: '/about', label: 'About Us' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' }
  ];

  // All nav items for mobile menu
  const allNavItems = [...mainNavItems, ...moreNavItems];
</script>

<svelte:window bind:innerWidth on:click={closeMenus} />

<nav class="w-full bg-white border-b shadow-md font-[Poppins] relative z-50">
  <div class="max-w-8xl mb-2 mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <a href="/" class="font-[Koho] text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
        Flute Notes
      </a>

      <!-- Desktop Navigation - Center -->
      <div class="hidden lg:flex flex-1 justify-center mx-8">
        <div class="flex items-center gap-6">
          {#each mainNavItems as item}
            <a 
              href={item.href} 
              class="px-4 py-2 rounded-lg text-center font-medium transition-all duration-200 border"
              class:text-blue-600={isActive(item.href)}
              class:bg-blue-100={isActive(item.href)}
              class:border-blue-400={isActive(item.href)}
              class:text-gray-700={!isActive(item.href)}
              class:border-gray-200={!isActive(item.href)}
              class:hover:text-blue-600={!isActive(item.href)}
              class:hover:bg-blue-50={!isActive(item.href)}
              class:hover:border-blue-300={!isActive(item.href)}
            >
              {item.label}
            </a>
          {/each}
        </div>
      </div>

      <!-- Desktop More Menu - Right -->
      <div class="hidden lg:block relative">
        <button 
          on:click|stopPropagation={toggleMoreMenu}
          class="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          aria-label="More options"
          aria-expanded={isMoreMenuOpen}
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>

        <!-- More Menu Dropdown -->
        {#if isMoreMenuOpen}
          <div 
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            on:click|stopPropagation
          >
            {#each moreNavItems as item}
              <a 
                href={item.href} 
                class="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                class:text-blue-600={isActive(item.href)}
                class:bg-blue-100={isActive(item.href)}
                on:click={closeMoreMenu}
              >
                {item.label}
              </a>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Mobile Hamburger Button -->
      <button 
        on:click|stopPropagation={toggleMenu}
        class="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {#if !isMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {/if}
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation Links -->
    <div 
      class="overflow-hidden transition-all duration-300 ease-in-out lg:hidden"
      class:max-h-0={!isMenuOpen}
      class:max-h-screen={isMenuOpen}
    >
      <div class="flex flex-col gap-2 pb-4">
        {#each allNavItems as item}
          <a 
            href={item.href} 
            class="block py-3 px-5 rounded-lg text-center font-medium transition-all duration-200 border border-gray-200"
            class:text-blue-600={isActive(item.href)}
            class:bg-blue-100={isActive(item.href)}
            class:border-blue-400={isActive(item.href)}
            class:text-gray-700={!isActive(item.href)}
            class:hover:text-blue-600={!isActive(item.href)}
            class:hover:bg-blue-50={!isActive(item.href)}
            class:hover:border-blue-200={!isActive(item.href)}
            on:click={closeMenus}
          >
            {item.label}
          </a>
        {/each}
      </div>
    </div>
  </div>
</nav>

<style>
  /* Custom styles for better visual hierarchy */
  nav {
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.95);
  }
  
  /* Smooth mobile menu animation */
  @media (max-width: 1023px) {
    .max-h-0 {
      max-height: 0;
    }
    .max-h-screen {
      max-height: 100vh;
    }
  }
</style>