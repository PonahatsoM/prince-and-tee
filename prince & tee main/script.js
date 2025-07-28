// Smart Campus App JavaScript

// Global state
let currentTab = 'dashboard';
let isLoggedIn = false;
let sidebarOpen = false;

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const campusApp = document.getElementById('campusApp');
const sidebar = document.getElementById('sidebar');
const pageTitle = document.getElementById('pageTitle');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Show login screen initially
    showLoginScreen();
}

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Navigation items (desktop sidebar)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Mobile navigation items
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Booking form
    const bookingForm = document.querySelector('.booking-form form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    
    // Map search functionality
    const mapSearch = document.getElementById('mapSearch');
    if (mapSearch) {
        mapSearch.addEventListener('input', (e) => handleMapSearch(e.target));
    }
}

// Authentication
function handleLogin(e) {
    if (e) e.preventDefault();
    
    // Simulate login process
    setTimeout(() => {
        isLoggedIn = true;
        showCampusApp();
    }, 500);
}

function login() {
    handleLogin();
}

function showLoginScreen() {
    loginScreen.classList.remove('hidden');
    campusApp.classList.add('hidden');
}

function showCampusApp() {
    loginScreen.classList.add('hidden');
    campusApp.classList.remove('hidden');
    switchTab('dashboard');
}

// Navigation
function switchTab(tabName) {
    currentTab = tabName;
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'map': 'Campus Map',
        'bookings': 'Bookings',
        'alerts': 'Alerts',
        'academic': 'Academic'
    };
    pageTitle.textContent = titles[tabName] || 'Campus App';
    
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Update navigation active states (desktop)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabName) {
            item.classList.add('active');
        }
    });
    
    // Update navigation active states (mobile)
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabName) {
            item.classList.add('active');
        }
    });
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
    
    // Initialize map when switching to map tab
    if (tabName === 'map') {
        setTimeout(initializeMap, 100);
    }
}

function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    if (sidebarOpen) {
        sidebar.classList.add('open');
    } else {
        sidebar.classList.remove('open');
    }
}

function closeSidebar() {
    sidebarOpen = false;
    sidebar.classList.remove('open');
}

// Booking functionality
function showBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.classList.remove('hidden');
    }
}

function hideBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.classList.add('hidden');
    }
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const venueType = formData.get('venueType') || e.target.querySelector('select').value;
    const date = formData.get('date') || e.target.querySelector('input[type="date"]').value;
    const time = formData.get('time') || e.target.querySelector('input[type="time"]').value;
    
    // Simulate booking creation
    createBooking(venueType, date, time);
    
    // Reset form and hide
    e.target.reset();
    hideBookingForm();
    
    // Show success message
    showNotification('Booking created successfully!', 'success');
}

function createBooking(venueType, date, time) {
    // Create new booking element
    const bookingsGrid = document.querySelector('.bookings-grid');
    const bookingCard = document.createElement('div');
    bookingCard.className = 'booking-card';
    
    bookingCard.innerHTML = `
        <div>
            <h3>${venueType} - New Booking</h3>
            <p>${formatDate(date)}, ${formatTime(time)}</p>
        </div>
        <span class="status pending">Pending</span>
    `;
    
    bookingsGrid.appendChild(bookingCard);
}

// Campus locations data
const campusLocations = [
    { 
        id: "library", 
        name: "Central Library", 
        type: "study", 
        coordinates: { x: 30, y: 40 },
        description: "Main library with study rooms and resources",
        amenities: ["WiFi", "Study Rooms", "Computer Lab", "Printing Services"]
    },
    { 
        id: "gym", 
        name: "Sports Complex", 
        type: "sports", 
        coordinates: { x: 70, y: 60 },
        description: "Fitness center and sports facilities",
        amenities: ["Gym", "Pool", "Tennis Courts", "Locker Rooms"]
    },
    { 
        id: "cafeteria", 
        name: "Student Cafeteria", 
        type: "dining", 
        coordinates: { x: 50, y: 30 },
        description: "Main dining hall and food court",
        amenities: ["Food Court", "Seating Area", "WiFi", "Meal Plans"]
    },
    { 
        id: "admin", 
        name: "Administration Building", 
        type: "admin", 
        coordinates: { x: 40, y: 70 },
        description: "Student services and administrative offices",
        amenities: ["Student Services", "Registrar", "Financial Aid", "Counseling"]
    },
    { 
        id: "science", 
        name: "Science Building", 
        type: "academic", 
        coordinates: { x: 60, y: 45 },
        description: "Laboratories and science classrooms",
        amenities: ["Research Labs", "Classrooms", "Equipment", "Conference Rooms"]
    },
    { 
        id: "parking", 
        name: "Main Parking", 
        type: "parking", 
        coordinates: { x: 20, y: 20 },
        description: "Student and visitor parking area",
        amenities: ["Student Parking", "Security", "EV Charging", "Visitor Spaces"]
    },
    { 
        id: "engineering", 
        name: "Engineering Building", 
        type: "academic", 
        coordinates: { x: 75, y: 25 },
        description: "Engineering labs and maker spaces",
        amenities: ["3D Printing", "Maker Space", "Computer Labs", "Project Rooms"]
    },
    { 
        id: "student-center", 
        name: "Student Center", 
        type: "admin", 
        coordinates: { x: 55, y: 65 },
        description: "Student activities and events center",
        amenities: ["Event Halls", "Student Organizations", "Recreation", "Study Lounges"]
    }
];

