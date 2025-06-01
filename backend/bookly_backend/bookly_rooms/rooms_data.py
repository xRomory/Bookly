#Insert URL of images in string format
import os
import django   

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "bookly_backend.settings")
django.setup()

hotel_sagot_rooms = [
    {
        "room_name": "Standard Room",
        "room_image": "room1.jpg",
        "room_description": "Cozy room with a queen bed and free Wi-Fi",
        "capacity": 2,
        "price_per_night": 1800, 
        "property_type": "hotel",
        "extra_images": ["", "", "", ""],
        "amenities": ["Free Wi-Fi", "Smart TV", "Air Conditioning", "Ensuite bathroom with hot shower"],
    },
    {
        "room_name": "Deluxe Room",
        "room_image": "room2.jpg",
        "room_description": "Spacious room with a king bed and city view.",
        "capacity": 2,
        "price_per_night": 2800, 
        "property_type": "hotel",
        "extra_images": ["", "", "", ""],
        "amenities": ["Free Wi-Fi", "Smart TV", "Air Conditioning", "Ensuite bathroom with hot shower"],
    },
    {
        "room_name": "Twin Room",
        "room_image": "room3.jpg",
        "room_description": "Room with two single beds for companions.",
        "capacity": 2,
        "price_per_night": 2200,
        "property_type": "hotel",
        "extra_images": ["", "", "", ""],
        "amenities": ["Two Single Beds", "Work Desk", "Complimentary Bottled Water", "Air Conditioning",]
    },
    {
        "room_name": "Family Suite",
        "room_image": "room4.jpg",
        "room_description": "Two-bedroom suite perfect for families.",
        "capacity": 4,
        "price_per_night": 3200,
        "property_type": "suite",
        "extra_images": ["roomImg.dining1, roomImg.dining2, roomImg.amenities1, roomImg.amenities2,"],
        "amenities": ["Two separate bedrooms", "Dining area", "Mini refrigerator", "Smart TV",]
    },
    {
        "room_name": "Executive Suite",
        "room_image": "room5.jpg",
        "room_description": "Suite with living area and workspace.",
        "capacity": 2,
        "price_per_night": 3500,
        "property_type": "suite",
        "extra_images": [""],
        "amenities": ["Separate Living Area", "Ergonomic work desk", "Nespresso Machine", "Bathrobe and slippers",]
    },
    {
        "room_name": "Presidential Suite",
        "room_image": "room6.jpg",
        "room_description": "Premium suite with luxury features.",
        "capacity": 2,
        "price_per_night": 4500,
        "property_type": "suite",
        "extra_images": [""],
        "amenities": ["Private balcony", "Jacuzzi tub", "Walk-in close", "Butler service (on request)",]
    },
]

mjgc_rooms = [
    {
        "room_name": "Studio Unit",
        "room_image": "room1.jpg",
        "room_description": "Modern studio with a kitchenette",
        "capacity": 2,
        "price_per_night": 2200,
        "property_type": "Apartment",
        "extra_images": [""],
        "amenities": ["Kitchenette with microwave", "Dining nook", "Smart lock entry", "Wi-Fi"]
    },
    {
        "room_name": "One-Bedroom Unit",
        "room_image": "room1.jpg",
        "room_description": "Spacious apartment with a separate living area.",
        "capacity": 2,
        "price_per_night": 3000,
        "property_type": "",
        "extra_images": [""],
        "amenities": ["Living area with sofa", "Full-size fridge", "Air conditioning in both rooms", "Large Smart TV"]
    },
    {
        "room_name": "Two-Bedroom Unit",
        "room_image": "room1.jpg",
        "room_description": "Perfect for small families or groups.",
        "capacity": 4,
        "price_per_night": 4200,
        "property_type": "Apartment",
        "extra_images": [""],
        "amenities": ["Two separate bedrooms", "Full kitchen", "Washing machine", "Dining area",]
    },
    {
        "room_name": "Penthouse",
        "room_image": "room1.jpg",
        "room_description": "Luxury apartment with a panoramic city view.",
        "capacity": 4,
        "price_per_night": 6500,
        "property_type": "Suite",
        "extra_images": [""],
        "amenities": ["Floor-to-ceiling windows", "Private balcony", "High-speed internet", "Entertainment system",]
    },
    {
        "room_name": "Deluxe Studio",
        "room_image": "room1.jpg",
        "room_description": "Premium studio with a balcony.",
        "capacity": 2,
        "price_per_night": 2800,
        "property_type": "Apartment",
        "extra_images": [""],
        "amenities": ["Balcony with city view", "Queen bed", "Kitchenette with cookware", "Air conditioning",]
    },
]

