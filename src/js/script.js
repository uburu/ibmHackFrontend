import 'babel-polyfill';

import Router from './modules/Router.js';
import Bus from './modules/Bus.js';
import AuthModel from './models/AuthModel.js';

import MenuView from './views/MenuView.js';
import SignupView from './views/SignupView.js';
import SigninView from './views/SigninView.js';
import ProfileView from './views/ProfileView.js';
import ChangeView from './views/ChangeView.js';
// import LeaderboardView from './views/LeaderboardView.js';

import ProfileController from './controllers/ProfileController.js';
import ProfileModel from './models/ProfileModel.js';
import CreateRecipeView from './views/CreateRecipeView.js';
import RecipeView from './views/RecipeView.js';

// import AboutView from './views/AboutView.js';


Bus.on('profile-fetch', (id) => { ProfileModel.loadProfile(id); });
Bus.on('changes-fetch', (data) => { ProfileModel.loadProfileChanges(data); });
Bus.on('current-profile-fetch', () => { ProfileModel.loadCurrentProfile(); });

Bus.on('set-target-id', (id) => { ProfileController._setTargetId(id); });
Bus.on('profile-load', () => { ProfileController._loadProfile(); });
Bus.on('done-profile-fetch', (data) => { ProfileController._checkIdMatching(data); });
Bus.on('get-user', () => { ProfileController._getCurrentUser(); });

Bus.on('unsuccess-signup', () => { SignupView.showUnsuccessMessage(); });
Bus.on('unsuccess-signin', () => { SigninView.showUnsuccessMessage(); });
Bus.on('submit-data-signup', (data) => { AuthModel.Register(data); });
Bus.on('submit-data-signin', (data) => { AuthModel.Signin(data); });
Bus.on('submit-data-change', (data) => { ProfileController._makeSettingsChanges(data); });
Bus.on('user-signout', () => { AuthModel.Signout(); });
Bus.on('wipe-views', () => {
	Router.open('/');
});
Bus.on('error', (error) => {
	console.log(error);
	return null;
});

function main () {
	[['/', MenuView],
		['/create', SignupView],
		// ['/signin', SigninView],
		['/open', SigninView],
		['/recipe', ProfileView],
		// ['/change', ChangeView],
		// ['/create_recipe', CreateRecipeView],
		// ['/recipe', RecipeView]
		// ['/leaderboard', LeaderboardView],
		// ['/about', AboutView]
	].forEach((route) => { Router.register(route[0], route[1]); });

	Router.open(window.location.pathname);
}

main();
