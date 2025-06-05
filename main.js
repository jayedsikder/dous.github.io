document.addEventListener('DOMContentLoaded', function() {

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
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
            } else {
                navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
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

    // Scroll progress bar and back to top
    const progressBar = document.getElementById('scrollProgressBar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight ? (scrollTop / docHeight) * 100 : 0;
        if(progressBar){
            progressBar.style.width = progress + '%';
        }
        if(backToTopBtn){
            backToTopBtn.style.display = scrollTop > 300 ? 'block' : 'none';
        }
    });

    if(backToTopBtn){
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Dark mode toggle
    const darkToggle = document.getElementById('darkModeToggle');
    if(darkToggle){
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = darkToggle.querySelector('i');
            if(document.body.classList.contains('dark-mode')){
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }else{
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // Typed hero text
    const typedEl = document.getElementById('typed-text');
    if(typedEl){
        const messages = ['Server Among Us', 'Welcome to the Future', 'Learn & Grow'];
        let mIndex = 0;
        let charIndex = 0;
        function type(){
            if(charIndex < messages[mIndex].length){
                typedEl.textContent += messages[mIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            }else{
                setTimeout(erase, 2000);
            }
        }
        function erase(){
            if(charIndex > 0){
                typedEl.textContent = messages[mIndex].substring(0, charIndex-1);
                charIndex--;
                setTimeout(erase, 50);
            }else{
                mIndex = (mIndex + 1) % messages.length;
                setTimeout(type, 500);
            }
        }
        type();
    }

    // AI Chat integration
    const chatToggle = document.getElementById('aiChatToggle');
    const chatWidget = document.getElementById('aiChatWidget');
    const chatClose = document.getElementById('aiChatClose');
    const chatForm = document.getElementById('aiChatForm');
    const chatInput = document.getElementById('aiChatInput');
    const chatMessages = document.getElementById('aiChatMessages');
    document.body.classList.add('anim-bg');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if(target){
                e.preventDefault();
                target.scrollIntoView({behavior:'smooth'});
            }
        });
    });

    if(chatToggle && chatWidget){
        chatToggle.addEventListener('click', () => {
            chatWidget.style.display = 'flex';
            chatToggle.style.display = 'none';
        });
    }
    if(chatClose && chatWidget){
        chatClose.addEventListener('click', () => {
            chatWidget.style.display = 'none';
            chatToggle.style.display = 'block';
        });
    }

    function appendMessage(sender, text){
        const div = document.createElement('div');
        div.className = 'message ' + sender;
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function fetchDeepSeek(prompt){
        const apiKey = window.DEEPSEEK_API_KEY || '';
        if(!apiKey){
            return 'DeepSeek API key missing';
        }
        const payload = {
            model: 'deepseek-chat',
            messages: [{role:'user', content: prompt}],
            stream: false
        };
        try{
            const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey
                },
                body: JSON.stringify(payload)
            });
            if(res.ok){
                const data = await res.json();
                if(data.choices && data.choices[0].message){
                    return data.choices[0].message.content.trim();
                }
            } else {
                console.error('DeepSeek error', res.status);
                return 'DeepSeek service error';
            }
        }catch(err){
            console.error(err);
            return 'Network error or invalid key';
        }
        return 'Unexpected response';
    }

    if(chatForm){
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if(!text) return;
            appendMessage('user', text);
            chatInput.value = '';
            const reply = await fetchDeepSeek(text);
            appendMessage('ai', reply);
        });
    }

    // AI Summary tool
    const summaryBtn = document.getElementById('summaryBtn');
    const summaryInput = document.getElementById('summaryInput');
    const summaryOutput = document.getElementById('summaryOutput');

    if(summaryBtn){
        summaryBtn.addEventListener('click', async () => {
            const text = summaryInput.value.trim();
            if(!text) return;
            summaryOutput.textContent = 'Summarizing...';
            const prompt = 'Summarize the following text in a short paragraph:\n' + text;
            const reply = await fetchDeepSeek(prompt);
            summaryOutput.textContent = reply;
        });
    }

    // AI Translation tool
    const translateBtn = document.getElementById('translateBtn');
    const translateInput = document.getElementById('translateInput');
    const translateLang = document.getElementById('translateLang');
    const translateOutput = document.getElementById('translateOutput');

    if(translateBtn){
        translateBtn.addEventListener('click', async () => {
            const text = translateInput.value.trim();
            const lang = translateLang.value;
            if(!text) return;
            translateOutput.textContent = 'Translating...';
            const prompt = 'Translate the following text to ' + lang + ':\n' + text;
            const reply = await fetchDeepSeek(prompt);
            translateOutput.textContent = reply;
        });
    }

});
