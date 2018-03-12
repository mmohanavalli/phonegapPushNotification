//var adminbase = "http://localhost/knaftable/user.php";
var adminbase = "https://devbrandz.nl/knaf/Knafapp/";
var adminurl = adminbase + "?json_data_mobile&";
var adminimage = "https://devbrandz.nl/knaf/images/";
var adminhauth = adminbase + "index.php/hauth/";
var adminbasefile = "https://devbrandz.nl/knaf/pages/event_downloads?file";

var foods = [];
//FOR WORDPRESS INTEGRATION
var Wordpress_UserName = "en.blog.wordpress.com";
var WORDPRESS_API_URL = 'http://autocrosslive.com/';
var WORDPRESS_self_API_URL = 'wp-json/wp/v2/posts';


angular.module('starter.services', [])
	.factory('MyServices', function ($http, $filter) {
		return {
			completed_events: function (callback, err) {
				return $http.get(adminbase + 'event_overview/completed_events', {
					withCredentials: false
				}).success(callback).error(err);
			},
			upcoming_events: function (callback, err) {
				return $http.get(adminbase + 'event_overview/upcoming_events', {
					withCredentials: false
				}).success(callback).error(err);
			},
			getEventSearchTab1: function (search, tab_selected, callback, err) {
				if (search.date == undefined) {
					return $http.get(adminbase + 'events?date=&search=' + search.content + '&tab_selected=' + tab_selected, {
						withCredentials: false
					}).success(callback).error(err);
				} else if (search.content == 'undefined') {
					return $http.get(adminbase + 'events?date=' + search.date + '&search=&tab_selected=' + tab_selected, {
						withCredentials: false
					}).success(callback).error(err);
				} else {
					return $http.get(adminbase + 'events?date=' + search.date + '&search=' + search.content + '&tab_selected=' + tab_selected, {
						withCredentials: false
					}).success(callback).error(err);
				}

			},
			getEventDetail: function (eventId, callback, err) {
				return $http.get(adminbase + 'event_details?eventid=' + eventId, {
					withCredentials: false
				}).success(callback).error(err);
			},
			getEventClass: function (classId, callback, err) {
				return $http.get(adminbase + 'eventclass?classid=' + classId, {
					withCredentials: false
				}).success(callback).error(err);
			},
			getEventClassTabDetail: function (tabId, callback, err) {
				return $http.get(adminbase + 'eventtab?tabid=' + tabId, {
					withCredentials: false
				}).success(callback).error(err);
			},

			news_overview: function (callback, err) {
				return $http.get(adminbase + 'news_overview', {
					withCredentials: false
				}).success(callback).error(err);
			},
			news_detail: function (newsId, callback, err) {
				return $http.get(adminbase + 'news_detail/' + newsId, {
					withCredentials: false
				}).success(callback).error(err);
			},
			overons_detail: function (callback, err) {
				return $http.get(adminbase + 'overons', {
					withCredentials: false
				}).success(callback).error(err);
			},
			postContactInfo: function (contact, callback, err) {
				return $http({
					url: adminbase + 'addcontact',
					method: "POST",
					data: $.param({
						name: contact.name,
						email: contact.email,
						phone: contact.phone,
						subject: contact.subject,
						message: contact.message
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},

				}).success(callback).error(err);
			},
			getCaptcha: function (callback, err) {
				return $http.get(adminbase + 'getcaptcha', {
					withCredentials: false
				}).success(callback).error(err);
			},
			categoryList: function (callback, err) {
				return $http.get(adminbase + 'category_overview', {
					withCredentials: false
				}).success(callback).error(err);
			},
			categoryOverview: function (categoryId, callback, err) {
				return $http.get(adminbase + 'category_overview/' + categoryId, {
					withCredentials: false
				}).success(callback).error(err);
			},
			news_detail: function (newsId, callback, err) {
				return $http.get(adminbase + 'news_detail/' + newsId, {
					withCredentials: false
				}).success(callback).error(err);
			},



		};
	})
	.factory('CommonServices', function () {
		return {
			getAddress: function (address) {
				var arr = address.split(',');
				var lastIndex = arr.length - 1;
				var conurtyAddress = arr[lastIndex];
				return conurtyAddress;
			}
		};
		return {
			getDate: function (date) {
				$scope.item = $filter('date')(date, "MMM-yyyy");
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
				return $scope.eventMonthYear;
			}
		};
	})
	.factory('MenuService', function() {

		var menuItems = [
			{ text: '1 Page One', iconClass: 'icon ion-map', link: 'one'},
			{ text: '2 Page Two', iconClass: 'icon ion-gear-b', link: 'two'},
			{ text: '3 Page Three', iconClass: 'icon ion-star', link: 'three'}
		];
	  
		return {
		  all: function() {
			return menuItems;
		  }
		}
	  });