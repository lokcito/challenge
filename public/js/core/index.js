angular.module('underscore', []).factory('_', function() {
	return window._; // assumes underscore has already been loaded on the page
});
angular.module('vida', ['underscore'])
	.controller('challengeCtrl', ['$scope', '$timeout', '$interval', '_', function($scope, $timeout, $interval, _){
		$scope.generals = {
			currentTemplate: 'numbers.html',
			'tmp': {
				'input': true,
				'numbers': [],
				'taken': [],
			}
		};
		$scope.numbers = {
			'model': {
				'input': undefined,
				'ended': false
			},
			'do': {
				'submit': function() {
					if ( /^[0-9]{1,}$/.test($scope.numbers.model.input) ) {
						if (!_.contains($scope.generals.tmp.numbers, $scope.numbers.model.input)) {
							$scope.generals.tmp.numbers.push($scope.numbers.model.input);
						}
						$scope.numbers.model.input = undefined;
					} else {
						console.log("error", $scope.numbers.model.input);
					}
				},
				'taken': function(i) {
					$timeout(function() {
						if ( $scope.generals.tmp.numbers.length > i ) {
							var min = _.min($scope.generals.tmp.sorting);
							$scope.generals.tmp.sorting = _.reject($scope.generals.tmp.sorting, function(t){
								return t === min;	
							});
							$scope.generals.tmp.taken.push(min);
							$scope.numbers.do.taken(i + 1);
						} else {
							$scope.numbers.model.ended = true;
							if ($scope.numbers.model.timer)
								$interval.cancel($scope.numbers.model.timer);
						}
					}, 500);
				},
				'sort': function() {
					$scope.generals.tmp.taken = [];
					$scope.numbers.model.ended = false;
					$scope.generals.tmp.sorting = _.clone($scope.generals.tmp.numbers);
					if ( $scope.generals.tmp.numbers && $scope.generals.tmp.numbers.length > 0 ) {
						$scope.numbers.do.taken(0);
						$scope.numbers.model.timer = $interval(function(){
							$scope.numbers.model.random = _.random(_.min($scope.generals.tmp.numbers), _.max($scope.generals.tmp.numbers));
						}, 50);
					}
					
				}
			}
		};
		$scope.startInput = function() {
			$scope.generals.tmp.numbers = [];
			$scope.generals.tmp.taken = [];
			$scope.generals.tmp.input = true;
		};
		$scope.onInfo = function() {
			$scope.generals.currentTemplate = $scope.generals.currentTemplate == 'info.html'?'numbers.html':'info.html';
		};
	}]);