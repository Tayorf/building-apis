getChirps();

$('#post-chirp').click(e => {
	e.preventDefault();
	let data = {
		username: $('[name="username"]').val(),
		chirp: $('[name="chirp"]').val()
	};
	$.ajax({
		data,
		url: '/api/chirps',
		type: 'POST'
	})
	.then(() => {
		$('[name="username"]').val('');
		$('[name="chirp"]').val('');
		getChirps();
	});
});

function getChirps() {
	$.ajax({
		url: '/api/chirps',
		type: 'GET'
	})
	.then(chirps => {
		$('ul').empty();
		chirps.forEach(chirp => {
			$('ul').append(`
				<li class="list-group-item">
					<div class="row no-gutters ml-2 justify-content-between">
						<div class="col-10"><strong>${chirp.username}:</strong> ${chirp.chirp}</div>
						<div class="col-2 d-flex justify-content-end align-items-center">
							<button type="button" onclick="deleteChirp(${chirp.id})" class="close mr-3" aria-label="Close">
							<i class="far fa-trash-alt fa-xs"></i></button>
							<button type="button" onclick="editChirp('${chirp.id}', '${chirp.username}', '${chirp.chirp}')" class="close" aria-label="Edit">
							<i class="far fa-edit fa-xs"></i></button>
						</div>
					</div>
				</li>
			`);
		})
	})
	.catch(e => console.log(e));
}

function deleteChirp(id) {
	$.ajax({
		url: '/api/chirps/' + id,
		type: 'DELETE'
	})
	.then(() => getChirps())
	.catch(e => console.log(e));
}

function editChirp(id, username, chirp) {
	Swal.fire({
		title: 'Edit Chirp',
		text: `Editing ${username}'s Chirp`,
		input: 'textarea',
		inputValue: chirp,
		confirmButtonText: 'Save Edit',
		preConfirm: editedChirp => {
			$.ajax({
				type: 'PUT',
				url: '/api/chirps/' + id,
				data: { username, chirp: editedChirp }
			})
			.then(() => getChirps())
			.catch(e => Swal.showValidationMessage(`Request failed: ${e}`));
		}
	});
}