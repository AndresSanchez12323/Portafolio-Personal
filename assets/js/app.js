if (window.location.hostname === "andressanchez12323.github.io") {
    const target = "https://portafolio-personal-edwin-sanchez.vercel.app" + window.location.pathname + window.location.search + window.location.hash;
    window.location.replace(target);
}

let currentLang = localStorage.getItem("lang") || "es";
let currentTheme = localStorage.getItem("theme") || "dark";
let cachedProfile = null;
let cachedRepos = null;
let roleInterval = null;
let terminalPlayed = false;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const shouldUseLiteMode = prefersReducedMotion
    || Boolean(connection?.saveData)
    || /(^|-)2g$/.test(connection?.effectiveType || "")
    || window.matchMedia("(max-width: 768px)").matches
    || (navigator.deviceMemory && navigator.deviceMemory <= 4)
    || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

const TRANSLATIONS = {
    es: {
        title: "Edwin Andrés Sánchez Orozco | Desarrollador de Software",
        meta_desc: "Portfolio profesional de Edwin Andrés Sánchez Orozco, desarrollador de software enfocado en soluciones eficientes, limpias y performantes.",
        nav_about: "Sobre Mi",
        nav_projects: "Proyectos",
        nav_experience: "Experiencia",
        nav_skills: "Skills",
        nav_github: "GitHub",
        nav_certificates: "Certificados",
        nav_contact: "Contacto",
        hero_subtitle: "enfocado en productos limpios y performantes. Creo soluciones eficientes con c\u00f3digo de calidad.",
        hero_btn_projects: "Ver Proyectos",
        hero_btn_contact: "Contactar",
        hero_btn_github: "GitHub",
        hero_scroll: "Desliza",
        about_title: "Sobre Mi",
        about_desc: "Soy estudiante de octavo semestre de Ingenier\u00eda en Inform\u00e1tica, con una fuerte motivaci\u00f3n por aprender, construir y evolucionar dentro del \u00e1mbito tecnol\u00f3gico. Me interesa especialmente la programaci\u00f3n, la resoluci\u00f3n de problemas y la creaci\u00f3n de soluciones que aporten valor real.\n\nHe desarrollado proyectos utilizando tecnolog\u00edas como JavaScript, TypeScript, Python, PHP, Java, C, C++ y HTML/CSS, adem\u00e1s de herramientas y entornos como Linux, Shell, PowerShell y Docker. Tambi\u00e9n cuento con experiencia b\u00e1sica en CQL y un manejo intermedio-bajo de Assembly.\n\nMe considero una persona responsable, puntual y comprometida con cada proyecto en el que participo. Busco seguir fortaleciendo mis bases t\u00e9cnicas mientras aporto mis conocimientos y contin\u00fao creciendo profesionalmente en el \u00e1rea de desarrollo de software.",
        terminal_title: "perfil-dev.js",
        working_title: "En lo que estoy trabajando",
        working_badge: "Latest",
        working_desc: "Mis repositorios con actividad reciente.",
        projects_title: "Proyectos Destacados",
        projects_desc: "Una selecci\u00f3n curada de lo que he construido recientemente, con foco en impacto y detalle.",
        experience_title: "Experiencia",
        skills_title: "Habilidades Principales",
        skills_desc: "Lenguajes y herramientas que m\u00e1s uso en mis proyectos reales.",
        github_title: "GitHub",
        certificates_title: "Mis Certificados",
        certificates_desc: "Certificaciones oficiales que respaldan mi formaci\u00f3n profesional.",
        resume_title: "Hoja de Vida",
        resume_desc: "Descarga mi hoja de vida completa con experiencia, formaci\u00f3n y habilidades detalladas.",
        resume_view: "Vista Previa",
        cubo_iso: "ISO + BIOS",
        cubo_emu: "Emulador",
        social_title: "Contacto & Redes",
        footer_text: "\u00a9 2026 Edwin Andr\u00e9s S\u00e1nchez Orozco. Todos los derechos reservados.",
        cert_btn_preview: "Vista Previa",
        cert_preview_unavailable: "Vista previa no disponible",
        term_nombre: "nombre",
        term_usuario: "usuario",
        term_github: "github",
        term_lenguajes: "lenguajes",
        term_repos_publicos: "repos_publicos",
        term_seguidores: "seguidores",
        term_siguiendo: "siguiendo",
        term_desde: "desde",
        term_ultima_actualizacion: "ultima_actualizacion",
        repos_label: "Repos",
        followers_label: "Seguidores",
        following_label: "Siguiendo",
        view_github: "Ver GitHub",
        no_description: "Proyecto sin descripcion.",
        no_language: "Sin lenguaje",
        updated: "Actualizado",
        view_repo: "Ver repo",
        just_now: "ahora",
        yesterday: "ayer",
        profile_error: "No se pudo cargar el perfil de GitHub.",
        repos_error: "No se pudieron cargar los repositorios.",
        no_projects: "Aun no hay proyectos publicos para mostrar.",
        no_description_alt: "Proyecto sin descripcion disponible.",
        no_language_alt: "Sin lenguaje",
        repo_btn: "Repositorio",
        demo_btn: "Demo",
        roles: ["Desarrollador de Software", "Creador de Soluciones", "Ingeniero en Formacion"],
        timeline: [
            { date: "2026 - Actual", role: "Crecimiento constante", company: "Repositorios personales", desc: "Sigo desarrollando proyectos m\u00e1s complejos, fortaleciendo mis conocimientos y aplicando lo aprendido en distintos repositorios personales. Este periodo representa una etapa de crecimiento constante, donde busco seguir mejorando t\u00e9cnica y profesionalmente." },
            { date: "2025", role: "Proyectos educativos y t\u00e9cnicos", company: "Pr\u00e1ctica t\u00e9cnica", desc: "Trabaj\u00e9 en proyectos educativos y t\u00e9cnicos, incluyendo la implementaci\u00f3n de algoritmos de compresi\u00f3n y el uso de bases de datos poliglotas. Tambi\u00e9n reforc\u00e9 conocimientos previos y explor\u00e9 nuevos conceptos, destacando mi trabajo con ensamblador, complementado con Python. En este proceso tambi\u00e9n empec\u00e9 a prestar m\u00e1s atenci\u00f3n a las buenas pr\u00e1cticas, la organizaci\u00f3n del c\u00f3digo y la mantenibilidad de los proyectos. Adem\u00e1s, desarroll\u00e9 mi primer videojuego en versi\u00f3n est\u00e1ndar." },
            { date: "2024", role: "Primera aplicaci\u00f3n completa", company: "Proyectos personales", desc: "Realic\u00e9 proyectos personales, entre ellos VialServi, mi primera aplicaci\u00f3n completa orientada a la gesti\u00f3n de seguros viales. All\u00ed apliqu\u00e9 l\u00f3gica para resolver problemas y me acerqu\u00e9 al desarrollo de automatizaciones y al uso de APIs, enfoc\u00e1ndome en construir soluciones funcionales." },
            { date: "2023", role: "Fortalecimiento de bases", company: "Estudio y pr\u00e1ctica", desc: "Fortalec\u00ed mis bases en l\u00f3gica de programaci\u00f3n, Java y Python. Tambi\u00e9n trabaj\u00e9 en resoluci\u00f3n de problemas, scripting y proyectos de menor escala, lo que me permiti\u00f3 consolidar mis conocimientos iniciales." },
            { date: "2022", role: "Inicio de formaci\u00f3n", company: "Autodidacta", desc: "Inici\u00e9 mi formaci\u00f3n e inter\u00e9s en el \u00e1rea del desarrollo de software, orient\u00e1ndome al fortalecimiento del pensamiento l\u00f3gico y la resoluci\u00f3n de problemas como base para mi crecimiento profesional." },
            { date: "2018 - 2022", role: "Curiosidad por la tecnolog\u00eda", company: "Exploraci\u00f3n personal", desc: "Desarroll\u00e9 inter\u00e9s por los videojuegos, los sistemas operativos y la forma en que funcionan internamente las tecnolog\u00edas, lo que despert\u00f3 mi curiosidad por el mundo del software." },
        ],
    },
    en: {
        title: "Edwin Andr\u00e9s S\u00e1nchez Orozco | Software Developer",
        meta_desc: "Professional portfolio of Edwin Andr\u00e9s S\u00e1nchez Orozco, a software developer focused on efficient, clean, and performant solutions.",
        nav_about: "About Me",
        nav_projects: "Projects",
        nav_experience: "Experience",
        nav_skills: "Skills",
        nav_github: "GitHub",
        nav_certificates: "Certificates",
        nav_contact: "Contact",
        hero_subtitle: "focused on clean, performant products. I create efficient solutions with quality code.",
        hero_btn_projects: "View Projects",
        hero_btn_contact: "Get in Touch",
        hero_btn_github: "GitHub",
        hero_scroll: "Scroll",
        about_title: "About Me",
        about_desc: "I am an eighth-semester student of Computer Engineering, with a strong motivation to learn, build, and evolve within the technology field. I am especially interested in programming, problem-solving, and creating solutions that provide real value.\n\nI have developed projects using technologies such as JavaScript, TypeScript, Python, PHP, Java, C, C++ and HTML/CSS, as well as tools and environments like Linux, Shell, PowerShell and Docker. I also have basic experience in CQL and intermediate-low proficiency in Assembly.\n\nI consider myself a responsible, punctual, and committed person in every project I participate in. I seek to continue strengthening my technical foundations while contributing my knowledge and continuing to grow professionally in the software development area.",
        terminal_title: "dev-profile.js",
        working_title: "What I'm Working On",
        working_badge: "Latest",
        working_desc: "My repos with recent activity.",
        projects_title: "Featured Projects",
        projects_desc: "A curated selection of what I have built recently, focused on impact and detail.",
        experience_title: "Experience",
        skills_title: "Core Skills",
        skills_desc: "Languages and tools I use most in my real-world projects.",
        github_title: "GitHub",
        certificates_title: "My Certificates",
        certificates_desc: "Official certifications that support my professional training.",
        resume_title: "Resume",
        resume_desc: "Download my complete resume with experience, education, and detailed skills.",
        resume_view: "Preview",
        cubo_iso: "ISO + BIOS",
        cubo_emu: "Emulator",
        social_title: "Contact & Social",
        footer_text: "\u00a9 2026 Edwin Andr\u00e9s S\u00e1nchez Orozco. All rights reserved.",
        cert_btn_preview: "Preview",
        cert_preview_unavailable: "Preview not available",
        term_nombre: "name",
        term_usuario: "user",
        term_github: "github",
        term_lenguajes: "languages",
        term_repos_publicos: "public_repos",
        term_seguidores: "followers",
        term_siguiendo: "following",
        term_desde: "since",
        term_ultima_actualizacion: "last_updated",
        repos_label: "Repos",
        followers_label: "Followers",
        following_label: "Following",
        view_github: "View GitHub",
        no_description: "No description.",
        no_language: "No language",
        updated: "Updated",
        view_repo: "View repo",
        just_now: "just now",
        yesterday: "yesterday",
        profile_error: "Could not load GitHub profile.",
        repos_error: "Could not load repositories.",
        no_projects: "No public projects to show yet.",
        no_description_alt: "No description available.",
        no_language_alt: "No language",
        repo_btn: "Repository",
        demo_btn: "Demo",
        roles: ["Software Developer", "Solution Creator", "Engineer in Training"],
        timeline: [
            { date: "2026 - Present", role: "Constant Growth", company: "Personal Repositories", desc: "I keep developing more complex projects, strengthening my knowledge and applying what I have learned across different personal repositories. This period represents a stage of constant growth, where I seek to continue improving technically and professionally." },
            { date: "2025", role: "Educational & Technical Projects", company: "Technical Practice", desc: "I worked on educational and technical projects, including implementing compression algorithms and using polyglot databases. I also reinforced previous knowledge and explored new concepts, highlighting my work with assembly complemented by Python. During this process, I started paying more attention to best practices, code organization, and project maintainability. Additionally, I developed my first video game in standard version." },
            { date: "2024", role: "First Complete Application", company: "Personal Projects", desc: "I carried out personal projects, including VialServi, my first complete application aimed at road insurance management. There I applied logic to solve problems and approached the development of automations and the use of APIs, focusing on building functional solutions." },
            { date: "2023", role: "Strengthening Foundations", company: "Study & Practice", desc: "I strengthened my foundations in programming logic, Java, and Python. I also worked on problem-solving, scripting, and smaller-scale projects, which allowed me to consolidate my initial knowledge." },
            { date: "2022", role: "Beginning of Training", company: "Self-taught", desc: "I began my training and interest in software development, focusing on strengthening logical thinking and problem-solving as a foundation for my professional growth." },
            { date: "2018 - 2022", role: "Curiosity for Technology", company: "Personal Exploration", desc: "I developed an interest in video games, operating systems, and how technologies work internally, which sparked my curiosity for the software world." },
        ],
    },
};

