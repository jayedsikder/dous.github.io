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

    // Scroll-Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); 

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

    // Hugging Face API Integration
    async function fetchHuggingFaceModel(modelId, inputs, taskParams = {}) {
        const token = window.HUGGINGFACE_API_KEY || '';
        if (!token) {
            return { error: "Hugging Face User Access Token is missing." };
        }

        const apiUrl = `https://api-inference.huggingface.co/models/${modelId}`;
        let payload = { inputs: inputs, parameters: taskParams, options: { wait_for_model: true } };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                return data; 
            } else {
                let errorBody = null;
                try {
                    errorBody = await response.json();
                } catch (e) { /* ignore if not json */ }

                console.error('Hugging Face API Error:', {
                    status: response.status,
                    statusText: response.statusText,
                    url: apiUrl,
                    modelId: modelId,
                    errorBody: errorBody
                });

                if (response.status === 401) {
                    return { error: 'Unauthorized. Check your Hugging Face Token.' };
                }
                if (response.status === 429) {
                    return { error: 'Too many requests to Hugging Face API. Please wait.' };
                }
                if (response.status === 503) { 
                    return { error: `Model ${modelId} is currently loading. Please try again in a few moments. (${errorBody?.error || ''})` };
                }
                return { error: `API request failed (Status: ${response.status}) for model ${modelId}. ${(errorBody?.error || response.statusText)}` };
            }
        } catch (err) {
            console.error('Network error or issue fetching from Hugging Face API:', err);
            return { error: 'Network error. Could not connect to Hugging Face service.' };
        }
    }

    // AI Chat Widget
    const chatToggle = document.getElementById('aiChatToggle');
    const chatWidget = document.getElementById('aiChatWidget');
    const chatClose = document.getElementById('aiChatClose');
    const chatForm = document.getElementById('aiChatForm');
    const chatInput = document.getElementById('aiChatInput');
    const chatMessages = document.getElementById('aiChatMessages');
    const aiChatHeader = document.querySelector('#aiChatWidget header span');

    if(aiChatHeader) {
        aiChatHeader.textContent = 'Hugging Face Chat'; // Update header
    }

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

    if(chatForm){
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userText = chatInput.value.trim();
            if(!userText) return;
            appendMessage('user', userText);
            chatInput.value = '';
            
            appendMessage('ai', 'Thinking...'); // Temporary message

            const hfResponse = await fetchHuggingFaceModel('microsoft/DialoGPT-medium', userText);
            
            // Remove "Thinking..." message
            const thinkingMessage = Array.from(chatMessages.children).find(child => child.textContent === 'Thinking...' && child.classList.contains('ai'));
            if (thinkingMessage) {
                chatMessages.removeChild(thinkingMessage);
            }

            if (hfResponse.error) {
                appendMessage('ai', hfResponse.error);
            } else if (hfResponse && Array.isArray(hfResponse) && hfResponse[0] && hfResponse[0].generated_text) {
                appendMessage('ai', hfResponse[0].generated_text);
            } else if (hfResponse && hfResponse.generated_text) { // Fallback, though DialoGPT usually returns the array structure
                appendMessage('ai', hfResponse.generated_text);
            } else {
                appendMessage('ai', 'AI returned an unexpected response.');
                console.log('Unexpected HuggingFace chat response:', hfResponse);
            }
        });
    }

    // AI Summary tool
    const summaryBtn = document.getElementById('summaryBtn');
    const summaryInput = document.getElementById('summaryInput');
    const summaryOutput = document.getElementById('summaryOutput');
    const summaryHeader = document.querySelector('#ai-tools h3.gradient-text');
    const summaryPara = document.querySelector('#ai-tools p.w3-center');

    if(summaryHeader) summaryHeader.textContent = 'AI Summary (Hugging Face)';
    if(summaryPara) summaryPara.textContent = 'Paste text and let Hugging Face (bart-large-cnn) create a short summary.';


    if(summaryBtn){
        summaryBtn.addEventListener('click', async () => {
            const text = summaryInput.value.trim();
            if(!text) {
                 summaryOutput.textContent = 'Please enter text to summarize.';
                 return;
            }
            summaryOutput.textContent = 'Summarizing...';
            const hfResponse = await fetchHuggingFaceModel('facebook/bart-large-cnn', text);

            if (hfResponse.error) {
                summaryOutput.textContent = hfResponse.error;
            } else if (hfResponse && Array.isArray(hfResponse) && hfResponse[0] && hfResponse[0].summary_text) {
                summaryOutput.textContent = hfResponse[0].summary_text;
            } else {
                summaryOutput.textContent = 'AI returned an unexpected response for summary.';
                console.log('Unexpected HuggingFace summary response:', hfResponse);
            }
        });
    }

    // AI Translation tool
    const translateBtn = document.getElementById('translateBtn');
    const translateInput = document.getElementById('translateInput');
    const translateLang = document.getElementById('translateLang');
    const translateOutput = document.getElementById('translateOutput');
    const translateHeader = document.querySelector('#ai-translate h3.gradient-text');
    const translatePara = document.querySelector('#ai-translate p.w3-center');

    if(translateHeader) translateHeader.textContent = 'AI Translator (Hugging Face)';
    if(translatePara) translatePara.textContent = 'Translate text using Hugging Face Helsinki-NLP models.';


    if(translateBtn){
        translateBtn.addEventListener('click', async () => {
            const textToTranslate = translateInput.value.trim();
            const targetLang = translateLang.value;
            let modelId = '';

            if (!textToTranslate) {
                translateOutput.textContent = 'Please enter text to translate.';
                return;
            }

            if (targetLang === 'Spanish') {
                modelId = 'Helsinki-NLP/opus-mt-en-es';
            } else if (targetLang === 'French') {
                modelId = 'Helsinki-NLP/opus-mt-en-fr';
            } else if (targetLang === 'Chinese') {
                modelId = 'Helsinki-NLP/opus-mt-en-zh';
            } else if (targetLang === 'German') {
                modelId = 'Helsinki-NLP/opus-mt-en-de';
            } else if (targetLang === 'Bengali') { // This implies English to Bengali
                modelId = 'Helsinki-NLP/opus-mt-en-bn';
            } else if (targetLang === 'English_from_Bengali') { // Explicit Bengali to English
                modelId = 'Helsinki-NLP/opus-mt-bn-en';
            } else {
                translateOutput.textContent = 'Translation for the selected language is not yet configured.';
                return;
            }
            
            translateOutput.textContent = 'Translating...';
            const hfResponse = await fetchHuggingFaceModel(modelId, textToTranslate);

            if (hfResponse.error) {
                translateOutput.textContent = hfResponse.error;
            } else if (hfResponse && Array.isArray(hfResponse) && hfResponse[0] && hfResponse[0].translation_text) {
                translateOutput.textContent = hfResponse[0].translation_text;
            } else {
                translateOutput.textContent = 'AI returned an unexpected response for translation.';
                console.log('Unexpected HuggingFace translation response:', hfResponse);
            }
        });
    }

});
