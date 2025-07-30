const express = require('express');
const path = require('path');
const db = require(path.resolve(__dirname, '../../db/db'));
const router = express.Router();

// Get stations by type (tv or radio)
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    
    if (!type || (type !== 'tv' && type !== 'radio')) {
      return res.status(400).json({ error: 'Invalid or missing station type. Must be "tv" or "radio".' });
    }

    const result = await db.query('SELECT id, name, stream_url, logo_url, type, description FROM stations WHERE type = $1', [type]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching stations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;