Build a single-page portfolio/resume landing page based on the CV of Septiya Yutantri, where each CV section becomes a dedicated section and is accessible via a navbar with smooth scroll navigation.

🧭 NAVBAR (AUTO SCROLL)
📌 Requirements:
Sticky navbar at top
Smooth scrolling to sections
Active menu highlight when section is in view (scroll spy)
Menu items MUST follow CV structure:
🧩 Menu:
Home
Profile
Work Experience
Education
Organizational
Knowledge
Skills (merge Hard + Soft Skills)
Blog → route /blog
Contact
⚙️ Behavior:
Click menu → scroll smoothly to section
Highlight active section (maroon underline or text color)
Navbar changes background on scroll (transparent → white + shadow)
🏠 HERO SECTION (HOME)
Content from CV:
Name: Septiya Yutantri
Location: Surabaya, Indonesia
Contact:
Phone
Email
UI:
Large bold name
Subtitle:
IT Service Management Officer | System Implementation Specialist
Short intro (1–2 lines from profile)
CTA:
Download CV
Contact Me
👩 PROFILE SECTION
Content:

Gunakan isi dari "Personal Profile":

Ringkas jadi 3–4 kalimat:

Background: Implementasi & Management Product
Interest:
IT Project Management
HR
Data Analysis
Strength:
Fast learner
Team collaboration
Problem solving
UI:
2 column:
Text
Icon highlights (3–4 cards)
💼 WORK EXPERIENCE SECTION
Structure:

Gunakan timeline vertical modern

Data dari CV:
1. IT Service Management Officer — Expressa Group
September 2025 – Present
Highlight:
Incident & request management (SLA)
Implementation & deployment
Troubleshooting & root cause analysis
Stakeholder coordination
System monitoring & improvement
2. Staff Tata Kelola BPA — Diskominfo Nganjuk
Feb 2023 – Jun 2023
Highlight:
Website monitoring
Ticket handling
SPBE analysis
Administrative support
UI:
Vertical timeline
Maroon dots + connecting line
Card hover effect
🎓 EDUCATION SECTION
Data:
Universitas Trunojoyo Madura
Sistem Informasi
IPK 3.7
2020 – 2024
SMA Negeri 1 Gondang
IPA
2017 – 2020
Score: 85
UI:
Card layout
Highlight GPA with badge
🏢 ORGANIZATIONAL SECTION
Data:
Kepala Divisi Pendidikan — UKMFT-ITC (2022)
Anggota Divisi Pendidikan — UKMFT-ITC (2021)
Anggota Humas — HIMASI (2021)
UI:
Grid cards
Show leadership emphasis
🧠 KNOWLEDGE SECTION
Data:
IT Service Management
System Implementation
CRM
Business Process Analysis
Software Deployment Lifecycle
Digital Transformation
UI:
Icon + text
Grid layout
🛠️ SKILLS SECTION
Merge:
Hard Skills:
SLA Monitoring
Troubleshooting
Root Cause Analysis
SQL
Documentation
Soft Skills:
Communication
Problem Solving
Leadership
Time Management
Adaptability
UI:
Tag pills OR progress bars
Group:
Technical
Professional
✍️ BLOG SECTION (PREVIEW)
Show 3 latest posts
Button: “View All” → /blog
📞 CONTACT SECTION
Data:
Email
Phone
Location
UI:
Contact form
Clean minimal
🎨 DESIGN STYLE
White dominant
Maroon accent
Clean, modern, elegant
Smooth animation
Section spacing besar
⚙️ TECH REQUIREMENTS (IMPORTANT)
Next.js Implementation:
Use App Router
Use scroll behavior: smooth
Use id for each section
Example Section ID Mapping:
<section id="home"></section>
<section id="profile"></section>
<section id="experience"></section>
<section id="education"></section>
<section id="organizational"></section>
<section id="knowledge"></section>
<section id="skills"></section>
<section id="contact"></section>
Navbar Scroll Logic:
Use:
scrollIntoView({ behavior: 'smooth' })
OR anchor links #section-id
Implement scroll spy:
Detect current section in viewport
Highlight navbar item
✨ INTERACTIONS
Smooth scroll
Fade-in section animation
Hover effect:
Cards lift
Buttons scale
Active navbar highlight
📱 RESPONSIVE
Mobile:
Hamburger menu
Scroll tetap smooth
Tablet:
2 column layout
🧠 FINAL GOAL

The landing page should feel like:

🔥 Professional digital CV
🧑‍💻 Personal branding website
📱 Smooth interactive experience
🎯 Easy navigation via navbar scroll