let selectedLocation = null;
let currentFilter = 'all';

// Map functionality
function initializeMap() {
    renderLocationMarkers();
    renderPopularLocations();
}

function renderLocationMarkers() {
    const markersContainer = document.getElementById('locationMarkers');
    if (!markersContainer) return;
    
    markersContainer.innerHTML = '';
    
    const filteredLocations = getFilteredLocations();
    
    filteredLocations.forEach(location => {
        const marker = document.createElement('div');
        marker.className = `location-marker ${location.type}`;
        marker.style.left = `${location.coordinates.x}%`;
        marker.style.top = `${location.coordinates.y}%`;
        marker.onclick = () => selectLocation(location.id);
        
        marker.innerHTML = `
            <div class="marker-icon">
                <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="marker-tooltip">${location.name}</div>
        `;
        
        markersContainer.appendChild(marker);
    });
}

function renderPopularLocations() {
    const popularGrid = document.getElementById('popularGrid');
    if (!popularGrid) return;
    
    const popularLocations = campusLocations.slice(0, 4);
    
    popularGrid.innerHTML = '';
    
    popularLocations.forEach(location => {
        const locationCard = document.createElement('div');
        locationCard.className = 'popular-location-card';
        locationCard.onclick = () => selectLocation(location.id);
        
        const icon = getLocationIcon(location.type);
        
        locationCard.innerHTML = `
            <div class="location-icon ${location.type}">
                ${icon}
            </div>
            <div class="location-content">
                <h4>${location.name}</h4>
                <p>${location.type.charAt(0).toUpperCase() + location.type.slice(1)}</p>
            </div>
        `;
        
        popularGrid.appendChild(locationCard);
    });
}

function getLocationIcon(type) {
    const icons = {
        study: '<i class="fas fa-book"></i>',
        sports: '<i class="fas fa-dumbbell"></i>',
        dining: '<i class="fas fa-utensils"></i>',
        admin: '<i class="fas fa-building"></i>',
        academic: '<i class="fas fa-flask"></i>',
        parking: '<i class="fas fa-car"></i>'
    };
    return icons[type] || '<i class="fas fa-map-marker-alt"></i>';
}

function selectLocation(locationId) {
    selectedLocation = locationId;
    const location = campusLocations.find(l => l.id === locationId);
    if (!location) return;
    
    // Update marker styles
    document.querySelectorAll('.location-marker').forEach(marker => {
        marker.classList.remove('selected');
    });
    
    const selectedMarker = document.querySelector(`.location-marker:nth-child(${campusLocations.findIndex(l => l.id === locationId) + 1})`);
    if (selectedMarker) {
        selectedMarker.classList.add('selected');
    }
    
    // Show location details
    showLocationDetails(location);
}