function t(key) {
    return TRANSLATIONS[currentLang]?.[key] ?? TRANSLATIONS["es"]?.[key] ?? key;
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[char]);
}

function safeURL(value, fallback = "#") {
    try {
        const url = new URL(String(value), window.location.origin);
        return ["http:", "https:"].includes(url.protocol) ? url.href : fallback;
    } catch {
        return fallback;
    }
}

function safeAssetPath(value, basePath) {
    const name = String(value || "").replaceAll("\\", "/").split("/").pop();
    return `${basePath}${encodeURIComponent(name)}`;
}

function externalLinkAttrs() {
    return 'target="_blank" rel="noopener noreferrer"';
}

function getPreferredTheme() {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "dark" ? "\ud83c\udf19" : "\u2600\ufe0f";
}

function toggleTheme() {
    const next = currentTheme === "dark" ? "light" : "dark";
    playThemeTransition(() => setTheme(next));
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    const btn = document.getElementById("langToggle");
    if (btn) btn.textContent = lang === "es" ? "EN" : "ES";
    applyTranslations();
    initRoleRotator();
    renderExperience();
    renderCertificates();
    if (cachedProfile) renderGitHub();
}

function toggleLanguage() {
    const next = currentLang === "es" ? "en" : "es";
    playLanguageTransition(() => setLanguage(next));
}

function initPerformanceMode() {
    document.body.classList.toggle("performance-lite", shouldUseLiteMode);
}

function initBackgroundVideo() {
    const video = document.getElementById("bg-video");
    if (!video || shouldUseLiteMode) return;

    const src = video.dataset.src;
    if (!src) return;

    const loadVideo = () => {
        if (video.querySelector("source")) return;
        const source = document.createElement("source");
        source.src = src;
        source.type = "video/webm";
        video.appendChild(source);
        video.load();
        video.play().catch(() => {
            video.remove();
        });
    };

    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(loadVideo, { timeout: 1800 });
    } else {
        window.setTimeout(loadVideo, 1200);
    }
}

function applyTranslations() {
    document.title = t("title");
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = t("meta_desc");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.dataset.i18n;
        if (el.tagName === "META" || el.tagName === "TITLE") return;
        el.textContent = t(key);
    });
}

// ============================
// Navigation
// ============================
function initNav() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    if (toggle && links) {
        const closeMenu = () => {
            links.classList.remove("open");
            toggle.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        };

        toggle.addEventListener("click", () => {
            const isOpen = links.classList.toggle("open");
            toggle.classList.toggle("open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        links.querySelectorAll(".nav-link").forEach((a) => {
            a.addEventListener("click", closeMenu);
        });
    }

    const navLinks = document.querySelectorAll(".nav-link");
    if (!navLinks.length) return;

    const sections = [];
    navLinks.forEach((link) => {
        const id = link.getAttribute("href").slice(1);
        const el = document.getElementById(id);
        if (el) sections.push({ el, link });
    });

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((l) => l.classList.remove("active"));
            sections.forEach((s) => {
                if (s.el === entry.target) s.link.classList.add("active");
            });
        });
    }, { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" });

    sections.forEach((s) => obs.observe(s.el));
}

