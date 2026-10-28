from django.test import TestCase

from .models import Work


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
