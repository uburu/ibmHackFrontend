import BaseView from './BaseView.js';
import Bus from '../modules/Bus.js';
import NavigationController from '../controllers/NavigationController.js';
import {authMenuHeader, notAuthMenuHeader} from './dataTemplates/headerMenuData.js'
import { fetchModule } from '../modules/ajax.js';

const preloadTmpl = require('./templates/preload.pug');
const recipeTmpl = require('./templates/preload.pug');


export default class RecipeView extends BaseView {
	constructor () {
		super(recipeTmpl);
		this._navigationController = new NavigationController();
		this._currentUser = null;
		// this.preload();

		Bus.on('done-get-user', this._setCurrentUser.bind(this));
		Bus.on('profile-render', this.render.bind(this));
	}


	_setCurrentUser(user) {
		this._currentUser = user;
	}

	show () {
		// Bus.emit('get-user');
		Bus.emit('profile-load'); // идем в profileController и загружаем пользователя 
		super.show();
		this.registerActions();
	}

	render (renderData) {
		console.log(renderData);
		const data = {
			title: 'Profile',
			block: renderData.block,
			headerValues:  authMenuHeader(this._currentUser.id)
		};
		this._template = recipeTmpl;
		super.render(data);

		Bus.off('profile-render', this.render.bind(this));
		Bus.off('done-get-user', this._setCurrentUser.bind(this));
	}

	preload () {
		const data = {
			title: 'Profile',
			headerValues: notAuthMenuHeader()
		};
		this.viewDiv.innerHTML = '';
		this.viewDiv.innerHTML = preloadTmpl(data);
	}
	

	registerActions () {
	}
}
