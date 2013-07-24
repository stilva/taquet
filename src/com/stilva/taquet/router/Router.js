/* jshint strict: false, loopfunc: true */
/* globals _, Backbone, BaseEvent, NAVIGATE_EVENT */
var _router = Backbone.Router;

Backbone.Router = function (options) {

  options = options || {};

  options.commands = options.commands || [];

  if(options.commands.indexOf(NAVIGATE_EVENT) < 0) {
    options.commands.push(NAVIGATE_EVENT);
  }

  BaseEvent.call(this, options);

  return _router.call(this, options);
};

_.extend(Backbone.Router.prototype, _router.prototype);

Backbone.Router.prototype.commandHandler = function(command) {

  if(command) {
    switch(command.type) {

    case NAVIGATE_EVENT:
      var i, l, route = [].slice.call(arguments[1]);
      for(i = 0, l = route.length; i<l; i++) {
        this.route(route[i], "animatedView", (function(route) {
          return function() {
            this.sendCommand(NAVIGATE_EVENT, command.currentTarget, route);
            console.error(this, command.currentTarget, route);
          };
        }( route[i])) );
      }
      break;

    }
  }
};

Backbone.Router.extend = function(props, staticProps) {

  if(props.hasOwnProperty("commandHandler")) {

    var commandHandler = props.commandHandler;
    props.commandHandler = function() {

      return commandHandler.call(this, arguments);
    };

  }

  return _router.extend.call(this, props, staticProps);
};