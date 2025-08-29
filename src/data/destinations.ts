// Centralized destination datasets for Tamil Nadu, Kerala, and Bangalore
// Shared across pages and recommendation engine

export type Destination = {
  name: string;
  country: string; // Region label (e.g., "Tamil Nadu", "Kerala", "Bangalore", "Near Bangalore")
  image: string;
  emotionalMatch: string;
  matchPercentage: number;
  description: string;
  culturalHighlights: string[];
  safetyLevel: "high" | "medium" | "low";
  bestTime: string;
  priceRange: "$" | "$$" | "$$$";
  idealGroupSize?: string;
  groupDescription?: string;
  topSpots?: string[];
  touristPlaces?: {
    name: string;
    description: string;
    category: "temple" | "nature" | "adventure" | "cultural" | "beach" | "historical" | "shopping" | "food";
  }[];
  localCuisine?: string[];
  activities?: string[];
  nearbyAttractions?: string[];
  travelTips?: string[];
};

export const tamilNaduDestinations: Destination[] = [
  {
    name: "Ooty",
    country: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1589136777351-fdc9c9cab193?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    emotionalMatch: "Peaceful & Rejuvenating",
    matchPercentage: 94,
    description: "Escape to the serene hill station of Ooty with its tea gardens, misty mountains, and colonial charm perfect for mental peace.",
    culturalHighlights: ["Tea Garden Tours", "Toy Train Ride", "Rose Garden"],
    safetyLevel: "high" as const,
    bestTime: "Apr-Jun",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "Botanical Garden", description: "240-acre garden with over 1,000 species of plants and trees", category: "nature" },
      { name: "Ooty Lake", description: "Artificial lake perfect for boating and peaceful walks", category: "nature" },
      { name: "Doddabetta Peak", description: "Highest peak in the Nilgiris offering panoramic views", category: "nature" },
      { name: "Tea Museum", description: "Learn about tea processing and enjoy fresh tea tastings", category: "cultural" },
      { name: "Rose Garden", description: "Beautiful garden with thousands of rose varieties", category: "nature" }
    ],
    localCuisine: ["Nilgiri Tea", "Homemade Chocolates", "Varkey (local biscuit)", "Eucalyptus Honey"],
    activities: ["Toy Train Ride", "Trekking", "Boating", "Photography", "Tea Garden Tours"],
    nearbyAttractions: ["Coonoor", "Kotagiri", "Pykara Falls", "Emerald Lake"],
    travelTips: ["Carry warm clothes even in summer", "Book toy train tickets in advance", "Best photography during early morning"]
  },
  {
    name: "Mahabalipuram",
    country: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    emotionalMatch: "Cultural & Reflective",
    matchPercentage: 89,
    description: "Discover ancient rock-cut temples and sculptures while enjoying peaceful beach vibes at this UNESCO World Heritage site.",
    culturalHighlights: ["Shore Temple", "Rock Sculptures", "Beach Meditation"],
    safetyLevel: "high" as const,
    bestTime: "Nov-Mar",
    priceRange: "$" as const,
    touristPlaces: [
      { name: "Shore Temple", description: "7th-century structural temple facing the Bay of Bengal", category: "temple" },
      { name: "Pancha Rathas", description: "Five monolithic rock-cut temples shaped like chariots", category: "historical" },
      { name: "Arjuna's Penance", description: "Massive rock relief depicting scenes from Hindu mythology", category: "historical" },
      { name: "Krishna's Butter Ball", description: "Giant natural rock boulder balancing on a slope", category: "nature" },
      { name: "Mahabalipuram Beach", description: "Pristine beach perfect for relaxation and water sports", category: "beach" }
    ],
    localCuisine: ["Fresh Seafood", "Filter Coffee", "Masala Dosa", "Coconut Rice"],
    activities: ["Rock Climbing", "Beach Volleyball", "Sculpture Workshops", "Sunrise Meditation"],
    nearbyAttractions: ["Covelong Beach", "Dakshinachitra", "Crocodile Bank", "Vedanthangal Bird Sanctuary"],
    travelTips: ["Visit early morning to avoid crowds", "Hire local guides for historical insights", "Carry sun protection"]
  },
  {
    name: "Kodaikanal",
    country: "Tamil Nadu",
    image: "https://www.indiantempletour.com/wp-content/uploads/2022/08/Kodaikanal-Package-Tour.jpg",
    emotionalMatch: "Romantic & Dreamy",
    matchPercentage: 92,
    description: "The 'Princess of Hill Stations' offers misty lakes, pine forests, and cozy weather perfect for romantic getaways.",
    culturalHighlights: ["Kodai Lake", "Coaker's Walk", "Pine Forest"],
    safetyLevel: "high" as const,
    bestTime: "Apr-Jun",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "Kodai Lake", description: "Star-shaped artificial lake perfect for boating and cycling", category: "nature" },
      { name: "Coaker's Walk", description: "1-km pedestrian path with stunning valley views", category: "nature" },
      { name: "Bryant Park", description: "Botanical garden with colorful flowers and greenhouse", category: "nature" },
      { name: "Pillar Rocks", description: "Three giant rock pillars standing 400 feet high", category: "nature" },
      { name: "Silver Cascade Falls", description: "165-foot waterfall cascading down rocky terrain", category: "nature" }
    ],
    localCuisine: ["Homemade Chocolates", "Plums", "Pears", "Eucalyptus Oil", "Pine Forest Honey"],
    activities: ["Boating", "Horse Riding", "Trekking", "Cycling", "Nature Photography"],
    nearbyAttractions: ["Berijam Lake", "Dolphin's Nose", "Green Valley View", "Fairy Falls"],
    travelTips: ["Book accommodation in advance during peak season", "Carry warm clothes", "Try local homemade chocolates"]
  },
  {
    name: "Kanyakumari",
    country: "Tamil Nadu",
    image: "https://travelcrafters.com.au/wp-content/uploads/2025/01/glass-bridge.jpg.webp",
    emotionalMatch: "Spiritual & Contemplative",
    matchPercentage: 87,
    description: "Experience the magical sunrise and sunset at India's southernmost tip, where three seas meet in spiritual harmony.",
    culturalHighlights: ["Sunrise Point", "Vivekananda Rock", "Thiruvalluvar Statue"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Mar",
    priceRange: "$" as const,
    touristPlaces: [
      { name: "Vivekananda Rock Memorial", description: "Sacred rock where Swami Vivekananda meditated, accessible by ferry", category: "temple" },
      { name: "Thiruvalluvar Statue", description: "133-foot tall statue of the great Tamil poet and philosopher", category: "cultural" },
      { name: "Kanyakumari Beach", description: "Unique beach where you can see sunrise and sunset from the same spot", category: "beach" },
      { name: "Kumari Amman Temple", description: "Ancient temple dedicated to the virgin goddess Kanyakumari", category: "temple" },
      { name: "Gandhi Memorial", description: "Memorial built at the spot where Mahatma Gandhi's ashes were kept", category: "historical" }
    ],
    localCuisine: ["Fresh Seafood", "Banana Chips", "Coconut Water", "Tamil Meals", "Jackfruit Chips"],
    activities: ["Sunrise Viewing", "Sunset Watching", "Ferry Rides", "Temple Visits", "Beach Walks", "Photography"],
    nearbyAttractions: ["Padmanabhapuram Palace", "Courtallam Falls", "Suchindram Temple", "Nagercoil"],
    travelTips: ["Visit during full moon for best sunrise/sunset views", "Book ferry tickets early for Vivekananda Rock", "Carry sun protection and water"]
  },
  {
    name: "Yercaud",
    country: "Tamil Nadu",
    image: "https://bestplaces.blog/wp-content/uploads/2025/03/Best-Places-to-Visit-in-Yercaud.webp",
    emotionalMatch: "Refreshing & Energizing",
    matchPercentage: 85,
    description: "A lesser-known gem in the Shevaroy Hills, perfect for those seeking solitude amidst coffee plantations and serene lakes.",
    culturalHighlights: ["Coffee Plantations", "Emerald Lake", "Servaroyan Temple"],
    safetyLevel: "high" as const,
    bestTime: "Dec-May",
    priceRange: "$" as const,
    touristPlaces: [
      { name: "Yercaud Lake", description: "Scenic lake surrounded by hills, perfect for boating and peaceful walks", category: "nature" },
      { name: "Shevaroy Temple", description: "Hilltop temple dedicated to Lord Shevaroyan with panoramic views", category: "temple" },
      { name: "Lady's Seat", description: "Popular viewpoint offering stunning views of the plains below", category: "nature" },
      { name: "Gent's Seat", description: "Another scenic viewpoint with beautiful sunrise and sunset views", category: "nature" },
      { name: "Kiliyur Falls", description: "300-foot waterfall cascading down rocky terrain", category: "nature" }
    ],
    localCuisine: ["Fresh Coffee", "Orange Marmalade", "Honey", "Tribal Cuisine", "Hill Station Snacks"],
    activities: ["Coffee Plantation Tours", "Boating", "Trekking", "Nature Photography", "Temple Visits"],
    nearbyAttractions: ["Salem", "Mettur Dam", "Hogenakkal Falls", "Kolli Hills"],
    travelTips: ["Best visited during orange season (April-June)", "Carry warm clothes for early morning", "Try local orange products"]
  },
  {
    name: "Thanjavur",
    country: "Tamil Nadu",
    image: "https://letusdiscoverindia.com/wp-content/uploads/2023/03/pexels-photo-5124396.jpeg",
    emotionalMatch: "Cultural & Inspiring",
    matchPercentage: 88,
    description: "Immerse yourself in the rich Chola heritage with magnificent temples, classical music, and traditional art forms.",
    culturalHighlights: ["Brihadeeswarar Temple", "Thanjavur Paintings", "Classical Music"],
    safetyLevel: "high" as const,
    bestTime: "Nov-Feb",
    priceRange: "$" as const,
    touristPlaces: [
      { name: "Brihadeeswarar Temple", description: "UNESCO World Heritage Site, masterpiece of Chola architecture", category: "temple" },
      { name: "Thanjavur Palace", description: "Royal palace complex with art gallery and library", category: "historical" },
      { name: "Saraswathi Mahal Library", description: "Ancient library with rare manuscripts and palm leaf books", category: "cultural" },
      { name: "Art Gallery", description: "Collection of Chola bronzes and traditional paintings", category: "cultural" },
      { name: "Schwartz Church", description: "Historic Danish church built in 1779", category: "historical" }
    ],
    localCuisine: ["Thanjavur Meals", "Puliyodarai", "Curd Rice", "Traditional Sweets", "Filter Coffee"],
    activities: ["Temple Architecture Tours", "Art Gallery Visits", "Classical Music Concerts", "Painting Workshops", "Heritage Walks"],
    nearbyAttractions: ["Kumbakonam", "Darasuram", "Gangaikonda Cholapuram", "Thiruvaiyaru"],
    travelTips: ["Hire a guide for temple architecture insights", "Visit during music season (Dec-Jan)", "Respect temple dress codes"]
  },
  {
    name: "Madurai",
    country: "Tamil Nadu",
    image: "https://hblimg.mmtcdn.com/content/hubble/img/desttvimg/mmt/destination/m_Madurai_tv_destination_img_1_l_542_967.jpg",
    emotionalMatch: "Spiritual & Vibrant",
    matchPercentage: 91,
    description: "Experience the divine energy of Meenakshi Temple and immerse in the vibrant temple city culture and traditions.",
    culturalHighlights: ["Meenakshi Temple", "Temple Festivals", "Local Markets"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Mar",
    priceRange: "$" as const,
    touristPlaces: [
      { name: "Meenakshi Amman Temple", description: "Magnificent temple complex with towering gopurams and intricate carvings", category: "temple" },
      { name: "Thirumalai Nayakkar Palace", description: "17th-century palace showcasing Dravidian architecture", category: "historical" },
      { name: "Gandhi Memorial Museum", description: "Museum dedicated to Mahatma Gandhi with historical artifacts", category: "cultural" },
      { name: "Alagar Kovil", description: "Temple dedicated to Lord Vishnu, located in scenic hills", category: "temple" },
      { name: "Vandiyur Mariamman Teppakulam", description: "Large temple tank used for float festivals", category: "cultural" }
    ],
    localCuisine: ["Madurai Jigarthanda", "Paruthi Paal", "Kari Dosa", "Mutton Chukka", "Filter Coffee"],
    activities: ["Temple Tours", "Evening Aarti", "Heritage Walks", "Local Market Shopping", "Cultural Performances"],
    nearbyAttractions: ["Rameswaram", "Kodaikanal", "Dindigul", "Palani"],
    travelTips: ["Visit temple early morning to avoid crowds", "Try famous Jigarthanda drink", "Respect temple traditions and dress codes"]
  },
  {
    name: "Rameswaram",
    country: "Tamil Nadu",
    image: "https://hblimg.mmtcdn.com/content/hubble/img/destimg/mmt/destination/m_Rameshwaram_tv_destination_img_5_l_833_1248.jpg",
    emotionalMatch: "Peaceful & Sacred",
    matchPercentage: 89,
    description: "Find spiritual solace at this sacred island town with pristine beaches and ancient temples offering deep meditation experiences.",
    culturalHighlights: ["Ramanathaswamy Temple", "Pamban Bridge", "Sacred Baths"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Apr",
    priceRange: "$" as const,
    touristPlaces: [
      { name: "Ramanathaswamy Temple", description: "Sacred temple with the longest corridor in the world and 22 holy wells", category: "temple" },
      { name: "Pamban Bridge", description: "Engineering marvel connecting Rameswaram to mainland India", category: "historical" },
      { name: "Dhanushkodi Beach", description: "Ghost town and pristine beach at the tip of India", category: "beach" },
      { name: "Adam's Bridge", description: "Chain of limestone shoals connecting India and Sri Lanka", category: "nature" },
      { name: "Gandhamadhana Parvatham", description: "Highest point in Rameswaram with Rama's footprints", category: "temple" }
    ],
    localCuisine: ["Fresh Seafood", "Coconut Rice", "Fish Curry", "Prawn Fry", "Traditional Meals"],
    activities: ["Temple Visits", "Sacred Baths", "Beach Walks", "Pilgrimage Tours", "Photography", "Meditation"],
    nearbyAttractions: ["Madurai", "Kanyakumari", "Tuticorin", "Tiruchendur"],
    travelTips: ["Carry towels for sacred baths", "Visit Dhanushkodi early morning", "Respect pilgrimage traditions"]
  },
  {
    name: "Pondicherry",
    country: "Tamil Nadu",
    image: "https://www.southtourism.in/assets/images/cityinfo/Pondicherry2.png",
    emotionalMatch: "Tranquil & International",
    matchPercentage: 90,
    description: "Experience French colonial charm mixed with spiritual vibes at Auroville and peaceful beaches perfect for inner reflection.",
    culturalHighlights: ["French Quarter", "Auroville", "Promenade Beach"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Mar",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "French Quarter", description: "Colonial architecture with colorful buildings and cobblestone streets", category: "cultural" },
      { name: "Auroville", description: "International township dedicated to human unity and spiritual growth", category: "cultural" },
      { name: "Promenade Beach", description: "Long stretch of beach perfect for evening walks and relaxation", category: "beach" },
      { name: "Sri Aurobindo Ashram", description: "Spiritual center founded by Sri Aurobindo and The Mother", category: "cultural" },
      { name: "Paradise Beach", description: "Pristine beach accessible by boat, perfect for water sports", category: "beach" }
    ],
    localCuisine: ["French Pastries", "Crepes", "Fresh Seafood", "South Indian Meals", "Continental Cuisine"],
    activities: ["Heritage Walks", "Beach Activities", "Yoga Sessions", "Cycling Tours", "Art Gallery Visits", "Meditation"],
    nearbyAttractions: ["Mahabalipuram", "Chidambaram", "Cuddalore", "Villupuram"],
    travelTips: ["Rent a bicycle to explore the French Quarter", "Visit Auroville for spiritual experiences", "Try French bakeries for authentic pastries"]
  }
];

export const keralaDestinations: Destination[] = [
  {
    name: "Alleppey",
    country: "Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    emotionalMatch: "Peaceful & Meditative",
    matchPercentage: 96,
    description: "Float through serene backwaters on traditional houseboats, finding inner peace amidst Kerala's Venice-like waterways.",
    culturalHighlights: ["Houseboat Experience", "Backwater Villages", "Coir Making"],
    safetyLevel: "high" as const,
    bestTime: "Nov-Feb",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "Alleppey Backwaters", description: "Network of canals, rivers, and lakes perfect for houseboat cruises", category: "nature" },
      { name: "Alleppey Beach", description: "Beautiful beach with lighthouse and pier", category: "beach" },
      { name: "Krishnapuram Palace", description: "18th-century palace with traditional Kerala architecture", category: "historical" },
      { name: "Marari Beach", description: "Pristine beach village with coconut groves", category: "beach" },
      { name: "Pathiramanal Island", description: "Small island in Vembanad Lake, bird watcher's paradise", category: "nature" }
    ],
    localCuisine: ["Karimeen Fish Curry", "Appam with Stew", "Toddy", "Coconut Water", "Banana Chips"],
    activities: ["Houseboat Cruising", "Canoeing", "Village Walks", "Bird Watching", "Ayurvedic Massage"],
    nearbyAttractions: ["Kumarakom", "Vembanad Lake", "Champakulam", "Edathua Church"],
    travelTips: ["Book houseboats in advance", "Carry mosquito repellent", "Respect local customs during village visits"]
  },
  {
    name: "Munnar",
    country: "Kerala",
    image: "https://www.munnar.holiday/munnartourism/wp-content/uploads/2024/11/what-is-munnar-famous-for.jpg",
    emotionalMatch: "Refreshing & Energizing",
    matchPercentage: 93,
    description: "Breathe fresh mountain air amidst rolling tea plantations and misty hills, perfect for rejuvenating your spirit.",
    culturalHighlights: ["Tea Plantations", "Spice Gardens", "Wildlife Sanctuary"],
    safetyLevel: "high" as const,
    bestTime: "Dec-Mar",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "Tea Gardens", description: "Endless rolling hills covered with lush green tea plantations", category: "nature" },
      { name: "Eravikulam National Park", description: "Home to endangered Nilgiri Tahr and stunning landscapes", category: "nature" },
      { name: "Mattupetty Dam", description: "Concrete arch dam with boating facilities and scenic views", category: "nature" },
      { name: "Top Station", description: "Highest point offering panoramic views of Western Ghats", category: "nature" },
      { name: "Tea Museum", description: "Learn about tea processing and history of Munnar's tea industry", category: "cultural" }
    ],
    localCuisine: ["Fresh Tea", "Cardamom", "Spices", "Banana Chips", "Kerala Sadya"],
    activities: ["Tea Plantation Tours", "Trekking", "Wildlife Spotting", "Photography", "Spice Shopping"],
    nearbyAttractions: ["Thekkady", "Vagamon", "Kumily", "Cardamom Hills"],
    travelTips: ["Carry warm clothes for early morning", "Book wildlife sanctuary permits in advance", "Buy fresh spices from local markets"]
  },
  {
    name: "Thekkady",
    country: "Kerala",
    image: "https://keralatourism.travel/images//tourist-places/ramakkalmedu-thekkady/ramakkalmedu-thekkady-tourism-entry-ticket-price.jpg",
    emotionalMatch: "Adventurous & Wild",
    matchPercentage: 90,
    description: "Embark on wildlife adventures in Periyar National Park, where nature's raw beauty awakens your adventurous spirit.",
    culturalHighlights: ["Periyar Wildlife", "Spice Plantations", "Bamboo Rafting"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Mar",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "Periyar National Park", description: "Wildlife sanctuary famous for elephants, tigers, and boat safaris", category: "nature" },
      { name: "Periyar Lake", description: "Artificial lake perfect for wildlife spotting and boat rides", category: "nature" },
      { name: "Spice Plantations", description: "Aromatic plantations growing cardamom, pepper, and other spices", category: "nature" },
      { name: "Mangla Devi Temple", description: "Ancient temple accessible through forest trekking", category: "temple" },
      { name: "Elephant Junction", description: "Elephant training center where you can interact with elephants", category: "adventure" }
    ],
    localCuisine: ["Spice-infused Dishes", "Kerala Fish Curry", "Appam", "Fresh Spices", "Herbal Teas"],
    activities: ["Wildlife Safari", "Boat Rides", "Spice Plantation Tours", "Bamboo Rafting", "Trekking", "Elephant Rides"],
    nearbyAttractions: ["Munnar", "Kumily", "Vagamon", "Idukki Dam"],
    travelTips: ["Book wildlife safari in advance", "Carry binoculars for wildlife spotting", "Buy fresh spices from local markets"]
  },
  {
    name: "Kochi",
    country: "Kerala",
    image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202501/kochi-water-metro-244106949-16x9_0.jpg?VersionId=XJlI7DwEJ5TImeAo9ZHsnUL0oNw.ekzO",
    emotionalMatch: "Cultural & Inspiring",
    matchPercentage: 88,
    description: "Explore the historic port city where Portuguese, Dutch, and British influences blend with local culture in fascinating harmony.",
    culturalHighlights: ["Chinese Fishing Nets", "Fort Kochi", "Kathakali Performances"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Mar",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "Chinese Fishing Nets", description: "Iconic fishing nets introduced by Chinese traders, symbol of Kochi", category: "cultural" },
      { name: "Fort Kochi Beach", description: "Historic beach with colonial architecture and sunset views", category: "beach" },
      { name: "Mattancherry Palace", description: "Portuguese palace with beautiful murals and artifacts", category: "historical" },
      { name: "Jewish Synagogue", description: "Oldest active synagogue in Commonwealth countries", category: "cultural" },
      { name: "St. Francis Church", description: "Oldest European church in India where Vasco da Gama was buried", category: "historical" }
    ],
    localCuisine: ["Kerala Fish Curry", "Appam with Stew", "Puttu", "Seafood Specialties", "Spiced Tea"],
    activities: ["Heritage Walks", "Kathakali Shows", "Backwater Cruises", "Spice Market Tours", "Art Gallery Visits"],
    nearbyAttractions: ["Alleppey", "Munnar", "Kumarakom", "Cherai Beach"],
    travelTips: ["Watch Kathakali performance in the evening", "Explore Jew Town for antiques", "Take sunset photos at Chinese fishing nets"]
  },
  {
    name: "Wayanad",
    country: "Kerala",
    image: "https://res.cloudinary.com/dyiffrkzh/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_center,h_400,q_auto,w_700/v1704969274/bbj/njqtfztadcu9xf4tahht.jpg",
    emotionalMatch: "Peaceful & Nature-loving",
    matchPercentage: 91,
    description: "Disconnect from the world in Wayanad's pristine forests, waterfalls, and tribal culture for a soul-cleansing experience.",
    culturalHighlights: ["Edakkal Caves", "Tribal Culture", "Waterfalls"],
    safetyLevel: "high" as const,
    bestTime: "Oct-May",
    priceRange: "$" as const,
    touristPlaces: [
      { name: "Edakkal Caves", description: "Prehistoric caves with ancient petroglyphs dating back 6000 years", category: "historical" },
      { name: "Soochipara Falls", description: "Three-tiered waterfall perfect for swimming and rock climbing", category: "nature" },
      { name: "Banasura Sagar Dam", description: "Largest earthen dam in India with beautiful surroundings", category: "nature" },
      { name: "Chembra Peak", description: "Highest peak in Wayanad with heart-shaped lake", category: "adventure" },
      { name: "Kuruva Island", description: "Uninhabited island with dense forests and rare flora", category: "nature" }
    ],
    localCuisine: ["Tribal Cuisine", "Bamboo Rice", "Wild Honey", "Spiced Coffee", "Traditional Kerala Meals"],
    activities: ["Trekking", "Cave Exploration", "Waterfall Visits", "Wildlife Spotting", "Tribal Village Tours", "Photography"],
    nearbyAttractions: ["Ooty", "Coorg", "Kozhikode", "Mysore"],
    travelTips: ["Carry trekking gear for Chembra Peak", "Visit tribal villages with local guides", "Best time for waterfalls is post-monsoon"]
  },
  {
    name: "Varkala",
    country: "Kerala",
    image: "https://irisholidays.com/keralatourism/wp-content/uploads/2014/06/best-things-to-do-in-varkala.jpg",
    emotionalMatch: "Spiritual & Relaxing",
    matchPercentage: 94,
    description: "Find spiritual solace on Varkala's dramatic clifftop beaches, where ancient temples meet healing Ayurvedic traditions.",
    culturalHighlights: ["Cliff Beach", "Ayurvedic Spas", "Janardhana Temple"],
    safetyLevel: "high" as const,
    bestTime: "Nov-Mar",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "Varkala Beach", description: "Dramatic cliff-backed beach with natural springs and healing properties", category: "beach" },
      { name: "Janardhana Swamy Temple", description: "2000-year-old temple dedicated to Lord Vishnu", category: "temple" },
      { name: "Sivagiri Mutt", description: "Ashram and pilgrimage center founded by social reformer Sree Narayana Guru", category: "cultural" },
      { name: "Anjengo Fort", description: "Historic fort built by the East India Company", category: "historical" },
      { name: "Kappil Beach", description: "Serene beach where backwaters meet the Arabian Sea", category: "beach" }
    ],
    localCuisine: ["Fresh Seafood", "Ayurvedic Food", "Coconut-based Dishes", "Herbal Teas", "Organic Meals"],
    activities: ["Beach Relaxation", "Ayurvedic Treatments", "Yoga Sessions", "Temple Visits", "Cliff Walking", "Meditation"],
    nearbyAttractions: ["Kovalam", "Thiruvananthapuram", "Kollam", "Alleppey"],
    travelTips: ["Try Ayurvedic treatments for wellness", "Visit temple early morning", "Respect the spiritual atmosphere of the place"]
  },
  {
    name: "Kumarakom",
    country: "Kerala",
    image: "https://www.theraviz.com/wp-content/uploads/2024/04/The-Enchanting-Backwaters-of-Kumarakom.jpg",
    emotionalMatch: "Peaceful & Bird-watching",
    matchPercentage: 93,
    description: "Experience serenity at Kumarakom Bird Sanctuary and backwater cruises, perfect for nature lovers seeking tranquil moments.",
    culturalHighlights: ["Bird Sanctuary", "Backwater Cruises", "Village Walks"],
    safetyLevel: "high" as const,
    bestTime: "Nov-Feb",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "Kumarakom Bird Sanctuary", description: "14-acre sanctuary home to migratory birds and local species", category: "nature" },
      { name: "Vembanad Lake", description: "Largest lake in Kerala, perfect for houseboat cruises", category: "nature" },
      { name: "Bay Island Driftwood Museum", description: "Unique museum showcasing driftwood sculptures", category: "cultural" },
      { name: "Pathiramanal Island", description: "Small island accessible by boat, bird watcher's paradise", category: "nature" },
      { name: "Aruvikkuzhi Waterfall", description: "Scenic waterfall surrounded by rubber plantations", category: "nature" }
    ],
    localCuisine: ["Karimeen Fish", "Backwater Prawns", "Coconut Curry", "Toddy", "Traditional Kerala Meals"],
    activities: ["Bird Watching", "Houseboat Cruises", "Village Tours", "Fishing", "Photography", "Ayurvedic Spa"],
    nearbyAttractions: ["Alleppey", "Kottayam", "Thekkady", "Munnar"],
    travelTips: ["Best bird watching time is early morning", "Book houseboat in advance", "Carry binoculars for bird watching"]
  },
  {
    name: "Kovalam",
    country: "Kerala",
    image: "https://s3.india.com/wp-content/uploads/2025/06/Kovalam-hidden-gems-1.jpg##image/jpg",
    emotionalMatch: "Relaxing & Beach Therapy",
    matchPercentage: 91,
    description: "Unwind on pristine crescent beaches with Ayurvedic massages and lighthouse views, ideal for stress relief and rejuvenation.",
    culturalHighlights: ["Lighthouse Beach", "Ayurvedic Centers", "Fishing Villages"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Mar",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "Lighthouse Beach", description: "Most popular beach with iconic red and white striped lighthouse", category: "beach" },
      { name: "Hawah Beach", description: "Secluded beach perfect for sunbathing and relaxation", category: "beach" },
      { name: "Samudra Beach", description: "Less crowded beach ideal for peaceful walks", category: "beach" },
      { name: "Vizhinjam Marine Aquarium", description: "Aquarium showcasing marine life of the Arabian Sea", category: "cultural" },
      { name: "Halcyon Castle", description: "Historic palace turned heritage hotel with beautiful architecture", category: "historical" }
    ],
    localCuisine: ["Fresh Seafood", "Coconut-based Curries", "Appam", "Fish Molee", "Tropical Fruits"],
    activities: ["Beach Relaxation", "Ayurvedic Massages", "Water Sports", "Lighthouse Climbing", "Fishing", "Sunset Viewing"],
    nearbyAttractions: ["Thiruvananthapuram", "Varkala", "Kanyakumari", "Poovar"],
    travelTips: ["Try authentic Ayurvedic treatments", "Visit lighthouse for panoramic views", "Respect local fishing community traditions"]
  },
  {
    name: "Athirappilly",
    country: "Kerala",
    image: "https://www.wowabouts.com/z-media/2018/10/Athirappilly%20Falls.jpg",
    emotionalMatch: "Adventurous & Nature's Power",
    matchPercentage: 89,
    description: "Marvel at Kerala's Niagara - the powerful Athirappilly Falls surrounded by lush rainforests, perfect for adventure seekers.",
    culturalHighlights: ["Athirappilly Falls", "Rainforest Trekking", "River Rafting"],
    safetyLevel: "high" as const,
    bestTime: "Jun-Sep",
    priceRange: "$" as const,
    touristPlaces: [
      { name: "Athirappilly Falls", description: "80-foot waterfall known as the 'Niagara of India'", category: "nature" },
      { name: "Vazhachal Falls", description: "Scenic waterfall surrounded by dense forests", category: "nature" },
      { name: "Sholayar Dam", description: "Large dam with beautiful reservoir and mountain views", category: "nature" },
      { name: "Thumboormuzhi Dam", description: "Butterfly garden and elephant training center nearby", category: "nature" },
      { name: "Charpa Falls", description: "Hidden waterfall accessible through trekking", category: "adventure" }
    ],
    localCuisine: ["Traditional Kerala Meals", "Fresh River Fish", "Bamboo Rice", "Wild Honey", "Herbal Teas"],
    activities: ["Waterfall Viewing", "Trekking", "River Rafting", "Photography", "Bird Watching", "Nature Walks"],
    nearbyAttractions: ["Thrissur", "Chalakudy", "Munnar", "Kochi"],
    travelTips: ["Visit during monsoon for full flow", "Wear non-slip shoes near waterfalls", "Carry rain gear during monsoon season"]
  }
];

