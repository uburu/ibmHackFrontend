import BaseView from './BaseView.js';
import Bus from '../modules/Bus.js';
import NavigationController from '../controllers/NavigationController.js';

import {authMenuHeader, notAuthMenuHeader} from './dataTemplates/headerMenuData.js'

const about = require('./templates/about.pug');

const data = [
	{
		label: "💣БОМБИЧ🔥 - возраждение легендарной NES игры"
	},
	{
		label: "Цель игры:"
	},
	{
		label: "Победить всех противников, подорвав их бомбой."
	},
	{
		label: "Управление:"
	},
	{
		label: "w (⬆️) - перейти на клетку вверх"
	},
	{
		label: "s (⬇️) - перейти на клетку вниз"
	},
	{
		label: "a (⬅️) - перейти на клетку влево"
	},
	{
		label: "d (➡️) - перейти на клетку вправо"
	},
	{
		label: "пробел - заложить бомбу"
	}
];

export default class AboutView extends BaseView {
	constructor () {
		super(about);
		this._navigationController = new NavigationController();

		Bus.on('done-get-user', this.render.bind(this));
	}

	show () {
		Bus.emit('get-user');
		super.show();
		this.registerActions();
	}

	// так же как  в меню 
	render (user) {
		if (user.is_authenticated) {
			super.render({aboutMenu: data, headerValues:authMenuHeader(user.id)})
		} else {
			super.render({aboutMenu: data, headerValues:notAuthMenuHeader()})
		}
		Bus.off('done-get-user', this._setCurrentUser.bind(this));
	}

	registerActions () {
		this.viewDiv.addEventListener('click', this._navigationController.keyPressedCallback);
	}
}
