var reloadpage = false; var configreload = {};
angular.module('starter.controllers', ['starter.services', 'ion-gallery', 'ngCordova', 'ngSanitize', 'ngCordova.plugins'])
	.controller('AppCtrl', function ($scope, $ionicModal, $timeout, MyServices, $ionicLoading, $location, $filter, $ionicLoading, $cordovaNetwork, $ionicPopup) {
		$('footer').show();
		addanalytics("flexible menu");
		$ionicLoading.hide();
		function internetaccess(toState) {
			if (navigator) {
				if (navigator.onLine != true) {
					onoffline = false;
					$location.url("/access/offline");
				} else {
					onoffline = true;
				}
			}
		}
		$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			internetaccess(toState);
		});
		window.addEventListener("offline", function (e) {
			internetaccess();
		})
		window.addEventListener("online", function (e) {
			internetaccess();
		})
		$scope.menudata = [];
		var loginstatus = false;
		// loader
		$scope.showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
			$timeout(function () {
				$ionicLoading.hide();
			}, 1000);
		};
		//	$scope.showloading();
		
	})
	
	
	.controller('DashboardCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
		$scope.search_values = {};
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
			$timeout(function () {
				$ionicLoading.hide();
			}, 1000);
		};
		showloading();
	})
	.controller('EventsCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
			$timeout(function () {
				$ionicLoading.hide();
			}, 1000);
		}
		$scope.getCompletedEvents = function () {
			MyServices.completed_events(function (data) {
				$scope.overons_values = [];
				if (data) {
					_.each(data, function (n) {
						$scope.overons_values.push(n);
					});
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/access/overonsdetail");
			})

		}
		$scope.getUpcomingEvents = function () {
			MyServices.upcoming_events(function (data) {
				$scope.overons_values = [];
				if (data) {
					_.each(data, function (n) {
						$scope.overons_values.push(n);
					});
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/access/overonsdetail");
			})

		}

	})
	.controller('NewsCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
			$timeout(function () {
				$ionicLoading.hide();
			}, 1000);
		}
		$scope.getNewsOverview = function () {
			$scope.adminimage = "https://devbrandz.nl/knaf/images/newsimages/";
			MyServices.news_overview(function (data) {
				$scope.newsOverview_values = [];
				if (data) {
					_.each(data, function (n) {
						$scope.newsOverview_values.push(n);
					});
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/news");
			})

		}

	})
	.controller('NewsDetailCtrl', function ($scope, $location, $window, $stateParams, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
			$timeout(function () {
				$ionicLoading.hide();
			}, 1000);
		}
		if ($stateParams.id != undefined) {
			$scope.adminimage = "https://devbrandz.nl/knaf/images/newsimages/";
			var newsId = $stateParams.id;
			MyServices.news_detail(newsId, function (data) {
				$scope.newsDetails_values = [];
				if (data) {
					_.each(data, function (n) {
						$scope.newsDetails_values.push(n);
					});
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/newsdetail");
			})

		}

	})
	.controller('ContactCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
			$timeout(function () {
				$ionicLoading.hide();
			}, 1000);
		}
		$scope.addContact = function (contact) {

			$scope.contactData = {
				"name": contact.name, "email": contact.email, "phone": contact.phone,
				"subject": contact.subject, "message": contact.message
			};

			MyServices.postContactInfo(contact, function (data) {
				//	$scope.contact = [];
				console.log("value" + data);
				// for(var key in data) {
				// 	var value = data[key];
				// 	console.log ("value"+value);
				// }
			}, function (err) {
				$location.url("/app/contact");
			})
		}
	})
	.controller('NotificationCtrl', function ($scope, $ionicPlatform, $cordovaLocalNotification) {


		$scope.add = function () {
			var alarmTime = new Date();
			alarmTime.setMinutes(alarmTime.getMinutes() + 1);
			$cordovaLocalNotification.add({
				id: "1234",
				date: alarmTime,
				message: "This is a message",
				title: "This is a title",
				autoCancel: true,
				sound: null
			}).then(function () {
				console.log("The notification has been set");
			});
		};

		$ionicPlatform.ready(function () {
			$scope.scheduleSingleNotification = function () {
				$cordovaLocalNotification.schedule({
					id: 1,
					text: 'test'
				})
					.then(function (result) {
						console.log(result);
					});
			}
		});

		$scope.schedule = function () {
			console.log('Notification triggered');
			$cordovaLocalNotification.schedule.schedule({
				id: '222',
				text: 'Some text',
				title: 'Some title',
				icon: 'http://sciactive.com/pnotify/includes/github-icon.png'
			}).then(function () {
				console.log('Notification triggered');
			});
		}
		$scope.isScheduled = function () {
			$cordovaLocalNotification.isScheduled("1234").then(function (isScheduled) {
				alert("Notification 1234 Scheduled: " + isScheduled);
			});
		}
	})
	.controller('OveronsCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
		$scope.overons_values = [];
		//	addanalytics("Over ons");
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		};
		$scope.getCompletedEvents = function () {
			MyServices.completed_events(function (data) {
				$scope.overons_values = [];
				if (data) {
					_.each(data, function (n) {
						$scope.overons_values.push(n);
					});
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/access/overonsdetail");
			})

		}

	})

	.controller('SplashCtrl', function ($scope, $location, $stateParams, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
		$timeout(function () {
			$location.url("/app/dashboard");
		}, 3000);
		$('footer').hide();
		$('body').attr('id', 'splash');
	});