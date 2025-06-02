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
        property = BooklyProperty.objects.get(property_name="Metropolis Heights")

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
        #         "extra_images": ["living1.jpg", "living2.jpg", "bath10.jpg", "bath11.jpg"],
        #         "amenities": ["Kitchenette with microwave", "Dining nook", "Smart lock entry", "Wi-Fi"]
        #     },
        #     {
        #         "room_name": "One-Bedroom Unit",
        #         "room_image": "room8.jpg",
        #         "room_description": "Spacious apartment with a separate living area.",
        #         "capacity": 2,
        #         "price_per_night": 3000,
        #         "property_type": "apartment",
        #         "extra_images": ["living3.jpg", "living4.jpg", "bath12.jpg", "bath13.jpg"],
        #         "amenities": ["Living area with sofa", "Full-size fridge", "Air conditioning in both rooms", "Large Smart TV"]
        #     },
        #     {
        #         "room_name": "Two-Bedroom Unit",
        #         "room_image": "room9.jpg",
        #         "room_description": "Perfect for small families or groups.",
        #         "capacity": 4,
        #         "price_per_night": 4200,
        #         "property_type": "apartment",
        #         "extra_images": ["living5.jpg", "living6.jpg", "things4.jpg", "things4.jpg"],
        #         "amenities": ["Two separate bedrooms", "Full kitchen", "Washing machine", "Dining area",]
        #     },
        #     {
        #         "room_name": "Penthouse",
        #         "room_image": "room10.jpg",
        #         "room_description": "Luxury apartment with a panoramic city view.",
        #         "capacity": 4,
        #         "price_per_night": 6500,
        #         "property_type": "suite",
        #         "extra_images": ["amenities9.jpg", "living13.jpg", "living14.jpg", "living15.jpg"],
        #         "amenities": ["Floor-to-ceiling windows", "Private balcony", "High-speed internet", "Entertainment system",]
        #     },
        #     {
        #         "room_name": "Deluxe Studio",
        #         "room_image": "room11.jpg",
        #         "room_description": "Premium studio with a balcony.",
        #         "capacity": 2,
        #         "price_per_night": 2800,
        #         "property_type": "apartment",
        #         "extra_images": ["living7.jpg", "living8.jpg", "living9.jpg", "living10.jpg"],
        #         "amenities": ["Balcony with city view", "Queen bed", "Kitchenette with cookware", "Air conditioning",]
        #     },
        # ]

        # room_data = [
        #     {
        #         "room_name": "Budget Room",
        #         "room_image": "room12.jpg",
        #         "room_description": "Simple room with a single bed.",
        #         "capacity": 2,
        #         "price_per_night": 1000,
        #         "property_type": "motel",
        #         "extra_images": ["living11.jpg", "living12.jpg", "amenities10.jpg", "amenities11.jpg",],
        #         "amenities": ["Single bed", "Wall fan or basic A/C", "Desk", "Rainfall shower",]
        #     },
        #     {
        #         "room_name": "Standard Room",
        #         "room_image": "room13.jpg",
        #         "room_description": "Room with a double bed and standard facilities.",
        #         "capacity": 2,
        #         "price_per_night": 1800,
        #         "property_type": "motel",
        #         "extra_images": ["amenities12.jpg", "amenities13.jpg", "amenities14.jpg", "amenities15.jpg"],
        #         "amenities": ["Ensuite bathroom", "Closet or hanging space", "Flat-screen TV", "Air conditioning",]
        #     },
        #     {
        #         "room_name": "Economy Room",
        #         "room_image": "room14.jpg",
        #         "room_description": "Affordable room with basic amenities.",
        #         "capacity": 2,
        #         "price_per_night": 1500,
        #         "property_type": "motel",
        #         "extra_images": ["amenities16.jpg", "amenities17.jpg", "bath14.jpg", "bath15.jpg"],
        #         "amenities": ["Double bed", "Flat-screen TV", "Basic toiletries", "Wi-Fi"]
        #     },
        #     {
        #         "room_name": "VIP Room",
        #         "room_image": "room15.jpg",
        #         "room_description": "Luxury room with premium amenities.",
        #         "capacity": 2,
        #         "price_per_night": 2500,
        #         "property_type": "motel",
        #         "extra_images": ["amenities18.jpg", "amenities19.jpg", "amenities20.jpg", "amenities21.jpg"],
        #         "amenities": ["Premium linens", "Mini-bar", "Complimentary toiletries", "Flat-screen TV with Netflix access",]
        #     },
        #     {
        #         "room_name": "Family Room",
        #         "room_image": "room16.jpg",
        #         "room_description": "Room suitable for a small family.",
        #         "capacity": 4,
        #         "price_per_night": 3500,
        #         "property_type": "motel",
        #         "extra_images": ["amenities22.jpg", "amenities23.jpg", "amenities24.jpg", "amenities25.jpg",],
        #         "amenities": ["Two double beds", "Dining table", "Microwave", "Mini fridge",]
        #     },
        # ]

        # room_data = [
        #     {
        #         "room_name": "Executive Room",
        #         "room_image": "room17.jpg",
        #         "room_description": "Spacious room with work desk and WiFi.",
        #         "capacity": 2,
        #         "price_per_night": 2200,
        #         "property_type": "motel",
        #         "extra_images": ["things5.jpg", "things6.jpg", "amenities26.jpg", "amenities27.jpg"],
        #         "amenities": ["Free Wi-Fi", "Work Desk", "Air Conditioning", "LED TV",]
        #     },
        #     {
        #         "room_name": "Luxury Room",
        #         "room_image": "room18.jpg",
        #         "room_description": "Luxury room with a king-size bed.",
        #         "capacity": 2,
        #         "price_per_night": 2800,
        #         "property_type": "motel",
        #         "extra_images": ["amenities28.jpg", "amenities29.jpg", "amenities30.jpg", "amenities31.jpg",],
        #         "amenities": ["King-size Bed", "Air Conditioning", "Private Bathroom", "Complimentary Toiletries",]
        #     },
        #     {
        #         "room_name": "Business Suite",
        #         "room_image": "room19.jpg",
        #         "room_description": "Suite ideal for business travelers.",
        #         "capacity": 2,
        #         "price_per_night": 3500,
        #         "property_type": "Suite",
        #         "extra_images": ["amenities32.jpg", "bath16.jpg", "garden1.jpg", "garden2.jpg",],
        #         "amenities": ["Separate Living Area", "High-Speed Wi-Fi", "Work Desk", "Mini Refrigerator",]
        #     },
        #     {
        #         "room_name": "Queen Room",
        #         "room_image": "room20.jpg",
        #         "room_description": "Room with a queen-size bed.",
        #         "capacity": 2,
        #         "price_per_night": 1800,
        #         "property_type": "motel",
        #         "extra_images": ["amenities33.jpg", "amenities34.jpg", "amenities35.jpg", "amenities36.jpg",],
        #         "amenities": ["Queen Bed", "LED TV", "Air Conditioning", "Private Bathroom",]
        #     },
        #     {
        #         "room_name": "Bunk Room",
        #         "room_image": "room21.jpg",
        #         "room_description": "Room with bunk beds for groups.",
        #         "capacity": 4,
        #         "price_per_night": 2000,
        #         "property_type": "motel",
        #         "extra_images": ["amenities37.jpg", "amenities38.jpg", "amenities39.jpg", "amenities40.jpg",],
        #         "amenities": ["Bunk Beds", "Shared Bathroom", "Air Conditioning", "Lockers",]
        #     },
        # ]

        # room_data = [
        #     {
        #         "room_name": "Oceanfront Villa",
        #         "room_image": "room22.jpg",
        #         "room_description": "Private villa with an ocean view.",
        #         "capacity": 4,
        #         "price_per_night": 8000,
        #         "property_type": "villa",
        #         "extra_images": ["amenities41.jpg", "amenities42.jpg", "pool1.jpg", "pool2.jpg"],
        #         "amenities": ["Ocean View Terrace", "Private Entrance", "Outdoor Seating Area", "Air Conditioning",]
        #     },
        #     {
        #         "room_name": "Garden Villa",
        #         "room_image": "room23.jpg",
        #         "room_description": "Villa with a beautiful garden view.",
        #         "capacity": 4,
        #         "price_per_night": 6500,
        #         "property_type": "villa",
        #         "extra_images": ["garden1.jpg", "garden2.jpg", "pool3.jpg", "pool4.jpg"],
        #         "amenities": ["Garden View", "Patio", "Mini Kitchen", "Private Bathroom",]
        #     },
        #     {
        #         "room_name": "Luxury Villa",
        #         "room_image": "room24.jpg",
        #         "room_description": "Spacious villa with a pool.",
        #         "capacity": 6,
        #         "price_per_night": 12000,
        #         "property_type": "villa",
        #         "extra_images": ["amenities43.jpg", "amenities44.jpg", "pool5.jpg", "pool6.jpg"],
        #         "amenities": ["Private Pool", "Large Living Space", "Smart TV", "Bathtub",]
        #     },
        #     {
        #         "room_name": "Deluxe Villa",
        #         "room_image": "room25.jpg",
        #         "room_description": "Luxury villa with top-tier amenities.",
        #         "capacity": 6,
        #         "price_per_night": 14000,
        #         "property_type": "villa",
        #         "extra_images": ["jacuzzi1.jpg", "jacuzzi2.jpg", "pool7.jpg", "pool8.jpg"],
        #         "amenities": ["King-size Bed", "High-end Interior", "Private Pool", "BBQ Facilities",]
        #     },
        #     {
        #         "room_name": "Junior Suite",
        #         "room_image": "room26.jpg",
        #         "room_description": "Cozy suite ideal for a weekend getaway.",
        #         "capacity": 2,
        #         "price_per_night": 5000,
        #         "property_type": "suite",
        #         "extra_images": ["garden3.jpg", "garden4.jpg", "pool9.jpg", "pool10.jpg"],
        #         "amenities": ["Cozy Seating Area", "Air Conditioning", "Queen Bed", "Flat-Screen TV",]
        #     },
        # ]

        room_data = [
            {
                "room_name": "Superior Room",
                "room_image": "room27.jpg",
                "room_description": "Room with a queen bed and city view.",
                "capacity": 2,
                "price_per_night": 2500,
                "property_type": "hotel",
                "extra_images": ["amenities45.jpg", "amenities46.jpg", "amenities47.jpg", "amenities48.jpg",],
                "amenities": ["City View Window", "Mini Fridge", "Queen Bed", "Air Conditioning",]
            },
            {
                "room_name": "Executive Room",
                "room_image": "room28.jpg",
                "room_description": "Room with additional work and relaxation space.",
                "capacity": 2,
                "price_per_night": 3200,
                "property_type": "hotel",
                "extra_images": ["amenities49.jpg", "amenities50.jpg", "amenities51.jpg", "amenities52.jpg",],
                "amenities": ["Workstation", "Executive Chair", "Coffee Maker", "Free Wi-Fi",]
            },
            {
                "room_name": "Grand Suite",
                "room_image": "room29.jpg",
                "room_description": "Luxury suite with a living room.",
                "capacity": 2,
                "price_per_night": 4500,
                "property_type": "suite",
                "extra_images": ["amenities53.jpg", "amenities54.jpg", "amenities55.jpg", "amenities56.jpg",],
                "amenities": ["Living Area", "King-size Bed", "Bathtub", "Smart TV",]
            },
            {
                "room_name": "Junior Suite",
                "room_image": "room31.jpg",
                "room_description": "Suite for a small group or couple.",
                "capacity": 2,
                "price_per_night": 3200,
                "property_type": "suite",
                "extra_images": ["amenities57.jpg", "amenities58.jpg", "amenities59.jpg", "amenities60.jpg",],
                "amenities": ["Lounge Area", "Queen Bed", "Workspace", "Air Conditioning",]
            },
        ]

        # room_data = [
        #     {
        #         "room_name": "Beachfront Room",
        #         "room_image": "room32.jpg",
        #         "room_description": "Room with ocean view and private terrace.",
        #         "capacity": 2,
        #         "price_per_night": 5500,
        #         "property_type": "resort",
        #         "extra_images": ["resort1.jpg", "resort2.jpg", "resort3.jpg", "resort4.jpg",],
        #         "amenities": ["Oceanfront Balcony", "Sun Loungers", "Mini Bar", "Air Conditioning",]
        #     },
        #     {
        #         "room_name": "Oceanview Suite",
        #         "room_image": "room33.jpg",
        #         "room_description": "Luxurious suite with panoramic sea view.",
        #         "capacity": 2,
        #         "price_per_night": 7500,
        #         "property_type": "resort",
        #         "extra_images": ["resort5.jpg", "resort6.jpg", "resort7.jpg", "resort8.jpg",],
        #         "amenities": ["Floor-to-Ceiling Windows", "Spa Bath", "Smart TV", "Room Service",]
        #     },
        #     {
        #         "room_name": "Garden View Room",
        #         "room_image": "room34.jpg",
        #         "room_description": "Room overlooking the lush resort gardens.",
        #         "capacity": 2,
        #         "price_per_night": 4500,
        #         "property_type": "resort",
        #         "extra_images": ["resort9.jpg", "resort10.jpg", "resort11.jpg", "resort12.jpg",],
        #         "amenities": ["Garden-facing Balcony", "Outdoor Table & Chairs", "Flat-Screen TV", "Wi-Fi",]
        #     },
        #     {
        #         "room_name": "Poolside Villa",
        #         "room_image": "room35.jpg",
        #         "room_description": "Villa located next to the pool.",
        #         "capacity": 4,
        #         "price_per_night": 8000,
        #         "property_type": "resort",
        #         "extra_images": ["resort13.jpg", "resort14.jpg", "resort15.jpg", "resort16.jpg",],
        #         "amenities": ["Private Patio", "Pool Access", "Lounge Furniture", "Kitchenette",]
        #     },
        #     {
        #         "room_name": "Luxury Villa",
        #         "room_image": "resort21.jpg",
        #         "room_description": "High-end villa with private pool.",
        #         "capacity": 6,
        #         "price_per_night": 12000,
        #         "property_type": "resort",
        #         "extra_images": ["resort17.jpg", "resort18.jpg", "resort19.jpg", "resort20.jpg",],
        #         "amenities": ["Private Infinity Pool", "Butler Service", "Full Kitchen", "Luxury Bathroom",]
        #     },
        # ]

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