// ============================
// Scroll Hide Nav
// ============================
function initScrollNav() {
    const nav = document.querySelector(".navbar");
    const links = document.getElementById("navLinks");
    if (!nav || !links) return;
    let lastScroll = 0;
    let ticking = false;

    function updateNavVisibility() {
        if (window.innerWidth <= 768) {
            nav.classList.remove("hidden");
            return;
        }
        const current = window.scrollY;
        nav.classList.toggle("hidden", current > lastScroll && current > 80);
        lastScroll = current;
    }

    updateNavVisibility();

    window.addEventListener("scroll", () => {
        if (window.innerWidth <= 768) return;
        if (links.classList.contains("open")) return;
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const current = window.scrollY;
            nav.classList.toggle("hidden", current > lastScroll && current > 80);
            lastScroll = current;
            ticking = false;
        });
    }, { passive: true });

    window.addEventListener("resize", updateNavVisibility);
}

// ============================
// Role Rotator
// ============================
function initRoleRotator() {
    const el = document.getElementById("roleRotator");
    if (!el) return;
    if (roleInterval) clearInterval(roleInterval);
    const roles = t("roles");
    let i = 0;
    const update = () => {
        el.textContent = roles[i];
        i = (i + 1) % roles.length;
    };
    update();
    if (!prefersReducedMotion) {
        roleInterval = setInterval(() => {
            if (!document.hidden) update();
        }, 3000);
    }
}

// ============================
// Language Colors
// ============================
const LANG_COLORS = {
    javascript: "#f7df1e",
    typescript: "#3178c6",
    html: "#e34f26",
    css: "#1572b6",
    python: "#3776ab",
    java: "#b07219",
    php: "#777bb4",
    c: "#555555",
    "c++": "#f34b7d",
    csharp: "#178600",
    ruby: "#701516",
    go: "#00add8",
    rust: "#dea584",
    swift: "#f05138",
    kotlin: "#a97bff",
    shell: "#89e051",
    dockerfile: "#384d54",
};

function getLangColor(lang) {
    return LANG_COLORS[(lang || "").toLowerCase()] || "#94a3b8";
}

// ============================
// Certificates Modal
// ============================
function initCertModal() {
    const overlay = document.getElementById("certModal");
    if (!overlay) return;

    // Mobile browsers do not reliably render PDFs inside an <iframe>, so on
    // touch/small-screen devices we open the PDF in a new tab (native viewer).
    const isMobileViewer = () => window.matchMedia("(max-width: 768px)").matches
        || /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);

    const open = (url) => {
        const safe = String(url || "");
        if (!safe.startsWith("assets/certificates/")) return;
        const absolute = new URL(safe, window.location.href).href;
        if (isMobileViewer()) {
            window.open(absolute, "_blank", "noopener");
            return;
        }
        const iframe = document.getElementById("certModalIframe");
        if (iframe) iframe.src = safe;
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
    };

    const close = () => {
        overlay.classList.remove("open");
        const iframe = document.getElementById("certModalIframe");
        if (iframe) iframe.src = "";
        document.body.style.overflow = "";
    };

    document.addEventListener("click", (e) => {
        if (e.target.id === "certModalClose") close();
        const trigger = e.target.closest("[data-cert-url]");
        if (trigger) {
            e.preventDefault();
            open(trigger.dataset.certUrl);
        }
    });
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("open")) close();
    });

    window.openCertModal = open;
}

// ============================
// GitHub API
// ============================
const EXCLUDED_PROJECTS = ["AyP-III--Proyectos", "Practicas-Fundamentos-Programacion"];