buroltel_rooms = [
    {
        "room_name": "Budget Room",
        "room_image": "",
        "room_description": "Simple room with a single bed.",
        "capacity": 1,
        "price_per_night": 1000,
        "property_type": "motel",
        "extra_images": [""],
        "amenities": ["Single bed", "Wall fan or basic A/C", "Desk", "Rainfall shower",]
    },
    {
        "room_name": "Economy Room",
        "room_image": "",
        "room_description": "Affordable room with basic amenities.",
        "capacity": 2,
        "price_per_night": 1500,
        "property_type": "motel",
        "extra_images": [""],
        "amenities": ["Double bed", "Flat-screen TV", "Basic toiletries", "Wi-Fi",]
    },
    {
        "room_name": "Standard Room",
        "room_image": "",
        "room_description": "Room with a double bed and standard facilities.",
        "capacity": 2,
        "price_per_night": 1800,
        "property_type": "motel",
        "extra_images": [""],
        "amenities": ["Ensuite bathroom", "Closet or hanging space", "Flat-screen TV", "Air conditioning",]
    },
    {
        "room_name": "VIP Room",
        "room_image": "",
        "room_description": "Luxury room with premium amenities.",
        "capacity": 2,
        "price_per_night": 2500,
        "property_type": "motel",
        "extra_images": [""],
        "amenities": ["Premium linens", "Mini-bar", "Complimentary toiletries", "Flat-screen TV with Netflix access",]
    },
    {
        "room_name": "Family Room",
        "room_image": "",
        "room_description": "Room suitable for a small family.",
        "capacity": 4,
        "price_per_night": 3500,
        "property_type": "motel",
        "extra_images": [""],
        "amenities": ["Two double beds", "Dining table", "Microwave", "Mini fridge",]
    },
]

viktor_court_rooms = [
    {
        "room_name": "Executive Room",
        "room_image": "room16.jpg",
        "room_description": "Spacious room with work desk and WiFi.",
        "capacity": 2,
        "price_per_night": 2200,
        "property_type": "motel",
        "extra_images": [""],
        "amenities": ["Free Wi-Fi", "Work Desk", "Air Conditioning", "LED TV",]
    },
    {
        "room_name": "Luxury Room",
        "room_image": "room17.jpg",
        "room_description": "Luxury room with a king-size bed.",
        "capacity": 2,
        "price_per_night": 2800,
        "property_type": "motel",
        "extra_images": [""],
        "amenities": ["King-size Bed", "Air Conditioning", "Private Bathroom", "Complimentary Toiletries",]
    },
    {
        "room_name": "Business Suite",
        "room_image": "room18.jpg",
        "room_description": "Suite ideal for business travelers.",
        "capacity": 2,
        "price_per_night": 3500,
        "property_type": "Suite",
        "extra_images": [""],
        "amenities": ["Separate Living Area", "High-Speed Wi-Fi", "Work Desk", "Mini Refrigerator",]
    },
    {
        "room_name": "Queen Room",
        "room_image": "room19.jpg",
        "room_description": "Room with a queen-size bed.",
        "capacity": 2,
        "price_per_night": 1800,
        "property_type": "motel",
        "extra_images": [""],
        "amenities": ["Queen Bed", "LED TV", "Air Conditioning", "Private Bathroom",]
    },
    {
        "room_name": "Bunk Room",
        "room_image": "room20.jpg",
        "room_description": "Room with bunk beds for groups.",
        "capacity": 4,
        "price_per_night": 2000,
        "property_type": "motel",
        "extra_images": [""],
        "amenities": ["Bunk Beds", "Shared Bathroom", "Air Conditioning", "Lockers",]
    },
]

