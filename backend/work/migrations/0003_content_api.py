from django.db import migrations, models


SERVICES = [
    {
        "icon": "Monitor",
        "tag": "Frontend",
        "title": "Frontend Development",
        "description": "Building modern, responsive, and interactive UIs using React, Tailwind CSS, and component-based architecture.",
        "display_order": 0,
    },
    {
        "icon": "Code2",
        "tag": "React",
        "title": "React Application Development",
        "description": "Creating scalable single-page applications with routing, API integration, state management, and reusable components.",
        "display_order": 1,
    },
    {
        "icon": "Layers",
        "tag": "Full Stack",
        "title": "Full-Stack MVP Development",
        "description": "Developing complete web applications using MERN stack with REST APIs, authentication, and database integration.",
        "display_order": 2,
    },
    {
        "icon": "LayoutDashboard",
        "tag": "Admin",
        "title": "Dashboard & Admin Panels",
        "description": "Designing clean and functional dashboards for managing data like projects, users, and analytics.",
        "display_order": 3,
    },
    {
        "icon": "Plug",
        "tag": "Backend",
        "title": "API Integration & Data Handling",
        "description": "Connecting frontend apps with APIs or mock JSON data to build dynamic, real-world applications.",
        "display_order": 4,
    },
    {
        "icon": "Sparkles",
        "tag": "UI / UX",
        "title": "UI/UX Focused Development",
        "description": "Crafting smooth user experiences with animations, responsive layouts, and modern design principles.",
        "display_order": 5,
    },
]

SKILL_CATEGORIES = [
    {
        "icon": "Code2",
        "label": "Languages",
        "skills": [
            {"name": "JavaScript", "abbr": "JS"},
            {"name": "TypeScript", "abbr": "TS"},
            {"name": "Python", "abbr": "Py"},
        ],
        "display_order": 0,
    },
    {
        "icon": "Globe",
        "label": "Frontend",
        "skills": [
            {"name": "React"},
            {"name": "TypeScript"},
            {"name": "Tailwind CSS"},
            {"name": "Responsive UI"},
            {"name": "REST API Integration"},
        ],
        "display_order": 1,
    },
    {
        "icon": "Server",
        "label": "Backend",
        "skills": [
            {"name": "Django"},
            {"name": "Django REST Framework"},
            {"name": "REST API Design"},
            {"name": "API Integration"},
            {"name": "Data Handling"},
        ],
        "display_order": 2,
    },
    {
        "icon": "Container",
        "label": "DevOps & Tools",
        "skills": [
            {"name": "Docker"},
            {"name": "Git"},
            {"name": "GitHub"},
            {"name": "Environment Config"},
            {"name": "Containerization"},
        ],
        "display_order": 3,
    },
    {
        "icon": "BookOpen",
        "label": "Technical Docs",
        "skills": [
            {"name": "LaTeX"},
            {"name": "Overleaf"},
            {"name": "Technical Documentation"},
            {"name": "Academic Writing"},
        ],
        "display_order": 4,
    },
]


def seed_content(apps, schema_editor):
    Service = apps.get_model("work", "Service")
    SkillCategory = apps.get_model("work", "SkillCategory")
    PortfolioProfile = apps.get_model("work", "PortfolioProfile")
    Service.objects.bulk_create(Service(**service) for service in SERVICES)
    SkillCategory.objects.bulk_create(
        SkillCategory(**category) for category in SKILL_CATEGORIES
    )
    PortfolioProfile.objects.create(
        id=1,
        display_name="Gyanendra Aryal",
        hero_roles=[
            "Full-Stack Developer.",
            "React Specialist.",
            "Django API Engineer.",
            "Clean UI Builder.",
        ],
        hero_summary=(
            "I craft modern web applications with React and TypeScript, build backend "
            "APIs with Django REST Framework, use Docker for containerized development, "
            "and write professional documents with LaTeX."
        ),
        resume_summary=(
            "React + TypeScript frontend, Django REST Framework backend, containerized "
            "with Docker. Clean architecture, maintainable code."
        ),
        contact_summary=(
            "Open to freelance work, internships, and collaboration on web projects. "
            "Drop me a message and I'll get back to you."
        ),
        footer_summary=(
            "Full-stack developer focused on React, Django REST Framework, and clean, "
            "maintainable web applications. Open for internships, freelance work, and "
            "collaboration on interesting web projects."
        ),
        is_available=True,
        contact_email="aryalgyanendra8@gmail.com",
        location="Bhairahawa, Nepal",
        github_url="https://github.com/GyanendraAryal",
        linkedin_url="https://www.linkedin.com/in/gyanendra-aryal/",
        instagram_url="https://instagram.com/g_aryal5",
    )


def remove_seed_content(apps, schema_editor):
    apps.get_model("work", "Service").objects.all().delete()
    apps.get_model("work", "SkillCategory").objects.all().delete()
    apps.get_model("work", "PortfolioProfile").objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ("work", "0002_work_created_at_work_updated_at"),
    ]

    operations = [
        migrations.AddField(
            model_name="work",
            name="image_url",
            field=models.URLField(blank=True, max_length=500),
        ),
        migrations.CreateModel(
            name="Service",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("icon", models.CharField(max_length=50)),
                ("tag", models.CharField(max_length=50)),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField()),
                ("display_order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={"ordering": ["display_order", "id"]},
        ),
        migrations.CreateModel(
            name="SkillCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("icon", models.CharField(max_length=50)),
                ("label", models.CharField(max_length=100)),
                ("skills", models.JSONField(blank=True, default=list)),
                ("display_order", models.PositiveIntegerField(default=0)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "ordering": ["display_order", "id"],
                "verbose_name_plural": "skill categories",
            },
        ),
        migrations.CreateModel(
            name="PortfolioProfile",
            fields=[
                (
                    "id",
                    models.PositiveSmallIntegerField(
                        default=1,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("display_name", models.CharField(max_length=100)),
                ("hero_roles", models.JSONField(blank=True, default=list)),
                ("hero_summary", models.TextField()),
                ("resume_summary", models.TextField()),
                ("contact_summary", models.TextField()),
                ("footer_summary", models.TextField()),
                ("is_available", models.BooleanField(default=True)),
                ("contact_email", models.EmailField(max_length=254)),
                ("location", models.CharField(max_length=150)),
                ("github_url", models.URLField(blank=True, max_length=500)),
                ("linkedin_url", models.URLField(blank=True, max_length=500)),
                ("instagram_url", models.URLField(blank=True, max_length=500)),
            ],
        ),
        migrations.RunPython(seed_content, remove_seed_content),
    ]