function showLocationDetails(location) {
    const detailsPanel = document.getElementById('locationDetails');
    const locationName = document.getElementById('locationName');
    const locationDescription = document.getElementById('locationDescription');
    const amenitiesList = document.getElementById('amenitiesList');
    
    if (!detailsPanel || !locationName || !locationDescription || !amenitiesList) return;
    
    locationName.textContent = location.name;
    locationDescription.textContent = location.description;
    
    amenitiesList.innerHTML = '';
    location.amenities.forEach(amenity => {
        const amenityBadge = document.createElement('span');
        amenityBadge.className = 'amenity-badge';
        amenityBadge.textContent = amenity;
        amenitiesList.appendChild(amenityBadge);
    });
    
    detailsPanel.style.display = 'block';
    detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeLocationDetails() {
    const detailsPanel = document.getElementById('locationDetails');
    if (detailsPanel) {
        detailsPanel.style.display = 'none';
    }
    
    selectedLocation = null;
    
    // Remove selection from markers
    document.querySelectorAll('.location-marker').forEach(marker => {
        marker.classList.remove('selected');
    });
}

function handleMapSearch(input) {
    const searchTerm = input.value.toLowerCase();
    const markers = document.querySelectorAll('.location-marker');
    
    markers.forEach((marker, index) => {
        const location = campusLocations[index];
        if (location && (
            location.name.toLowerCase().includes(searchTerm) ||
            location.type.toLowerCase().includes(searchTerm) ||
            location.description.toLowerCase().includes(searchTerm)
        )) {
            marker.style.display = 'block';
        } else {
            marker.style.display = 'none';
        }
    });
    
    renderPopularLocations(); // Update popular locations based on search
}

function filterByType(type) {
    currentFilter = type;
    
    // Update filter badge styles
    document.querySelectorAll('.filter-badge').forEach(badge => {
        badge.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    renderLocationMarkers();
}

function getFilteredLocations() {
    if (currentFilter === 'all') {
        return campusLocations;
    }
    return campusLocations.filter(location => location.type === currentFilter);
}

function toggleFilters() {
    const filterBadges = document.getElementById('filterBadges');
    if (filterBadges) {
        filterBadges.style.display = filterBadges.style.display === 'none' ? 'flex' : 'none';
    }
}

function getDirections() {
    if (selectedLocation) {
        const location = campusLocations.find(l => l.id === selectedLocation);
        showNotification(`Directions to ${location.name} will be available soon!`, 'info');
    }
}

function showMoreInfo() {
    if (selectedLocation) {
        const location = campusLocations.find(l => l.id === selectedLocation);
        showNotification(`More information about ${location.name} will be available soon!`, 'info');
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 1rem;
        box-shadow: var(--shadow-elevated);
        z-index: 10000;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.borderColor = 'var(--success)';
        notification.style.backgroundColor = 'hsla(142, 76%, 36%, 0.1)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Dashboard data updates
function updateDashboardStats() {
    // Simulate real-time data updates
    const stats = document.querySelectorAll('.stat-content h3');
    if (stats.length >= 4) {
        // Update GPA
        stats[0].textContent = (3.80 + Math.random() * 0.20).toFixed(2);
        
        // Update classes today
        stats[1].textContent = Math.floor(3 + Math.random() * 4);
        
        // Update pending tasks
        stats[2].textContent = Math.floor(1 + Math.random() * 5);
        
        // Update available rooms
        stats[3].textContent = Math.floor(8 + Math.random() * 10);
    }
}

// Alert management
function addNewAlert(title, message, priority = 'low') {
    const alertsList = document.querySelector('.alerts-list');
    if (!alertsList) return;
    
    const alertItem = document.createElement('div');
    alertItem.className = `alert-item priority-${priority}`;
    
    const iconMap = {
        high: 'fas fa-exclamation-triangle',
        medium: 'fas fa-calendar',
        low: 'fas fa-info-circle'
    };
    
    alertItem.innerHTML = `
        <div class="alert-icon">
            <i class="${iconMap[priority]}"></i>
        </div>
        <div class="alert-content">
            <h4>${title}</h4>
            <p>${message}</p>
            <span class="alert-time">Just now</span>
        </div>
    `;
    
    alertsList.insertBefore(alertItem, alertsList.firstChild);
}

// Academic progress simulation
function updateAcademicProgress() {
    // Add random assignment
    const assignments = [
        { title: 'Physics Lab Report', due: '2024-03-18', priority: 'medium' },
        { title: 'History Essay', due: '2024-03-22', priority: 'low' },
        { title: 'Programming Project', due: '2024-03-16', priority: 'high' }
    ];
    
    const randomAssignment = assignments[Math.floor(Math.random() * assignments.length)];
    
    const assignmentsList = document.querySelector('.assignment-list');
    if (assignmentsList && assignmentsList.children.length < 5) {
        const assignmentItem = document.createElement('div');
        assignmentItem.className = 'assignment-item';
        
        assignmentItem.innerHTML = `
            <h4>${randomAssignment.title}</h4>
            <p>Due: ${randomAssignment.due}</p>
            <span class="priority ${randomAssignment.priority}">${randomAssignment.priority.charAt(0).toUpperCase() + randomAssignment.priority.slice(1)} Priority</span>
        `;
        
        assignmentsList.appendChild(assignmentItem);
    }
}

// Periodic updates
setInterval(() => {
    if (isLoggedIn) {
        updateDashboardStats();
        
        // Occasionally add new alerts
        if (Math.random() < 0.1) { // 10% chance every interval
            const alerts = [
                { title: 'Library Update', message: 'New study rooms available on floor 3.', priority: 'low' },
                { title: 'Class Reminder', message: 'Mathematics 201 starts in 30 minutes.', priority: 'medium' },
                { title: 'Weather Alert', message: 'Rain expected this afternoon.', priority: 'high' }
            ];
            const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
            addNewAlert(randomAlert.title, randomAlert.message, randomAlert.priority);
        }
    }
}, 10000); // Update every 10 seconds

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeSidebar();
    }
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebarOpen) {
        if (!sidebar.contains(e.target) && !e.target.classList.contains('menu-toggle')) {
            closeSidebar();
        }
    }
});