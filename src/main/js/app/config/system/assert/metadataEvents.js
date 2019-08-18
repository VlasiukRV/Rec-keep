;
(function (exp) {
	if (!exp.moduleConfigSystem) {
		exp.moduleConfigSystem = new Object(null);
	}
	var moduleConfigSystem = exp.moduleConfigSystem;

	moduleConfigSystem.MetadataEvents = function() {

        var MetadataEvents = appUtils.Class();
        (function () {
            MetadataEvents.prototype.$_buildObject = function () {
                this.includeFd({
                    events: $({})
                });
            };
            MetadataEvents.includeMthd({
                subscribe: function () {
                    this.events.bind.apply(this.events, arguments);
                },
                unSubscribe: function () {
                    this.events.unbind.apply(this.events, arguments);
                },
                publish: function () {
                    this.events.trigger.apply(this.events, arguments);
                }
            });
        })();

		return MetadataEvents;
	}

})(window);