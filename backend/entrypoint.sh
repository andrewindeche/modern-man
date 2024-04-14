#!/bin/bash

# Apply migrations
python manage.py migrate

# Start Django application
exec "$@"
