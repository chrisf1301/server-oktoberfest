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
    "img_name": "images/clipart.jpeg",
    "name": "Traditional German Food",
    "description": "Enjoy authentic German cuisine including bratwurst, sauerkraut, pretzels, and schnitzel at various food stalls throughout the festival.",
    "category": "Food & Dining",
    "price_range": "$8-15",
    "popularity": "Very Popular",
    "dietary_options": "Vegetarian options available"
  },
  {
    "_id": 2,
    "img_name": "images/fest.jpeg",
    "name": "Beer Tent Experience",
    "description": "Experience the iconic Oktoberfest beer tents with live music, traditional German beer, and festive atmosphere.",
    "category": "Entertainment",
    "price_range": "$12-20",
    "popularity": "Very Popular",
    "dietary_options": "N/A"
  },
  {
    "_id": 3,
    "img_name": "images/real_photo.jpeg",
    "name": "Live Music & Dancing",
    "description": "Dance to traditional German music performed by live bands in the beer tents and main stage areas.",
    "category": "Entertainment",
    "price_range": "Free",
    "popularity": "Popular",
    "dietary_options": "N/A"
  },
  {
    "_id": 4,
    "img_name": "images/ken.jpeg",
    "name": "Picture Perfect Moments",
    "description": "Capture picture perfect moments on thrilling carnival rides including the Ferris wheel, roller coasters, and traditional fair attractions.",
    "category": "Attractions",
    "price_range": "$5-10 per ride",
    "popularity": "Popular",
    "dietary_options": "N/A"
  },
  {
    "_id": 5,
    "img_name": "images/parade.jpg",
    "name": "Traditional Veterans Parade",
    "description": "Witness the spectacular traditional veterans parade featuring marching bands, traditional costumes, and horse-drawn carriages.",
    "category": "Events",
    "price_range": "Free",
    "popularity": "Very Popular",
    "dietary_options": "N/A"
  },
  {
    "_id": 6,
    "img_name": "images/threepeople.jpeg",
    "name": "Generational Fun",
    "description": "Experience generational fun as families show off their dirndl or lederhosen in the traditional costume contest with prizes for the best dressed.",
    "category": "Events",
    "price_range": "Free to enter",
    "popularity": "Moderate",
    "dietary_options": "N/A"
  },
  {
    "_id": 7,
    "img_name": "images/emil.jpg",
    "name": "Long Lasting Family Traditions",
    "description": "Participate in long lasting family traditions through traditional German games including stein holding contests, barrel rolling, and more.",
    "category": "Activities",
    "price_range": "$3-8",
    "popularity": "Moderate",
    "dietary_options": "N/A"
  },
  {
    "_id": 8,
    "img_name": "images/don.jpeg",
    "name": "Live German Music",
    "description": "Browse and purchase handmade crafts while enjoying live German music, traditional German souvenirs, and unique festival memorabilia.",
    "category": "Entertainment",
    "price_range": "Varies",
    "popularity": "Popular",
    "dietary_options": "N/A"
  },
  {
    "_id": 9,
    "img_name": "images/phil.jpeg",
    "name": "Authentic German Beer",
    "description": "Family-friendly activities including face painting, puppet shows, and kid-friendly rides, all while parents enjoy authentic German beer.",
    "category": "Entertainment",
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
