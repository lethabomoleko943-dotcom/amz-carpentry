// AMZ Contracting & Carpentry - Lead Engine & Interactive Gallery

document.addEventListener('DOMContentLoaded', () => {
    // --- Infinite Review Marquee Clone Setup ---
    setupMarquees();

    // --- Navigation & Layout Effects ---
    setupHeaderScroll();
    setupMobileMenu();

    // --- State Initialization (Leads & Configuration) ---
    initDataStores();

    // --- Routing (Admin Hash Toggle) ---
    setupHashRouting();

    // --- Portfolio Gallery Logic (54 Local Images) ---
    setupPortfolioGallery();

    // --- Contact Form Submission ---
    setupFormSubmission();

    // --- Admin Panel Operations ---
    setupAdminAuth();
    setupAdminTabs();
    setupAdminDashboard();
});

/**
 * Clones the review cards inside both marquees so the CSS horizontal slide
 * loops perfectly and infinitely without white-space gaps.
 */
function setupMarquees() {
    const row1 = document.getElementById('marquee-row-1');
    const row2 = document.getElementById('marquee-row-2');

    if (row1) {
        const cards = Array.from(row1.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            row1.appendChild(clone);
        });
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            row1.appendChild(clone);
        });
    }

    if (row2) {
        const cards = Array.from(row2.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            row2.appendChild(clone);
        });
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            row2.appendChild(clone);
        });
    }
}

/**
 * Blurs/highlights header navigation upon scroll.
 */
