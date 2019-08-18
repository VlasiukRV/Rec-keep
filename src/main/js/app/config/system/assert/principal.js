;
(function (exp) {
	if (!exp.moduleConfigSystem) {
		exp.moduleConfigSystem = new Object(null);
	}
	var moduleConfigSystem = exp.moduleConfigSystem;

    moduleConfigSystem.Principal = function () {

		var Principal = appUtils.Class();
			(function () {
				Principal.prototype.$_buildObject = function () {
					this.includeFd({
						authenticated: false,
						name: 'NO_Authentication',
						sessionId: null,
						authorities: [],
						currentUserId: 0,
						currentUser: {}
					});
				};
				var setNotAuthenticated = function (currentPrincipal) {
					currentPrincipal.authenticated = false;
					currentPrincipal.name = 'NO_Authentication';
					currentPrincipal.sessionId = null;
					currentPrincipal.authorities = [];
					currentPrincipal.currentUserId = 0;
					currentPrincipal.currentUser = {};
				};
				var authenticate = function ($http, credentials, callback) {

					var principal;
					var headers = credentials ? {
						authorization: 'Basic '
						+ btoa(credentials.username + ':'
							+ credentials.password)
					} : {};

					$http.get('/appTaskList/service/authenticate', {
						headers: headers
					})
					.then(function (response) {
						if (response.data.status === 200) {
							principal = response.data.data;
						}
						callback && callback({authenticated: true, principal: principal});
					}, function () {
						callback && callback({authenticated: false, principal: principal});
					}
					);
				};
				Principal.includeMthd({
					logout: function ($http) {
						var self = this;
						$http.post('/appTaskList/logout', {}).finally(function () {
							self.authenticated = false;
							setNotAuthenticated(self);
						});
					},
					login: function ($http, credentials, callback) {
						var self = this;
						authenticate($http, credentials, function (data) {
							if (data.authenticated) {
								console.log('Login succeeded');
								credentials.error = false;
							} else {
								console.log('Login failed');
								credentials.error = true;
							}
							self.setAuthenticated(data.principal);
							callback && callback(self);
						});
					},
					getSessionInformation: function (resourceService) {
						var securityService = resourceService.getSecurityService();

						var currentPrincipal = this;
						securityService.getSessionInformation({}, {}, function (response) {
							if (response.status === 200) {
								var data = response.data;
								currentPrincipal.setAuthenticated(data);
							}
						});
					},
					updatePrincipalUser: function (appMetadataSet) {
						var self = this;
						appMetadataSet.metadataEvents.publish('ev:entityList:' + 'user' + ':update', function () {
							var entityList = appMetadataSet.getEntityList('user');
							if (entityList) {
								self.currentUser = entityList.findEntityById(self.currentUserId);
							}
						});
					},
					setAuthenticated: function (data) {
		                var self = this;
						setNotAuthenticated(self);
						if (data !== undefined) {
							this.authenticated = true;
							this.name = data.userName;
							this.sessionId = data.sessionId;
							this.authorities = data.authorities;
							this.currentUserId = data.currentUserId;
						}
					}
				});
			})();
			
		return Principal;
	}	

})(window);