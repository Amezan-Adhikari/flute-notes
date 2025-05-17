<nav class="w-full bg-white border-b shadow-md font-[Poppins] relative z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <a href="/" class="Logo font-[Koho] text-2xl">Flute Notes</a>
  
        <!-- Hamburger Button -->
        <button id="menu-toggle" class="md:hidden text-gray-700 focus:outline-none">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
  
      <!-- Navigation Links -->
      <div id="nav-links" class="hidden flex-col gap-4 pb-4 md:flex md:flex-row md:items-center md:justify-center md:gap-6 md:pb-0">
        <a href="/" class="block text-center text-gray-700 hover:text-blue-500">Home</a>
        <a href="/popular" class="block text-center text-gray-700 hover:text-blue-500">Popular</a>
        <a href="/allsongs" class="block text-center text-gray-700 hover:text-blue-500">All Songs</a>
        <a href="/sargams" class="block text-center text-gray-700 hover:text-blue-500">Sargams</a>
        <a href="/blog" class="block text-center text-gray-700 hover:text-blue-500">Blog</a>
        <a href="/request-a-song" class="block text-center text-gray-700 hover:text-blue-500">Request a Song</a>
        <a href="/contact" class="block text-center text-gray-700 hover:text-blue-500">Contact</a>
        <a href="/about" class="block text-center text-gray-700 hover:text-blue-500">About Us</a>
        <a href="/privacy-policy" class="block text-center text-gray-700 hover:text-blue-500">Privacy Policy</a>
        <a href="/terms-of-service" class="block text-center text-gray-700 hover:text-blue-500">Terms of Service</a>
      </div>
    </div>
  
    <script>
      const toggle = document.getElementById('menu-toggle');
      const navLinks = document.getElementById('nav-links');
  
      toggle.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent event from bubbling up
        navLinks.classList.toggle('hidden');
      });
  
      // Close nav if clicked outside on mobile
      document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !toggle.contains(e.target) && window.innerWidth < 768) {
          navLinks.classList.add('hidden');
        }
      });
  
      // Optional: Close nav when resizing to desktop view
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
          navLinks.classList.remove('hidden');
        }
      });
    </script>
  </nav>
  