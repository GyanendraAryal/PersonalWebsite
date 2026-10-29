from django.db import migrations


def drop_legacy_resume_file_column(apps, schema_editor):
    Resume = apps.get_model("portfolio", "Resume")
    connection = schema_editor.connection
    table_name = Resume._meta.db_table
    file_column = "file"

    with connection.cursor() as cursor:
        columns = {
            column.name
            for column in connection.introspection.get_table_description(cursor, table_name)
        }

    if file_column in columns:
        schema_editor.execute(
            f"ALTER TABLE {connection.ops.quote_name(table_name)} "
            f"DROP COLUMN {connection.ops.quote_name(file_column)}"
        )


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0002_resume_cloudinary_compatibility"),
    ]

    operations = [
        migrations.RunPython(
            drop_legacy_resume_file_column,
            migrations.RunPython.noop,
        ),
    ]