async function renderGitHub() {
    const username = "AndresSanchez12323";
    const profileEl = document.getElementById("github-profile");
    const reposEl = document.getElementById("github-repos");
    if (!profileEl || !reposEl) return;

    try {
        if (!cachedProfile || !cachedRepos) {
            const [profileRes, reposRes] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`),
            ]);
            if (!profileRes.ok || !reposRes.ok) throw new Error("GitHub API error");
            cachedProfile = await profileRes.json();
            cachedRepos = await reposRes.json();
        }

        const profile = cachedProfile;
        const repos = cachedRepos;

        const heroImg = document.getElementById("hero-avatar-img");
        if (heroImg) heroImg.src = profile.avatar_url;

        setupTerminal(profile, SKILLS.map(s => s.name));
        renderSkills();
        renderWorkingOn(repos);
        renderProjects(repos);

        const bio = profile.bio || "Desarrollador de software | Estudiante de Ingenier\u00eda en Inform\u00e1tica";
        const profileUrl = safeURL(profile.html_url, "https://github.com/AndresSanchez12323");
        const avatarUrl = safeURL(profile.avatar_url, "");
        profileEl.innerHTML = `
            <div class="github-avatar-wrap">
                <img class="github-avatar" src="${avatarUrl}" alt="${escapeHTML(profile.login)}" loading="lazy">
            </div>
            <div class="github-body">
                <div class="github-name">${escapeHTML(profile.name || profile.login)}</div>
                <div class="github-username">@${escapeHTML(profile.login)}</div>
                <p class="github-bio">${escapeHTML(bio)}</p>
                <div class="github-stats">
                    <span class="github-stat"><span class="github-stat-num">${Number(profile.public_repos) || 0}</span> ${escapeHTML(t("repos_label"))}</span>
                    <span class="github-stat"><span class="github-stat-num">${Number(profile.followers) || 0}</span> ${escapeHTML(t("followers_label"))}</span>
                    <span class="github-stat"><span class="github-stat-num">${Number(profile.following) || 0}</span> ${escapeHTML(t("following_label"))}</span>
                    <a class="btn btn-ghost" href="${profileUrl}" ${externalLinkAttrs()}>${escapeHTML(t("view_github"))}</a>
                </div>
            </div>`;

        const top = repos.filter((r) => !r.fork && !EXCLUDED_PROJECTS.includes(r.name))
            .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 6);

        reposEl.innerHTML = top.map((r) => {
            const langColor = getLangColor(r.language);
            const repoUrl = safeURL(r.html_url);
            return `
            <article class="repo-card">
                <div class="repo-head">
                    <svg class="repo-head-icon" viewBox="0 0 16 16" fill="currentColor"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.5.44v2.31c0 .138.112.25.25.25h2.31l-.001-.001-2.558-2.558Z"/></svg>
                    <span class="repo-head-name">${escapeHTML(r.name)}</span>
                </div>
                <div class="repo-body">
                    <p>${escapeHTML(r.description || t("no_description"))}</p>
                </div>
                <div class="repo-foot">
                    <span style="display:inline-flex;align-items:center;gap:4px">
                        <span style="width:7px;height:7px;border-radius:50%;background:${langColor};flex-shrink:0"></span>
                        ${escapeHTML(r.language || t("no_language"))}
                    </span>
                    <span>\u2b50 ${Number(r.stargazers_count) || 0}</span>
                    <a href="${repoUrl}" ${externalLinkAttrs()} style="color:var(--accent);text-decoration:none;margin-left:auto">${escapeHTML(t("view_repo"))} \u2192</a>
                </div>
            </article>`;
        }).join("");
    } catch {
        setupTerminal(null, SKILLS.map(s => s.name));
        renderSkills();
        renderWorkingOn();
        renderProjects();
        profileEl.innerHTML = t("profile_error");
        reposEl.innerHTML = t("repos_error");
    }
}

// ============================
// Terminal
// ============================
function setupTerminal(profile, languages) {
    const section = document.getElementById("terminal");
    const output = document.getElementById("terminal-output");
    if (!section || !output) return;

    const p = profile || {
        name: "Edwin Andr\u00e9s S\u00e1nchez Orozco",
        login: "AndresSanchez12323",
        html_url: "https://github.com/AndresSanchez12323",
        public_repos: 9, followers: 3, following: 3,
        created_at: "2024-03-08T18:52:42Z",
        updated_at: "2026-05-13T16:00:34Z",
    };

    const locale = currentLang === "es" ? "es-ES" : "en-US";
    const langs = Array.isArray(languages) && languages.length ? languages : ["JavaScript", "HTML", "CSS"];
    const fmt = (v) => { const d = new Date(v); return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString(locale); };

    const lines = [
        [{ t: "const ", c: "tok-key" }, { t: "dev", c: "tok-var" }, { t: " = ", c: "tok-punc" }, { t: "{", c: "tok-brace" }],
        [{ t: "  " + t("term_nombre"), c: "tok-var" }, { t: ": ", c: "tok-punc" }, { t: `"${p.name || p.login || "Edwin"}"`, c: "tok-str" }, { t: ",", c: "tok-punc" }],
        [{ t: "  " + t("term_usuario"), c: "tok-var" }, { t: ": ", c: "tok-punc" }, { t: `"@${p.login || "usuario"}"`, c: "tok-str" }, { t: ",", c: "tok-punc" }],
        [{ t: "  " + t("term_github"), c: "tok-var" }, { t: ": ", c: "tok-punc" }, { t: `"${p.html_url || "https://github.com"}"`, c: "tok-str" }, { t: ",", c: "tok-punc" }],
        [{ t: "  " + t("term_lenguajes"), c: "tok-var" }, { t: ": ", c: "tok-punc" }, { t: "[", c: "tok-brace" }, ...langs.flatMap((l, i) => [{ t: `"${l}"`, c: "tok-str" }, ...(i < langs.length - 1 ? [{ t: ", ", c: "tok-punc" }] : [])]), { t: "]", c: "tok-brace" }, { t: ",", c: "tok-punc" }],
        [{ t: "  " + t("term_repos_publicos"), c: "tok-var" }, { t: ": ", c: "tok-punc" }, { t: `${p.public_repos ?? 0}`, c: "tok-bool" }, { t: ",", c: "tok-punc" }],
        [{ t: "  " + t("term_seguidores"), c: "tok-var" }, { t: ": ", c: "tok-punc" }, { t: `${p.followers ?? 0}`, c: "tok-bool" }, { t: ",", c: "tok-punc" }],
        [{ t: "  " + t("term_siguiendo"), c: "tok-var" }, { t: ": ", c: "tok-punc" }, { t: `${p.following ?? 0}`, c: "tok-bool" }, { t: ",", c: "tok-punc" }],
        [{ t: "  " + t("term_desde"), c: "tok-var" }, { t: ": ", c: "tok-punc" }, { t: `"${fmt(p.created_at) || "2024"}"`, c: "tok-str" }, { t: ",", c: "tok-punc" }],
        [{ t: "  " + t("term_ultima_actualizacion"), c: "tok-var" }, { t: ": ", c: "tok-punc" }, { t: `"${fmt(p.updated_at)}"`, c: "tok-str" }],
        [{ t: "};", c: "tok-brace" }],
    ];

    const renderImmediate = () => {
        output.innerHTML = "";
        lines.forEach((tokens) => {
            const el = document.createElement("div");
            el.className = "terminal-line";
            tokens.forEach((tok) => {
                const span = document.createElement("span");
                span.className = tok.c;
                span.textContent = tok.t;
                el.appendChild(span);
            });
            output.appendChild(el);
        });
    };

    if (terminalPlayed) {
        renderImmediate();
        return;
    }

    let id = null;

    const typeLine = (tokens, el, done) => {
        let ti = 0, ci = 0, span = null;
        const step = () => {
            if (ti >= tokens.length) { done(); return; }
            if (!span) { span = document.createElement("span"); span.className = tokens[ti].c; el.appendChild(span); }
            span.textContent += tokens[ti].t.charAt(ci++);
            if (ci >= tokens[ti].t.length) { ti++; ci = 0; span = null; }
            id = setTimeout(step, 14);
        };
        step();
    };

    const start = () => {
        output.innerHTML = "";
        let li = 0;
        const next = () => {
            if (li >= lines.length) return;
            const el = document.createElement("div");
            el.className = "terminal-line";
            output.appendChild(el);
            typeLine(lines[li], el, () => { li++; id = setTimeout(next, 140); });
        };
        next();
    };

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (!e.isIntersecting || terminalPlayed) return;
            terminalPlayed = true;
            start();
            obs.disconnect();
        });
    }, { threshold: 0.4 });
    obs.observe(section);
}

// ============================
// Skills
// ============================
const LANG_SLUGS = {
    javascript: "javascript",
    typescript: "typescript",
    html: "html5",
    css: "css",
    python: "python",
    java: "openjdk",
    php: "php",
    c: "c",
    cpp: "cplusplus",
    "c#": "csharp",
    csharp: "csharp",
    ruby: "ruby",
    go: "go",
    rust: "rust",
    swift: "swift",
    kotlin: "kotlin",
    sql: "postgresql",
    shell: "gnubash",
    dart: "dart",
    dockerfile: "docker",
    powershell: "windowsterminal",
    "c++": "cplusplus",
    linux: "linux",
    cql: "apachecassandra",
    assembly: "assemblyasm",
};

function getLangSlug(lang) {
    const k = (lang || "").toLowerCase();
    return LANG_SLUGS[k] || null;
}

const SKILLS = [
    { name: "JavaScript", level: 3 },
    { name: "Python", level: 2 },
    { name: "TypeScript", level: 2 },
    { name: "PHP", level: 2 },
    { name: "Java", level: 2 },
    { name: "C++", level: 2 },
    { name: "C", level: 2 },
    { name: "HTML", level: 3 },
    { name: "CSS", level: 3 },
    { name: "Dockerfile", level: 2 },
    { name: "Linux", level: 2 },
    { name: "Shell", level: 2 },
    { name: "PowerShell", level: 2 },
    { name: "CQL", level: 1 },
    { name: "Assembly", level: 1 },
];

const HELLO_WORLD = {
    JavaScript: "console.log('Hola, soy Edwin — construyendo el futuro, un script a la vez');",
    TypeScript: "const greeting: string = 'Hola, soy Edwin — tipando el caos con TypeScript';",
    Python: "print('Hola, soy Edwin — Pythonista en formación, resolviendo problemas reales')",
    PHP: "echo 'Hola, soy Edwin — back-end con sabor a PHP';",
    Java: 'System.out.println("Hola, soy Edwin — creando soluciones robustas desde Java");',
    C: 'printf("Hola, soy Edwin — la base de todo, desde C");',
    "C++": "std::cout << 'Hola, soy Edwin — power y performance con C++' << std::endl;",
    HTML: "<!-- Hola, soy Edwin — estructurando la web, una etiqueta a la vez -->",
    CSS: "/* Hola, soy Edwin — dándole estilo a cada píxel con precisión */",
    Dockerfile: "# Hola, soy Edwin — contenedorizando soluciones, un Dockerfile a la vez",
    Linux: "# Hola, soy Edwin — navegando el terminal como segundo hogar",
    Shell: "echo 'Hola, soy Edwin — shell scripting para dominar el sistema'",
    PowerShell: "Write-Host 'Hola, soy Edwin — automatizando el mundo con PowerShell'",
    CQL: "-- Hola, soy Edwin — consultando datos a lo grande con CQL",
    Assembly: "; Hola, soy Edwin — bajando al hardware, bit a bit",
};

