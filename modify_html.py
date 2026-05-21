import sys
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# The hero section starts with <section id="home" class="hero hiring-hero fade-in">
# and the about section ends before <!-- Experience Section -->
new_hero = """    <section id="home" class="hero hiring-hero fade-in">
        <div class="hero-container">
            <!-- Left Column: Text & Value Proposition -->
            <div class="hero-left">
                <span class="open-to-work-badge">Open to full-time roles &middot; Egypt &middot; Saudi Arabia &middot; Remote</span>
                <h1>Mahmoud Elmahdy</h1>
                <p class="subtitle">Data Analyst &amp; BI Developer &middot; Power BI, SQL, Excel</p>
                <p class="description">
                    Results-driven Data Analyst & BI Consultant with 3+ years of experience. I build automated reporting systems and dashboards that cut manual processing time by up to <strong>90%</strong> &mdash; including reducing executive reporting cycles from <strong>10 days to 1 day</strong> for aviation ground-operations teams. Bilingual in English and German.
                </p>
                
                <div class="quick-stats hero-stats">
                    <div class="stat-item">
                        <span class="stat-number">120+</span>
                        <span class="stat-label">Projects</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">3+</span>
                        <span class="stat-label">Years</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">30+</span>
                        <span class="stat-label">Clients</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">20+</span>
                        <span class="stat-label">Reviews</span>
                    </div>
                </div>

                <div class="hero-meta-row" style="margin-top: 20px;">
                    <span class="hero-meta-pill">Arabic &middot; Native</span>
                    <span class="hero-meta-pill">English &middot; Fluent</span>
                    <span class="hero-meta-pill">German &middot; Fluent</span>
                </div>
                
                <div class="hero-cta-row" style="margin-top: 20px;">
                    <a href="resume.html" class="cta-button-outline">View Resume</a>
                    <a href="#projects" class="cta-button-outline">My Projects</a>
                    <a href="#contact" class="cta-button">Contact Me</a>
                </div>
            </div>
            
            <!-- Right Column: Visuals -->
            <div class="hero-right">
                <div class="hero-image-wrapper">
                    <img src="Assets/Images/Profile Picture/Mein Foto.png" alt="Mahmoud Elmahdy" class="hero-profile-img">
                </div>
            </div>
        </div>
        
        <!-- Scroll Indicator -->
        <a href="#skills" class="scroll-indicator" title="Scroll Down">
            <div class="mouse">
                <div class="wheel"></div>
            </div>
            <div class="arrow-down"></div>
        </a>
    </section>

    <!-- Skills Section extracted from old About section -->
    <section id="skills" class="section fade-in" style="padding-top: 40px;">
        <h2 class="section-title">Technical & Soft Skills</h2>
        <div class="skills-grid" style="margin-top: 0;">"""

# extract skills grid content from old index.html
start_skills = content.find('<div class="skill-category" onclick="toggleCourseCard(this)">')
end_skills = content.find('</section>', start_skills)

if start_skills != -1 and end_skills != -1:
    skills_content = content[start_skills:end_skills]
else:
    skills_content = ""

# Find where to replace
start_idx = content.find('<section id="home" class="hero hiring-hero fade-in">')
end_idx = content.find('</section>', end_skills) if end_skills != -1 else -1

if start_idx != -1 and end_idx != -1:
    # also add </section> to the end of skills
    new_content = content[:start_idx] + new_hero + '\n' + skills_content + '\n    </section>\n' + content[end_idx + 10:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced.")
else:
    print("Could not find sections to replace.")
