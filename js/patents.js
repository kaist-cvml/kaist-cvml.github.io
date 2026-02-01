// Patents Page JavaScript - JSON-based management
document.addEventListener('DOMContentLoaded', async function () {
  const patentsContainer = document.querySelector('.patents-content');

  await initializePatents();

  async function initializePatents() {
    try {
      const { categories, patents } = await window.dataManager.getPatents();
      renderPatents(categories, patents);
    } catch (error) {
      console.error('Error initializing patents:', error);
      showErrorMessage();
    }
  }

  function renderPatents(categories, patents) {
    if (!patentsContainer) return;

    if (!patents || patents.length === 0) {
      patentsContainer.innerHTML = '<div class="no-results">No patents found.</div>';
      return;
    }

    const grouped = patents.reduce((acc, patent) => {
      const key = patent.region || 'international';
      if (!acc[key]) acc[key] = [];
      acc[key].push(patent);
      return acc;
    }, {});

    const order = ['international', 'domestic'];
    let html = '';

    order.forEach((key) => {
      if (!grouped[key]) return;
      const title = categories && categories[key] ? categories[key] : key;
      html += `
        <div class="patent-group">
          <div class="section-header">
            <h2 class="section-title">${title}</h2>
          </div>
          <ol class="patent-list">
            ${grouped[key].map(createPatentHTML).join('')}
          </ol>
        </div>
      `;
    });

    patentsContainer.innerHTML = html;
  }

  function createPatentHTML(patent) {
    const authors = Array.isArray(patent.authors) ? patent.authors.join(', ') : '';
    const title = patent.title || '';
    const patentNo = patent.patent_no || '';
    const status = patent.status || '';

    return `
      <li class="patent-item">
        <div class="patent-title">${title}</div>
        <div class="patent-meta">
          ${authors ? `<span class="patent-authors">${authors}</span>` : ''}
          ${patentNo ? `<span class="patent-details">${patentNo}</span>` : ''}
          ${status ? `<span class="patent-status">${status}</span>` : ''}
        </div>
      </li>
    `;
  }

  function showErrorMessage() {
    if (patentsContainer) {
      patentsContainer.innerHTML = `
        <div class="error-message">
          <h3>Error Loading Patents</h3>
          <p>We're having trouble loading the patents data. Please try refreshing the page.</p>
        </div>
      `;
    }
  }
});
