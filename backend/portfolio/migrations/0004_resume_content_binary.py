from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0003_drop_legacy_resume_file_column"),
    ]

    operations = [
        migrations.RenameField(
            model_name="resume",
            old_name="uploaded_at",
            new_name="created_at",
        ),
        migrations.AlterModelOptions(
            name="resume",
            options={"ordering": ["-created_at"]},
        ),
        migrations.AddField(
            model_name="resume",
            name="content",
            field=models.BinaryField(default=bytes),
            preserve_default=False,
        ),
    ]
