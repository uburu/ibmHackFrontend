import BaseView from './BaseView.js';
import Bus from '../modules/Bus.js';
import NavigationController from '../controllers/NavigationController.js';
import {authMenuHeader, notAuthMenuHeader} from './dataTemplates/headerMenuData.js'
// var QRCode = require('qrcode')

const preloadTmpl = require('./templates/preload.pug');
const myProfileTmpl = require('./templates/myProfile.pug');
const notMyProfileTmpl = require('./templates/notMyProfile.pug');

const http = require('http');

export default class ProfileView extends BaseView {
	constructor () {
		super(myProfileTmpl);
		this._navigationController = new NavigationController();
		this._currentUser = null;
		this.preload();
		Bus.on('done-get-user', this._setCurrentUser.bind(this));
		Bus.on('profile-render', this.render.bind(this));
	}


	_setCurrentUser(user) {
		this._currentUser = user;
	}

	show () {
		Bus.emit('get-user');
		Bus.emit('profile-load'); // идем в profileController и загружаем пользователя 
		super.show();
		this.registerActions();
	}

	render (renderData) {
		console.log("rndr ", renderData);
		const data = {
			title: 'Profile',
			user: renderData.user,
			headerValues: notAuthMenuHeader()
		};
		this._template = notMyProfileTmpl;
		super.render(data);

		// if (renderData.myProfile) { // залогинен и хочет посмотреть свой профиль
		// 	const data = {
		// 		title: 'Profile',
		// 		// changeHref: `/change/${renderData.user.id}`,
		// 		user: renderData.user,
		// 		// headerValues: authMenuHeader(renderData.user.id)
		// 	};
		// 	this._template = myProfileTmpl;
		// 	super.render(data);
		// } else { // если залогинен и хочет посмотреть не свой профиль или не залогинен вовсе

		// 	if (this._currentUser.is_authenticated){
		// 		const data = {
		// 			title: 'Profile',
		// 			user: renderData.user,
		// 			headerValues:  authMenuHeader(this._currentUser.id)
		// 		};
		// 		this._template = notMyProfileTmpl;
		// 		super.render(data);


		// 	} else {
				
		// 	}
		// }
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
