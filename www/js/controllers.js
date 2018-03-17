var reloadpage = false; var configreload = {};
angular.module('starter.controllers', ['starter.services', 'ion-gallery', 'ngCordova', 'ngSanitize', 'ngCordova.plugins', '720kb.datepicker', 'pdfjsViewer', 'angularMoment', 'ionic-toast',  'ngAnimate'])
	.controller('AppCtrl', function ($scope, $rootScope, $window, $ionicModal, $timeout, MyServices, CommonServices, MenuService, $ionicLoading, $location, $filter, $ionicLoading, $cordovaNetwork, $ionicPopup, $ionicSideMenuDelegate, ionicToast) {
		$('footer').show();
		$ionicLoading.hide();
		function internetaccess(toState) {
			if (navigator) {
				if (navigator.onLine != true) {
					onoffline = false;
					$location.url("/app/offline");
				} else {
					onoffline = true;
				}
			}
		}
		$window.sessionStorage.setItem('notificationInit',true);
		$rootScope.sessionValue = $window.sessionStorage.getItem('notificationInit');
		$rootScope.sessionClassValue = true ;

		$rootScope.menu1 = "menu-1 active item item-complex";
		$rootScope.menu2 = "menu-2  item item-complex";
		$rootScope.menu3 = "menu-3  item item-complex";
		$rootScope.menu4 = "menu-4  item item-complex";
		$rootScope.menu5 = "menu-5  item item-complex";



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

		$rootScope.goBack = function () {
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
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
		$scope.showloading();
	})
	.controller('OfflineCtrl', function ($scope, $ionicLoading,ionicToast) {
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
		$ionicLoading.hide();
		$('footer').hide();
		$('ion-header-bar').hide();
		$('body').attr('id', 'splash');
	})

	.controller('DashboardCtrl', function ($scope,$rootScope, $location, $window, MyServices, $ionicLoading, $ionicPlatform, $timeout, $sce, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, ionicToast) {
		
		$rootScope.menu1 = "menu-1 active item item-complex";
		$rootScope.menu2 = "menu-2  item item-complex";
		$rootScope.menu3 = "menu-3  item item-complex";
		$rootScope.menu4 = "menu-4  item item-complex";
		$rootScope.menu5 = "menu-5  item item-complex";
	
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-energized"></ion-spinner>'
			});			
		};
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
		showloading();

		$scope.openMenu = function () {
			$ionicSideMenuDelegate.toggleLeft();
		}	

		$scope.hideToastMessage = function () {
			ionicToast.hide();
		}

		$scope.showToast = function () {
			showloading();
			MyServices.getGlobalNotification(function (data) {
				$scope.globalNotification = data;
				if ($scope.globalNotification.active == '1' && $rootScope.sessionValue) {
					var message = '<img src="img/notification-bell.png"/>'
					//	ionicToast.show($scope.globalNotification.notification, 'top', true, 2500);
					ionicToast.show(message + $scope.globalNotification.notification, 'top', true, 2500);
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/offline");
			})
		}

		$('ion-header-bar').show();
		

	})
	.controller('EventsCtrl', function ($scope,$rootScope, $location, $window, $state, MyServices, CommonServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, $filter, ionicToast) {
		
		$rootScope.menu1 = "menu-1  item item-complex";
		$rootScope.menu2 = "menu-2  active item item-complex";
		$rootScope.menu3 = "menu-3  item item-complex";
		$rootScope.menu4 = "menu-4  item item-complex";
		$rootScope.menu5 = "menu-5  item item-complex";

		$scope.item;
		$scope.eventMonth;
		$scope.eventYear;
		$scope.searchEventTab1 = false;
		$scope.searchEventTab2 = false;
		$scope.upcomingEvents = false;
		$scope.completedEvents = false;
		$scope.noData = false;
		$scope.tabUpcomingLink = "tab-link current";
		$scope.tabCompletedLink = "tab-link ";

		$rootScope.sideMenuActive = 'active';

		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
		showloading();

		$scope.navTitle = "EVENEMENTEN";

		$scope.openMenu = function () {
			$ionicSideMenuDelegate.toggleLeft();
		}

		$scope.getUpcomingEvents = function () {
			showloading();
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
				} else {
					$scope.noData = true;
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/offline");
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
			showloading();
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
					$ionicLoading.hide();

				}, function (err) {
					$location.url("/app/offline");
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
					$ionicLoading.hide();
				}, function (err) {
					$location.url("/app/offline");
				})
			}
		}

		$scope.getCompletedEvents = function () {
			showloading();
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
				} else {
					$scope.noData = true;
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/offline");
			})

		}

	})
	.controller('EventsDetailCtrl', function ($scope, $rootScope, $location, $window, $stateParams, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, $filter, ionicToast) {
		$scope.adminEventImage = "https://devbrandz.nl/knaf/assets/images/events/"
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		};
		showloading();

		$scope.hideToastMessage = function () {
			ionicToast.hide();
		}

		if ($stateParams.id != undefined) {
			showloading();
			$scope.eventId = $stateParams.id;
			$scope.eventDate;
			console.log("Class id in event detail ctrl event id" + $scope.eventId);
			MyServices.getEventDetail($scope.eventId, function (data) {
				$scope.eventClass_values = [];
				$scope.eventDetail = data.event;
				$scope.navTitle = $scope.eventDetail.title;
				$scope.eventDate = $scope.getDate(data.event.event_date);
				if ($scope.eventDetail.push_active == '1' && $rootScope.sessionValue) {
				//	var plain_text = $filter('htmlToPlaintext')($scope.eventDetail.push_notify);
					var message = '<img src="img/notification-bell.png"/> ' ;
					ionicToast.show(message+ $scope.eventDetail.push_notify , 'top', true, 2500);
				}
				var eventClass = data.class;
				if (data) {
					_.each(eventClass, function (n) {
						$scope.eventClass_values.push(n);

					});
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/offline");
			})

		}

		$scope.getDate = function (getDate) {
			console.log("eventMonth" + getDate);
			var monthAndDate = [];
			var arr = getDate.split('-');
			$scope.eventMonth = arr[1];
			$scope.eventDate = arr[2];
			if ($scope.eventMonth === "01") {
				$scope.eventMonth = "Januari";
			} else if ($scope.eventMonth === "02") {
				$scope.eventMonth = "Februari";
			} else if ($scope.eventMonth === "03") {
				$scope.eventMonth = "Maart";
			}else if ($scope.eventMonth === "04") {
				$scope.eventMonth = "April";
			}
			else if ($scope.eventMonth === "05") {
				$scope.eventMonth = "Mei";
			} else if ($scope.eventMonth === "06") {
				$scope.eventMonth = "Juni";
			} else if ($scope.eventMonth === "07") {
				$scope.eventMonth = "Juli";
			} else if ($scope.eventMonth === "08") {
				$scope.eventMonth = "Augustus";
			}
			else if ($scope.eventMonth === "09") {
				$scope.eventMonth = "September";
			} else if ($scope.eventMonth === "10") {
				$scope.eventMonth = "Oktober";
			}
			else if ($scope.eventMonth === "11") {
				$scope.eventMonth = "November";
			}
			else if ($scope.eventMonth === "12") {
				$scope.eventMonth = "December";
			} else {
				$scope.eventMonth;
			}
			monthAndDate.push($scope.eventDate ,$scope.eventMonth  );
			return monthAndDate;
		}


	})
	.controller('ClassCtrl', function ($scope, $rootScope, $location, $window, $stateParams, MyServices, $ionicLoading, $timeout,$interval, $sce, $ionicSlideBoxDelegate, $filter, ionicToast) {
		$scope.switchOn = false;
		$scope.switchOff = false;
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		};
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
		showloading();

		$scope.hideToastMessage = function () {
			ionicToast.hide();
		}

		$scope.initStatus = function () {
			if($rootScope.sessionValue && $rootScope.sessionClassValue){
			$scope.switchOn = true;
			$scope.switchOff = false;
			}else{
				$scope.switchOn = false;
				$scope.switchOff = true;
			}
		}

		if ($stateParams.classId != undefined && $stateParams.eventId != undefined && $stateParams.eventId != undefined) {
			$scope.classId = $stateParams.classId;
			$scope.eventId = $stateParams.eventId;
			$scope.className = $stateParams.className;
			showloading();

			console.log("Class id in class detail ctrl" + $scope.classId);

			MyServices.getEventClass($scope.classId, function (data) {
				$scope.eventClass_values = [];
				if (data) {
					_.each(data, function (n) {
						$scope.eventClass_values.push(n);

					});
					if($scope.eventClass_values.length!='0'){
						if ($scope.eventClass_values[0].push_class_active == '1' && $rootScope.sessionValue && $rootScope.sessionClassValue) {
						//	var plain_text = $filter('htmlToPlaintext')($scope.eventClass_values.push_class_notify[0]);
							var message = '<img src="img/notification-bell.png"/> ' + $scope.eventClass_values[0].push_class_notify
							ionicToast.show(message , 'top', true, 2500);
							$window.sessionStorage.setItem('classNotification',message);
						}
					}
				}				
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/offline");
			})

		}				
		
		$scope.ShowHide = function () {
			//If DIV is visible it will be hidden and vice versa.
			$scope.switchOn = !$scope.switchOn;
			if (!$scope.switchOn) {
				$scope.switchOn = false;
				$scope.switchOff = true;
			//	$rootScope.sessionValue = false;
				$rootScope.sessionClassValue = false;
				$window.sessionStorage.removeItem('notificationInit');
				console.log("Session inside session off  :" + $window.sessionStorage.getItem('notificationInit'));	
			} else if ($scope.switchOn) {
				$scope.switchOn = true;
				$scope.switchOff = false;
			//	$rootScope.sessionValue = true;	
				$rootScope.sessionClassValue = true;
				if($rootScope.sessionValue){
				var message = $window.sessionStorage.getItem('classNotification');
				$interval(toastMessage, 4000);	
			       function	toastMessage(){
					ionicToast.show(message , 'top', true, 2500);
				}	
			}
			}
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
			showloading();
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
	.controller('ClassDetailCtrl', function ($scope, $rootScope, $location, $window, $stateParams, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, ionicToast) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		};
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
		showloading();

		if ($stateParams.classId != undefined && $stateParams.eventId != undefined &&
			$stateParams.subTabId != undefined && $stateParams.file != undefined &&
			$stateParams.title != undefined && $stateParams.name != undefined) {
			var classId = $stateParams.classId;
			var eventId = $stateParams.eventId;
			var subTabId = $stateParams.subTabId;
			var file = $stateParams.file;
			showloading();

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

				$scope.data = $sce.trustAsResourceUrl($scope.filePdfUrl);
				$scope.src = $sce.trustAsResourceUrl($scope.srcPdf);				
			}
			$ionicLoading.hide();
		}


	})

	.controller('NewsCtrl', function ($scope, $rootScope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, $filter, ionicToast) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
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
				$location.url("/app/offline");
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
	.controller('NewsDetailCtrl', function ($scope, $rootScope, $location, $window, $stateParams, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, ionicToast) {
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
		showloading();

		$scope.goTo = function () {
			$location.url("/app/news");
		}
		$scope.hideToastMessage = function () {
			ionicToast.hide();
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
				$location.url("/app/offline");
			})

		}

	})
	.controller('ContactCtrl', function ($scope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, $ionicPopup, ionicToast) {
		$scope.captchaWord;
		$scope.captchaError = false;

		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
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
			$timeout(function () {
				myPopup.close(); //close the popup after 3 seconds for some reason
			}, 3000);
		}

		$scope.getCaptcha = function () {
			MyServices.getCaptcha(function (data) {
				$scope.catpchaValue = data;
				console.log($scope.catpchaValue.word);
				$scope.captchaWord = $scope.catpchaValue.word
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/offline");
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
					$location.url("/app/offline");
				})
			}
			else {
				msgforall('Fill all data correctly or validation error occurs', 'Contact Us');
				$ionicLoading.hide();
				$location.url("/app/contact");
			}


		}
	})
	.controller('CategoryCtrl', function ($scope,$rootScope, $location, $window, MyServices, CommonServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, ionicToast) {
		$rootScope.menu1 = "menu-1  item item-complex";
		$rootScope.menu2 = "menu-2  item item-complex";
		$rootScope.menu3 = "menu-3  active item item-complex";
		$rootScope.menu4 = "menu-4  item item-complex";
		$rootScope.menu5 = "menu-5  item item-complex";

		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
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
				$location.url("/app/offline");
			})

		}
	})
	.controller('CategoryOverviewCtrl', function ($scope, $location, $window, $stateParams, $filter, MyServices, CommonServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, ionicToast) {
		$scope.item;
		$scope.eventMonth;
		$scope.eventYear;
		$scope.searchEventTab1 = false;
		$scope.searchEventTab2 = false;
		$scope.upcomingEvents = false;
		$scope.completedEvents = false;
		$scope.noData = false;
		$scope.tabUpcomingLink = "tab-link current";
		$scope.tabCompletedLink = "tab-link ";
		
		$scope.goTo = function () {
			$location.url("/app/category");
		}

		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
		showloading();



		if ($stateParams.id != undefined) {
			var categoryId = $stateParams.id;		
			showloading();
			$scope.completedEvents = false;
			$scope.noData = false;
			$scope.searchEventTab2 = false;
			$scope.upcomingEvents = true;
			$scope.searchEventTab1 = true;
			$scope.tabUpcomingLink = "tab-link current";
			$scope.tabCompletedLink = "tab-link ";
			MyServices.categoryOverview(categoryId,function (data) {
				$scope.categoryUpcomingOverview_values = [];
				var categoryUpcomingEvent = data.upcomingevent;

				if (data) {
					_.each(categoryUpcomingEvent, function (n) {
						$scope.categoryUpcomingOverview_values.push(n);
					});
				} 
				if (categoryUpcomingEvent.length == 0) {
					$scope.noData = true;
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/offline");
			})

			$scope.getUpcomingCategory = function (){

				showloading();
			$scope.completedEvents = false;
			$scope.noData = false;
			$scope.searchEventTab2 = false;
			$scope.upcomingEvents = true;
			$scope.searchEventTab1 = true;
			$scope.tabUpcomingLink = "tab-link current";
			$scope.tabCompletedLink = "tab-link ";
			MyServices.categoryOverview(categoryId,function (data) {
				$scope.categoryUpcomingOverview_values = [];
				var categoryUpcomingEvent = data.upcomingevent;

				if (data) {
					_.each(categoryUpcomingEvent, function (n) {
						$scope.categoryUpcomingOverview_values.push(n);
					});
				} 
				if (categoryUpcomingEvent.length == 0) {
					$scope.noData = true;
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/offline");
			})

			}

			$scope.clearSearchContent = function () {
				$scope.date = null;
				$scope.content = null;
			}

			$scope.getCompletedCategory = function () {
			showloading();
			$scope.upcomingEvents = false;
			$scope.noData = false;
			$scope.searchEventTab1 = false;
			$scope.completedEvents = true;
			$scope.searchEventTab2 = true;
			$scope.tabUpcomingLink = "tab-link";
			$scope.tabCompletedLink = "tab-link current";
			MyServices.categoryOverview(categoryId,function (data) {
				$scope.categoryCompletedOverview_values = [];
				var categoryCompletedEvent = data.completedevent;
				if (data) {
					_.each(categoryCompletedEvent, function (n) {
						$scope.categoryCompletedOverview_values.push(n);
					});
				} 
				if (categoryCompletedEvent.length == 0) {
					$scope.noData = true;
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/offline");
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
				showloading();
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
							$scope.categoryUpcomingOverview_values = [];
							console.log("Status 1")
							$scope.noData = false;
							$scope.completedEvents = false;
							$scope.upcomingEvents = true;
							if (data) {
								_.each(data, function (n) {
									$scope.categoryUpcomingOverview_values.push(n);
								});
							}
						}
						$ionicLoading.hide();
	
					}, function (err) {
						$location.url("/app/offline");
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
						if (data.status == "0") {
							console.log("Status 0");
							$scope.completedEvents = false;
							$scope.upcomingEvents = false;
							$scope.noData = true;
						} else {
							$scope.categoryCompletedOverview_values = [];
							$scope.noData = false;
							$scope.upcomingEvents = false;
							$scope.completedEvents = true;;
							if (data) {
								_.each(data, function (n) {
									$scope.categoryCompletedOverview_values.push(n);
								});
							}
						}
						$ionicLoading.hide();
					}, function (err) {
						$location.url("/app/offline");
					})
				}
			}
		}

	})
	.controller('NotificationCtrl', function ($scope,$rootScope,$window, $ionicLoading, $ionicPlatform, ionicToast) {
		$rootScope.menu1 = "menu-1  item item-complex";
		$rootScope.menu2 = "menu-2  item item-complex";
		$rootScope.menu3 = "menu-3  item item-complex";
		$rootScope.menu4 = "menu-4  item item-complex";
		$rootScope.menu5 = "menu-5  active item item-complex";

		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		};
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
		showloading();
		
		$scope.switchOn = false;
		$scope.switchOff = false;		
		$scope.initStatus = function () {
			if($rootScope.sessionValue){
			$scope.switchOn = true;
			$scope.switchOff = false;
			}else{
				$scope.switchOn = false;
				$scope.switchOff = true;
			}
		}
		$ionicLoading.hide();
		$scope.ShowHide = function () {
			//If DIV is visible it will be hidden and vice versa.
			$scope.switchOn = !$scope.switchOn;
			if (!$scope.switchOn) {
				$scope.switchOn = false;
				$scope.switchOff = true;
				$rootScope.sessionValue = false;
				$window.sessionStorage.removeItem('notificationInit');
				console.log("Session inside session off  :" + $window.sessionStorage.getItem('notificationInit'));	
			} else if ($scope.switchOn) {
				$scope.switchOn = true;
				$scope.switchOff = false;
				$rootScope.sessionValue = true;	
				console.log("Session Storage session on :" + $window.sessionStorage.getItem('notificationInit'));
		
			}
		}



	})
	.controller('OveronsCtrl', function ($scope,$rootScope, $location, $window, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, ionicToast) {
		$rootScope.menu1 = "menu-1  item item-complex";
		$rootScope.menu2 = "menu-2  item item-complex";
		$rootScope.menu3 = "menu-3  item item-complex";
		$rootScope.menu4 = "menu-4  active item item-complex";
		$rootScope.menu5 = "menu-5  item item-complex";

		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		};
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
		showloading();

		$scope.hideToastMessage = function () {
			ionicToast.hide();
		}

		$scope.goTo = function () {
			$location.url("/app/dashboard");
		}

		$scope.getOveronsDetails = function () {
			MyServices.overons_detail(function (data) {
				$scope.overons_values = [];
				if (data) {
					$scope.overons_values = data.result;
				}
				$ionicLoading.hide();
			}, function (err) {
				$location.url("/app/offline");
			})

		}

	})

	.controller('TabCtrl', function ($scope, $location, $stateParams, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, ionicToast) {
		$scope.noInformation = false;
		var showloading = function () {
			$ionicLoading.show({
				template: '<ion-spinner class="spinner-positive"></ion-spinner>'
			});
		}
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();
		showloading();

		$scope.hideToastMessage = function () {
			ionicToast.hide();
		}

		if ($stateParams.info != undefined) {
			$scope.information = $stateParams.info;
			if($scope.information == ""){
				$scope.noInformation = true;
			}
			$ionicLoading.hide();
		}
	})
	.controller('SplashCtrl', function ($scope, $location, $stateParams, MyServices, $ionicLoading, $timeout, $sce, $ionicSlideBoxDelegate, ionicToast) {
		$timeout(function () {
			$location.url("/app/dashboard");
		}, 3000);
		$scope.hideToast = function () {
			ionicToast.hide();
		};
		$scope.hideToast();

		$('footer').hide();
		$('ion-header-bar').hide();
		$('body').attr('id', 'splash');
	})

	// .filter('split', function () {
	// 	return function (input, splitChar, splitIndex) {
	// 		// do some bounds checking here to ensure it has that index
	// 		return input.split(splitChar)[splitIndex];
	// 	}
	// })

	.filter('htmlToPlaintext', function () {
		return function (text) {
			return text ? String(text).replace(/<[^>]+>/gm, '') : '';
		};
	}
	);

