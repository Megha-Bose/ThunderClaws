function EventBus() {

    var eventList = {};

    let on = function(eventName, eventHandler) {
        if (!eventList[eventName]) {
            eventList[eventName] = [];
        }
        eventList[eventName].push(eventHandler);
    };

    let dispatch = function(eventName) {
        var results = [];
        if (!eventList[eventName]) {
            return;
        }
        var args = [];
        arguments.forEach(arg => args.push(arg));
        eventList[eventName].forEach(handler => results.push(handler.apply(args)));

        return results;
    }

    var instance = {
        on,
        dispatch
    }

    return instance;
}