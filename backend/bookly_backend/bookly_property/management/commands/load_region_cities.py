import json
from django.core.management.base import BaseCommand
from bookly_property.models import Region, CityProvince

class Command(BaseCommand):
    help = 'Load regions and cities from JSON file into database'

    def handle(self, *args, **options):
        with open('ph_regions_cities.json', 'r', encoding='utf-8') as f:
            data = json.load(f)

        for region_name, cities in data.items():
            region, created = Region.objects.get_or_create(name=region_name)

            if created:
                self.stdout.write(self.style.SUCCESS(f'Created region: {region_name}'))
            else:
                self.stdout.write(f'Region already exists: {region_name}')

            for city_name in cities:
                city, created = CityProvince.objects.get_or_create(
                    region=region,
                    name=city_name
                )
            
                if created:
                    self.stdout.write(f'Created city/province: {city_name} in {region_name}')
                else:
                    self.stdout.write(f'City/province already exists: {city_name} in {region_name}')
        
        self.stdout.write(self.style.SUCCESS('Successfully loaded all regions and cities!'))