function setupHeaderScroll() {
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile navigation slide-out trigger.
 */
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

/**
 * Initializes and syncs lead submissions and website configuration from localStorage.
 */
function initDataStores() {
    // Default config values for AMZ
    const defaultConfig = {
        phone: '0843644017 / 0102134100',
        email: 'Cubriane@gmail.com',
        address: 'Lilongwe crescent street, Cosmo City Ext 2, South Africa, 2087',
        heroTitle: 'Crafting dreams into wood.',
        heroSubtitle: 'Quality general contracting, interior remodeling, custom carpentry, and outdoor structures. Serving our community with reliable craftsmanship and solid materials built to last.'
    };

    // Load or set config
    if (!localStorage.getItem('amz_config')) {
        localStorage.setItem('amz_config', JSON.stringify(defaultConfig));
    }
    applyConfig();

    // Default mock leads (for demonstration/testing)
    const defaultLeads = [
        {
            id: 'lead_1',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            name: 'Brenda Miller',
            phone: '503-555-2244',
            email: 'brendam@gmail.com',
            projectType: 'Home Remodeling & Drywall',
            budget: '$15,000 - $50,000',
            details: 'Need a full bathroom renovation. Tiling, replacing the drywall with green boards, installing custom built-in pine shelving, and adding a new window.',
            status: 'New'
        },
        {
            id: 'lead_2',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            name: 'Harold Finch',
            phone: '206-555-9011',
            email: 'finch@library.org',
            projectType: 'Decks, Pergolas & Outdoor',
            budget: '$5,000 - $15,000',
            details: 'Looking to build a 12x16 cedar timber deck in our backyard. We also want a custom pergola attached to the rear exterior wall.',
            status: 'Contacted'
        }
    ];

    if (!localStorage.getItem('amz_leads')) {
        localStorage.setItem('amz_leads', JSON.stringify(defaultLeads));
    }
}

/**
 * Updates DOM elements with content stored in config.
 */
function applyConfig() {
    const config = JSON.parse(localStorage.getItem('amz_config'));
    if (!config) return;

    // Apply to public elements
    const phoneEl = document.getElementById('contact-phone-text');
    const emailEl = document.getElementById('contact-email-text');
    const addressEl = document.getElementById('contact-address-text');
    const heroTitleEl = document.getElementById('hero-title-text');
    const heroSubtitleEl = document.getElementById('hero-subtitle-text');

    if (phoneEl) phoneEl.textContent = config.phone;
    if (emailEl) emailEl.textContent = config.email;
    if (addressEl) addressEl.textContent = config.address;
    if (heroTitleEl) {
        // Red span highlighting for brand tag
        if (config.heroTitle.toLowerCase().includes('wood.')) {
            heroTitleEl.innerHTML = config.heroTitle.replace(/wood\./i, '<span>wood.</span>');
        } else {
            heroTitleEl.textContent = config.heroTitle;
        }
    }
    if (heroSubtitleEl) heroSubtitleEl.textContent = config.heroSubtitle;

    // Apply to admin input fields (pre-populate)
    const editPhone = document.getElementById('edit-phone');
    const editEmail = document.getElementById('edit-email');
    const editAddress = document.getElementById('edit-address');
    const editHeroTitle = document.getElementById('edit-hero-title');
    const editHeroSubtitle = document.getElementById('edit-hero-subtitle');

    if (editPhone) editPhone.value = config.phone;
    if (editEmail) editEmail.value = config.email;
    if (editAddress) editAddress.value = config.address;
    if (editHeroTitle) editHeroTitle.value = config.heroTitle;
    if (editHeroSubtitle) editHeroSubtitle.value = config.heroSubtitle;
}

/**
 * Handles navigation between public website layout and secure admin dashboard.
 */
function setupHashRouting() {
    const checkRoute = () => {
        const hash = window.location.hash;
        const mainContent = document.getElementById('site-content');
        const adminSection = document.getElementById('admin');

        if (hash === '#admin') {
            mainContent.style.display = 'none';
            adminSection.classList.add('active');
            
            // Check if user is already authenticated
            if (sessionStorage.getItem('amz_authenticated') === 'true') {
                showDashboard();
            } else {
                showAuth();
            }
        } else {
            mainContent.style.display = 'block';
            adminSection.classList.remove('active');
        }
    };

    window.addEventListener('hashchange', checkRoute);
    checkRoute(); // Initial check
}

/**
 * Setup Portfolio Gallery displaying 54 custom project photos.
 * Implements lazy loading, pagination (Load More), and a Lightbox modal with navigation.
 */
function setupPortfolioGallery() {
    // Array of all 54 local project image filenames
    const imagesList = [
        'IMG-20260705-WA0000.jpg', 'IMG-20260705-WA0001.jpg',
        'IMG-20260705-WA0002.jpg', 'IMG-20260705-WA0003.jpg', 'IMG-20260705-WA0004.jpg',
        'IMG-20260705-WA0005.jpg', 'IMG-20260705-WA0006.jpg', 'IMG-20260705-WA0007.jpg',
        'IMG-20260705-WA0008.jpg', 'IMG-20260705-WA0009.jpg', 'IMG-20260705-WA0010.jpg',
        'IMG-20260705-WA0011.jpg', 'IMG-20260705-WA0012.jpg', 'IMG-20260705-WA0013.jpg',
        'IMG-20260705-WA0014.jpg', 'IMG-20260705-WA0015.jpg', 'IMG-20260705-WA0016.jpg',
        'IMG-20260705-WA0017.jpg', 'IMG-20260705-WA0018.jpg', 'IMG-20260705-WA0019.jpg',
        'IMG-20260705-WA0020.jpg', 'IMG-20260705-WA0021.jpg', 'IMG-20260705-WA0022.jpg',
        'IMG-20260705-WA0023.jpg', 'IMG-20260705-WA0024.jpg', 'IMG-20260705-WA0025.jpg',
        'IMG-20260705-WA0026.jpg', 'IMG-20260705-WA0027.jpg', 'IMG-20260705-WA0028.jpg',
        'IMG-20260705-WA0029.jpg', 'IMG-20260705-WA0030.jpg', 'IMG-20260705-WA0031.jpg',
        'IMG-20260705-WA0032.jpg', 'IMG-20260705-WA0033.jpg', 'IMG-20260705-WA0034.jpg',
        'IMG-20260705-WA0035.jpg', 'IMG-20260705-WA0036.jpg', 'IMG-20260705-WA0037.jpg',
        'IMG-20260705-WA0038.jpg', 'IMG-20260705-WA0039.jpg', 'IMG-20260705-WA0040.jpg',
        'IMG-20260705-WA0042.jpg', 'IMG-20260705-WA0043.jpg', 'IMG-20260705-WA0044.jpg',
        'IMG-20260705-WA0045.jpg', 'IMG-20260705-WA0046.jpg', 'IMG-20260705-WA0047.jpg',
        'IMG-20260705-WA0048.jpg', 'IMG-20260705-WA0049.jpg', 'IMG-20260705-WA0050.jpg',
        'IMG-20260705-WA0051.jpg', 'IMG-20260705-WA0052.jpg', 'IMG-20260705-WA0053.jpg'
    ];

    // Project types mapping to make items look more professional than just raw file names
    const projectTypes = [
        'Custom Cabinets', 'Drywall & Tiling', 'Outdoor Timber Decking', 'Kitchen Renovation',
        'Wall Framing & Studs', 'House Extension Build', 'Timber Roof Structure', 'Bathroom Fitting',
        'Bespoke Shelving', 'Fine Hardwood Floor', 'Oak Joinery Details', 'Handcrafted Dining Table'
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    const btnLoadMore = document.getElementById('btn-load-more');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentIndex = 0;
    const itemsPerBatch = 12;
    let activeLightboxIndex = 0;

    if (!galleryGrid) return;

    // Functions to render images
    const renderNextBatch = () => {
        const nextBatch = imagesList.slice(currentIndex, currentIndex + itemsPerBatch);
        nextBatch.forEach((imgFile, index) => {
            const absoluteIndex = currentIndex + index;
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.setAttribute('data-index', absoluteIndex);

            // Assign descriptive project text based on index pattern
            const projType = projectTypes[absoluteIndex % projectTypes.length];
            const projTitle = `Project #${absoluteIndex + 1}`;

            // Lazy loading image tag
            const img = document.createElement('img');
            img.src = `assets/gallery/${imgFile}`;
            img.alt = `${projType} - ${projTitle}`;
            img.setAttribute('loading', 'lazy');
            
            // Fade in effect on image load
            img.onload = () => {
                img.classList.add('loaded');
            };

            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            overlay.innerHTML = `
                <span>${projType}</span>
                <h3>${projTitle}</h3>
            `;

            card.appendChild(img);
            card.appendChild(overlay);

            // Click listener for Lightbox open
            card.addEventListener('click', () => {
                openLightbox(absoluteIndex);
            });

            galleryGrid.appendChild(card);
        });

        currentIndex += itemsPerBatch;

        // Hide load more button if all images are loaded
        if (currentIndex >= imagesList.length) {
            if (btnLoadMore) btnLoadMore.style.display = 'none';
        }
    };

    // Initialize first batch
    renderNextBatch();

    if (btnLoadMore) {
        btnLoadMore.addEventListener('click', renderNextBatch);
    }

    // --- Lightbox Operations ---
    const openLightbox = (index) => {
        activeLightboxIndex = index;
        const imgName = imagesList[index];
        if (lightboxImg && lightbox) {
            lightboxImg.src = `assets/gallery/${imgName}`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop page scroll
        }
    };

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scroll
        }
    };

    const showPrev = (e) => {
        e.stopPropagation();
        activeLightboxIndex = (activeLightboxIndex - 1 + imagesList.length) % imagesList.length;
        if (lightboxImg) lightboxImg.src = `assets/gallery/${imagesList[activeLightboxIndex]}`;
    };

    const showNext = (e) => {
        e.stopPropagation();
        activeLightboxIndex = (activeLightboxIndex + 1) % imagesList.length;
        if (lightboxImg) lightboxImg.src = `assets/gallery/${imagesList[activeLightboxIndex]}`;
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
    if (lightboxNext) lightboxNext.addEventListener('click', showNext);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Keyboard support for Lightbox
    window.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev(e);
            if (e.key === 'ArrowRight') showNext(e);
        }
    });
}

