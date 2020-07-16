const Clarifai  = require( 'clarifai');


const app = new Clarifai.App({
	apiKey: process.env.API_KEY;
});

const handleApi = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(response => res.json(response))
	.catch(err => res.status(400).json('bad api call'));
}

const handle = (req, res, db) => {
	const id = req.body.id;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handle,
	handleApi
}