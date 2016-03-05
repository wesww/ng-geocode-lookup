(function(angular) {
  'use strict';
  var app = angular.module('plunker', []);
  app.component('geoCodeLookup', {
    template: '<form ng-submit="$ctrl.geoGet()">' +
      '<div class="row collapse">' +
      '<div class="small-10 columns">' +
      '<input type="text" ng-model="$ctrl.geoInput" placeholder="New York">' +
      '</div>' +
      '<div class="small-2 columns">' +
      '<a href="#" class="button postfix">Go</a>' +
      '</div>' +
      '<div ng-if="$ctrl.results">' +
      '{{$ctrl.results.addr}} <br> {{$ctrl.results.latlng.lat}}, {{$ctrl.results.latlng.lng}}' +
      '</div>' +
      '</div>' +
      '</form>',
    replace: true,
    controller: function($http) {
      var ctrl = this;
      var apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
      ctrl.geoGet = function() {
        if (!ctrl.geoInput) {
          return;
        }
        var query = ctrl.geoInput.replace(' ', '+').replace(',', '');
        var url = apiUrl + query;
        $http.get(url)
          .then(function successCallback(response) {
            ctrl.results = {
              latlng: response.data.results[0].geometry.location,
              addr: response.data.results[0].formatted_address
            };
          });
      };
    }
  });
})(window.angular);