/**
 * Ingestion of contact form entries as leads.
 */
function setupFormSubmission() {
    const leadForm = document.getElementById('lead-form');
    const statusDiv = document.getElementById('form-status');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const name = document.getElementById('client-name').value;
            const phone = document.getElementById('client-phone').value;
            const email = document.getElementById('client-email').value;
            const projectTypeSelect = document.getElementById('project-type');
            const projectType = projectTypeSelect.options[projectTypeSelect.selectedIndex].text;
            const budgetSelect = document.getElementById('project-budget');
            const budget = budgetSelect.options[budgetSelect.selectedIndex].text;
            const details = document.getElementById('project-details').value;

            // Generate lead object
            const newLead = {
                id: 'lead_' + Date.now(),
                date: new Date().toLocaleDateString(),
                name,
                phone,
                email,
                projectType,
                budget,
                details,
                status: 'New'
            };

            // Save to localStorage
            const leads = JSON.parse(localStorage.getItem('amz_leads')) || [];
            leads.unshift(newLead);
            localStorage.setItem('amz_leads', JSON.stringify(leads));

            // Visual notification trigger
            statusDiv.className = 'form-status success';
            statusDiv.textContent = 'Inquiry Received! AMZ Contracting & Carpentry will review your room specs and call you shortly.';
            
            // Reset form fields
            leadForm.reset();

            // Fire a custom alert indicating a lead notification occurred
            setTimeout(() => {
                alert(`🔔 New Lead Received on AMZ Carpentry!\n\nName: ${name}\nProject: ${projectType}\nBudget: ${budget}\n\nCheck the Admin Dashboard for details.`);
            }, 600);

            // Re-render leads in dashboard
            renderLeads();
        });
    }
}

/**
 * Admin Panel Authentication logic.
 */
