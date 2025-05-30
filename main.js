document.addEventListener('DOMContentLoaded', function() {

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-btn-mobile');
    const body = document.body;

    const updateButtonAppearance = (isDarkMode) => {
        const iconClass = isDarkMode ? 'fa-sun-o' : 'fa-moon-o';
        const text = isDarkMode ? ' Dark Mode' : ' Light Mode';
        const moonIcon = '<i class="fa fa-moon-o"></i> Light Mode';
        const sunIcon = '<i class="fa fa-sun-o"></i> Dark Mode';

        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = isDarkMode ? sunIcon : moonIcon;
        }
        if (themeToggleBtnMobile) {
            themeToggleBtnMobile.innerHTML = isDarkMode ? sunIcon : moonIcon;
        }
    };

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        updateButtonAppearance(true);
    } else {
        body.classList.remove('dark-theme'); // Ensure it's light
        updateButtonAppearance(false);
    }

    const handleThemeToggle = () => {
        body.classList.toggle('dark-theme');
        const isDarkMode = body.classList.contains('dark-theme');
        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        updateButtonAppearance(isDarkMode);
        // Manually trigger navbar update if needed, as theme change might affect its appearance logic
        if (window.myFunction) {
            window.myFunction();
        }
    };

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', handleThemeToggle);
    }
    // Ensure mobile button also calls toggleFunction if it's part of its onclick attribute in HTML
    // The toggleFunction is for the nav menu, not theme. The theme toggle is separate.
    if (themeToggleBtnMobile) {
        // Check if the mobile button already has toggleFunction in its onclick
        // If not, or if it's only for theme, add the theme toggle listener:
        themeToggleBtnMobile.addEventListener('click', function(event) {
            // Prevent toggleFunction if it's also directly on the element's onclick for menu toggle
            // This setup assumes the primary role of this specific ID is theme toggling.
            // If it also toggles the nav menu via onclick="toggleFunction()", that will still run.
            handleThemeToggle(); 
        });
    }

    // Modal Image Gallery
    window.onClick = function(element) {
        const modal = document.getElementById("modal01");
        const img = document.getElementById("img01");
        const captionText = document.getElementById("caption");
        if (modal && img && captionText) {
            modal.style.display = "block";
            img.src = element.src;
            captionText.innerHTML = element.alt;
        }
    }

    // Change style of navbar on scroll
    window.myFunction = function() {
        var navbar = document.getElementById("myNavbar");
        if (navbar) {
            const isDarkMode = document.body.classList.contains('dark-theme');
            let classes = "w3-bar w3-card w3-animate-top";
            if (!isDarkMode) {
                classes += " w3-white";
            }
            // Base classes that should always be there before scroll logic
            let baseNavbarClass = "w3-bar"; 

            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                navbar.className = classes;
            } else {
                // Reset to base, theme class on body will handle navbar background via CSS
                navbar.className = baseNavbarClass;
                 // If dark theme is active, CSS should handle the navbar color.
                 // If specific dark mode class for navbar is needed and gets removed, re-apply here.
                 // For now, relying on body.dark-theme .w3-bar styling from theme.css
            }
        }
    }
    window.onscroll = myFunction;

    // Used to toggle the menu on small screens when clicking on the menu button
    window.toggleFunction = function() {
        var x = document.getElementById("navDemo");
        if (x) {
            if (x.className.indexOf("w3-show") == -1) {
                x.className += " w3-show";
            } else {
                x.className = x.className.replace(" w3-show", "");
            }
        }
    }

    // Sidenav toggle 
    window.openNav = function() { 
      var sidenav = document.getElementById("mySidenav");
      if (sidenav) {
        sidenav.style.width = "auto"; 
        sidenav.style.display = "block"; 
      }
    }

    window.closeNav = function() { 
      var sidenav = document.getElementById("mySidenav");
      if (sidenav) {
        sidenav.style.width = "0";
      }
    }
    
    // Consolidated Time and Day display script
    const daysConst = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    function updateDateTime() {
        const d = new Date();
        const currentDayName = daysConst[d.getDay()];
        const currentTimeString = d.toLocaleTimeString();

        const time2El = document.getElementById("time2");
        if (time2El) {
            time2El.innerHTML = currentDayName + " " + currentTimeString;
        }
        
        const timeEl = document.getElementById("time"); 
        if(timeEl) {
            timeEl.innerHTML = currentTimeString;
        }

        const dayEl = document.getElementById("day"); 
        if(dayEl && dayEl.innerHTML === "") { 
             dayEl.innerHTML = currentDayName;
        }
    }
    setInterval(updateDateTime, 1000);
    updateDateTime(); 

    // Toast init
    var toastbtnEl = document.getElementById("toastbtn");
    if(toastbtnEl) {
        toastbtnEl.onclick = function() {
          var toastElList = [].slice.call(document.querySelectorAll('.toast'));
          var toastList = toastElList.map(function(toastEl) {
            if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
                return new bootstrap.Toast(toastEl);
            }
            return null;
          }).filter(toast => toast !== null);
          toastList.forEach(toast => toast.show());
        }
    }

    // Tooltip init
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Show 10B Sidenav
    var show10BButtonJs = document.querySelector('.btn-outline-info[onclick="openNav()"]'); 
    // The openNav() is in HTML, this is for consistency if more logic was needed in JS.

    // Scroll-Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    revealElements.forEach(element => {
        observer.observe(element);
    });

});
