var reloadpage = false; var configreload = {};
angular.module('starter.controllers', ['starter.services', 'ion-gallery', 'ngCordova', 'ngSanitize', 'ngCordova.plugins', '720kb.datepicker', 'pdfjsViewer', 'angularMoment'])
	.controller('AppCtrl', function ($scope,$rootScope,$window, $ionicModal, $timeout, MyServices, CommonServices, MenuService, $ionicLoading, $location, $filter, $ionicLoading, $cordovaNetwork, $ionicPopup, $ionicSideMenuDelegate) {
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

		$scope.openMenu = function () {
			$ionicSideMenuDelegate.toggleLeft();
		}

		$rootScope.goBack=function() {    
			$window.history.back(); 
		}

		// loader
		$scope.showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
			$timeout(function () {
				$ionicLoading.hide();
			}, 1000);
		};
			$scope.showloading();

		// $(document).ready(function () {
		// 	$(".side-menu").click(function () {
		// 		$(".left-side-menu").toggle(1000);
		// 	});
		// });

		$(document).ready(function () {
			$('ul.tab li').click(function () {
				var tab_id = $(this).attr('data-tab');
				$('ul.tab li').removeClass('current');
				$('.tab-content').removeClass('current');
				$(this).addClass('current');
				$("#" + tab_id).addClass('current');
			})
		})

	})


	.controller('DashboardCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, $ionicSideMenuDelegate) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-energized"></ion-spinner>'
			});
			$timeout(function () {
				$ionicLoading.hide();
			}, 1000);
		};
		showloading();

		$scope.openMenu = function () {
			$ionicSideMenuDelegate.toggleLeft();
		}
	})
	.controller('EventsCtrl', function ($scope, $location, $window, $state, MyServices, CommonServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, $filter) {
		$scope.item;
		$scope.eventMonth;
		$scope.eventYear;
		$scope.searchEventTab1 = false;
		$scope.searchEventTab2 = false;
		$scope.upcomingEvents = false;
		$scope.completedEvents = false;
	//	$scope.upcomingNoData = false;
		$scope.noData = false;
		$scope.tabUpcomingLink = "tab-link current";
		$scope.tabCompletedLink = "tab-link ";



		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		// showloading();

		$scope.navTitle = "EVENEMENTEN";

		$scope.openMenu = function () {
			$ionicSideMenuDelegate.toggleLeft();
		}

		$scope.getUpcomingEvents = function () {
			$scope.completedEvents = false;
			$scope.noData = false;
			$scope.searchEventTab2 = false;
			$scope.upcomingEvents = true;
			$scope.searchEventTab1 = true;
			$scope.tabUpcomingLink = "tab-link current";
			$scope.tabCompletedLink = "tab-link ";
			MyServices.upcoming_events(function (data) {
				$scope.upcomingEvents_values = [];

				if (data) {
					_.each(data, function (n) {
						$scope.upcomingEvents_values.push(n);
					});
				}else{
					$scope.noData = true;
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/events");
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

		$scope.getAddress = function (address) {
			$scope.countryAddress = CommonServices.getAddress(address);
			return $scope.countryAddress;
		}

		$scope.searchEventSelectionTab = function (search, event) {
			
			var tab_selected = event.target.id;
			console.log(event.target.id);

			if (tab_selected == 'tab1') {
				$scope.completedEvents = false;
				$scope.searchEventTab2 = false;
				$scope.noData = false;
				$scope.upcomingEvents = true;
				$scope.searchEventTab1 = true;
				$scope.tabUpcomingLink = "tab-link current";
				$scope.tabCompletedLink = "tab-link ";
				MyServices.getEventSearchTab(search, tab_selected, function (data) {

					if (data.status == "0") {
						console.log("Status 0");
						$scope.upcomingEvents = false;
						$scope.noData = true;
					} else {
						$scope.upcomingEvents_values = [];
						console.log("Status 1")
						$scope.noData = false;
						$scope.completedEvents = false;
						$scope.upcomingEvents = true;
						if (data) {
							_.each(data, function (n) {
								$scope.upcomingEvents_values.push(n);
							});
						}
					}

				}, function (err) {
					$location.url("/app/events");
				})

			} else {
				$scope.upcomingEvents = false;
				$scope.noData = false;
				$scope.searchEventTab1 = false;
				$scope.completedEvents = true;
				$scope.searchEventTab2 = true;
				$scope.tabUpcomingLink = "tab-link";
				$scope.tabCompletedLink = "tab-link current";
				MyServices.getEventSearchTab(search, tab_selected, function (data) {
					console.log("value" + data.status);
					if (data.status == "0") {
						console.log("Status 0");
						$scope.completedEvents = false;
						$scope.upcomingEvents = false;
						$scope.noData = true;
					} else {
						$scope.completedEvents_values = [];
						$scope.noData = false;
						$scope.upcomingEvents = false;
						$scope.completedEvents = true;;
						if (data) {
							_.each(data, function (n) {
								$scope.completedEvents_values.push(n);
							});
						}
					}
				}, function (err) {
					$location.url("/app/events");
				})
			}
		}

		$scope.getCompletedEvents = function () {
			$scope.upcomingEvents = false;
			$scope.noData = false;
			$scope.searchEventTab1 = false;
			$scope.completedEvents = true;
			$scope.searchEventTab2 = true;
			$scope.tabUpcomingLink = "tab-link";
			$scope.tabCompletedLink = "tab-link current";
			MyServices.completed_events(function (data) {
				$scope.completedEvents_values = [];
				if (data) {
					_.each(data, function (n) {
						$scope.completedEvents_values.push(n);
					});
				}else{
					$scope.noData = true;
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/events");
			})

		}

	})
	.controller('EventsDetailCtrl', function ($scope, $rootScope, $location, $window, $stateParams, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, $filter) {
		$scope.adminEventImage = "https://devbrandz.nl/knaf/assets/images/events/"
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		};
		showloading();

		if ($stateParams.id != undefined) {
			showloading();
			$scope.eventId = $stateParams.id;
			console.log("Class id in event detail ctrl event id" + $scope.eventId);
			MyServices.getEventDetail($scope.eventId, function (data) {
				$scope.eventClass_values = [];
				$scope.eventDetail = data.event;
				$rootScope.navTitle = $scope.eventDetail.title;
				var eventClass = data.class;
				if (data) {
					_.each(eventClass, function (n) {
						$scope.eventClass_values.push(n);

					});
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/eventclass");
			})

		}

		$scope.getDate = function (getDate) {
			console.log("eventMonth" + getDate);
			//	$scope.item = $filter('date')(getDate, "yyyy-MM-dd");
			$scope.item = getDate;
			var arr = getDate.split('-');
			$scope.eventMonth = arr[1];
			$scope.eventDate = arr[2];
			if ($scope.eventMonth === "01") {
				$scope.eventMonth = "Januari";
			} else if ($scope.eventMonth === "02") {
				$scope.eventMonth = "Februari";
			} else if ($scope.eventMonth === "03") {
				$scope.eventMonth = "Maart";
			}
			else if ($scope.eventMonth === "05") {
				$scope.eventMonth = "Mei";
			} else if ($scope.eventMonth === "06") {
				$scope.eventMonth = "Juni";
			} else if ($scope.eventMonth === "07") {
				$scope.eventMonth = "Juli";
			} else if ($scope.eventMonth === "08") {
				$scope.eventMonth = "Augustus";
			} else if ($scope.eventMonth === "10") {
				$scope.eventMonth = "Oktober";
			} else {
				$scope.eventMonth;
			}
			return $scope.eventMonth, $scope.eventDate;
		}


	})
	.controller('ClassCtrl', function ($scope, $rootScope, $location, $window, $stateParams, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, $filter) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		};
		showloading();
		if ($stateParams.classId != undefined && $stateParams.eventId != undefined && $stateParams.eventId != undefined) {
			$scope.classId = $stateParams.classId;
			$scope.eventId = $stateParams.eventId;
			$scope.className = $stateParams.className;

			console.log("Class id in class detail ctrl" + $scope.classId);

			$ionicLoading.hide();
			MyServices.getEventClass($scope.classId, function (data) {
				$scope.eventClass_values = [];
				if (data) {
					_.each(data, function (n) {
						$scope.eventClass_values.push(n);

					});
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/eventclass");
			})

		}

		$scope.getClassName = function (className) {
			$scope.navTitle = className;
			return true;
		}

		$scope.getClassTabDetail = function (tabId, title, name) {
			$scope.showClassTabFiles = true;
			$scope.tabTitle = title;
			$scope.tabName = name;
			console.log("Inside get class" + tabId);
			MyServices.getEventClassTabDetail(tabId, function (data) {
				$scope.eventClassTabDetail_values = [];

				if (data) {
					_.each(data, function (n) {
						$scope.showClassTabFiles = true;
						$scope.eventClassTabDetail_values.push(n);
					});
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/classdetail");
			})

		}

		$scope.getImgFileExt = function (file) {
			var ext = file.toLowerCase().split('.');
			var fileExt = ext[1];
			if (fileExt == 'jpg') {
				return true;
			}

		}

		$scope.getPdfFileExt = function (file) {
			var ext = file.toLowerCase().split('.');
			var fileExt = ext[1];
			if (fileExt == 'pdf') {
				return true;
			}

		}
	})
	.controller('ClassDetailCtrl', function ($scope, $rootScope, $location, $window, $stateParams, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		};
		showloading();

		if ($stateParams.classId != undefined && $stateParams.eventId != undefined &&
			$stateParams.subTabId != undefined && $stateParams.file != undefined &&
			$stateParams.title != undefined && $stateParams.name != undefined) {
			var classId = $stateParams.classId;
			var eventId = $stateParams.eventId;
			var subTabId = $stateParams.subTabId;
			var file = $stateParams.file;

			$scope.tabTitle = $stateParams.title;
			$scope.tabName = $stateParams.name;

			$scope.navTitle = $scope.tabName;

			var ext = file.toLowerCase().split('.');
			var fileExt = ext[1];

			if (fileExt == 'jpg') {
				$scope.image = true;
				$scope.fileImgUrl = "https://devbrandz.nl/knaf/assets/images/events/" + eventId + "/class_" + classId + "/subtabs_" + subTabId + "/" + file;
			} else {
				$scope.pdf = true;
				$scope.filePdfUrl = "https://devbrandz.nl/knaf/assets/images/events/" + eventId + "/class_" + classId + "/subtabs_" + subTabId + "/" + file;

				$scope.srcPdf = "https://docs.google.com/viewer?url=" + $scope.filePdfUrl + "&embedded=true";

				console.log("filePdfUrl:::" + $scope.filePdfUrl);
				console.log("$scope.srcPdf:::" + $scope.srcPdf);
				$scope.data = $sce.trustAsResourceUrl($scope.filePdfUrl);
				$scope.src = $sce.trustAsResourceUrl($scope.srcPdf);

			}

			$ionicLoading.hide();
		}


	})

	.controller('NewsCtrl', function ($scope, $rootScope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, $filter) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		showloading();

		$scope.getNewsOverview = function () {
			$scope.exampleDate = moment().hour(8).minute(0).second(0).toDate();

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

		$scope.changeDate = function (newsDate) {

			$scope.item = $filter('date')(newsDate, "MM dd yyyy");
			console.log("date1date1 :: " + $scope.item);
			console.log("newsDate :: " + newsDate);

			var newDate = new Date(newsDate);
			console.log("newDate" + newDate);
			var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds    
			var diffDays = Math.round(Math.abs((newsDate - newDate) / (oneDay)));
			console.log("oneDay" + oneDay);
			console.log("diffDays" + diffDays);

			return $scope.item;
		}


	})
	.controller('NewsDetailCtrl', function ($scope, $rootScope, $location, $window, $stateParams, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		showloading();

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
		$scope.captchaWord;
		$scope.captchaError = false;

		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		showloading();

		$scope.getMap = function () {
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

		var msgforall = function (msg, title) {
			$ionicLoading.hide();
			var myPopup = $ionicPopup.show({
				template: '<p class="text-center">' + msg + '</p>',
				title: title,
				scope: $scope,
			});
			// $timeout(function () {
			// 	myPopup.close(); //close the popup after 3 seconds for some reason
			// }, 3000);
		}

		$scope.getCaptcha = function () {
			MyServices.getCaptcha(function (data) {
				$scope.catpchaValue = data;
				console.log($scope.catpchaValue.word);
				$scope.captchaWord = $scope.catpchaValue.word
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/contact");
			})
		}
		$scope.validate = function (contact) {

			if (contact.name == "" || contact.email == "" || contact.phone == "" ||
				contact.subject == "" || contact.message == "" || contact.userCaptcha == "") {
				msgforall('Fill the all fields', 'Contact Us');
			}

			$location.url("/app/contact");
		}
		$scope.clearFormData = function () {
			// $scope.contact.name = "";
			// $scope.contact.email = "";
			// $scope.contact.phone = "";
			// $scope.contact.subject = "";
			// $scope.contact.message = "";
			// $scope.contact.userCaptcha = "";
			angular.copy({}, addContact);
		}

		$scope.saveContact = function (contact) {
			$scope.validate(contact);


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

			if ($scope.captchaWord != contact.userCaptcha) {
				msgforall('Fill the captcha value is correctly', 'Contact Us');
			}
			if (check && $scope.captchaWord == contact.userCaptcha) {
				MyServices.postContactInfo(contact, function (data) {
					msgforall('Contact is added successfully', 'Contact Us');
					$scope.clearFormData();
					$location.url("/app/contact");
				}, function (err) {
					$location.url("/app/contact");
				})
			}
			else {
				msgforall('Fill all data correctly or validation error occurs', 'Contact Us');
				$ionicLoading.hide();
				$location.url("/app/contact");
			}


		}
	})
	.controller('CategoryCtrl', function ($scope, $location, $window, MyServices, CommonServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		showloading();



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
	.controller('CategoryOverviewCtrl', function ($scope, $location, $window, $stateParams, $filter, MyServices, CommonServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
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
		}
		showloading();



		if ($stateParams.id != undefined) {
			var categoryId = $stateParams.id;
			$scope.noSearchData = false;
			$scope.searchEventTab1 = false;
			$scope.upcomingEvents = true;
			$scope.searchEventTab1 = true;
			MyServices.categoryOverview(categoryId, function (data) {
				$scope.categoryUpcomingOverview_values = [];
				var categoryUpcomingEvent = data.upcomingevent;
				if (data) {
					_.each(categoryUpcomingEvent, function (n) {
						$scope.categoryUpcomingOverview_values.push(n);
					});
				}
				if (categoryUpcomingEvent.length == 0) {
					$scope.noSearchData = true;
				}

				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/CategoryOverviewCtrl");
			})

			$scope.clearSearchContent = function () {
				$scope.date = null;
				$scope.content = null;
			}

			$scope.getCompletedCategory = function () {
				$scope.completedEvents = true;
				$scope.searchEventTab2 = true;
				$scope.searchEventTab1 = false;
				$scope.noSearchData = false;
				MyServices.categoryOverview(categoryId, function (data) {
					$scope.categoryCompletedOverview_values = [];
					var categoryCompletedEvent = data.completedevent;
					if (data) {
						_.each(categoryCompletedEvent, function (n) {
							$scope.categoryCompletedOverview_values.push(n);
						});
					}
					if (categoryCompletedEvent.length == 0) {
						$scope.noSearchData = true;
					}

					$ionicLoading.hide();
				}, function (err) {
					$location.url("/app/CategoryOverviewCtrl");
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

			$scope.getAddress = function (address) {
				$scope.countryAddress = CommonServices.getAddress(address);
				return $scope.countryAddress;
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
		}

	})
	.controller('NotificationCtrl', function ($scope, $ionicPlatform, $cordovaLocalNotification) {


		// $scope.add = function () {
		// 	var alarmTime = new Date();
		// 	alarmTime.setMinutes(alarmTime.getMinutes() + 1);
		// 	$cordovaLocalNotification.add({
		// 		id: "1234",
		// 		date: alarmTime,
		// 		message: "This is a message",
		// 		title: "This is a title",
		// 		autoCancel: true,
		// 		sound: null
		// 	}).then(function () {
		// 		console.log("The notification has been set");
		// 	});
		// };

		// $ionicPlatform.ready(function () {
		// 	$scope.scheduleSingleNotification = function () {
		// 		$cordovaLocalNotification.schedule({
		// 			id: 1,
		// 			text: 'test'
		// 		})
		// 			.then(function (result) {
		// 				console.log(result);
		// 			});
		// 	}
		// });

		// $scope.schedule = function () {
		// 	console.log('Notification triggered');
		// 	$cordovaLocalNotification.schedule.schedule({
		// 		id: '222',
		// 		text: 'Some text',
		// 		title: 'Some title',
		// 		icon: 'http://sciactive.com/pnotify/includes/github-icon.png'
		// 	}).then(function () {
		// 		console.log('Notification triggered');
		// 	});
		// }
		// $scope.isScheduled = function () {
		// 	$cordovaLocalNotification.isScheduled("1234").then(function (isScheduled) {
		// 		alert("Notification 1234 Scheduled: " + isScheduled);
		// 	});
		// }

		$ionicPlatform.ready(function () {
			var date = new Date();
			$scope.notifText = 'Hello World!';

			$scope.triggerNotification = function () {

				$cordovaLocalNotification.schedule({
					id: 1,
					title: 'Dynamic Notification',
					text: $scope.notifText
				}).then(function (result) {
					console.log(result);
				});
			}

			$scope.testLocal = function () {
				cordova.plugins.notification.local.schedule({
					id: 1,
					text: 'My first notification',
					//	sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
					every: 'day',
					at: date,
					data: { key: 'value' }
				})
			}

			cordova.plugins.notification.local.schedule({
				id: 1,
				title: "Message Title",
				text: "Message Text",
				at: date,
				sound: 'file://sound.mp3',
				//	icon: "http://domain.com/icon.png"
			});

		});

		//		var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';




	})
	.controller('OveronsCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {
		//	addanalytics("Over ons");
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		};
		showloading();

		$scope.getOveronsDetails = function () {
			MyServices.overons_detail(function (data) {
				$scope.overons_values = [];
				if (data) {
					$scope.overons_values = data.result;
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/overonsdetail");
			})

		}

	})

	.controller('TabCtrl', function ($scope, $location, $stateParams, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate) {

		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		showloading();

		if ($stateParams.info != undefined) {
			$scope.information = $stateParams.info;
			$ionicLoading.hide();
		}
		//	$location.url("/app/tabinfo");		
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

