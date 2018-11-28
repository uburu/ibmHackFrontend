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
	title: 'Registration',
	id: 'signup',
	actionError: 'signUpError',
	actionErrorMessage: 'Such user has already been created',
	fields: [
		{
			id: 'username_input',
			name: 'username',
			type: 'text',
			placeholder: 'Имя пользователя',
			errorId: 'username_error'
		},
		{
			id: 'email_input',
			name: 'email',
			type: 'email',
			placeholder: 'Email',
			errorId: 'email_error'
		},
		{
			id: 'password_input',
			name: 'password',
			type: 'password',
			placeholder: 'Пароль',
			errorId: 'password_error'
		},
		{
			id: 'password_repeat_input',
			name: 'password_repeat',
			type: 'password',
			placeholder: 'Повторите пароль',
			errorId: 'password_repeat_error'
		}
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
		if (!user.is_authenticated) {
			this._template = form;
			super.render(data);
		} else {
			const permissionMessageData = {
				headerValues: authMenuHeader(user.id),
				title: 'Registration',
				message: 'You have been already registered and signed in'
			};
			this._template = permissionMessageTmpl;
			super.render(permissionMessageData);
		}
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
