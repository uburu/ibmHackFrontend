import BaseView from './BaseView.js';
import Bus from '../modules/Bus.js';
import NavigationController from '../controllers/NavigationController.js';
import FormController from '../controllers/FormController.js';
import SignUpValidator from '../validators/SignUpValidator.js';
import {authMenuHeader, notAuthMenuHeader} from './dataTemplates/headerMenuData.js'

const form = require('./templates/form.pug');
const permissionMessageTmpl = require('./templates/notPermittedAction.pug');

const data = {
	headerValues: notAuthMenuHeader(),
	title: 'Создание рецепта',
	id: 'signup',
	actionError: 'signUpError',
	actionErrorMessage: '',
	fields: [
		{
			id: 'doctor_input',
			name: 'doctor',
			type: 'text',
			placeholder: 'ФИО врача',
			errorId: 'doctor_error'
		},
		{
			id: 'patient_input',
			name: 'patient',
			type: 'text',
			placeholder: 'ФИО пациента',
			errorId: 'patient_error'
		},
		{
			id: 'recipe_input',
			name: 'recipe',
			type: 'text',
			placeholder: 'Рецепт',
			errorId: 'recipe_error'
		},
	]
};

export default class SignupView extends BaseView {
	constructor () {
		super(form);
		this._navigationController = new NavigationController();
		this._formController = new FormController('signup', SignUpValidator);
		Bus.on('done-get-user', this.render.bind(this));
	}

	show () {
		console.log('SignUP show');
		Bus.emit('get-user');
		super.show();
		this.registerActions();
	}

	render (user) {
		this._template = form;
		super.render(data);
		// if (!user.is_authenticated) {
			
		// } else {
		// 	const permissionMessageData = {
		// 		headerValues: authMenuHeader(user.id),
		// 		title: 'Создание рецепта',
		// 		message: 'Произошла ошибка'
		// 	};
		// 	this._template = permissionMessageTmpl;
		// 	super.render(permissionMessageData);
		// }
		Bus.off('done-get-user', this.render.bind(this));
	}

	registerActions () {
		this.viewDiv.addEventListener('submit', this._formController.callbackSubmit.bind(this._formController));
		this.viewDiv.addEventListener('click', this._navigationController.keyPressedCallback);
	}

	static showUnsuccessMessage () {
		let errorField = document.getElementById('signUpError');
		errorField.removeAttribute('hidden');
	}
}