function renderSkills() {
    const el = document.getElementById("skills-cloud");
    if (!el) return;

    const inlineSvgs = {
        windowsterminal: '<svg fill="#67e8f9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.165 6V3h7.665v3H8.165zm-.5-3H1c-.55 0-1 .45-1 1v2h7.665V3zM23 3h-6.67v3H24V4c0-.55-.45-1-1-1zM0 6.5h24V20c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V6.5zM11.5 18c0 .3.2.5.5.5h8c.3 0 .5-.2.5-.5v-1.5c0-.3-.2-.5-.5-.5h-8c-.3 0-.5.2-.5.5V18zm-5.2-4.55l-3.1 3.1c-.25.25-.25.6 0 .8l.9.9c.25.25.6.25.8 0l4.4-4.4a.52.52 0 0 0 0-.8l-4.4-4.4c-.2-.2-.6-.2-.8 0l-.9.9c-.25.2-.25.55 0 .8l3.1 3.1z"/></svg>',
        assemblyasm: '<svg fill="#67e8f9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M8,9h-4c-1.103,0-2,.897-2,2v12h2v-5h4v5h2v-12c0-1.103-.897-2-2-2ZM4,16v-5h4v5h-4ZM20,21v-4c0-1.103-.897-2-2-2h-4v-4h6v-2h-6c-1.103,0-2,.897-2,2v4c0,1.103.897,2,2,2h4v4h-6v2h6c1.103,0,2-.8975,2-2ZM28,9l-1.5151,5-.4849,1.977-.465-1.977-1.535-5h-2v14h2v-8l-.1585-1.9961.5797,1.9961,1.5788,4.6262,1.5788-4.6263.5801-2-.1588,2v8h2v-14h-2.0001Z"/></svg>',
    };

    const R = 20, circ = 2 * Math.PI * R;

    el.innerHTML = SKILLS.map((s) => {
        const slug = getLangSlug(s.name);
        const pct = (s.level || 0) / 3 * 100;
        const offset = circ * (1 - pct / 100);
        let icon = "";
        if (slug && inlineSvgs[slug]) {
            icon = `<img class="skill-icon" src="data:image/svg+xml;base64,${btoa(inlineSvgs[slug])}" alt="" width="24" height="24" loading="lazy">`;
        } else if (slug) {
            icon = `<img class="skill-icon" src="https://cdn.simpleicons.org/${slug}/67e8f9" alt="" width="24" height="24" loading="lazy">`;
        }
        return `<span class="skill-chip" tabindex="0" data-lang="${s.name}">
            <span class="skill-icon-wrap">
                <svg class="skill-ring" viewBox="0 0 48 48" width="48" height="48">
                    <circle class="skill-ring-bg" cx="24" cy="24" r="${R}" fill="none" stroke-width="3"/>
                    <circle class="skill-ring-fill" cx="24" cy="24" r="${R}" fill="none" stroke-width="3"
                        stroke-dasharray="${circ}" stroke-dashoffset="${offset}"
                        transform="rotate(-90 24 24)"/>
                </svg>
                ${icon}
            </span>
            <span class="skill-name">${s.name}</span>
        </span>`;
    }).join("");

    el.querySelectorAll(".skill-chip").forEach((chip) => {
        chip.addEventListener("mouseenter", () => {
            const existing = document.querySelector(".skill-terminal");
            if (existing && existing.dataset.lang === chip.dataset.lang) return;
            if (existing) existing.remove();
            openSkillTerminal(chip);
        });

        chip.addEventListener("mouseleave", () => {
            const term = document.querySelector(".skill-terminal");
            if (!term || term.dataset.lang !== chip.dataset.lang) return;
            chip._hideTimer = setTimeout(() => { if (document.body.contains(term)) term.remove(); }, 400);
        });
    });
}

function openSkillTerminal(chip) {
    const lang = chip.dataset.lang;
    const code = HELLO_WORLD[lang];
    if (!code) return;

    const term = document.createElement("div");
    term.className = "skill-terminal";
    term.dataset.lang = lang;
    term.innerHTML = `
        <div class="term-head">
            <span class="term-dot" style="background:#ff5f56"></span>
            <span class="term-dot" style="background:#ffbd2e"></span>
            <span class="term-dot" style="background:#27c93f"></span>
            <span class="term-title">${lang}</span>
        </div>
        <div class="term-body">
            <div class="term-line">
                <span class="term-prompt">$</span>
                <span class="term-type"></span>
                <span class="term-cursor">&#9608;</span>
            </div>
        </div>
    `;
    document.body.appendChild(term);

    requestAnimationFrame(() => {
        const rect = chip.getBoundingClientRect();
        const tw = Math.min(420, window.innerWidth - 16);
        const th = term.offsetHeight;
        const gap = 10;
        let top = rect.top - th - gap;
        let left = rect.left + rect.width / 2 - tw / 2;
        if (top < 8) top = rect.bottom + gap;
        if (left < 8) left = 8;
        if (left + tw > window.innerWidth - 8) left = window.innerWidth - tw - 8;
        term.style.top = top + "px";
        term.style.left = left + "px";
    });

    term.addEventListener("mouseenter", () => {
        const chip = document.querySelector(`.skill-chip[data-lang="${lang}"]`);
        if (chip && chip._hideTimer) {
            clearTimeout(chip._hideTimer);
            chip._hideTimer = null;
        }
    });

    term.addEventListener("mouseleave", () => {
        setTimeout(() => { if (document.body.contains(term)) term.remove(); }, 400);
    });

    const typeEl = term.querySelector(".term-type");
    const cursor = term.querySelector(".term-cursor");
    let i = 0;

    function type() {
        if (i < code.length) {
            typeEl.textContent += code[i];
            i++;
            const delay = code[i - 1] === " " || code[i - 1] === "\n" ? 30 : 8 + Math.random() * 20;
            setTimeout(type, delay);
        } else {
            cursor.style.animation = "blink 0.8s step-end infinite";
        }
    }
    type();
}

// ============================
// Working On
// ============================
function renderWorkingOn(repos) {
    const grid = document.getElementById("working-grid");
    if (!grid) return;
    if (!Array.isArray(repos) || !repos.length) { grid.innerHTML = ""; return; }
    const lastActivity = (r) => new Date(r.pushed_at || r.updated_at).getTime();
    const items = repos.filter((r) => !r.fork && !EXCLUDED_PROJECTS.includes(r.name))
        .sort((a, b) => lastActivity(b) - lastActivity(a))
        .slice(0, 4);
    grid.innerHTML = items.map((r, i) => {
        const langColor = getLangColor(r.language);
        const ago = (() => {
            const diff = Date.now() - lastActivity(r);
            const mins = Math.floor(diff / 60000);
            if (mins < 1) return t("just_now");
            if (mins < 60) return mins + "m";
            const hrs = Math.floor(mins / 60);
            if (hrs < 24) return hrs + "h";
            const d = Math.floor(hrs / 24);
            if (d === 1) return t("yesterday");
            return d + "d";
        })();
        const firstLine = (r.description || t("no_description")).split("\n")[0];
        return `
            <article class="working-card" style="--i:${i}" data-lang="${escapeHTML(r.language || "")}">
                <div class="working-bar" style="background:${langColor}"></div>
                <div class="working-inner">
                    <div class="working-meta">
                        <span class="working-lang" style="color:${langColor}">${escapeHTML(r.language || t("no_language"))}</span>
                        <span class="working-time">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="4" stroke="currentColor" stroke-width="1" fill="none"/><path d="M5 3v2.5L7 7" stroke="currentColor" stroke-width="1" fill="none"/></svg>
                            ${escapeHTML(ago)}
                        </span>
                    </div>
                    <h3 class="working-name">${escapeHTML(r.name)}</h3>
                    <p class="working-desc">${escapeHTML(firstLine)}</p>
                    <div class="working-foot">
                        <div class="working-stats">
                            <span class="working-stat">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-1 4v4H8l4 4 4-4h-3V8h-2z"/></svg>
                                ${Number(r.stargazers_count) || 0}
                            </span>
                        </div>
                        <span class="working-arrow">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </span>
                    </div>
                </div>
            </article>`;
    }).join("");
}

