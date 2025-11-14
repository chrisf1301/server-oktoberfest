const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Joi = require('joi');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Multer for form data without file uploads (for tickets)
const uploadFormData = multer().none();

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
    "description": "Capture picture perfect moments and funny moments on thrilling carnival rides including the Ferris wheel, roller coasters, and traditional fair attractions.",
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
    "description": "Experience generational fun as families come together to watch soccer, bonding across generations while enjoying the festive atmosphere and traditional celebrations.",
    "category": "Events",
    "price_range": "Free to enter",
    "popularity": "Moderate",
    "dietary_options": "N/A"
  },
  {
    "_id": 7,
    "img_name": "images/emil.JPG",
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
    "description": "Enjoy live German music performed by talented musicians playing traditional instruments, creating an authentic Oktoberfest atmosphere throughout the festival.",
    "category": "Entertainment",
    "price_range": "Varies",
    "popularity": "Popular",
    "dietary_options": "N/A"
  },
  {
    "_id": 9,
    "img_name": "images/phil.jpeg",
    "name": "Authentic German Beer",
    "description": "Savor authentic German beer brewed according to traditional recipes, served in classic steins in the festive beer tents with live music and celebration.",
    "category": "Entertainment",
    "price_range": "$8-15",
    "popularity": "Very Popular",
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

// Tickets data array
let tickets = [];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all activities
app.get('/api/activities', (req, res) => {
  try {
    res.json(activities);
  } catch (error) {
    console.error('Error in GET /api/activities:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Get a single activity by ID
app.get('/api/activities/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const activity = activities.find(a => a._id === id);
    
    if (activity) {
      res.json(activity);
    } else {
      res.status(404).json({ message: 'Activity not found' });
    }
  } catch (error) {
    console.error('Error in GET /api/activities/:id:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Get all tickets
app.get('/api/tickets', (req, res) => {
  try {
    res.json(tickets);
  } catch (error) {
    console.error('Error in GET /api/tickets:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Post a new ticket order
app.post('/api/tickets', uploadFormData, (req, res) => {
  try {
    const ticketData = {
      ...req.body,
      quantity: parseInt(req.body.quantity)
    };
    
    const result = validateTicket(ticketData);

    if (result.error) {
      res.status(400).json({ 
        success: false,
        error: result.error.details[0].message 
      });
      return;
    }

    const ticket = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      ticketType: req.body.ticketType,
      quantity: parseInt(req.body.quantity),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    tickets.push(ticket);
    res.status(201).json({
      success: true,
      ...ticket
    });
  } catch (error) {
    console.error('Error in POST /api/tickets:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

// Validation schema for tickets
const validateTicket = (ticket) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required().messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),
    phone: Joi.string().min(10).required().messages({
      'string.empty': 'Phone number is required',
      'string.min': 'Phone number must be at least 10 characters long',
    }),
    ticketType: Joi.string().valid('General Admission', 'Family Pass', 'VIP Pass', 'Early Bird Special').required().messages({
      'any.only': 'Ticket type must be one of: General Admission, Family Pass, VIP Pass, or Early Bird Special',
      'any.required': 'Ticket type is required',
    }),
    quantity: Joi.number().integer().min(1).required().messages({
      'number.base': 'Quantity must be a valid number',
      'number.integer': 'Quantity must be a whole number',
      'number.min': 'Quantity must be at least 1',
      'any.required': 'Quantity is required',
    }),
  });

  return schema.validate(ticket);
};

// Error handling middleware (must be after all routes)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Oktoberfest server is running on http://localhost:${PORT}`);
});




