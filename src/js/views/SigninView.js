import BaseView from './BaseView.js';
import Bus from '../modules/Bus.js';
import NavigationController from '../controllers/NavigationController.js';
import FormController from '../controllers/FormController.js';
import {authMenuHeader, notAuthMenuHeader} from './dataTemplates/headerMenuData.js'

const form = require('./templates/form.pug');
const permissionMessageTmpl = require('./templates/notPermittedAction.pug');


const data = {
	headerValues: notAuthMenuHeader(),
	title: 'Sign in',
	id: 'signin',
	actionError: 'signInError',
	actionErrorMessage: 'Incorrect login or password',
	fields: [
		{
			id: 'index_input',
			name: 'index',
			type: 'text',
			placeholder: 'Номер рецепта',
			errorId: 'index_error'
		}
	]
};

export default class SigninView extends BaseView {
	constructor () {
		super(form);
		this._navigationController = new NavigationController();
		this._formController = new FormController('signin');
		Bus.on('done-get-user', this.render.bind(this));
	}

	show () {
		console.log('SignIN show');
		Bus.emit('get-user');
		super.show();
		this.registerActions();
	}

	render (user) {
		this._template = form;
		super.render(data);
		Bus.off('done-get-user', this.render.bind(this));
	}

	registerActions () {
		this.viewDiv.addEventListener('submit', this._formController.callbackSubmit.bind(this._formController));
		this.viewDiv.addEventListener('click', this._navigationController.keyPressedCallback);
	}

	static showUnsuccessMessage () {
		let errorField = document.getElementById('signInError');
		errorField.removeAttribute('hidden');
	}
}