// ============================
// Projects
// ============================
// `images` referencia los PNG ORIGINALES (siguen en su ruta). En el render se
// sirve la variante .webp (mucho más ligera) via <picture>, con el PNG como
// fallback presente y referenciado. `video` sirve la versión .opt (ligera);
// el original tambien queda en la carpeta.
const PROJECT_MEDIA = {
    "vial_servi": { folder: "vial-servi", images: ["primero.png", "segundo.png", "tercero.png", "cuarto.png"] },
    "Proyecto-Sistema-de-Transtito": { folder: "sistema-transito", images: ["primera.png", "segunda.png", "tercera.png", "cuarta.png", "quinta.png", "sexta.png"] },
    "Pro-Connect": { folder: "proconnect", images: ["primera.png", "segunda.png", "tercera.png", "cuarta.png", "quinta.png"] },
    "Pokemon-API": { folder: "poke-api", images: ["primera.png", "segunda.png", "tercera.png", "cuarta.png", "quinta.png", "sexta.png"] },
    "Poliglota-Red-Social-Postgres-SQL-Neo4j": { folder: "poliglota", images: ["primera.png", "segunda.png", "tercera.png", "cuarta.png"] },
    "Cubo-PS2-": { folder: "cubo-ps2", video: "Video.opt.mp4" },
};

// Deriva la ruta .webp a partir de un archivo .png/.jpg (misma carpeta/nombre).
function webpVariant(path) {
    return path.replace(/\.(png|jpe?g)$/i, ".webp");
}

function openProjectGallery(repoName) {
    const media = PROJECT_MEDIA[repoName];
    if (!media || !media.images) return;
    const base = "assets/img/projects/" + media.folder + "/";
    const overlay = document.getElementById("certModal");
    const iframe = document.getElementById("certModalIframe");
    if (!overlay || !iframe) return;
    const imgs = media.images.map(f => base + encodeURI(f));
    const imgsWebp = media.images.map(f => base + encodeURI(webpVariant(f)));
    let idx = 0;

    function backdropHandler(e) {
        if (e.target === overlay) closeGallery();
    }

    function restoreModal() {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
        overlay.querySelector(".modal-content").innerHTML = '<button class="modal-close" id="certModalClose" aria-label="Cerrar">&times;</button><iframe class="modal-iframe" id="certModalIframe" title="Certificado" loading="lazy" referrerpolicy="no-referrer"></iframe>';
        overlay.removeEventListener("click", backdropHandler);
    }

    function closeGallery() {
        restoreModal();
        document.removeEventListener("keydown", escHandler);
    }

    function escHandler(e) { if (e.key === "Escape") closeGallery(); }

    function show() {
        overlay.querySelector(".modal-content").innerHTML = `
            <button class="modal-close" id="galleryClose">&times;</button>
            <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:20px;position:relative;background:rgba(0,0,0,0.85)">
                <picture>
                    <source srcset="${imgsWebp[idx]}" type="image/webp">
                    <img src="${imgs[idx]}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:8px">
                </picture>
                <div style="position:absolute;bottom:16px;left:50%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:var(--text-muted);background:rgba(0,0,0,0.6);padding:4px 12px;border-radius:999px">${idx+1} / ${imgs.length}</div>
                ${idx > 0 ? '<button class="gallery-nav gallery-prev">&larr;</button>' : ""}
                ${idx < imgs.length - 1 ? '<button class="gallery-nav gallery-next">&rarr;</button>' : ""}
            </div>`;
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
        document.getElementById("galleryClose").addEventListener("click", closeGallery);
        overlay.querySelector(".gallery-prev")?.addEventListener("click", () => { idx--; show(); });
        overlay.querySelector(".gallery-next")?.addEventListener("click", () => { idx++; show(); });
    }
    overlay.addEventListener("click", backdropHandler);
    document.addEventListener("keydown", escHandler);
    show();
}

function renderProjects(repos) {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;
    if (!Array.isArray(repos) || !repos.length) {
        grid.innerHTML = `<p class="project-desc">${t("no_projects")}</p>`;
        return;
    }
    const locale = currentLang === "es" ? "es-ES" : "en-US";
    const blockedDemoHosts = new Set([
        "andressanchez12323.github.io",
        "perfil-github-nu.vercel.app",
        "portafolio-personal-edwin-sanchez.vercel.app",
    ]);
    const items = repos.filter((r) => !r.fork && !EXCLUDED_PROJECTS.includes(r.name))
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6);
    grid.innerHTML = items.map((r, i) => {
        let live = null;
        if (r.homepage && r.homepage.startsWith("http")) {
            try {
                const demoUrl = new URL(r.homepage);
                const demoHost = demoUrl.hostname.toLowerCase();
                if (!blockedDemoHosts.has(demoHost)) {
                    live = safeURL(demoUrl.href, null);
                }
            } catch (_) {
                live = null;
            }
        }
        const langColor = getLangColor(r.language);
        const media = PROJECT_MEDIA[r.name];
        const base = media ? "assets/img/projects/" + media.folder + "/" : null;
        let previewInner = "";
        if (media && media.video) {
            previewInner = `<video class="project-preview-video" src="${base}${media.video}" autoplay loop muted playsinline></video>`;
        } else if (media && media.images && media.images.length > 0) {
            const firstImg = base + media.images[0];
            previewInner = `<picture>
                    <source srcset="${webpVariant(firstImg)}" type="image/webp">
                    <img class="project-preview-img" src="${firstImg}" alt="${escapeHTML(r.name)}" loading="lazy" decoding="async" data-gallery-repo="${escapeHTML(r.name)}">
                </picture>`;
            if (media.images.length > 1) {
                const n = media.images.length;
                previewInner += `<button class="project-preview-btn" type="button" data-gallery-repo="${escapeHTML(r.name)}">${n < 10 ? "0" : ""}${n} <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 1h3v3H1zm5 0h3v3H6zM1 6h3v3H1zm5 0h3v3H6z"/></svg></button>`;
            }
        } else {
            previewInner = `<div class="project-preview-bg" style="background:linear-gradient(135deg, ${langColor}44, ${langColor}11)"></div>
                <div class="project-preview-overlay"></div>
                <div class="project-preview-code"><span></span><span></span><span></span></div>`;
        }
        const repoUrl = safeURL(r.html_url);
        return `
            <article class="project-card" style="--i: ${i}">
                <div class="project-preview${media ? " project-preview-has-media" : ""}"${!media ? ` style="background:${langColor}22"` : ""}>
                    ${previewInner}
                    <span class="project-preview-name">${escapeHTML(r.name)}</span>
                </div>
                <div class="project-body">
                    <p class="project-desc">${escapeHTML(r.description || t("no_description_alt"))}</p>
                    <div class="project-tags">
                        <span class="project-tag">
                            <span class="project-tag-dot" style="background:${langColor}"></span>
                            ${escapeHTML(r.language || t("no_language_alt"))}
                        </span>
                        <span class="project-tag">\u2b50 ${Number(r.stargazers_count) || 0}</span>
                        <span class="project-tag">${new Date(r.updated_at).toLocaleDateString(locale)}</span>
                    </div>
                    <div class="project-actions">
                        <a class="btn btn-ghost" href="${repoUrl}" ${externalLinkAttrs()}>${escapeHTML(t("repo_btn"))}</a>
                        ${live ? `<a class="btn" href="${live}" ${externalLinkAttrs()}>${escapeHTML(t("demo_btn"))}</a>` : ""}
                        ${r.name === "Cubo-PS2-" ? `
                        <a class="btn" href="https://mega.nz/folder/MqxF1Jja#WjqRnJQB9540p1DsQbs2nw" ${externalLinkAttrs()} style="display:inline-flex;align-items:center;gap:6px">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-1 4v4H8l4 4 4-4h-3V8h-2z"/></svg>
                            ${escapeHTML(t("cubo_iso"))}
                        </a>
                        <a class="btn btn-ghost" href="https://pcsx2.net/" ${externalLinkAttrs()} style="display:inline-flex;align-items:center;gap:6px">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 2.5h17v3h-17zm0 5h17v3h-17zm0 5h17v3h-17zm0 5h17v3h-17z"/><circle cx="6" cy="5" r="1.5" fill="currentColor"/><circle cx="6" cy="10" r="1.5" fill="currentColor"/><circle cx="6" cy="15" r="1.5" fill="currentColor"/><circle cx="6" cy="20" r="1.5" fill="currentColor"/></svg>
                            ${escapeHTML(t("cubo_emu"))}
                        </a>
                        ` : ""}
                    </div>
                </div>
            </article>`;
    }).join("");
    grid.querySelectorAll("[data-gallery-repo]").forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            event.stopPropagation();
            openProjectGallery(trigger.dataset.galleryRepo);
        });
    });
}

