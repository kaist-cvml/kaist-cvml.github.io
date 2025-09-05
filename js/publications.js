// Publications Page JavaScript - JSON-based management
document.addEventListener('DOMContentLoaded', async function () {
  const publicationsContainer = document.querySelector('.publications-content');
  const filterContainer = document.querySelector('.publication-filters');
  const searchInput = document.querySelector('.publication-search input');

  let allPublications = [];
  let currentFilter = 'all';
  let currentSearch = '';

  // Initialize publications page
  await initializePublications();

  // Load publications from JSON
  async function initializePublications() {
    try {
      // Load publications data
      allPublications = await window.dataManager.getPublications();

      // Create filter buttons
      await createFilterButtons();

      // Display publications
      displayPublications(allPublications);

      // Setup event listeners
      setupEventListeners();

    } catch (error) {
      console.error('Error initializing publications:', error);
      showErrorMessage();
    }
  }

  // Create dynamic filter buttons based on available years
  async function createFilterButtons() {
    if (!filterContainer) return;

    const years = await window.dataManager.getPublicationYears();
    const categories = await window.dataManager.getPublicationCategories();

    filterContainer.innerHTML = `
      <div class="filter-group">
        <label>Filter by Year:</label>
        <button class="filter-btn active" data-filter="year" data-value="all">All Years</button>
        ${years.map(year => `<button class="filter-btn" data-filter="year" data-value="${year}">${year}</button>`).join('')}
      </div>
      <div class="filter-group">
        <label>Filter by Category:</label>
        <button class="filter-btn active" data-filter="category" data-value="all">All Categories</button>
        ${Object.entries(categories).map(([key, label]) =>
      `<button class="filter-btn" data-filter="category" data-value="${key}">${label}</button>`
    ).join('')}
      </div>
      <div class="filter-group">
        <label>Filter by Type:</label>
        <button class="filter-btn active" data-filter="type" data-value="all">All Types</button>
        <button class="filter-btn" data-filter="type" data-value="conference">Conferences</button>
        <button class="filter-btn" data-filter="type" data-value="journal">Journals</button>
        <button class="filter-btn" data-filter="type" data-value="workshop">Workshops</button>
        <button class="filter-btn" data-filter="type" data-value="preprint">Preprints</button>
      </div>
    `;
  }

  // Display publications grouped by year with preprints first
  function displayPublications(publications) {
    if (!publicationsContainer) return;

    if (publications.length === 0) {
      publicationsContainer.innerHTML = '<div class="no-results">No publications found matching your criteria.</div>';
      return;
    }

    // Separate preprints from other publications
    const preprints = publications.filter(pub => pub.type === 'preprint');
    const otherPublications = publications.filter(pub => pub.type !== 'preprint');

    let html = '';

    // Add preprints section if there are any
    if (preprints.length > 0) {
      html += `
        <div class="year-section" data-year="preprints">
          <h2 class="year-title">Preprints</h2>
          <div class="publications-list">
            ${preprints.map(pub => createPublicationHTML(pub)).join('')}
          </div>
        </div>
      `;
    }

    // Group other publications by year
    const publicationsByYear = groupPublicationsByYear(otherPublications);

    // Add other publications by year
    Object.keys(publicationsByYear).sort((a, b) => b - a).forEach(year => {
      html += `
        <div class="year-section" data-year="${year}">
          <h2 class="year-title">${year}</h2>
          <div class="publications-list">
            ${publicationsByYear[year].map(pub => createPublicationHTML(pub)).join('')}
          </div>
        </div>
      `;
    });

    publicationsContainer.innerHTML = html;

    // Add animations
    setTimeout(() => {
      const items = publicationsContainer.querySelectorAll('.publication-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }, 100);
  }

  // Group publications by year
  function groupPublicationsByYear(publications) {
    return publications.reduce((groups, pub) => {
      const year = pub.year;
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(pub);
      return groups;
    }, {});
  }

  // Create HTML for a single publication
  function createPublicationHTML(pub) {
    const formattedDate = window.dataManager.formatDate(pub.date, 'short');

    return `
      <div class="publication-item ${pub.featured ? 'featured' : ''}" data-category="${pub.category}" data-type="${pub.type}">
        <div class="publication-content">
          <h3 class="publication-title">${pub.title}</h3>
          <p class="publication-authors">${pub.authors.join(', ')}</p>
          <p class="publication-venue">
            <strong>${pub.venue} ${pub.year}</strong>
            ${pub.presentation ? ` (${pub.presentation.charAt(0).toUpperCase() + pub.presentation.slice(1)})` : ''}
          </p>
          ${pub.abstract ? `<p class="publication-description">${pub.abstract}</p>` : ''}
          ${pub.keywords ? `<div class="publication-keywords">
            ${pub.keywords.map(keyword => `<span class="keyword">${keyword}</span>`).join('')}
          </div>` : ''}
          <div class="publication-links">
            ${pub.pdf_url && pub.pdf_url !== '#' ? `<a href="${pub.pdf_url}" class="pub-link">Paper</a>` : ''}
            ${pub.code_url && pub.code_url !== '#' ? `<a href="${pub.code_url}" class="pub-link">Code</a>` : ''}
            ${pub.project_url && pub.project_url !== '#' ? `<a href="${pub.project_url}" class="pub-link">Project Page</a>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // Setup event listeners
  function setupEventListeners() {
    // Filter buttons
    if (filterContainer) {
      filterContainer.addEventListener('click', handleFilterClick);
    }

    // Search functionality
    if (searchInput) {
      searchInput.addEventListener('input', handleSearch);
    }
  }

  // Handle filter button clicks
  function handleFilterClick(e) {
    if (!e.target.classList.contains('filter-btn')) return;

    const filterType = e.target.dataset.filter;
    const filterValue = e.target.dataset.value;

    // Update active button in the same group
    const filterGroup = e.target.closest('.filter-group');
    filterGroup.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Apply filter
    applyFilters();
  }

  // Handle search input
  function handleSearch(e) {
    currentSearch = e.target.value.toLowerCase();
    applyFilters();
  }

  // Apply all active filters
  async function applyFilters() {
    const activeFilters = {
      year: getActiveFilterValue('year'),
      category: getActiveFilterValue('category'),
      type: getActiveFilterValue('type')
    };

    let filteredPublications = [...allPublications];

    // Apply year filter
    if (activeFilters.year !== 'all') {
      filteredPublications = filteredPublications.filter(pub => pub.year.toString() === activeFilters.year);
    }

    // Apply category filter
    if (activeFilters.category !== 'all') {
      filteredPublications = filteredPublications.filter(pub => pub.category === activeFilters.category);
    }

    // Apply type filter
    if (activeFilters.type !== 'all') {
      filteredPublications = filteredPublications.filter(pub => pub.type === activeFilters.type);
    }

    // Apply search filter
    if (currentSearch) {
      filteredPublications = await window.dataManager.searchPublications(currentSearch);
      // Re-apply other filters to search results
      if (activeFilters.year !== 'all') {
        filteredPublications = filteredPublications.filter(pub => pub.year.toString() === activeFilters.year);
      }
      if (activeFilters.category !== 'all') {
        filteredPublications = filteredPublications.filter(pub => pub.category === activeFilters.category);
      }
      if (activeFilters.type !== 'all') {
        filteredPublications = filteredPublications.filter(pub => pub.type === activeFilters.type);
      }
    }

    displayPublications(filteredPublications);
  }

  // Get active filter value for a specific filter type
  function getActiveFilterValue(filterType) {
    const activeBtn = filterContainer.querySelector(`[data-filter="${filterType}"].active`);
    return activeBtn ? activeBtn.dataset.value : 'all';
  }

  // Show error message
  function showErrorMessage() {
    if (publicationsContainer) {
      publicationsContainer.innerHTML = `
        <div class="error-message">
          <h3>Error Loading Publications</h3>
          <p>We're having trouble loading the publications data. Please try refreshing the page.</p>
        </div>
      `;
    }
  }

  // Export functions for external use
  window.publicationsManager = {
    refreshData: async function () {
      window.dataManager.clearCache();
      await initializePublications();
    },
    searchPublications: function (query) {
      if (searchInput) {
        searchInput.value = query;
        handleSearch({ target: searchInput });
      }
    }
  };
});
