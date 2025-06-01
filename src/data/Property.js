import { brandLogo, hotelImg, roomImg } from "../assets/images/assets.js";

const Property = {
  property_brands: [
    {
      key: 1,
      name: "Hotel Sagot",
      logo: brandLogo.brandOne,
      category: "Hotel",
      address: "123 Aurora Blvd, Quezon City, Metro Manila",
      hotel_description:
        "A luxurious hotel offering a wide range of amenities, from cozy rooms to presidential suites, in the heart of Quezon City.",
      phone: "+63 2 8123 4567",
      email: "contact@hotelsagot.ph",
      image: hotelImg.hotel1,
      location: {
        latitude: 14.6182,
        longitude: 121.0537,
      },
      room_types: [
        {
          name: "Standard Room",
          room_image: roomImg.room1,
          description: "Cozy room with a queen bed and free WiFi.",
          capacity: 2,
          price_per_night: 1800,
          property_type: "Hotel",
          extra_images: [roomImg.bath1, roomImg.bath2, roomImg.things1, roomImg.things2],
          amenitites: ["Free Wi-Fi", "Smart TV", "Air Conditioning", "Ensuite bathroom with hot shower",]
        },
        {
          name: "Deluxe Room",
          room_image: roomImg.room2,
          description: "Spacious room with a king bed and city view.",
          capacity: 2,
          price_per_night: 2400,
          property_type: "Hotel",
          extra_images: [roomImg.bath3, roomImg.bath4, roomImg.things3, roomImg.things4],
          amenitites: ["City View Window", "King-sized Bed", "Coffee and Tea maker", "Rainfall Shower",]
        },
        {
          name: "Twin Room",
          room_image: roomImg.room3,
          description: "Room with two single beds for companions.",
          capacity: 2,
          price_per_night: 2200,
          property_type: "Hotel",
          extra_images: [roomImg.bath5, roomImg.bath6, roomImg.desk1, roomImg.desk2],
          amenitites: ["Two Single Beds", "Work Desk", "Complimentary Bottled Water", "Air Conditioning",]
        },
        {
          name: "Family Suite",
          room_image: roomImg.room4,
          description: "Two-bedroom suite perfect for families.",
          capacity: 4,
          price_per_night: 3200,
          property_type: "Hotel",
          extra_images: [roomImg.dining1, roomImg.dining2, roomImg.amenities1, roomImg.amenities2,],
          amenitites: ["Two separate bedrooms", "Dining area", "Mini refrigerator", "Smart TV",]
        },
        {
          name: "Executive Suite",
          room_image: roomImg.room5,
          description: "Suite with living area and workspace.",
          capacity: 2,
          price_per_night: 3500,
          property_type: "Hotel",
          extra_images: [roomImg.bath7, roomImg.bath8, roomImg.amenities3, roomImg.amenities4,],
          amenitites: ["Separate Living Area", "Ergonomic work desk", "Nespresso Machine", "Bathrobe and slippers",]
        },
        {
          name: "Presidential Suite",
          room_image: roomImg.room6,
          description: "Premium suite with luxury features.",
          capacity: 2,
          price_per_night: 4500,
          property_type: "Hotel",
          extra_images: [roomImg.bath9, roomImg.bath10, roomImg.jacuzzi1, roomImg.butler1,],
          amenitites: ["Private balcony", "Jacuzzi tub", "Walk-in close", "Butler service (on request)",]
        },
      ],
    },
    {
      key: 2,
      name: "MJGC Residences",
      logo: brandLogo.brandTwo,
      category: "Apartment",
      address: "456 Kalayaan Ave, Makati, Metro Manila",
      hotel_description:
        "A modern apartment complex offering spacious units and luxurious penthouses in Makati.",
      phone: "+63 2 8123 4567",
      email: "info@mjgcresidences.ph",
      image: hotelImg.hotel2,
      location: {
        latitude: 14.5535,
        longitude: 121.0245,
      },
      room_types: [
        {
          name: "Studio Unit",
          room_image: roomImg.room1,
          description: "Modern studio with a kitchenette.",
          capacity: 2,
          price_per_night: 2200,
          property_type: "Apartment",
          extra_images: [roomImg.bath7, roomImg.bath8, roomImg.amenities3, roomImg.amenities4,],
          amenitites: ["Kitchenette with microwave", "Dining nook", "Smart lock entry", "Wi-Fi",]
        },
        {
          name: "One-Bedroom Unit",
          room_image: roomImg.room2,
          description: "Spacious apartment with a separate living area.",
          capacity: 2,
          price_per_night: 3000,
          property_type: "Apartment",
          extra_images: [roomImg.bath3, roomImg.bath4, roomImg.things3, roomImg.things4],
          amenitites: ["Living area with sofa", "Full-size fridge", "Air conditioning in both rooms", "Large Smart TV",]
        },
        {
          name: "Two-Bedroom Unit",
          room_image: roomImg.room3,
          description: "Perfect for small families or groups.",
          capacity: 4,
          price_per_night: 4200,
          property_type: "Apartment",
          extra_images: [roomImg.dining1, roomImg.dining2, roomImg.amenities1, roomImg.amenities2,],
          amenitites: ["Two separate bedrooms", "Full kitchen", "Washing machine", "Dining area",]
        },
        {
          name: "Penthouse",
          room_image: roomImg.room11,
          description: "Luxury apartment with a panoramic city view.",
          capacity: 4,
          price_per_night: 6500,
          property_type: "Suite",
          extra_images: [roomImg.amenities5, roomImg.amenities6, roomImg.amenities7, roomImg.bath10,],
          amenitites: ["Floor-to-ceiling windows", "Private balcony", "High-speed internet", "Entertainment system",]
        },
        {
          name: "Deluxe Studio",
          room_image: roomImg.room7,
          description: "Premium studio with a balcony.",
          capacity: 2,
          price_per_night: 2800,
          property_type: "Apartment",
          extra_images: [roomImg.things5, roomImg.things6, roomImg.things3, roomImg.amenities8,],
          amenitites: ["Balcony with city view", "Queen bed", "Kitchenette with cookware", "Air conditioning",]
        },
      ],
    },
    {
      key: 3,
      name: "Buroltel",
      logo: brandLogo.brandThree,
      category: "Motel",
      address: "789 Rizal Ave, Manila, Metro Manila",
      hotel_description:
        "A budget-friendly motel offering simple rooms, including dormitory-style and VIP options in Manila.",
      phone: "+63 2 8123 4567",
      email: "contact@buroltel.ph",
      image: hotelImg.hotel3,
      location: {
        latitude: 14.5899,
        longitude: 120.9797,
      },
      room_types: [
        {
          name: "Budget Room",
          room_image: roomImg.room1,
          description: "Simple room with a single bed.",
          capacity: 1,
          price_per_night: 1000,
          property_type: "Motel",
          extra_images: [roomImg.bath1, roomImg.bath2, roomImg.things1, roomImg.things2],
          amenitites: ["Single bed", "Wall fan or basic A/C", "Desk", "Rainfall shower",]
        },
        {
          name: "Economy Room",
          room_image: roomImg.room2,
          description: "Affordable room with basic amenities.",
          capacity: 2,
          price_per_night: 1500,
          property_type: "Motel",
          extra_images: [roomImg.bath5, roomImg.bath6, roomImg.desk1, roomImg.desk2],
          amenitites: ["Double bed", "Flat-screen TV", "Basic toiletries", "Wi-Fi",]
        },
        {
          name: "Standard Room",
          room_image: roomImg.room3,
          description: "Room with a double bed and standard facilities.",
          capacity: 2,
          price_per_night: 1800,
          property_type: "Motel",
          extra_images: [roomImg.dining1, roomImg.dining2, roomImg.amenities1, roomImg.amenities2,],
          amenitites: ["Ensuite bathroom", "Closet or hanging space", "Flat-screen TV", "Air conditioning",]
        },
        {
          name: "VIP Room",
          room_image: roomImg.room4,
          description: "Luxury room with premium amenities.",
          capacity: 2,
          price_per_night: 2500,
          property_type: "Motel",
          extra_images: [roomImg.things5, roomImg.things6, roomImg.things3, roomImg.amenities8,],
          amenitites: ["Premium linens", "Mini-bar", "Complimentary toiletries", "Flat-screen TV with Netflix access",]
        },
        {
          name: "Family Room",
          room_image: roomImg.room5,
          description: "Room suitable for a small family.",
          capacity: 4,
          price_per_night: 3500,
          property_type: "Motel",
          extra_images: [roomImg.bath7, roomImg.bath8, roomImg.amenities3, roomImg.amenities4,],
          amenitites: ["Two double beds", "Dining table", "Microwave", "Mini fridge",]
        },
      ],
    },
    {
      key: 4,
      name: "Viktor Court",
      logo: brandLogo.brandFour,
      category: "Motel",
      address: "123 Taft Ave, Pasay, Metro Manila",
      hotel_description:
        "A motel with spacious rooms, ideal for business travelers, featuring accessible options and a variety of suites in Pasay.",
      phone: "+63 2 8123 4567",
      email: "contact@viktorcourt.ph",
      image: hotelImg.hotel4,
      location: {
        latitude: 14.5321,
        longitude: 120.9987,
      },
      room_types: [
        {
          name: "Executive Room",
          room_image: roomImg.room1,
          description: "Spacious room with work desk and WiFi.",
          capacity: 2,
          price_per_night: 2200,
          property_type: "Motel",
          extra_images: [roomImg.bath5, roomImg.bath6, roomImg.desk1, roomImg.desk2],
          amenitites: ["Free Wi-Fi", "Work Desk", "Air Conditioning", "LED TV",]
        },
        {
          name: "Luxury Room",
          room_image: roomImg.room2,
          description: "Luxury room with a king-size bed.",
          capacity: 2,
          price_per_night: 2800,
          property_type: "Motel",
          extra_images: [roomImg.bath7, roomImg.bath8, roomImg.amenities3, roomImg.amenities4,],
          amenitites: ["King-size Bed", "Air Conditioning", "Private Bathroom", "Complimentary Toiletries",]
        },
        {
          name: "Business Suite",
          room_image: roomImg.room3,
          description: "Suite ideal for business travelers.",
          capacity: 2,
          price_per_night: 3500,
          property_type: "Suite",
          extra_images: [roomImg.dining1, roomImg.dining2, roomImg.amenities1, roomImg.amenities2,],
          amenitites: ["Separate Living Area", "High-Speed Wi-Fi", "Work Desk", "Mini Refrigerator",]
        },
        {
          name: "Queen Room",
          room_image: roomImg.room4,
          description: "Room with a queen-size bed.",
          capacity: 2,
          price_per_night: 1800,
          property_type: "Motel",
          extra_images: [roomImg.things5, roomImg.things6, roomImg.things3, roomImg.amenities8,],
          amenitites: ["Queen Bed", "LED TV", "Air Conditioning", "Private Bathroom",]
        },
        {
          name: "Bunk Room",
          room_image: roomImg.room5,
          description: "Room with bunk beds for groups.",
          capacity: 4,
          price_per_night: 2000,
          property_type: "Motel",
          extra_images: [roomImg.bath9, roomImg.bath10, roomImg.jacuzzi1, roomImg.butler1,],
          amenitites: ["Bunk Beds", "Shared Bathroom", "Air Conditioning", "Lockers",]
        },
      ],
    },
    {
      key: 5,
      name: "Oceanview Villas",
      logo: brandLogo.brandFive,
      category: "Villas",
      address: "456 Coastal Road, Cavite",
      hotel_description:
        "Elegant private villas with ocean views and premium amenities, perfect for relaxation in Cavite.",
      phone: "+63 2 8123 4567",
      email: "contact@oceanviewvillas.ph",
      image: hotelImg.hotel5,
      location: {
        latitude: 14.4321,
        longitude: 120.9021,
      },
      room_types: [
        {
          name: "Oceanfront Villa",
          room_image: roomImg.villas1,
          description: "Private villa with an ocean view.",
          capacity: 4,
          price_per_night: 8000,
          property_type: "Villa",
          extra_images: [roomImg.amenities8, roomImg.pool1, roomImg.jacuzzi1, roomImg.butler1,],
          amenitites: ["Ocean View Terrace", "Private Entrance", "Outdoor Seating Area", "Air Conditioning",]
        },
        {
          name: "Garden Villa",
          room_image: roomImg.villas2,
          description: "Villa with a beautiful garden view.",
          capacity: 4,
          price_per_night: 6500,
          property_type: "Villa",
          extra_images: [roomImg.amenities9, roomImg.garden1, roomImg.garden2, roomImg.garden4,],
          amenitites: ["Garden View", "Patio", "Mini Kitchen", "Private Bathroom",]
        },
        {
          name: "Luxury Villa",
          room_image: roomImg.villas3,
          description: "Spacious villa with a pool.",
          capacity: 6,
          price_per_night: 12000,
          property_type: "VIlla",
          extra_images: [roomImg.amenities10, roomImg.bath10, roomImg.jacuzzi1, roomImg.pool1,],
          amenitites: ["Private Pool", "Large Living Space", "Smart TV", "Bathtub",]
        },
        {
          name: "Poolside Villa",
          room_image: roomImg.villas4,
          description: "Private villa next to the pool.",
          capacity: 4,
          price_per_night: 9500,
          property_type: "Villa",
          extra_images: [roomImg.amenities11, roomImg.pool2, roomImg.pool3, roomImg.pool4,],
          amenitites: ["Direct Pool Access", "Outdoor Furniture", "Kitchenette", "Air Conditioning",]
        },
        {
          name: "Deluxe Villa",
          room_image: roomImg.villas5,
          description: "Luxury villa with top-tier amenities.",
          capacity: 6,
          price_per_night: 14000,
          property_type: "Villa",
          extra_images: [roomImg.bath7, roomImg.bath8, roomImg.amenities3, roomImg.amenities4,],
          amenitites: ["King-size Bed", "High-end Interior", "Private Pool", "BBQ Facilities",]
        },
        {
          name: "Junior Suite",
          room_image: roomImg.villas6,
          description: "Cozy suite ideal for a weekend getaway.",
          capacity: 2,
          price_per_night: 5000,
          property_type: "Suite",
          extra_images: [roomImg.amenities5, roomImg.amenities6, roomImg.amenities7, roomImg.bath10,],
          amenitites: ["Cozy Seating Area", "Air Conditioning", "Queen Bed", "Flat-Screen TV",]
        },
      ],      
    },
    {
      key: 6,
      name: "Metropolis Heights",
      logo: brandLogo.brandSix,
      category: "Hotel",
      address: "852 Manila Rd, Manila",
      hotel_description:
        "A sophisticated hotel offering modern rooms and executive suites with city views in Manila.",
      phone: "+63 2 8123 4567",
      email: "contact@metropolisheights.ph",
      image: hotelImg.hotel6,
      location: {
        latitude: 14.5837,
        longitude: 120.9817,
      },
      room_types: [
        {
          name: "Superior Room",
          room_image: roomImg.room1,
          description: "Room with a queen bed and city view.",
          capacity: 2,
          price_per_night: 2500,
          property_type: "Hotel",
          amenitites: ["City View Window", "Mini Fridge", "Queen Bed", "Air Conditioning",]
        },
        {
          name: "Executive Room",
          room_image: roomImg.room2,
          description: "Room with additional work and relaxation space.",
          capacity: 2,
          price_per_night: 3200,
          property_type: "Hotel",
          amenitites: ["Workstation", "Executive Chair", "Coffee Maker", "Free Wi-Fi",]
        },
        {
          name: "Grand Suite",
          room_image: roomImg.room3,
          description: "Luxury suite with a living room.",
          capacity: 2,
          price_per_night: 4500,
          property_type: "Suite",
          amenitites: ["Living Area", "King-size Bed", "Bathtub", "Smart TV",]
        },
        {
          name: "Twin Room",
          room_image: roomImg.room4,
          description: "Room with two single beds.",
          capacity: 2,
          price_per_night: 2000,
          property_type: "Hotel",
          amenitites: ["Two Single Beds", "Closet", "LED TV", "Air Conditioning",]
        },
        {
          name: "Junior Suite",
          room_image: roomImg.room10,
          description: "Suite for a small group or couple.",
          capacity: 2,
          price_per_night: 3200,
          property_type: "Suite",
          amenitites: ["Lounge Area", "Queen Bed", "Workspace", "Air Conditioning",]
        },
      ],      
    },
    {
      key: 7,
      name: "Sunset Bay Resort",
      logo: brandLogo.brandSeven,
      category: "Resort",
      address: "78 Bayview Dr, Batangas",
      hotel_description:
        "A luxurious resort offering beachfront and poolside villas, ideal for families and romantic getaways in Batangas.",
      phone: "+63 2 8123 4567",
      email: "contact@sunsetbayresort.ph",
      image: hotelImg.hotel7,
      location: {
        latitude: 13.7802,
        longitude: 121.0543,
      },
      room_types: [
        {
          name: "Beachfront Room",
          room_image: roomImg.room1,
          description: "Room with ocean view and private terrace.",
          capacity: 2,
          price_per_night: 5500,
          property_type: "Resort",
          amenitites: ["Oceanfront Balcony", "Sun Loungers", "Mini Bar", "Air Conditioning",]
        },
        {
          name: "Oceanview Suite",
          room_image: roomImg.room2,
          description: "Luxurious suite with panoramic sea view.",
          capacity: 2,
          price_per_night: 7500,
          property_type: "Resort",
          amenitites: ["Floor-to-Ceiling Windows", "Spa Bath", "Smart TV", "Room Service",]
        },
        {
          name: "Garden View Room",
          room_image: roomImg.room3,
          description: "Room overlooking the lush resort gardens.",
          capacity: 2,
          price_per_night: 4500,
          property_type: "Resort",
          amenitites: ["Garden-facing Balcony", "Outdoor Table & Chairs", "Flat-Screen TV", "Wi-Fi",]
        },
        {
          name: "Poolside Villa",
          room_image: roomImg.room4,
          description: "Villa located next to the pool.",
          capacity: 4,
          price_per_night: 8000,
          property_type: "Resort",
          amenitites: ["Private Patio", "Pool Access", "Lounge Furniture", "Kitchenette",]
        },
        {
          name: "Luxury Villa",
          room_image: roomImg.room6,
          description: "High-end villa with private pool.",
          capacity: 6,
          price_per_night: 12000,
          property_type: "Resort",
          amenitites: ["Private Infinity Pool", "Butler Service", "Full Kitchen", "Luxury Bathroom",]
        },
      ],      
    },
    {
      key: 8,
      name: "Tagaytay Heights Hotel",
      logo: brandLogo.brandEight,
      category: "Hotel",
      address: "789 Scenic Rd, Tagaytay, Cavite",
      hotel_description:
        "Tagaytay Heights Hotel offers stunning views of Taal Volcano, with a range of rooms including luxurious suites and family-friendly options, perfect for both relaxation and business stays.",
      phone: "+63 46 1234 5678",
      email: "contact@tagaytheightshotel.ph",
      image: hotelImg.hotel8,
      location: {
        latitude: 14.076,
        longitude: 120.964,
      },
      room_types: [
        {
          name: "Superior Tagaytay View",
          room_image: roomImg.room1,
          description: "Room with a stunning view of Taal Volcano.",
          capacity: 2,
          price_per_night: 5000,
          property_type: "Hotel",
          amenitites: ["Floor-to-ceiling windows", "Coffee Maker", "Free Wi-Fi", "Air Conditioning",]
        },
        {
          name: "Deluxe Balcony Room",
          room_image: roomImg.room2,
          description: "Room with a private balcony overlooking the mountains.",
          capacity: 2,
          price_per_night: 6000,
          property_type: "Hotel",
          amenitites: ["Private Balcony", "Mountain View", "Flat-Screen TV", "Mini Bar",]
        },
        {
          name: "Presidential Suite",
          room_image: roomImg.room4,
          description: "Luxury suite with a separate living area and a full view of the lake.",
          capacity: 2,
          price_per_night: 8500,
          property_type: "Suite",
          amenitites: ["Separate Living Area", "Full Lake View", "Luxury Bathroom", "Room Service",]
        },
        {
          name: "Mountain View Villa",
          room_image: roomImg.room5,
          description: "Private villa with breathtaking mountain views.",
          capacity: 4,
          price_per_night: 10000,
          property_type: "Villa",
          amenitites: ["Private Villa", "Mountain View Terrace", "Kitchenette", "Smart TV",]
        },
        {
          name: "Garden View Suite",
          room_image: roomImg.room6,
          description: "Room with access to the hotel’s lush garden.",
          capacity: 2,
          price_per_night: 4500,
          property_type: "Suite",
          amenitites: ["Garden Access", "Patio Seating", "Free Wi-Fi", "King-Size Bed",]
        },
        {
          name: "Executive Suite",
          room_image: roomImg.room7,
          description: "Room designed for business travelers with added workspaces.",
          capacity: 2,
          price_per_night: 5000,
          property_type: "Suite",
          amenitites: ["Work Desk", "Coffee Machine", "Fast Wi-Fi", "Ergonomic Chair",]
        },
        {
          name: "Taal View Villa",
          room_image: roomImg.room9,
          description: "Private villa with a panoramic view of Taal Volcano.",
          capacity: 4,
          price_per_night: 9500,
          property_type: "Villa",
          amenitites: ["Panoramic Taal View", "Private Deck", "Luxury Linens", "Mini Kitchen",]
        },
      ],      
    },
    {
      key: 9,
      name: "Mountain Escape Lodge",
      logo: brandLogo.brandNine,
      category: "Lodge",
      address: "123 Hilltop Rd, Tagaytay",
      hotel_description:
        "A rustic lodge offering unique accommodations, including cabins and treehouses with breathtaking mountain views in Tagaytay.",
      phone: "+63 2 8123 4567",
      email: "contact@mountainescape.ph",
      image: hotelImg.hotel9,
      location: {
        latitude: 14.076,
        longitude: 120.8782,
      },
      room_types: [
        {
          name: "Mountainview Room",
          room_image: roomImg.room1,
          description: "Room with a breathtaking view of the mountains.",
          capacity: 2,
          price_per_night: 3500,
          property_type: "Lodge",
          amenitites: ["Scenic Windows", "Heating", "Soft Lighting", "Queen Bed",]
        },
        {
          name: "Cabin",
          room_image: roomImg.room2,
          description: "Wooden cabin with rustic charm.",
          capacity: 4,
          price_per_night: 5000,
          property_type: "Lodge",
          amenitites: ["Wooden Interior", "Porch Area", "Fireplace", "Kitchenette",]
        },
        {
          name: "Deluxe Suite",
          room_image: roomImg.room3,
          description: "Luxury suite with fireplace and lounge area.",
          capacity: 2,
          price_per_night: 7000,
          property_type: "Lodge",
          amenitites: ["Lounge Area", "Fireplace", "King Bed", "Mountain View",]
        },
        {
          name: "Executive Lodge",
          room_image: roomImg.room4,
          description: "Private lodge with office facilities.",
          capacity: 2,
          price_per_night: 6000,
          property_type: "Lodge",
          amenitites: ["Desk Setup", "Coffee Station", "Meeting Table", "Mini Library",]
        },
        {
          name: "Family Cabin",
          room_image: roomImg.room5,
          description: "Cabin for families with children.",
          capacity: 6,
          price_per_night: 8000,
          property_type: "Lodge",
          amenitites: ["Bunk Beds", "Living Area", "Kids’ Board Games", "Kitchen",]
        },
        {
          name: "Honeymoon Suite",
          room_image: roomImg.room7,
          description: "Romantic suite for newlyweds.",
          capacity: 2,
          price_per_night: 5500,
          property_type: "Suite",
          amenitites: ["Romantic Setup", "Private Balcony", "Bathtub", "Room Service",]
        },
        {
          name: "Mountain View Villa",
          room_image: roomImg.room8,
          description: "Private villa with panoramic mountain views.",
          capacity: 4,
          price_per_night: 8000,
          property_type: "Villa",
          amenitites: ["Elevated Deck", "Lounge Chairs", "Private Kitchen", "Panoramic Views",]
        },
        {
          name: "Treehouse",
          room_image: roomImg.room10,
          description: "Unique treehouse stay with nature vibes.",
          capacity: 2,
          price_per_night: 3000,
          property_type: "Lodge",
          amenitites: ["Elevated View", "Eco-Friendly Build", "Hammock or Swing", "Balcony",]
        },
      ],      
    },
    {
      key: 10,
      name: "The Luxe Inn",
      logo: brandLogo.brandTen,
      category: "Inn",
      address: "789 City Ave, Makati",
      hotel_description:
        "A modern inn with stylish rooms and suites, offering luxury amenities for business and leisure travelers in Makati.",
      phone: "+63 2 8123 4567",
      email: "contact@theluxeinn.ph",
      image: hotelImg.hotel10,
      location: {
        latitude: 14.5547,
        longitude: 121.0165,
      },
      room_types: [
        {
          name: "Standard Inn Room",
          room_image: roomImg.room1,
          description: "Basic room with queen bed and amenities.",
          capacity: 2,
          price_per_night: 2200,
          property_type: "Inn",
          amenitites: ["Queen Bed", "Flat-Screen TV", "Air Conditioning", "Free Wi-Fi",]
        },
        {
          name: "Deluxe Room",
          room_image: roomImg.room2,
          description: "Room with upgraded furnishings and view.",
          capacity: 2,
          price_per_night: 2800,
          property_type: "Inn",
          amenitites: ["City View", "Sofa Chair", "Complimentary Toiletries", "Coffee Maker",]
        },
        {
          name: "Premium Inn Room",
          room_image: roomImg.room3,
          description: "Room with luxury features and city view.",
          capacity: 2,
          price_per_night: 3500,
          property_type: "Inn",
          amenitites: ["Premium Linens", "Rain Shower", "Smart TV", "Air Conditioning",]
        },
        {
          name: "Penthouse Suite",
          room_image: roomImg.room6,
          description: "Top-floor suite with panoramic views and premium facilities.",
          capacity: 2,
          price_per_night: 7000,
          property_type: "Suite",
          amenitites: ["Floor-to-Ceiling Windows", "Private Lounge", "Cityscape View", "Bathtub",]
        },
        {
          name: "Family Suite",
          room_image: roomImg.room7,
          description: "Room designed for family stays with extra space.",
          capacity: 4,
          price_per_night: 6000,
          property_type: "Inn",
          amenitites: ["Extra Beds", "Dining Space", "Two TVs", "Board Games",]
        },
      ],      
    },
  ],
};

export default Property;