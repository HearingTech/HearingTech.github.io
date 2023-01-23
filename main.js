function redireccionar(dir){ location.href="inicio.html";}
// =============== Mostrar etiquetas ===============
const loggedOutLinks = document.querySelectorAll('.logged-out'),
	  loggedInLinks = document.querySelectorAll('.logged-in');

const loginCheck = user => {
	if (user) {
		loggedInLinks.forEach(link => link.style.display = 'block');
		loggedOutLinks.forEach(link => link.style.display = 'none');
	} else {
		loggedInLinks.forEach(link => link.style.display = 'none');
		loggedOutLinks.forEach(link => link.style.display = 'block');
	}
};

// =============== Crear cuenta ===============
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
			console.log('Se resgistro');
		})
});

// =============== Iniciar sesion ===============
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
			console.log('Se inicio sesion');
			redireccionar();
		})
});
// =============== Cerrar sesion ===============
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
						<button type="button" class="btn btn-light btn-bc-primary" onclick="location.href='inicio.html'"">Mexi Tour</button>
					</li>
				`;
				html += li;
			});
			postList.innerHTML = html;
		} else {
			postList.innerHTML = '<p class="text-center fs-2"><span class="text-primary">Inicia sesi&oacuten</span> para entrar a la p&aacutegina</p>'
								  //<h1 class="p-1 fs-2 border-top border-3
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
				loginCheck(user);
			})
	} else {
		setupPost([]);
		loginCheck(user);
	}
})