from cloudinary_storage.storage import RawMediaCloudinaryStorage
from django.db import migrations


def add_missing_resume_columns(apps, schema_editor):
    Resume = apps.get_model("portfolio", "Resume")
    connection = schema_editor.connection
    table_name = Resume._meta.db_table

    with connection.cursor() as cursor:
        columns = {
            column.name
            for column in connection.introspection.get_table_description(cursor, table_name)
        }

    for field_name in ("file_url", "public_id"):
        if field_name not in columns:
            field = Resume._meta.get_field(field_name).clone()
            field.set_attributes_from_name(field_name)
            field.default = ""
            schema_editor.add_field(Resume, field)

    if "file" not in columns:
        return

    storage = RawMediaCloudinaryStorage()
    quoted_table = connection.ops.quote_name(table_name)
    with connection.cursor() as cursor:
        cursor.execute(
            f"SELECT id, file, file_url, public_id FROM {quoted_table} "
            "WHERE file IS NOT NULL AND file <> ''"
        )
        legacy_resumes = cursor.fetchall()

        for resume_id, legacy_file, file_url, public_id in legacy_resumes:
            updates = {}
            if not file_url:
                updates["file_url"] = storage.url(legacy_file)
            if not public_id:
                updates["public_id"] = legacy_file
            if updates:
                assignments = ", ".join(
                    f"{connection.ops.quote_name(column)} = %s"
                    for column in updates
                )
                cursor.execute(
                    f"UPDATE {quoted_table} SET {assignments} "
                    f"WHERE {connection.ops.quote_name('id')} = %s",
                    [*updates.values(), resume_id],
                )


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(add_missing_resume_columns, migrations.RunPython.noop),
    ]
