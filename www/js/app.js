var socialShare = {};
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
angular.module('starter', ['ionic', 'starter.controllers','ngCordova','angularMoment']).run(function ($ionicPlatform, MyServices, CommonServices, $cordovaLocalNotification, amMoment) {


	$ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
		}
	});

	  amMoment.changeLocale('de');


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
			
			.state('app.events', {
				url: '/events',
				views: {
					'menuContent': {
						templateUrl: 'templates/appView/event-selection.html',
						controller: "EventsCtrl"
					}
				}
			})
			.state('app.eventdetail', {
				url: '/eventdetail/:id',
				views: {
					'menuContent': {
						templateUrl: 'templates/appView/eventdetail.html',
						controller: "EventsDetailCtrl"
					}
				}
			})
			.state('app.eventclass', {
				url: '/eventclass/:eventId/:classId/:className',
				views: {
					'menuContent': {
						templateUrl: 'templates/appView/class-page.html',
						controller: "ClassCtrl"
					}
				}
			})
			.state('app.classdetail', {
				url: '/classdetail/:eventId/:classId/:title/:subTabId/:name/:file',
				views: {
					'menuContent': {
						templateUrl: 'templates/appView/classdetail.html',
						controller: "ClassDetailCtrl"
					}
				}
			})
			.state('app.overonsdetail', {
				url: '/overonsdetail',
				views: {
					'menuContent': {
						templateUrl: 'templates/appView/over-ons.html',
						controller: "OveronsCtrl"
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
						controller: "CategoryCtrl"
					}
				}
			})
			.state('app.categoryoverview', {
				url: '/categoryoverview/:id',
				views: {
					'menuContent': {
						templateUrl: 'templates/appView/categoryoverview.html',
						controller: "CategoryOverviewCtrl"
					}
				}
			})
			.state('app.notification', {
				url: '/notification',
				views: {
					'menuContent': {
						templateUrl: 'templates/appView/notification.html',
						controller: "NotificationCtrl"
					}
				}
			})	

			.state('app.tabinfo', {
				url: '/info/:info',
				views: {
					'menuContent': {
						templateUrl: 'templates/appView/tab-detail-info.html',
						controller: "TabCtrl"
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
	});

var formvalidation = function (allvalidation) {
	var isvalid2 = true;
	for (var i = 0; i < allvalidation.length; i++) {
		if (allvalidation[i].field == "" || !allvalidation[i].field) {
			allvalidation[i].validation = "ng-dirty";
			isvalid2 = false;
		} else {
			allvalidation[i].validation = "";
		}
	}
	return isvalid2;
}