oceanviews_rooms = [
    {
        "room_name": "Oceanfront Villa",
        "room_image": "room21.jpg",
        "room_description": "Private villa with an ocean view.",
        "capacity": 4,
        "price_per_night": 8000,
        "property_type": "villa",
        "extra_images": [""],
        "amenities": ["Ocean View Terrace", "Private Entrance", "Outdoor Seating Area", "Air Conditioning",]
    },
    {
        "room_name": "Garden Villa",
        "room_image": "room22.jpg",
        "room_description": "Villa with a beautiful garden view.",
        "capacity": 4,
        "price_per_night": 6500,
        "property_type": "villa",
        "extra_images": [""],
        "amenities": ["Garden View", "Patio", "Mini Kitchen", "Private Bathroom",]
    },
    {
        "room_name": "Luxury Villa",
        "room_image": "room23.jpg",
        "room_description": "Spacious villa with a pool.",
        "capacity": 6,
        "price_per_night": 12000,
        "property_type": "villa",
        "extra_images": [""],
        "amenities": ["Private Pool", "Large Living Space", "Smart TV", "Bathtub",]
    },
    {
        "room_name": "Deluxe Villa",
        "room_image": "room24.jpg",
        "room_description": "Luxury villa with top-tier amenities.",
        "capacity": 6,
        "price_per_night": 14000,
        "property_type": "villa",
        "extra_images": [""],
        "amenities": ["King-size Bed", "High-end Interior", "Private Pool", "BBQ Facilities",]
    },
    {
        "room_name": "Junior Suite",
        "room_image": "room25.jpg",
        "room_description": "Cozy suite ideal for a weekend getaway.",
        "capacity": 2,
        "price_per_night": 5000,
        "property_type": "suite",
        "extra_images": [""],
        "amenities": ["Cozy Seating Area", "Air Conditioning", "Queen Bed", "Flat-Screen TV",]
    },
]

metropolis_rooms = [
    {
        "room_name": "Superior Room",
        "room_image": "room26.jpg",
        "room_description": "Room with a queen bed and city view.",
        "capacity": 2,
        "price_per_night": 2500,
        "property_type": "hotel",
        "extra_images": [""],
        "amenities": ["City View Window", "Mini Fridge", "Queen Bed", "Air Conditioning",]
    },
    {
        "room_name": "Executive Room",
        "room_image": "room27.jpg",
        "room_description": "Room with additional work and relaxation space.",
        "capacity": 2,
        "price_per_night": 3200,
        "property_type": "hotel",
        "extra_images": [""],
        "amenities": ["Workstation", "Executive Chair", "Coffee Maker", "Free Wi-Fi",]
    },
    {
        "room_name": "Grand Suite",
        "room_image": "room28.jpg",
        "room_description": "Luxury suite with a living room.",
        "capacity": 2,
        "price_per_night": 4500,
        "property_type": "suite",
        "extra_images": [""],
        "amenities": ["Living Area", "King-size Bed", "Bathtub", "Smart TV",]
    },
    {
        "room_name": "Twin Room",
        "room_image": "room29.jpg",
        "room_description": "Room with two single beds.",
        "capacity": 2,
        "price_per_night": 2000,
        "property_type": "hotel",
        "extra_images": [""],
        "amenities": ["Two Single Beds", "Closet", "LED TV", "Air Conditioning",]
    },
    {
        "room_name": "Junior Suite",
        "room_image": "room30.jpg",
        "room_description": "Suite for a small group or couple.",
        "capacity": 2,
        "price_per_night": 3200,
        "property_type": "suite",
        "extra_images": [""],
        "amenities": ["Lounge Area", "Queen Bed", "Workspace", "Air Conditioning",]
    },
]

