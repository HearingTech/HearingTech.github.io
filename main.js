// =============== SignUp ===============
const signupForm = document.querySelector('#signup-form'),
	  sumodal = new bootstrap.Modal('#signupModal');

signupForm.addEventListener('submit',(e) =>{
	e.preventDefault();

	const email = document.querySelector('#signup-email').value;
	const password = document.querySelector('#signup-password').value;

	auth
		.createUserWithEmailAndPassword(email, password)
		.then(userCredential => {
			//limpiar el formulario
			signupForm.reset();
			//cerrar el modal
			sumodal.hide();
			console.log('Se resgistro')
		})
});

// =============== SingIn ===============
const signinForm = document.querySelector('#login-form'),
	  simodal = new bootstrap.Modal('#signinModal');

signinForm.addEventListener('submit',(e) =>{
	e.preventDefault();

	const email = document.querySelector('#login-email').value;
	const password = document.querySelector('#login-password').value;
	auth
		.signInWithEmailAndPassword(email, password)
		.then(userCredential => {
			//limpiar el formulario
			signinForm.reset();
			//cerrar el modal
			simodal.hide();
			console.log('Se inicio sesion')
		})
});
// =============== Log out ===============
const logout = document.querySelector('#logout');
	logout.addEventListener('click', e => {
	e.preventDefault();
	auth.signOut().then(() => {
		console.log('Se cerro sesion')
	})
});
// =============== Autentificacion con Google ===============
const googleButton = document.querySelector('#googleLogin')
googleButton.addEventListener('click', e => {
	const provider = new firebase.auth.GoogleAuthProvider();
	auth.signInWithPopup(provider)
		.then(result =>{
			console.log('google sign in')
			//limpiar el formulario
			signinForm.reset();
			//cerrar el modal
			simodal.hide();
		})
		.catch(err =>{
			console.log(err)
		})
});

// =============== Autentificacion ===============
const postList = document.querySelector('.posts')
	  setupPost = data => {
		if (data.length) {
			let html = '';
			data.forEach(doc => {
				const post = doc.data()
				console.log(post)
				const li = `
					<li class="list-group-item list-group-item-action">
						<h5>${post.title}</h5>
						<p>${post.description}</p>
					</li>
				`;
				html += li;
			});
			postList.innerHTML = html;
		} else {
			postList.innerHTML = '<p class="text-center">Login  to see enter the page</p>'
		}
	  }
;
// =============== Cambio de estado ===============
auth.onAuthStateChanged(user =>{
	if(user){
		fs.collection('posts')
			.get()
			.then((snapshot) => {
				setupPost(snapshot.docs);
			})
	} else {
		setupPost([]);
	}
})