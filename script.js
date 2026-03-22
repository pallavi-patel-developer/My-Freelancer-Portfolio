document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 500); // Small delay for a more professional feel
    });

    // Custom Cursor & Follower Tracking
    const customCursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    if (customCursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
            
            // The follower uses CSS transition for the lag effect
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Simplified)
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        // Close menu when link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }

    // Scroll Reveal Animation with IntersectionObserver
    const revealOption = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOption);

    // Initial elements
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project Data and Rendering
    const projects = [
        {
            title: "WTF- Where Food Begins",
            desc: "Advanced object detection and recognition system using TensorFlow and React.",
            tags: ["React", "Python", "TensorFlow"],
            image: "public/wtf-1.png",
            liveLink: "https://wtf-website-tan.vercel.app/",
            githubLink: "https://github.com/pallavi-patel-developer/"
        },
        {
            title: "LAWYER Web Portfolio",
            desc: "Full-stack SaaS application for automated medical document transcription.",
            tags: ["Next.js", "GPT-4", "Node.js"],
            image: "public/advocate.png",
            liveLink: "https://lawyer-web-portfolio.onrender.com/",
            githubLink: "https://github.com/pallavi-patel-developer/Lawyer-web-Portfolio"
        },
        {
            title: "Bulk Email Sender",
            desc: "Predictive maintenance dashboard with real-time anomaly detection.",
            tags: ["HTML", "CSS", "JavaScript"],
            image: "public/bulk.png",
            liveLink: "https://bulk-email-sender-frontend.onrender.com/",
            githubLink: "https://github.com/pallavi-patel-developer/Bulk-Email-Send"
        },
        {
            title: "Salon Portolfio",
            desc: "Autonomous AI agent swarm for complex workflow automation and orchestration.",
            tags: ["Next", "JavaScript", "Tailwind CSS"],
            image: "public/salon.png",
            liveLink: "https://salon-eight-rho.vercel.app/",
            githubLink: "https://github.com/pallavi-patel-developer/salon"
        },
        {
            title: "Portfolio-Hub",
            desc: "ML-driven market analysis tool with sentiment tracking and price forecasting.",
            tags: ["HTML5","CSS3","JavaScript", "Node.js", "Express.js", "MongoDB", "Git" , "Cloudinary"],
            image: "public/portfoliohub.png",
            liveLink: "https://portpholio-front.onrender.com",
            githubLink: "https://github.com/pallavi-patel-developer/PortpholioHub"
        },
        {
            title: "Ai Real Time Log Analyzer",
            desc: "AI-powered cybersecurity suite for real-time threat detection and mitigation.",
            tags: ["HTML5","CSS3","Python", "TensorFlow", "Resend API"],
            image: "public/ai.png",
            liveLink: "https://ai-realtime-logs-analyzer.onrender.com/",
            githubLink: "https://github.com/pallavi-patel-developer/Ai-Real-Time-Log-Analyzer"
        },
         {
            title: "Bundelkhand Chamber Of Commerce",
            desc: "AI-powered cybersecurity suite for real-time threat detection and mitigation.",
            tags: ["Next.js","Tailwind CSS","Express.js", "Nodemailer","MongoDB","Tawk.to Chatbot Api"],
            image: "public/bcci.png",
            liveLink: "https://www.bundelkhandchamberofcommerce.com/",
            githubLink: "https://github.com/pallavi-patel-developer/Bundelkhand-Chamber-Of-Commerce"
        }
    ];
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card reveal';
            card.style.transitionDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <div class="project-img" style="background-image: url('${project.image}')"></div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.liveLink}" target="_blank" title="View Live"><i class="fas fa-external-link-alt"></i></a>
                        <a href="${project.githubLink}" target="_blank" title="View Code"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(card);
            // Observe the card
            revealObserver.observe(card);
        });
    }

    // Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            formStatus.innerHTML = '<span style="color: var(--accent-color)">Sending...</span>';

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });
                
                const result = await response.json();
                if (response.status === 200) {
                    formStatus.innerHTML = '<span style="color: var(--accent-color)">Message sent successfully!</span>';
                    contactForm.reset();
                } else {
                    console.log(response);
                    formStatus.innerHTML = `<span style="color: #ff6b6b">${result.message}</span>`;
                }
            } catch (error) {
                console.log(error);
                formStatus.innerHTML = '<span style="color: #ff6b6b">Something went wrong!</span>';
            }

            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        });
    }
});