// ============================
// Certificates
// ============================
const CERT_INLINE_ICONS = {
    ibm: '<svg fill="#0062FF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 16.144h4.667v.668H0zM0 14.862h4.667v.67H0zM1.33 13.583h2.003v.671H1.33zM1.33 12.305h2.003v.67H1.33zM1.33 11.025h2.003v.671H1.33zM1.33 9.744h2.003v.671H1.33zM0 8.466h4.667v.67H0zM0 7.187h4.667v.67H0zM5.332 15.532h7.177c.12-.206.212-.433.267-.67H5.333v.67zM11.95 12.305H6.667v.67h5.843a2.67 2.67 0 00-.558-.67zM6.666 11.025v.671h5.285c.223-.188.41-.414.559-.671H6.666zM12.509 8.466H5.332v.67h7.443a2.891 2.891 0 00-.266-.67zM10.303 7.187H5.332v.67h6.685a2.522 2.522 0 00-1.714-.67zM6.666 9.744h2v.671h-2zM10.667 10.415h2.092c.059-.214.09-.44.09-.671h-2.182v.671zM6.666 13.583h1.999v.671h-2zM10.667 13.583v.671h2.182c0-.23-.031-.457-.09-.671h-2.092zM5.332 16.807l4.97.007c.667 0 1.268-.257 1.717-.67H5.332v.663zM13.334 16.144h3.332v.668h-3.332zM13.334 14.862h3.332v.67h-3.332zM14.665 13.583h2v.671h-2zM14.665 12.305h2v.67h-2zM17.594 8.466h-4.26v.67h4.49zM17.152 7.187h-3.818v.669h4.048zM20.665 16.144H24v.668h-3.335zM20.665 14.862H24v.67h-3.335zM20.665 13.583h2v.671h-2zM20.665 12.305h2v.67h-2zM20.665 11.696h2v-.671h-3.811l-.188.542-.188-.542H14.665v.671h2v-.616l.213.616h3.575l.212-.616zM22.666 9.744h-3.37l-.23.671h3.6zM20.183 7.187l-.231.669H24v-.669zM18.666 16.807l.23-.663h-.461zM18.224 15.532h.884l.238-.67h-1.357zM17.775 14.254h1.782l.235-.671h-2.253zM17.327 12.975h2.679l.229-.67h-3.138zM14.665 10.415h3.602l-.231-.671h-3.371zM19.51 9.136H24v-.67h-4.262z"/></svg>',
    bigschool: '<svg fill="#67e8f9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 9l11 7 11-7-11-7z"/><path d="M1 9v5l11 7 11-7V9l-11 7L1 9z" opacity="0.4"/><path d="M1 14v5l11 7 11-7v-5l-11 7L1 14z" opacity="0.25"/></svg>',
    dnda: '<svg fill="#e74c3c" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#e74c3c" stroke-width="1.6"/><path d="M8.5 12c0-2.5 1.5-4.5 4-4.5 1 0 2 .3 2.8 1l1.2-1.5C15.5 6 14 5.5 12.5 5.5 9 5.5 6.5 8.3 6.5 12s2.5 6.5 6 6.5c1.5 0 3-.5 4-1.5l-1.2-1.5c-.8.7-1.8 1-2.8 1-2.5 0-4-2-4-4.5z"/></svg>',
};

const CERT_PROVIDERS = {
    ibm: { icon: "ibm", color: "#0062FF", label: "IBM" },
    google: { slug: "google", color: "#4285F4", label: "Google" },
    mongodb: { slug: "mongodb", color: "#47A248", label: "MongoDB" },
    linux: { slug: "linux", color: "#FCC624", label: "Linux" },
    bigschool: { icon: "bigschool", color: "#67e8f9", label: "BIG school" },
    dnda: { icon: "dnda", color: "#e74c3c", label: "DNDA" },
    default: { slug: null, color: "#67e8f9", label: "" },
};

function getCertProvider(name) {
    const n = name.toLowerCase();
    if (n.includes("ibm")) return CERT_PROVIDERS.ibm;
    if (n.includes("google")) return CERT_PROVIDERS.google;
    if (n.includes("mongo")) return CERT_PROVIDERS.mongodb;
    if (n.includes("linux")) return CERT_PROVIDERS.linux;
    if (n.includes("industria")) return CERT_PROVIDERS.dnda;
    if (n.includes("certificado")) return CERT_PROVIDERS.bigschool;
    return CERT_PROVIDERS.default;
}

function renderCertificates() {
    const grid = document.getElementById("certificates-grid");
    if (!grid) return;

    const certs = [
        { name: "Certificado Profesional", file: "Certificado-Edwin-Andres-Sanchez-Orozco-5sdia3nx.pdf" },
        { name: "Certificado Avanzado", file: "Certificado-Edwin-Andres-Sanchez-Orozco-iofg6up8.pdf" },
        { name: "Curso IBM #1", file: "Curso #1 IBM.pdf" },
        { name: "Curso IBM #2", file: "Curso #2 IBM.pdf" },
        { name: "Curso IBM #3", file: "Curso #3 IBM.pdf" },
        { name: "MongoDB Data Modeling", file: "Curso MongoDB Data Modeling Introduce.pdf" },
        { name: "Google M\u00f3viles", file: "Google Moviles.pdf" },
        { name: "Industria del Software", file: "Industria del Software_Certificado del curso (1).pdf" },
        { name: "Linux Essentials", file: "Linux Essentials.pdf" },
        { name: "MongoDB Document Model", file: "MongoDB and the Document Model.pdf" },
        { name: "MongoDB for SQL Professionals", file: "MongoDB for SQL Professionals.pdf" },
    ];

    grid.innerHTML = certs.map((c) => {
        const url = safeAssetPath(c.file, "assets/certificates/");
        const provider = getCertProvider(c.name);
        const accentColor = provider.color;
        let iconHtml = "";
        if (provider.icon && CERT_INLINE_ICONS[provider.icon]) {
            const b64 = btoa(CERT_INLINE_ICONS[provider.icon]);
            iconHtml = `<img class="pdf-preview-icon" src="data:image/svg+xml;base64,${b64}" alt="" width="44" height="44" loading="lazy">`;
        } else if (provider.slug) {
            iconHtml = `<img class="pdf-preview-icon" src="https://cdn.simpleicons.org/${provider.slug}/${accentColor.replace("#", "")}" alt="" width="44" height="44" loading="lazy">`;
        } else {
            iconHtml = `<svg class="pdf-preview-icon" viewBox="0 0 24 24" fill="${accentColor}"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M8 12h8v2H8zm0 4h5v2H8zm0-8h3v2H8z"/></svg>`;
        }
        return `
            <div class="pdf-card" style="--pdf-accent: ${accentColor}">
                <button class="pdf-preview" type="button" data-cert-url="${url}" aria-label="${escapeHTML(t("cert_btn_preview"))}: ${escapeHTML(c.name)}">
                    <div class="pdf-preview-bg" style="background: radial-gradient(circle at 30% 40%, ${accentColor}22, transparent 70%), radial-gradient(circle at 70% 80%, ${accentColor}11, transparent 50%)"></div>
                    <div class="pdf-preview-visual">
                        ${iconHtml}
                        <span class="pdf-preview-name">${escapeHTML(c.name)}</span>
                    </div>
                    <div class="pdf-preview-overlay">
                        <span class="pdf-preview-hint" style="border-color: ${accentColor}; color: ${accentColor}">${escapeHTML(t("cert_btn_preview"))}</span>
                    </div>
                </button>
                <div class="pdf-body">
                    <h3>${escapeHTML(c.name)}</h3>
                    ${provider.label ? `<span class="pdf-badge" style="background: ${accentColor}22; color: ${accentColor}; border-color: ${accentColor}44">${escapeHTML(provider.label)}</span>` : ""}
                    <div class="pdf-actions">
                        <button class="btn" type="button" data-cert-url="${url}" style="background: ${accentColor}; color: #fff">${escapeHTML(t("cert_btn_preview"))}</button>
                    </div>
                </div>
            </div>`;
    }).join("");
}