function setupAdminAuth() {
    const btnLogin = document.getElementById('btn-login');
    const inputPasscode = document.getElementById('admin-passcode');
    const authError = document.getElementById('auth-error');
    const btnLogout = document.getElementById('btn-logout');

    const handleLogin = () => {
        const entered = inputPasscode.value;
        const correct = '1234'; // Default simple passcode

        if (entered === correct) {
            sessionStorage.setItem('amz_authenticated', 'true');
            authError.style.display = 'none';
            inputPasscode.value = '';
            showDashboard();
        } else {
            authError.style.display = 'block';
            inputPasscode.value = '';
        }
    };

    if (btnLogin) btnLogin.addEventListener('click', handleLogin);
    if (inputPasscode) {
        inputPasscode.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleLogin();
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            sessionStorage.removeItem('amz_authenticated');
            showAuth();
            window.location.hash = ''; // Return home
        });
    }
}

function showAuth() {
    document.getElementById('admin-auth').style.display = 'block';
    document.getElementById('admin-dashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('admin-auth').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    renderLeads();
}

/**
 * Handles toggling tabs inside the admin dashboard.
 */
function setupAdminTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    const panels = document.querySelectorAll('.admin-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Toggle Panels
            const targetPanelId = tab.getAttribute('data-tab');
            panels.forEach(panel => {
                if (panel.id === targetPanelId) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Admin Panel Content Modification & Lead operations.
 */
function setupAdminDashboard() {
    const btnSave = document.getElementById('btn-save-content');
    
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const updatedConfig = {
                phone: document.getElementById('edit-phone').value,
                email: document.getElementById('edit-email').value,
                address: document.getElementById('edit-address').value,
                heroTitle: document.getElementById('edit-hero-title').value,
                heroSubtitle: document.getElementById('edit-hero-subtitle').value
            };

            localStorage.setItem('amz_config', JSON.stringify(updatedConfig));
            applyConfig();
            alert('Website content saved successfully! Refresh or navigate home to see the updates.');
        });
    }
}

/**
 * Renders lead entries dynamically inside the admin panel table.
 */
function renderLeads() {
    const leads = JSON.parse(localStorage.getItem('amz_leads')) || [];
    const leadsList = document.getElementById('leads-list');
    const leadsCountSpan = document.getElementById('leads-count');

    if (leadsCountSpan) leadsCountSpan.textContent = leads.length;

    if (!leadsList) return;

    if (leads.length === 0) {
        leadsList.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 3rem 0;">No client leads found yet. Submit the contact form to generate one!</td></tr>`;
        return;
    }

    leadsList.innerHTML = '';
    leads.forEach(lead => {
        const tr = document.createElement('tr');
        
        let statusClass = 'status-new';
        if (lead.status === 'Contacted') statusClass = 'status-contacted';
        if (lead.status === 'Completed') statusClass = 'status-completed';

        tr.innerHTML = `
            <td style="white-space: nowrap;">${lead.date}</td>
            <td><strong>${lead.name}</strong></td>
            <td>
                <div>📞 ${lead.phone}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">✉️ ${lead.email}</div>
            </td>
            <td><span class="badge" style="margin-bottom: 0; padding: 0.3rem 0.6rem; font-size: 0.75rem; border-color: rgba(229,57,53,0.3); color: var(--primary-light);">${lead.projectType}</span></td>
            <td style="white-space: nowrap;">${lead.budget}</td>
            <td style="max-width: 250px; font-size: 0.9rem;">${lead.details}</td>
            <td>
                <select class="status-select" data-id="${lead.id}">
                    <option value="New" ${lead.status === 'New' ? 'selected' : ''}>New Lead</option>
                    <option value="Contacted" ${lead.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                    <option value="Completed" ${lead.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </td>
            <td>
                <button class="btn btn-outline btn-delete-lead" data-id="${lead.id}" style="padding: 0.3rem 0.8rem; font-size: 0.8rem; border-color: rgba(220,38,38,0.3); color: #f87171;">Delete</button>
            </td>
        `;

        leadsList.appendChild(tr);
    });

    // Attach event listeners to status selectors
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const leadId = e.target.getAttribute('data-id');
            const newStatus = e.target.value;
            updateLeadStatus(leadId, newStatus);
        });
    });

    // Attach event listeners to delete buttons
    document.querySelectorAll('.btn-delete-lead').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const leadId = e.target.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this lead?')) {
                deleteLead(leadId);
            }
        });
    });
}

function updateLeadStatus(id, newStatus) {
    const leads = JSON.parse(localStorage.getItem('amz_leads')) || [];
    const leadIndex = leads.findIndex(l => l.id === id);
    if (leadIndex !== -1) {
        leads[leadIndex].status = newStatus;
        localStorage.setItem('amz_leads', JSON.stringify(leads));
        renderLeads();
    }
}

function deleteLead(id) {
    let leads = JSON.parse(localStorage.getItem('amz_leads')) || [];
    leads = leads.filter(l => l.id !== id);
    localStorage.setItem('amz_leads', JSON.stringify(leads));
    renderLeads();
}
