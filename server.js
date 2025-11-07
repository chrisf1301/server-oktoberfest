const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Oktoberfest activities data
const activities = [
  {
    "_id": 1,
    "img_name": "images/food.jpeg",
    "name": "Traditional German Food",
    "description": "Enjoy authentic German cuisine including bratwurst, sauerkraut, pretzels, and schnitzel at various food stalls throughout the festival.",
    "category": "Food & Dining",
    "price_range": "$8-15",
    "popularity": "Very Popular",
    "dietary_options": "Vegetarian options available"
  },
  {
    "_id": 2,
    "img_name": "images/hofbrau.png",
    "name": "Beer Tent Experience",
    "description": "Experience the iconic Oktoberfest beer tents with live music, traditional German beer, and festive atmosphere.",
    "category": "Entertainment",
    "price_range": "$12-20",
    "popularity": "Very Popular",
    "dietary_options": "N/A"
  },
  {
    "_id": 3,
    "img_name": "images/people.jpeg",
    "name": "Live Music & Dancing",
    "description": "Dance to traditional German music performed by live bands in the beer tents and main stage areas.",
    "category": "Entertainment",
    "price_range": "Free",
    "popularity": "Popular",
    "dietary_options": "N/A"
  },
  {
    "_id": 4,
    "img_name": "images/packed.jpg",
    "name": "Carnival Rides",
    "description": "Enjoy thrilling carnival rides including the Ferris wheel, roller coasters, and traditional fair attractions.",
    "category": "Attractions",
    "price_range": "$5-10 per ride",
    "popularity": "Popular",
    "dietary_options": "N/A"
  },
  {
    "_id": 5,
    "img_name": "images/parade.jpg",
    "name": "Opening Day Parade",
    "description": "Witness the spectacular opening day parade featuring traditional costumes, marching bands, and horse-drawn carriages.",
    "category": "Events",
    "price_range": "Free",
    "popularity": "Very Popular",
    "dietary_options": "N/A"
  },
  {
    "_id": 6,
    "img_name": "images/threepeople.jpeg",
    "name": "Traditional Costume Contest",
    "description": "Show off your dirndl or lederhosen in the traditional costume contest with prizes for the best dressed.",
    "category": "Events",
    "price_range": "Free to enter",
    "popularity": "Moderate",
    "dietary_options": "N/A"
  },
  {
    "_id": 7,
    "img_name": "images/germanGame.jpeg",
    "name": "Traditional Games",
    "description": "Participate in traditional German games including stein holding contests, barrel rolling, and more.",
    "category": "Activities",
    "price_range": "$3-8",
    "popularity": "Moderate",
    "dietary_options": "N/A"
  },
  {
    "_id": 8,
    "img_name": "images/fest.jpeg",
    "name": "Artisan Crafts Market",
    "description": "Browse and purchase handmade crafts, traditional German souvenirs, and unique festival memorabilia.",
    "category": "Shopping",
    "price_range": "Varies",
    "popularity": "Popular",
    "dietary_options": "N/A"
  },
  {
    "_id": 9,
    "img_name": "images/family.png",
    "name": "Children's Activities",
    "description": "Family-friendly activities including face painting, puppet shows, and kid-friendly rides.",
    "category": "Family",
    "price_range": "$2-5",
    "popularity": "Popular",
    "dietary_options": "N/A"
  },
  {
    "_id": 10,
    "img_name": "images/fireworks.jpeg",
    "name": "Evening Fireworks",
    "description": "End your day with a spectacular fireworks display lighting up the night sky over the festival grounds.",
    "category": "Entertainment",
    "price_range": "Free",
    "popularity": "Very Popular",
    "dietary_options": "N/A"
  }
];

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Get all activities
app.get('/api/activities', (req, res) => {
  res.json(activities);
});

// Get a single activity by ID
app.get('/api/activities/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const activity = activities.find(a => a._id === id);
  
  if (activity) {
    res.json(activity);
  } else {
    res.status(404).json({ message: 'Activity not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Oktoberfest server is running on http://localhost:${PORT}`);
});
