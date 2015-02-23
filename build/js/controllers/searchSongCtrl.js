angular.module('app',['spotify'])
	.controller('searchSongCtrl', function ( $scope, $http, Spotify ){

		$scope.tag = '';

		$scope.searchSong = function(){
			Spotify.search( $scope.tag, 'track' ).then( function (data) {
				$scope.songInfo = data.tracks.items;
			});

		};

	});