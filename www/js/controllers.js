var reloadpage = false; var configreload = {};
angular.module('starter.controllers', ['starter.services', 'ion-gallery', 'ngCordova', 'ngSanitize', 'ngCordova.plugins', '720kb.datepicker'])
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

		$(document).ready(function () {

			$(".side-menu").click(function () {

				$(".left-side-menu").toggle(1000);
			});
		});


	})


	.controller('DashboardCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
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
	.controller('EventsCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, $filter, $cordovaDatePicker) {
		$scope.item;
		$scope.eventMonth;
		$scope.eventYear;
		$scope.searchEventTab1 = false;
		$scope.searchEventTab2 = false;
		$scope.upcomingEvents = false;
		$scope.upcomingEventsSearchList = false;
		$scope.completedEvents = false;
		$scope.completedEventsSearchList = false;
		$scope.noSearchData = false;

		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
			$timeout(function () {
				$ionicLoading.hide();
			}, 1000);
		}

		$scope.getUpcomingEvents = function () {
			$scope.upcomingEvents = true;
			$scope.searchEventTab1 = true;
			MyServices.upcoming_events(function (data) {
				$scope.upcomingEvents_values = [];

				if (data) {
					_.each(data, function (n) {
						$scope.upcomingEvents_values.push(n);
					});
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/access/events");
			})

		}

		$scope.getDate = function (getDate) {
			$scope.item = $filter('date')(getDate, "MMM-yyyy");
			var arr = $scope.item.split('-');
			$scope.eventMonth = arr[0];
			$scope.eventYear = arr[1];
			if ($scope.eventMonth === "Mar") {
				$scope.eventMonth = "Maa";

			} else if ($scope.eventMonth === "May") {
				$scope.eventMonth = "Mei";
			} else if ($scope.eventMonth === "Oct") {
				$scope.eventMonth = "Okt";
			} else {
				$scope.eventMonth;
			}
			return $scope.eventMonth, $scope.eventYear;

		}

		$scope.searchEventSelectionTab1 = function (search) {
			$scope.searchEventTab1 = true;
			$scope.searchEventTab2 = false;
			var tab_selected = 'tab1';
			MyServices.getEventSearchTab1(search, tab_selected, function (data) {

				if (data.status == "0") {
					console.log("Status 0");
					$scope.upcomingEvents = false;
					$scope.upcomingEventsSearchList = false;
					$scope.noSearchData = true;					
				} else {
					$scope.upcomingSearchEvents_values = [];
					console.log("Status 1")
					$scope.upcomingEvents = false;
					$scope.noSearchData = false;
					$scope.upcomingEventsSearchList = true;
					if (data) {
						_.each(data, function (n) {
							$scope.upcomingSearchEvents_values.push(n);
						});
					}
				}

			}, function (err) {
				$location.url("/app/events");
			})

		}

		$scope.getCompletedEvents = function () {
			$scope.completedEvents = true;
			$scope.searchEventTab2 = true;
			$scope.searchEventTab1 = false;
			$scope.completedEventsSearchList = false;
			MyServices.completed_events(function (data) {
				$scope.completedEvents_values = [];
				if (data) {
					_.each(data, function (n) {
						$scope.completedEvents_values.push(n);
					});
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/access/events");
			})

		}

		$scope.searchEventSelectionTab2 = function (search) {
			var tab_selected = 'tab2';
			MyServices.getEventSearchTab1(search, tab_selected, function (data) {
				console.log("value" + data.status);
				if (data.status == "0") {
					console.log("Status 0");
					$scope.completedEvents = false;
					$scope.completedEventsSearchList = false;
					$scope.noSearchData = true;
				} else {					
					$scope.completedSearchEvents_values = [];
					$scope.completedEvents = false;
					$scope.noSearchData = false;
					$scope.completedEventsSearchList = true;
					if (data) {
						_.each(data, function (n) {
							$scope.completedSearchEvents_values.push(n);
						});
					}
				}
			}, function (err) {
				$location.url("/app/events");
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
	.controller('ContactCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, $ionicPopup) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
			$timeout(function () {
				$ionicLoading.hide();
			}, 1000);
		}

		var msgforall = function (msg, title) {
			$ionicLoading.hide();
			var myPopup = $ionicPopup.show({
				template: '<p class="text-center">' + msg + '</p>',
				title: title,
				scope: $scope,
			});
			$timeout(function () {
				myPopup.close(); //close the popup after 3 seconds for some reason
			}, 3000);
		}

		$scope.getMap = function () {
			// for(var key in data) {
			// 	var value = data[key];
			var geocoder = new google.maps.Geocoder();
			var address = 'KNAF Federatiebureau' + ' ' + ' Duwboot 85' + ',  ' + '3991 CG houten';
			geocoder.geocode({ 'address': address }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();
				}
				var myMarkers = {
					"markers": [
						{ "latitude": latitude, "longitude": longitude, "icon": "img/marknew.png", "baloon_text": address }
					]
				};
				$("#map_canvas").mapmarker({
					zoom: 15,
					center: address,
					markers: myMarkers
				});
			});
			$ionicLoading.hide(); $('#popupMenu').hide();
		}

		$scope.addContact = function (contact) {


			$scope.allvalidation = [{
				field: contact.name,
				validation: ""
			}, {
				field: contact.email,
				validation: ""
			}, {
				field: contact.phone,
				validation: ""
			}, {
				field: contact.subject,
				validation: ""
			}, {
				field: contact.message,
				validation: ""
			}];
			var check = formvalidation($scope.allvalidation);
			if (check) {
				//	MyServices.validateContact(contact, callback, function (err) {
				$location.url("/access/offline");
				//	});
			}
			else {
				msgforall('Fill all data or validation error occurs', 'Contact Us');
				$ionicLoading.hide();
			}

			MyServices.postContactInfo(contact, function (data) {
				//	$scope.contact = [];
				console.log("value" + data.status);
				console.log("value" + data.message);
				// for(var key in data) {
				// 	var value = data[key];
				// 	console.log ("value"+value);
				// }
			}, function (err) {
				$location.url("/app/contact");
			})
		}
	})
	.controller('CategoryCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
			$timeout(function () {
				$ionicLoading.hide();
			}, 1000);
		}
		$scope.getCatgories = function () {
			MyServices.categoryList(function (data) {
				$scope.categoryList_values = [];
				if (data) {
					_.each(data, function (n) {
						$scope.categoryList_values.push(n);
					});
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/category");
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
		$scope.getOveronsDetails = function () {
			MyServices.overons_detail(function (data) {
				$scope.overons_values = [];
				if (data) {
					//_.each(data, function (n) {
					$scope.overons_values = data.result;
					//});
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
	})
	.filter('split', function () {
		return function (input, splitChar, splitIndex) {
			// do some bounds checking here to ensure it has that index
			return input.split(splitChar)[splitIndex];
		}
	})
	.directive('jqdatepicker', function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			controller: 'EventsCtrl',
			link: function (scope, element, attrs, ngModelCtrl) {
				$(element).datepicker({
					dateFormat: 'DD, d  MM, yy',
					onSelect: function (date) {
						scope.date = date;
						scope.$apply();
					}
				});
			}
		};
	});