sunset_bay_rooms = [
    {
        "room_name": "Beachfront Room",
        "room_image": "room31.jpg",
        "room_description": "Room with ocean view and private terrace.",
        "capacity": 2,
        "price_per_night": 5500,
        "property_type": "resort",
        "extra_images": [""],
        "amenities": ["Oceanfront Balcony", "Sun Loungers", "Mini Bar", "Air Conditioning",]
    },
    {
        "room_name": "Oceanview Suite",
        "room_image": "room32.jpg",
        "room_description": "Luxurious suite with panoramic sea view.",
        "capacity": 2,
        "price_per_night": 7500,
        "property_type": "resort",
        "extra_images": [""],
        "amenities": ["Floor-to-Ceiling Windows", "Spa Bath", "Smart TV", "Room Service",]
    },
    {
        "room_name": "Garden View Room",
        "room_image": "room33.jpg",
        "room_description": "Room overlooking the lush resort gardens.",
        "capacity": 2,
        "price_per_night": 4500,
        "property_type": "resort",
        "extra_images": [""],
        "amenities": ["Garden-facing Balcony", "Outdoor Table & Chairs", "Flat-Screen TV", "Wi-Fi",]
    },
    {
        "room_name": "Poolside Villa",
        "room_image": "room34.jpg",
        "room_description": "Villa located next to the pool.",
        "capacity": 4,
        "price_per_night": 8000,
        "property_type": "resort",
        "extra_images": [""],
        "amenities": ["Private Patio", "Pool Access", "Lounge Furniture", "Kitchenette",]
    },
    {
        "room_name": "Luxury Villa",
        "room_image": "room35.jpg",
        "room_description": "High-end villa with private pool.",
        "capacity": 6,
        "price_per_night": 12000,
        "property_type": "resort",
        "extra_images": [""],
        "amenities": ["Private Infinity Pool", "Butler Service", "Full Kitchen", "Luxury Bathroom",]
    },
]

tagaytay_heights_rooms = [
    {
        "room_name": "Superior Tagaytay View",
        "room_image": "room36.jpg",
        "room_description": "Room with a stunning view of Taal Volcano.",
        "capacity": 2,
        "price_per_night": 5000,
        "property_type": "hotel",
        "extra_images": [""],
        "amenities": ["Floor-to-ceiling windows", "Coffee Maker", "Free Wi-Fi", "Air Conditioning",]
    },
    {
        "room_name": "Deluxe Balcony Room",
        "room_image": "room37.jpg",
        "room_description": "Room with a private balcony overlooking the mountains.",
        "capacity": 2,
        "price_per_night": 6000,
        "property_type": "hotel",
        "extra_images": [""],
        "amenities": ["Private Balcony", "Mountain View", "Flat-Screen TV", "Mini Bar",]
    },
    {
        "room_name": "Presidential Suite",
        "room_image": "room38.jpg",
        "room_description": "Luxury suite with a separate living area and a full view of the lake.",
        "capacity": 2,
        "price_per_night": 8500,
        "property_type": "suite",
        "extra_images": [""],
        "amenities": ["Separate Living Area", "Full Lake View", "Luxury Bathroom", "Room Service",]
    },
    {
        "room_name": "Mountain View Villa",
        "room_image": "room39.jpg",
        "room_description": "Private villa with breathtaking mountain views.",
        "capacity": 4,
        "price_per_night": 10000,
        "property_type": "villa",
        "extra_images": [""],
        "amenities": ["Private Villa", "Mountain View Terrace", "Kitchenette", "Smart TV",]
    },
    {
        "room_name": "Garden View Suite",
        "room_image": "room40.jpg",
        "room_description": "Room with access to the hotel’s lush garden.",
        "capacity": 2,
        "price_per_night": 4500,
        "property_type": "suite",
        "extra_images": [""],
        "amenities": ["Garden Access", "Patio Seating", "Free Wi-Fi", "King-Size Bed",]
    },
    {
        "room_name": "Executive Suite",
        "room_image": "room41.jpg",
        "room_description": "Room designed for business travelers with added workspaces.",
        "capacity": 2,
        "price_per_night": 5000,
        "property_type": "suite",
        "extra_images": [""],
        "amenities": ["Work Desk", "Coffee Machine", "Fast Wi-Fi", "Ergonomic Chair",]
    },
    {
        "room_name": "Taal View Villa",
        "room_image": "room42.jpg",
        "room_description": "Private villa with a panoramic view of Taal Volcano.",
        "capacity": 4,
        "price_per_night": 9500,
        "property_type": "villa",
        "extra_images": [""],
        "amenities": ["Panoramic Taal View", "Private Deck", "Luxury Linens", "Mini Kitchen",]
    },
]

