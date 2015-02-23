angular.module('app')
	.filter('timeConverter', function(){
		return function(milliseconds){
			var minutes = Math.floor(milliseconds / 60000);
			var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
			return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;				
		}
	});
