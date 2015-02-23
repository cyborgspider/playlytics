angular.module('app')
	.controller('playlistCtrl', function ( $scope, $http ){
		$scope.totalDuration = 0;
		$scope.coolFactor    = 0;
		$scope.playlistData  = [];

		var getTotalDuration = function( result ){
			for (var i = 0; i < result.length; i++){
				var songDuration = result[i].duration;
				$scope.totalDuration += songDuration;
			}
			return $scope.totalDuration;
		};		

		var getCoolnessFactor = function( duration, popularity, totalDuration ){
			var coolFactor = 0;
			coolFactor = ( duration * popularity) / totalDuration;
			$scope.coolFactor = parseInt( coolFactor, 10 );
			return $scope.coolFactor;
		};

		$scope.loadPlayList = function(){
			$http.get('/json/playlist.js').

			success( function ( result ) {
				$scope.playlistData = result;
				getCoolnessFactor( result[0].duration, result[0].popularity, getTotalDuration(result) );

			}).

			error( function (){
				console.log('Derp!');
			});

		};
		$scope.loadPlayList();
		
	});