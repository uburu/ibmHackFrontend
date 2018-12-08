import { fetchModule } from '../modules/ajax.js';
import { setCookie } from '../utils.js';
import { getCookie } from '../utils.js';
import { deleteCookie } from '../utils.js';
import Bus from '../modules/Bus.js';
import Router from '../modules/Router.js';

export default class AuthModel {
	static Register (data) {
		return fetchModule.doPost({ useUrl:'db', path: '/mineBlock', body: {data: data} })
			.then(response => {
				if (response.status === 200) {
					alert("Рецепт успешно создан")
					// alert("Рецепт успешно создан");
					// console.log('Registration Done: ', response.status);
					// const doctor = data.doctor;
					// const patient = data.patient;
					// const recipe = data.recipe;
					// const work = data.work;
					// const specialty = data.specialty;
					// Bus.emit('submit-data-signin', { doctor, patient, recipe });
				}
				if (response.status === 409) {
					// console.log('email duplicate: ', response.status);
					Bus.emit('unsuccess-signup');
				}
				if (response.status === 422) { // валидация на стороне сервера TODO сообщение о неправильно вводе данных
					// console.log('registration server validation: ', response.status);
					return Promise.reject(response.status);
				}
			})
			.catch((err) => {
				Bus.emit('unsuccess-signup');
			});
	}

	static Signin (data) {
		Router.open(`/recipe/${data.index}`)
	}

	static Signout () {
		const authToken = getCookie('auth_token');
		const signOutHeaders = {
			'Authorization': 'Bearer ' + authToken
		}
		fetchModule.doDelete({useUrl:'db', path: '/users/session', headers: signOutHeaders})
			.then( response => {
				if (response.status === 200) {
					deleteCookie('id');
					deleteCookie('auth_token');
					Bus.emit('wipe-views');
				}
				if (response.status === 401) {
					Bus.emit('wipe-views');
				}
			})
			.catch( (err) =>{
				console.log('SIGNOUT ERR', err);
			})
	}
}