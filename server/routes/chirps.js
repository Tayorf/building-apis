const express = require('express');
const chirpStore = require('../../chirpstore');

const router = express.Router();

router.get('/:id?', (req, res) => {
	const id = req.params.id;
	if (id) {
		const chirp = chirpStore.GetChirp(id);
		res.json(chirp);
	} else {
		const data = chirpStore.GetChirps();
		const chirps = Object.keys(data).map(key => {
			return {
				id : key,
				username: data[key].username,
				chirp: data[key].chirp
			}
		});
		chirps.pop();
		res.json(chirps);
	}
});

router.post('/', (req, res) => {	
	const chirp = req.body;
	chirpStore.CreateChirp(chirp);
 	res.json('Chirp added!');
});

router.put('/:id', (req, res) => {
	const chirp = req.body;
	const id = req.params.id;
	chirpStore.UpdateChirp(id, chirp);
	res.json(`Chirp ${id} edited.`);
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	chirpStore.DeleteChirp(id);
	res.json(`Chirp ${id} deleted.`);
});

module.exports = router;