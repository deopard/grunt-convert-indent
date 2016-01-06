var a = [1,2,3];
_(a).map(function (n) {
		return n + 1;
	})
	.filter(function (n) {
		return (function () {
			return n % 1 === 0;
		})();
	});
