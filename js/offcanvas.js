// swipe-sidebar.js

let touchStartX = 0;
let touchEndX = 0;

const leftSidebarEl = document.getElementById('leftSidebar');
const rightSidebarEl = document.getElementById('rightSidebar');

// Initialize Bootstrap instances
const leftSidebar = new bootstrap.Offcanvas(leftSidebarEl);
const rightSidebar = new bootstrap.Offcanvas(rightSidebarEl);

document.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    // Only run on screens smaller than 992px (Mobile/Tablet)
    if (window.innerWidth < 992) {
        const deltaX = touchEndX - touchStartX;
        const threshold = 80;

        // Swipe Right (Open Left or Close Right)
        if (deltaX > threshold) {
            if (rightSidebarEl.classList.contains('show')) {
                rightSidebar.hide();
            } else {
                leftSidebar.show();
            }
        }
        // Swipe Left (Open Right or Close Left)
        else if (deltaX < -threshold) {
            if (leftSidebarEl.classList.contains('show')) {
                leftSidebar.hide();
            } else {
                rightSidebar.show();
            }
        }
    }
}

// Progress bar logic
const addProgressBtn = document.getElementById('addProgressBtn');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

if (addProgressBtn && progressBar && progressText) {
    addProgressBtn.addEventListener('click', () => {
        let currentProgressText = progressText.textContent.replace('%', '');
        let currentProgress = parseInt(currentProgressText) || 0;
        
        if (currentProgress < 100) {
            currentProgress += 1;
            progressBar.style.setProperty('--progress', `${currentProgress}%`);
            progressText.textContent = `${currentProgress}%`;
        }
    });
}
