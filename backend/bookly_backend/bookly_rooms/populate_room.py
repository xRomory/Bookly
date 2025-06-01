import os
import django
from django.core.files import File
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "bookly_backend.settings")
django.setup()

from bookly_rooms.models import BooklyRooms, RoomImage
from bookly_property.models import BooklyProperty

def populate_room():
    try:
        property = BooklyProperty.objects.get(property_name="Buroltel")

        # room_data = [
        #     {
        #         "room_name": "Standard Room",
        #         "room_image": "room1.jpg",
        #         "room_description": "Cozy room with a queen bed and free Wi-Fi",
        #         "capacity": 2,
        #         "price_per_night": 1800, 
        #         "property_type": "hotel",
        #         "extra_images": ["amenities1.jpg", "bath1.jpg", "bath2.jpg", "things1.jpg"],
        #         "amenities": ["Free Wi-Fi", "Smart TV", "Air Conditioning", "Ensuite bathroom with hot shower"],
        #     },
        #     {
        #         "room_name": "Deluxe Room",
        #         "room_image": "room2.jpg",
        #         "room_description": "Spacious room with a king bed and city view.",
        #         "capacity": 2,
        #         "price_per_night": 2800, 
        #         "property_type": "hotel",
        #         "extra_images": ["amenities2.jpg", "bath3.jpg", "bath4.jpg", "things2.jpg"],
        #         "amenities": ["Free Wi-Fi", "Smart TV", "Air Conditioning", "Ensuite bathroom with hot shower"],
        #     },
        #     {
        #         "room_name": "Twin Room",
        #         "room_image": "room3.jpg",
        #         "room_description": "Room with two single beds for companions.",
        #         "capacity": 2,
        #         "price_per_night": 2200,
        #         "property_type": "hotel",
        #         "extra_images": ["amenities3.jpg", "amenities4.jpg", "bath5.jpg", "bath6.jpg"],
        #         "amenities": ["Two Single Beds", "Work Desk", "Complimentary Bottled Water", "Air Conditioning",]
        #     },
        #     {
        #         "room_name": "Family Suite",
        #         "room_image": "room4.jpg",
        #         "room_description": "Two-bedroom suite perfect for families.",
        #         "capacity": 4,
        #         "price_per_night": 3200,
        #         "property_type": "suite",
        #         "extra_images": ["dining1.jpg", "dining2.jpg", "amenities5.jpg", "amenities6.jpg"],
        #         "amenities": ["Two separate bedrooms", "Dining area", "Mini refrigerator", "Smart TV",]
        #     },
        #     {
        #         "room_name": "Executive Suite",
        #         "room_image": "room5.jpg",
        #         "room_description": "Suite with living area and workspace.",
        #         "capacity": 2,
        #         "price_per_night": 3500,
        #         "property_type": "suite",
        #         "extra_images": ["desk1.jpg", "desk2.jpg", "bath7.jpg", "bath8.jpg"],
        #         "amenities": ["Separate Living Area", "Ergonomic work desk", "Nespresso Machine", "Bathrobe and slippers",]
        #     },
        #     {
        #         "room_name": "Presidential Suite",
        #         "room_image": "room6.jpg",
        #         "room_description": "Premium suite with luxury features.",
        #         "capacity": 2,
        #         "price_per_night": 4500,
        #         "property_type": "suite",
        #         "extra_images": ["amenities7.jpg", "amenities8.jpg", "bath9.jpg", "butler1.jpg"],
        #         "amenities": ["Private balcony", "Jacuzzi tub", "Walk-in close", "Butler service (on request)",]
        #     },
        # ]

        # room_data = [
        #     {
        #         "room_name": "Studio Unit",
        #         "room_image": "room7.jpg",
        #         "room_description": "Modern studio with a kitchenette",
        #         "capacity": 2,
        #         "price_per_night": 2200,
        #         "property_type": "apartment",
        #         "extra_images": ["living1.jpg", "living2.jpg", "bath11.jpg", "bath12.jpg"],
        #         "amenities": ["Kitchenette with microwave", "Dining nook", "Smart lock entry", "Wi-Fi"]
        #     },
        #     {
        #         "room_name": "One-Bedroom Unit",
        #         "room_image": "room8.jpg",
        #         "room_description": "Spacious apartment with a separate living area.",
        #         "capacity": 2,
        #         "price_per_night": 3000,
        #         "property_type": "apartment",
        #         "extra_images": ["living3.jpg", "living4.jpg", "bath13.jpg", "bath14.jpg"],
        #         "amenities": ["Living area with sofa", "Full-size fridge", "Air conditioning in both rooms", "Large Smart TV"]
        #     },
        #     {
        #         "room_name": "Two-Bedroom Unit",
        #         "room_image": "room9.jpg",
        #         "room_description": "Perfect for small families or groups.",
        #         "capacity": 4,
        #         "price_per_night": 4200,
        #         "property_type": "apartment",
        #         "extra_images": ["living5.jpg", "living6.jpg", "things5.jpg", "things6.jpg"],
        #         "amenities": ["Two separate bedrooms", "Full kitchen", "Washing machine", "Dining area",]
        #     },
        #     {
        #         "room_name": "Penthouse",
        #         "room_image": "room10.jpg",
        #         "room_description": "Luxury apartment with a panoramic city view.",
        #         "capacity": 4,
        #         "price_per_night": 6500,
        #         "property_type": "suite",
        #         "extra_images": ["amenities8.jpg", "living13.jpg", "living14.jpg", "living15.jpg"],
        #         "amenities": ["Floor-to-ceiling windows", "Private balcony", "High-speed internet", "Entertainment system",]
        #     },
        #     {
        #         "room_name": "Deluxe Studio",
        #         "room_image": "room11.jpg",
        #         "room_description": "Premium studio with a balcony.",
        #         "capacity": 2,
        #         "price_per_night": 2800,
        #         "property_type": "apartment",
        #         "extra_images": ["living9.jpg", "living10.jpg", "living11.jpg", "living12.jpg"],
        #         "amenities": ["Balcony with city view", "Queen bed", "Kitchenette with cookware", "Air conditioning",]
        #     },
        # ]

        room_data = [
            {
                "room_name": "Budget Room",
                "room_image": "room11.jpg",
                "room_description": "Simple room with a single bed.",
                "capacity": 2,
                "price_per_night": 1000,
                "property_type": "motel",
                "extra_images": ["living13.jpg", "living14.jpg", "amenities16.jpg", "amenities17.jpg",],
                "amenities": ["Single bed", "Wall fan or basic A/C", "Desk", "Rainfall shower",]
            },
            {
                "room_name": "Standard Room",
                "room_image": "room12.jpg",
                "room_description": "Room with a double bed and standard facilities.",
                "capacity": 2,
                "price_per_night": 1800,
                "property_type": "motel",
                "extra_images": ["amenities18.jpg", "amenities19.jpg", "amenities20.jpg", "amenities21.jpg"],
                "amenities": ["Ensuite bathroom", "Closet or hanging space", "Flat-screen TV", "Air conditioning",]
            },
            {
                "room_name": "Economy Room",
                "room_image": "room13.jpg",
                "room_description": "Affordable room with basic amenities.",
                "capacity": 2,
                "price_per_night": 1500,
                "property_type": "motel",
                "extra_images": ["amenities29.jpg", "amenities30.jpg", "bath15.jpg", "bath16.jpg"],
                "amenities": ["Double bed", "Flat-screen TV", "Basic toiletries", "Wi-Fi"]
            },
            {
                "room_name": "VIP Room",
                "room_image": "room14.jpg",
                "room_description": "Luxury room with premium amenities.",
                "capacity": 2,
                "price_per_night": 2500,
                "property_type": "motel",
                "extra_images": ["amenities22.jpg", "amenities23.jpg", "amenities24.jpg", "amenities25.jpg"],
                "amenities": ["Premium linens", "Mini-bar", "Complimentary toiletries", "Flat-screen TV with Netflix access",]
            },
            {
                "room_name": "Family Room",
                "room_image": "room15.jpg",
                "room_description": "Room suitable for a small family.",
                "capacity": 4,
                "price_per_night": 3500,
                "property_type": "motel",
                "extra_images": ["amenities29.jpg", "amenities26.jpg", "amenities27.jpg", "amenities28.jpg",],
                "amenities": ["Two double beds", "Dining table", "Microwave", "Mini fridge",]
            },
        ]

        print(f"MEDIA_ROOT: {settings.MEDIA_ROOT}")
        if not os.path.exists(settings.MEDIA_ROOT):
            os.makedirs(settings.MEDIA_ROOT)

        for room_info in room_data:

            room = BooklyRooms.objects.create(
                property = property,
                room_name = room_info["room_name"],
                room_type = room_info["property_type"],
                room_description = room_info["room_description"],
                price_per_night = room_info["price_per_night"],
                amenities = room_info["amenities"],
                capacity = room_info["capacity"]
            )
            
            main_img_path = os.path.join(settings.MEDIA_ROOT, 'static', room_info["room_image"])
            if os.path.exists(main_img_path):
                with open(main_img_path, 'rb') as img:
                    room.room_image.save(
                        room_info["room_image"],
                        File(img),
                        save=True
                    )
            else:
                print(f"Warning: Main image not found at {main_img_path}")

            for room_extra_img in room_info["extra_images"]:
                extra_img_path = os.path.join(settings.MEDIA_ROOT, 'static', room_extra_img)
                if os.path.exists(extra_img_path):
                    with open(extra_img_path, 'rb') as img:
                        RoomImage.objects.create(
                            room=room,
                            image=File(img, name=room_extra_img),
                            is_primary=False
                        )
                else:
                    print(f"Warning: Extra image not found at {extra_img_path}")
            
        print(f"Room populated successfully {len(room_data)}")
        
    except BooklyProperty.DoesNotExist:
        print("Property does not exist in the saved data")
    except Exception as e:
        print(f"An error occured: {str(e)}")

if __name__ == '__main__':
    populate_room()