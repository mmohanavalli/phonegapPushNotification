﻿var socialShare = {};
var push = {};
var googleanalyticsid = 'UA-12341234-1';
function addanalytics(screen) {
	if (window.analytics) {
		window.analytics.startTrackerWithId(googleanalyticsid);
		if (screen) {
			window.analytics.trackView(screen);
			window.analytics.trackEvent("Page Load", screen, screen, 1);
			} else {
			window.analytics.setUserId(user.id);
			window.analytics.trackEvent("User ID Tracking", "User ID Tracking", "Userid", user.id);
		}
	}
}
angular.module('starter', ['ionic', 'starter.controllers']).run(function ($ionicPlatform, MyServices ,$cordovaLocalNotification) {

	
		// $ionicPlatform.ready(function() {
		//   // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		//   // for form inputs)
		//   if (window.cordova && window.cordova.plugins.Keyboard) {
		// 	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		//   }
		//   if (window.StatusBar) {
		// 	StatusBar.styleDefault();
		//   }
		// });

		
	
})
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
	$ionicConfigProvider.views.maxCache(0);
	$httpProvider.defaults.withCredentials = true;
	$stateProvider
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})
	.state('access', {
		url: '/access',
		abstract: true,
		templateUrl: 'templates/access.html',
		controller: 'AccessCtrl'
	})	
	.state('app.dashboard', {
		url: '/dashboard',
		views: {
			'menuContent': {
				templateUrl: 'templates/appView/dashboard.html',
				controller: "DashboardCtrl"
			}
		}
	})
	.state('app.sidemenu', {
		url: '/sidemenu',
		views: {
			'menuContent': {
				templateUrl: 'templates/appView/sideMenu.html',
			//	controller: "DashboardCtrl"
			}
		}
	})
	.state('app.events', {
		url: '/events',
		views: {
			'menuContent': {
				templateUrl: 'templates/appView/events.html',
				controller: "EventsCtrl"
			}
		}
	})
	.state('app.overonsdetail', {
		url: '/overonsdetail',
		views: {
			'menuContent': {
				templateUrl: 'templates/appView/overonsdetail.html',
				// controller: "OveronsCtrl"
			}
		}
	})
	.state('app.news', {
		url: '/news',
		views: {
			'menuContent': {
				templateUrl: 'templates/appView/news.html',
				controller: "NewsCtrl"
			}
		}
	})
	.state('app.newsdetail', {
		url: '/detail/:id',
		views: {
			'menuContent': {
				templateUrl: 'templates/appView/news-detail.html',
				controller: "NewsDetailCtrl"
			}
		}
	})			
	.state('app.contact', {
		url: '/contact',
		views: {
			'menuContent': {
				templateUrl: 'templates/appView/contact.html',
				controller: "ContactCtrl"
			}
		}
	})
	.state('app.category', {
		url: '/category',
		views: {
			'menuContent': {
				templateUrl: 'templates/appView/category.html',
			//	controller: "OveronsCtrl"
			}
		}
	})
	// .state('app.notification', {
	// 	url: '/notification',
	// 	views: {
	// 		'menuContent': {
	// 			templateUrl: 'templates/appView/notification.html',
	// 			controller: "NotificationCtrl"
	// 		}
	// 	}
	// })	
	
	.state('app.tabinfo', {
		url: '/info',
		views: {
			'menuContent': {
				templateUrl: 'templates/appView/tab-detail-info.html',
				controller: "OveronsCtrl"
			}
		}
	})
	.state('app.splash', {
		url: '/splash',
		views: {
			'menuContent': {
				templateUrl: 'templates/appView/splash.html',
				controller: "SplashCtrl"
			}
		}
	})
	
	
	 $urlRouterProvider.otherwise('/app/splash');
})