const projectsData = [
    {
        id: '01',
        title: 'Color Palette',
        description: 'Frontend utility for generating dynamic color palettes.',
        tags: ['HTML', 'CSS', 'JS'],
        link: 'projects/color_palette/index.html',
        image: 'assets/color_palette.png'
    },
    {
        id: '02',
        title: 'Password Generator',
        description: 'Client secure password generator.',
        tags: ['HTML', 'CSS', 'JS'],
        link: 'projects/password_generator/index.html',
        image: 'assets/password_generator.png'
    },
    {
        id: '03',
        title: 'Pricing Card',
        description: 'Pricing card frontend project.',
        tags: ['CSS', 'HTML'],
        link: 'projects/pricing_cards/index.html',
        image: 'assets/pricing_card.png'
    },
    {
        id: '04',
        title: 'Github Profile Finder',
        description: 'Github profile finder using Github API.',
        tags: ['CSS', 'HTML', 'JS', 'Github'],
        link: 'projects/github_finder/index.html',
        image: 'assets/github_finder.png'
    },
    {
        id: '05',
        title: 'Tempus Mortis',
        description: 'A terror digital clock.',
        tags: ['CSS', 'HTML', 'JS'],
        link: 'projects/tempus_mortis/index.html',
        image: 'assets/tempus_mortis.png'
    },
    {
        id: '06',
        title: 'CV Web',
        description: 'Curriculum Vitae.',
        tags: ['CSS', 'HTML', 'JS'],
        link: 'projects/cv-web/index.html',
        image: 'assets/cv.png'
    }
];
class PortfolioRenderer {
    constructor(data) {
        this.projects = data;
        this.container = document.querySelector('.projects-grid');
    }

    createProjectCard(project) {
        const card = document.createElement('a');
        card.className = 'project-card';
        card.href = project.link;
        card.rel = 'noopener noreferrer';

        card.innerHTML = `
            <div class="project-image">
                ${
                    project.image
                        ? `<img src="${project.image}" alt="${project.title}">`
                        : ''
                }
            </div>

            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>

                <div class="project-tags">
                    ${this.renderTags(project.tags, project.accentTag)}
                </div>
            </div>
        `;

        return card;
    }

    renderTags(tags, hasAccent = false) {
        return tags.map((tag, index) => {
            const cls = hasAccent && index === 0
                ? 'project-tag accent'
                : 'project-tag';
            return `<span class="${cls}">${tag}</span>`;
        }).join('');
    }

    render() {
        this.container.innerHTML = '';
        this.projects.forEach(project => {
            this.container.appendChild(this.createProjectCard(project));
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new PortfolioRenderer(projectsData);
    portfolio.render();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }

        lastScroll = currentScroll;
    });
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioRenderer, projectsData };
}