export const bangaloreDestinations: Destination[] = [
  {
    name: "Lalbagh Botanical Garden",
    country: "Bangalore",
    image: "https://media1.thrillophilia.com/filestore/63znh36mzyxi2gmmbn4c38mekupu_1562854402_lal_bagh.jpg",
    emotionalMatch: "Peaceful & Rejuvenating",
    matchPercentage: 92,
    description: "Find tranquility in this 240-acre botanical paradise with over 1,000 species of flora, perfect for morning meditation walks.",
    culturalHighlights: ["Glass House", "Flower Shows", "Rock Garden"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Mar",
    priceRange: "$" as const,
    touristPlaces: [
      { name: "Lalbagh Botanical Garden", description: "240-acre botanical garden with Glass House and rare plant species", category: "nature" },
      { name: "Lalbagh Rock", description: "3000-million-year-old rock formation, one of the oldest on Earth", category: "nature" },
      { name: "Glass House", description: "Victorian-style conservatory hosting flower shows", category: "cultural" },
      { name: "Bonsai Garden", description: "Beautiful collection of miniature trees and plants", category: "nature" },
      { name: "Rose Garden", description: "Dedicated section with various species of roses", category: "nature" }
    ],
    localCuisine: ["South Indian Breakfast", "Filter Coffee", "Street Food", "Masala Dosa"],
    activities: ["Morning Walks", "Photography", "Yoga", "Jogging", "Nature Study"],
    nearbyAttractions: ["Cubbon Park", "Bangalore Palace", "Bull Temple", "Tipu Sultan's Palace"],
    travelTips: ["Visit early morning for peaceful experience", "Carry water bottle", "Best during flower show seasons"]
  },
  {
    name: "Nandi Hills",
    country: "Near Bangalore",
    image: "https://www.treksandtrails.org/blog/wp-content/uploads/2020/08/Nandi-Hills.jpg",
    emotionalMatch: "Adventurous & Refreshing",
    matchPercentage: 89,
    description: "Watch breathtaking sunrises from this ancient hill fortress, just 60km from Bangalore - perfect for weekend escapes and cycling.",
    culturalHighlights: ["Sunrise Point", "Tipu's Drop", "Ancient Temples"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Feb",
    priceRange: "$" as const,
    touristPlaces: [
      { name: "Tipu's Drop", description: "Cliff from where Tipu Sultan used to push prisoners", category: "historical" },
      { name: "Nandi Temple", description: "Ancient temple dedicated to Nandi, Shiva's bull", category: "temple" },
      { name: "Sunrise Point", description: "Popular spot for watching spectacular sunrises", category: "nature" },
      { name: "Yoga Nandeeshwara Temple", description: "9th-century temple complex with intricate carvings", category: "temple" },
      { name: "Bhoga Nandeeshwara Temple", description: "Ancient temple showcasing Chola and Hoysala architecture", category: "temple" }
    ],
    localCuisine: ["Local Breakfast Items", "Fresh Fruit Juices", "South Indian Snacks", "Filter Coffee"],
    activities: ["Sunrise Viewing", "Cycling", "Trekking", "Photography", "Paragliding"],
    nearbyAttractions: ["Skandagiri", "Muddenahalli", "Lepakshi", "Chikballapur"],
    travelTips: ["Start early for sunrise", "Carry warm clothes", "Book cycling tours in advance", "Avoid weekends for less crowd"]
  },
  {
    name: "Cubbon Park",
    country: "Bangalore",
    image: "https://www.shutterstock.com/image-photo/tree-garden-cubbon-park-bangalore-600nw-1504042868.jpg",
    emotionalMatch: "Urban Peace & Wellness",
    matchPercentage: 88,
    description: "Escape city stress in this 300-acre urban oasis in the heart of Bangalore, ideal for jogging, yoga, and peaceful reflection.",
    culturalHighlights: ["State Library", "Museum", "Bandstand"],
    safetyLevel: "high" as const,
    bestTime: "Year-round",
    priceRange: "$" as const,
    touristPlaces: [
      { name: "State Central Library", description: "Historic red building housing vast collection of books", category: "cultural" },
      { name: "Government Museum", description: "Museum with archaeological and geological exhibits", category: "cultural" },
      { name: "Seshadri Iyer Memorial Hall", description: "Beautiful colonial architecture building", category: "historical" },
      { name: "Bandstand", description: "Open-air venue for cultural performances", category: "cultural" },
      { name: "Sheshadri Iyer Memorial", description: "Memorial dedicated to former Dewan of Mysore", category: "historical" }
    ],
    localCuisine: ["Street Food", "South Indian Breakfast", "Filter Coffee", "Chaat", "Fresh Juices"],
    activities: ["Morning Walks", "Jogging", "Yoga", "Reading", "Photography", "Cultural Events"],
    nearbyAttractions: ["Vidhana Soudha", "High Court", "UB City Mall", "Commercial Street"],
    travelTips: ["Best time is early morning", "Carry water bottle", "Perfect for morning exercise routines"]
  },
  {
    name: "UB City Mall",
    country: "Bangalore",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    emotionalMatch: "Luxurious & Indulgent",
    matchPercentage: 85,
    description: "Indulge in luxury shopping and fine dining in India's most premium mall, perfect for treating yourself and boosting confidence.",
    culturalHighlights: ["Fine Dining", "Luxury Shopping", "Rooftop Views"],
    safetyLevel: "high" as const,
    bestTime: "Year-round",
    priceRange: "$$$" as const,
    touristPlaces: [
      { name: "Luxury Retail Stores", description: "International and Indian luxury brands under one roof", category: "shopping" },
      { name: "Fine Dining Restaurants", description: "World-class restaurants with diverse cuisines", category: "food" },
      { name: "Rooftop Bars", description: "Sky-high bars with panoramic city views", category: "food" },
      { name: "Art Galleries", description: "Contemporary art exhibitions and installations", category: "cultural" },
      { name: "Wellness Centers", description: "Premium spas and wellness facilities", category: "cultural" }
    ],
    localCuisine: ["International Cuisine", "Gourmet Food", "Craft Cocktails", "Fine Dining", "Artisanal Coffee"],
    activities: ["Luxury Shopping", "Fine Dining", "Art Gallery Visits", "Rooftop Dining", "Spa Treatments"],
    nearbyAttractions: ["Cubbon Park", "Vidhana Soudha", "Bangalore Palace", "Commercial Street"],
    travelTips: ["Dress code applies for some restaurants", "Make reservations for fine dining", "Valet parking available"]
  },
  {
    name: "Bangalore Palace",
    country: "Bangalore",
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
    emotionalMatch: "Historical & Inspiring",
    matchPercentage: 87,
    description: "Step into royal grandeur at this Tudor-style palace, inspiring awe with its architecture and stories of the Mysore royalty.",
    culturalHighlights: ["Royal Architecture", "Palace Grounds", "Historical Tours"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Mar",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "Palace Interior", description: "Opulent rooms with vintage furniture and royal artifacts", category: "historical" },
      { name: "Durbar Hall", description: "Grand hall used for royal ceremonies and events", category: "historical" },
      { name: "Palace Grounds", description: "Venue for concerts and cultural events", category: "cultural" },
      { name: "Royal Gardens", description: "Well-maintained gardens surrounding the palace", category: "nature" },
      { name: "Vintage Car Collection", description: "Collection of classic cars owned by the royal family", category: "cultural" }
    ],
    localCuisine: ["Royal Cuisine", "Traditional South Indian", "Continental Food", "High Tea", "Gourmet Snacks"],
    activities: ["Palace Tours", "Photography", "Cultural Events", "Garden Walks", "Historical Learning"],
    nearbyAttractions: ["Cubbon Park", "Lalbagh", "UB City", "Vidhana Soudha"],
    travelTips: ["Audio guides available for detailed history", "Photography allowed with extra fee", "Check for special events and concerts"]
  },
  {
    name: "Innovative Film City",
    country: "Near Bangalore",
    image: "https://images.unsplash.com/photo-1489599096090-da5b0a113f2e?w=800&q=80",
    emotionalMatch: "Fun & Entertaining",
    matchPercentage: 83,
    description: "Experience Bollywood magic and entertainment at this sprawling film studio and theme park, perfect for family fun and excitement.",
    culturalHighlights: ["Film Studios", "Theme Park", "Cultural Shows"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Mar",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "Film Studio Tours", description: "Behind-the-scenes look at movie making process", category: "cultural" },
      { name: "Theme Park Rides", description: "Exciting rides and attractions for all ages", category: "adventure" },
      { name: "Wax Museum", description: "Life-like wax figures of celebrities and historical figures", category: "cultural" },
      { name: "Cartoon City", description: "Themed area dedicated to popular cartoon characters", category: "adventure" },
      { name: "Adventure Sports", description: "Zip-lining, rock climbing, and other adventure activities", category: "adventure" }
    ],
    localCuisine: ["Theme Park Food", "South Indian Snacks", "Fast Food", "Ice Creams", "Beverages"],
    activities: ["Studio Tours", "Theme Park Rides", "Adventure Sports", "Cultural Shows", "Photography", "Family Entertainment"],
    nearbyAttractions: ["Nandi Hills", "Bangalore", "Chikballapur", "Devanahalli"],
    travelTips: ["Full day required to explore everything", "Carry comfortable shoes", "Book combo packages for better deals"]
  },
  {
    name: "Chikballapur",
    country: "Near Bangalore",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    emotionalMatch: "Adventurous & Spiritual",
    matchPercentage: 86,
    description: "Explore ancient hilltop temples and scenic trekking trails, perfect for combining adventure with spiritual experiences.",
    culturalHighlights: ["Nandi Hills Extension", "Ancient Temples", "Trekking Trails"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Mar",
    priceRange: "$" as const,
    touristPlaces: [
      { name: "Skandagiri Hills", description: "Popular trekking destination with night trek options", category: "adventure" },
      { name: "Bhoga Nandeeshwara Temple", description: "Ancient temple complex with beautiful Dravidian architecture", category: "temple" },
      { name: "Gudibande Fort", description: "Hilltop fort with panoramic views and historical significance", category: "historical" },
      { name: "Nandi Hills", description: "Extension of the famous hill station with sunrise views", category: "nature" },
      { name: "Avalabetta Hilltop", description: "Lesser-known trekking spot with stunning views", category: "adventure" }
    ],
    localCuisine: ["Local Village Food", "Traditional Breakfast", "Fresh Fruits", "Sugarcane Juice", "Regional Snacks"],
    activities: ["Trekking", "Temple Visits", "Photography", "Sunrise Viewing", "Rock Climbing", "Nature Walks"],
    nearbyAttractions: ["Nandi Hills", "Bangalore", "Lepakshi", "Muddenahalli"],
    travelTips: ["Start early for sunrise treks", "Carry water and snacks", "Wear proper trekking shoes"]
  },
  {
    name: "Wonderla",
    country: "Near Bangalore",
    image: "https://images.unsplash.com/photo-1489599096090-da5b0a113f2e?w=800&q=80",
    emotionalMatch: "Thrilling & Exciting",
    matchPercentage: 85,
    description: "Get your adrenaline pumping at one of India's best amusement parks with world-class rides and water attractions.",
    culturalHighlights: ["Water Rides", "Roller Coasters", "Family Entertainment"],
    safetyLevel: "high" as const,
    bestTime: "Year-round",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "High Thrill Rides", description: "Roller coasters and extreme rides for adrenaline junkies", category: "adventure" },
      { name: "Water Park", description: "Wave pools, water slides, and aquatic attractions", category: "adventure" },
      { name: "Family Rides", description: "Gentle rides suitable for all age groups", category: "adventure" },
      { name: "Kids Zone", description: "Special area with rides designed for children", category: "adventure" },
      { name: "Rain Disco", description: "Unique dancing experience in artificial rain", category: "adventure" }
    ],
    localCuisine: ["Theme Park Food", "Multi-cuisine Restaurant", "Fast Food", "Ice Creams", "Snacks"],
    activities: ["Thrill Rides", "Water Sports", "Family Entertainment", "Photography", "Dancing", "Games"],
    nearbyAttractions: ["Bangalore", "Electronic City", "Bannerghatta", "Anekal"],
    travelTips: ["Carry extra clothes for water rides", "Book online for discounts", "Follow height restrictions for rides"]
  },
  {
    name: "Bannerghatta National Park",
    country: "Near Bangalore",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    emotionalMatch: "Wildlife & Educational",
    matchPercentage: 88,
    description: "Connect with nature through wildlife safaris and conservation experiences, perfect for families and nature enthusiasts.",
    culturalHighlights: ["Wildlife Safari", "Butterfly Park", "Zoo Experience"],
    safetyLevel: "high" as const,
    bestTime: "Oct-Mar",
    priceRange: "$$" as const,
    touristPlaces: [
      { name: "Safari Park", description: "Open safari experience with lions, tigers, and other wildlife", category: "nature" },
      { name: "Butterfly Park", description: "Conservatory with hundreds of butterfly species", category: "nature" },
      { name: "Zoo", description: "Traditional zoo with diverse animal species", category: "nature" },
      { name: "Rescue Center", description: "Wildlife rescue and rehabilitation facility", category: "nature" },
      { name: "Nature Trails", description: "Walking trails through natural forest habitat", category: "nature" }
    ],
    localCuisine: ["Picnic Food", "Local Snacks", "Fresh Juices", "South Indian Meals", "Packed Lunches"],
    activities: ["Wildlife Safari", "Nature Photography", "Educational Tours", "Butterfly Watching", "Trekking", "Picnicking"],
    nearbyAttractions: ["Bangalore", "Wonderla", "Turahalli Forest", "Jayadeva Cardiology Hospital"],
    travelTips: ["Book safari tickets in advance", "Carry binoculars for better wildlife viewing", "Follow park rules and maintain silence during safari"]
  }
];