mountain_escape_rooms = [
    {
        "room_name": "Mountainview Room",
        "room_image": "room43.jpg",
        "room_description": "Room with a breathtaking view of the mountains.",
        "capacity": 2,
        "price_per_night": 3500,
        "property_type": "lodge",
        "extra_images": [""],
        "amenities": ["Scenic Windows", "Heating", "Soft Lighting", "Queen Bed",]
    },
    {
        "room_name": "Cabin",
        "room_image": "room44.jpg",
        "room_description": "Wooden cabin with rustic charm.",
        "capacity": 4,
        "price_per_night": 5000,
        "property_type": "lodge",
        "extra_images": [""],
        "amenities": ["Wooden Interior", "Porch Area", "Fireplace", "Kitchenette",]
    },
    {
        "room_name": "Family Cabin",
        "room_image": "room45.jpg",
        "room_description": "Cabin for families with children.",
        "capacity": 6,
        "price_per_night": 8000,
        "property_type": "lodge",
        "extra_images": [""],
        "amenities": ["Bunk Beds", "Living Area", "Kids’ Board Games", "Kitchen",]
    },
    {
        "room_name": "Honeymoon Suite",
        "room_image": "room46.jpg",
        "room_description": "Romantic suite for newlyweds.",
        "capacity": 2,
        "price_per_night": 5500,
        "property_type": "suite",
        "extra_images": [""],
        "amenities": ["Romantic Setup", "Private Balcony", "Bathtub", "Room Service",]
    },
    {
        "room_name": "Mountain View Villa",
        "room_image": "room47.jpg",
        "room_description": "Private villa with panoramic mountain views.",
        "capacity": 4,
        "price_per_night": 8000,
        "property_type": "villa",
        "extra_images": [""],
        "amenities": ["Elevated Deck", "Lounge Chairs", "Private Kitchen", "Panoramic Views",]
    },
    {
        "room_name": "Treehouse",
        "room_image": "room48.jpg",
        "room_description": "Unique treehouse stay with nature vibes.",
        "capacity": 2,
        "price_per_night": 3000,
        "property_type": "lodge",
        "extra_images": [""],
        "amenities": ["Elevated View", "Eco-Friendly Build", "Hammock or Swing", "Balcony",]
    },
]

luxe_inn_rooms = [
    {
        "room_name": "Standard Inn Room",
        "room_image": "room49.jpg",
        "room_description": "Basic room with queen bed and amenities.",
        "capacity": 2,
        "price_per_night": 2200,
        "property_type": "inn",
        "extra_images": [""],
        "amenities": ["Queen Bed", "Flat-Screen TV", "Air Conditioning", "Free Wi-Fi",]
    },
    {
        "room_name": "Deluxe Room",
        "room_image": "room50.jpg",
        "room_description": "Room with upgraded furnishings and view.",
        "capacity": 2,
        "price_per_night": 2800,
        "property_type": "inn",
        "extra_images": [""],
        "amenities": ["City View", "Sofa Chair", "Complimentary Toiletries", "Coffee Maker",]
    },
    {
        "room_name": "Premium Inn Room",
        "room_image": "room51.jpg",
        "room_description": "Room with luxury features and city view.",
        "capacity": 2,
        "price_per_night": 3500,
        "property_type": "inn",
        "extra_images": [""],
        "amenities": ["Premium Linens", "Rain Shower", "Smart TV", "Air Conditioning",]
    },
    {
        "room_name": "Penthouse Suite",
        "room_image": "room52.jpg",
        "room_description": "Top-floor suite with panoramic views and premium facilities.",
        "capacity": 2,
        "price_per_night": 7000,
        "property_type": "suite",
        "extra_images": [""],
        "amenities": ["Floor-to-Ceiling Windows", "Private Lounge", "Cityscape View", "Bathtub",]
    },
    {
        "room_name": "Family Suite",
        "room_image": "room53.jpg",
        "room_description": "Room designed for family stays with extra space.",
        "capacity": 4,
        "price_per_night": 6000,
        "property_type": "suite",
        "extra_images": [""],
        "amenities": ["Extra Beds", "Dining Space", "Two TVs", "Board Games",]
    },
]