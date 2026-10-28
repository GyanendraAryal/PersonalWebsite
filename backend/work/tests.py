from django.test import TestCase

from .models import PortfolioProfile, Service, SkillCategory, Work


class WorkAPITests(TestCase):
    def test_work_endpoint_returns_existing_work(self):
        work = Work.objects.create(
            tag="web",
            title="Portfolio",
            description="A portfolio project",
            tech_stack=["React", "Django"],
        )

        response = self.client.get("/api/work/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["data"][0]["id"], work.pk)
        self.assertEqual(response.json()["data"][0]["tech_stack"], ["React", "Django"])

    def test_services_endpoint_returns_active_services(self):
        Service.objects.all().delete()
        active = Service.objects.create(
            icon="Code2",
            tag="Frontend",
            title="Frontend Development",
            description="Responsive frontend applications.",
        )
        Service.objects.create(
            icon="Code2",
            tag="Hidden",
            title="Inactive service",
            description="Not shown publicly.",
            is_active=False,
        )

        response = self.client.get("/api/work/services/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual([item["id"] for item in response.json()], [active.pk])

    def test_skills_endpoint_returns_active_categories(self):
        SkillCategory.objects.all().delete()
        category = SkillCategory.objects.create(
            icon="Code2",
            label="Languages",
            skills=[{"name": "Python"}],
        )

        response = self.client.get("/api/work/skills/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]["id"], category.pk)
        self.assertEqual(response.json()[0]["skills"], [{"name": "Python"}])

    def test_profile_endpoint_returns_portfolio_content(self):
        profile, _ = PortfolioProfile.objects.update_or_create(
            id=1,
            defaults={
                "display_name": "Portfolio Owner",
                "hero_roles": ["Developer"],
                "hero_summary": "Profile summary.",
                "resume_summary": "Resume summary.",
                "contact_summary": "Contact summary.",
                "footer_summary": "Footer summary.",
                "contact_email": "owner@example.com",
                "location": "Somewhere",
            },
        )

        response = self.client.get("/api/work/profile/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["display_name"], profile.display_name)
        self.assertEqual(response.json()["hero_roles"], ["Developer"])