// ============================
// Experience
// ============================
function renderExperience() {
    const el = document.getElementById("timeline");
    if (!el) return;
    const items = t("timeline");
    el.innerHTML = items.map((i) => `
        <div class="timeline-item">
            <span class="timeline-dot"></span>
            <span class="timeline-date">${escapeHTML(i.date)}</span>
            <div class="timeline-content">
                <div class="timeline-role">${escapeHTML(i.role)}</div>
                <div class="timeline-company"><span class="timeline-prompt">$</span> ${escapeHTML(i.company)}</div>
                <p class="timeline-desc">${escapeHTML(i.desc)}</p>
            </div>
        </div>`).join("");
}

// ============================
// Scroll Reveal
// ============================
function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("active");
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0, rootMargin: "0px 0px 150px 0px" });
    els.forEach((el) => obs.observe(el));
}

// ============================
// Theme Transition - Hyperspace Jump
// ============================
function playThemeTransition(callback) {
    const overlay = document.createElement("canvas");
    overlay.id = "theme-transition";
    Object.assign(overlay.style, {
        position: "fixed", inset: "0", width: "100%", height: "100%",
        zIndex: "9999", pointerEvents: "none",
    });
    document.body.appendChild(overlay);
    const ctx = overlay.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    overlay.width = w * dpr;
    overlay.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = w / 2, cy = h / 2;
    const stars = [];
    for (let i = 0; i < 400; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * Math.max(w, h) * 0.6;
        stars.push({
            x: cx + Math.cos(angle) * radius,
            y: cy + Math.sin(angle) * radius,
            angle: angle,
            speed: 1.5 + Math.random() * 4,
            size: Math.random() * 2.5 + 0.8,
        });
    }

    const duration = 700;
    const start = performance.now();
    let switched = false;

    function frame(now) {
        const t = Math.min(1, (now - start) / duration);
        ctx.fillStyle = "rgba(0, 0, 15, 0.12)";
        ctx.fillRect(0, 0, w, h);

        if (t > 0.35 && !switched) {
            switched = true;
            callback();
        }

        const warpAlpha = Math.min(1, t * 4) * Math.max(0, 1 - (t - 0.5) / 0.5);

        stars.forEach((s) => {
            const dist = t * Math.max(w, h) * s.speed;
            const px = cx + Math.cos(s.angle) * dist;
            const py = cy + Math.sin(s.angle) * dist;

            if (warpAlpha <= 0.005) return;

            const tail = dist * 0.3;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(s.angle) * tail, cy + Math.sin(s.angle) * tail);
            ctx.lineTo(px, py);
            ctx.strokeStyle = `rgba(180, 215, 255, ${warpAlpha * 0.45})`;
            ctx.lineWidth = s.size * 0.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(px, py, s.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180, 215, 255, ${warpAlpha * 0.12})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(px, py, s.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${warpAlpha})`;
            ctx.fill();
        });

        const flash = Math.max(0, 1 - Math.abs(t - 0.3) * 5);
        if (flash > 0.01) {
            ctx.fillStyle = `rgba(160, 200, 255, ${flash * 0.12})`;
            ctx.fillRect(0, 0, w, h);

            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.35 * flash);
            grad.addColorStop(0, `rgba(200, 225, 255, ${flash * 0.35})`);
            grad.addColorStop(0.5, `rgba(150, 195, 255, ${flash * 0.12})`);
            grad.addColorStop(1, "transparent");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);
        }

        if (t < 1) requestAnimationFrame(frame);
        else overlay.remove();
    }

    requestAnimationFrame(frame);
}

// ============================
// Language Transition - Quantum Decomposition
// ============================
function playLanguageTransition(callback) {
    const overlay = document.createElement("canvas");
    overlay.id = "lang-transition";
    Object.assign(overlay.style, {
        position: "fixed", inset: "0", width: "100%", height: "100%",
        zIndex: "9999", pointerEvents: "none",
    });
    document.body.appendChild(overlay);
    const ctx = overlay.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    overlay.width = w * dpr;
    overlay.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = w / 2, cy = h / 2;
    const stars = [];
    for (let i = 0; i < 300; i++) {
        const angle = Math.random() * Math.PI * 2;
        stars.push({
            angle,
            speed: 1 + Math.random() * 2.5,
            size: Math.random() * 2 + 0.5,
            radius: Math.sqrt(Math.random()) * Math.max(w, h) * 0.5,
        });
    }

    const duration = 600;
    const start = performance.now();
    let switched = false;

    document.body.classList.add("quantum-flicker");

    function frame(now) {
        const t = Math.min(1, (now - start) / duration);
        ctx.clearRect(0, 0, w, h);

        if (t > 0.35 && !switched) {
            switched = true;
            callback();
        }

        const half = t <= 0.5;
        const phase = half ? t / 0.5 : (t - 0.5) / 0.5;
        const maxR = Math.max(w, h) * 0.55;

        stars.forEach((s) => {
            const dist = half
                ? maxR * (1 - phase)
                : maxR * phase;

            const px = cx + Math.cos(s.angle) * dist;
            const py = cy + Math.sin(s.angle) * dist;
            const alpha = half ? 1 - phase * 0.6 : phase;

            if (alpha < 0.01) return;

            ctx.beginPath();
            ctx.arc(px, py, s.size * 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(103, 232, 249, ${alpha * 0.08})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(px, py, s.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();

            if (dist > 8) {
                const dir = half ? -1 : 1;
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(
                    cx + Math.cos(s.angle) * (dist - dir * 25),
                    cy + Math.sin(s.angle) * (dist - dir * 25)
                );
                ctx.strokeStyle = `rgba(103, 232, 249, ${alpha * 0.25})`;
                ctx.lineWidth = s.size * 0.4;
                ctx.stroke();
            }
        });

        const flash = Math.max(0, 1 - Math.abs(t - 0.35) * 8);
        if (flash > 0.01) {
            ctx.fillStyle = `rgba(103, 232, 249, ${flash * 0.08})`;
            ctx.fillRect(0, 0, w, h);

            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80 * flash);
            grad.addColorStop(0, `rgba(200, 235, 255, ${flash * 0.25})`);
            grad.addColorStop(1, "transparent");
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, 80 * flash, 0, Math.PI * 2);
            ctx.fill();
        }

        if (t < 1) requestAnimationFrame(frame);
        else {
            overlay.remove();
            document.body.classList.remove("quantum-flicker");
        }
    }

    requestAnimationFrame(frame);
}

// ============================
// Init
// ============================
document.addEventListener("DOMContentLoaded", () => {
    initPerformanceMode();
    setTheme(getPreferredTheme());
    setLanguage(currentLang);
    initBackgroundVideo();

    document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);
    document.getElementById("langToggle")?.addEventListener("click", toggleLanguage);

    initNav();
    initScrollNav();
    initCertModal();
    initReveal();
    initRoleRotator();
    renderGitHub();
    renderCertificates();
    renderExperience();
});
