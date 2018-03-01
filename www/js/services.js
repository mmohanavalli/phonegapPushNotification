//var adminbase = "http://localhost/knaftable/user.php";
var adminbase = "https://devbrandz.nl/knaf/Knafapp/";
var adminurl = adminbase + "?json_data_mobile&";
var adminimage = "https://devbrandz.nl/knaf/images/";
var adminhauth = adminbase + "index.php/hauth/";

var foods = [];
//FOR WORDPRESS INTEGRATION
var Wordpress_UserName = "en.blog.wordpress.com";
var WORDPRESS_API_URL = 'http://autocrosslive.com/';
var WORDPRESS_self_API_URL = 'wp-json/wp/v2/posts';


angular.module('starter.services', [])
.factory('MyServices', function ($http, $filter) {
	return {		
		getHomeInfo: function (contact,callback,err) {
			return $http({
				url: adminbase,
				method: "POST",
				data: $.param({
					// 'id': contact.id,
					// 'name': contact.name,
					// 'email': contact.email,
					// 'phone': contact.phone,
					// 'subject': contact.subject,
					// 'message': contact.message,
					// 'date': contact.date,
					read: contact.read
					
				}),
				headers : {
                    'Content-Type': 'application/json;'
				}
			}).success(callback).error(err);
		},
				
		postContactInfo: function (contact,callback,err) {
			return $http({
				url: adminbase+'addcontact',
				method: "POST",
				data:$.param({
					name: contact.name,
					email: contact.email,
					phone: contact.phone,
					subject: contact.subject,
					message: contact.message	
				}),
				headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
				},
				
			}).success(callback).error(err);
		},
		
		completed_events: function (callback, err){
			return $http.get(adminbase + 'event_overview/completed_events', {
				withCredentials: false
			}).success(callback).error(err);
		},
		upcoming_events: function (callback, err){
			return $http.get(adminbase + 'event_overview/upcoming_events', {
				withCredentials: false
			}).success(callback).error(err);
		},
		news_overview: function (callback, err){
			var imgPath = adminimage +'newsimages';
			return $http.get(adminbase + 'news_overview', {
				withCredentials: false				
			}).success(callback).error(err);
		},
		news_detail: function (newsId,callback, err){
			var url = adminbase + 'news_detail/'+newsId;
			console.log ("url"+url);
			return $http.get(adminbase + 'news_detail/'+newsId, {
				withCredentials: false
			}).success(callback).error(err);
		},
		
	};
});