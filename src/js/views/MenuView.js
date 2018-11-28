import BaseView from './BaseView.js';
import Bus from '../modules/Bus.js';
import NavigationController from '../controllers/NavigationController.js';
import {openNav} from '../../css/styles/header/header.js';
import {authMenuHeader, notAuthMenuHeader} from './dataTemplates/headerMenuData.js'

const menu = require('./templates/menu.pug');

export default class MenuView extends BaseView {
	constructor () {
		super(menu);
		this._navigationController = new NavigationController();
		Bus.on('done-get-user', this.render.bind(this));
	}

	show () {
		Bus.emit('get-user');
		super.show();
		this.registerActions();
	}

	render (user) {
		if (user.is_authenticated) {
			super.render({ mainMenu: authMenuHeader(user.id), headerValues: authMenuHeader(user.id), openNav:openNav});
		} else {
			super.render({ mainMenu: notAuthMenuHeader(), headerValues: notAuthMenuHeader(), openNav:openNav });
		}
		Bus.off('done-get-user', this.render.bind(this));
	}

	registerActions () {
		this.viewDiv.addEventListener('click', this._navigationController.keyPressedCallback);
	}
}
