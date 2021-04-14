
(function (scope){
	if (null == scope)
	    scope= window;
	if (scope.puremvc)
	{
		return;
	}
 	
function Observer (notifyMethod, notifyContext)
{
    this.setNotifyMethod(notifyMethod);
    this.setNotifyContext(notifyContext);
};
Observer.prototype.setNotifyMethod= function (notifyMethod)
{
    this.notify= notifyMethod;
};
Observer.prototype.setNotifyContext= function (notifyContext)
{
    this.context= notifyContext;
};
Observer.prototype.getNotifyMethod= function ()
{
    return this.notify;
};
Observer.prototype.getNotifyContext= function ()
{
    return this.context;
};
Observer.prototype.notifyObserver= function (notification)
{
    this.getNotifyMethod().call(this.getNotifyContext(), notification);
};
Observer.prototype.compareNotifyContext= function (object)
{
    return object === this.context;
};
Observer.prototype.notify= null;
Observer.prototype.context= null;
function Notification(name, body, type)
{
    this.name= name;
    this.body= body;
    this.type= type;
};
Notification.prototype.getName= function()
{
    return this.name;
};
Notification.prototype.setBody= function(body)
{
    this.body= body;
};
Notification.prototype.getBody= function()
{
    return this.body
};
Notification.prototype.setType= function(type)
{
    this.type= type;
};
Notification.prototype.getType= function()
{
    return this.type;
};
Notification.prototype.toString= function()
{
    var msg= "Notification Name: " + this.getName();
    msg+= "\nBody:" + ((this.body == null ) ? "null" : this.body.toString());
    msg+= "\nType:" + ((this.type == null ) ? "null" : this.type);
    return msg;
};
Notification.prototype.name= null;
Notification.prototype.type= null;
Notification.prototype.body= null;
function Notifier()
{
};
Notifier.prototype.sendNotification = function(notificationName, body, type)
{
    var facade = this.getFacade();
    if(facade)
    {
        facade.sendNotification(notificationName, body, type);
    }
};
Notifier.prototype.facade;
Notifier.prototype.initializeNotifier = function(key)
{
    this.multitonKey = String(key);
    this.facade= this.getFacade();
};
Notifier.prototype.getFacade = function()
{
    if(this.multitonKey == null)
    {
        throw new Error(Notifier.MULTITON_MSG);
    };
    return Facade.getInstance(this.multitonKey);
};
Notifier.prototype.multitonKey = null;
Notifier.MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";
function SimpleCommand () { };
SimpleCommand.prototype= new Notifier;
SimpleCommand.prototype.constructor= SimpleCommand;
SimpleCommand.prototype.execute= function (notification) { };
function MacroCommand()
{
    this.subCommands= [];
    this.initializeMacroCommand();
};
MacroCommand.prototype= new Notifier;
MacroCommand.prototype.constructor= MacroCommand;
MacroCommand.prototype.subCommands= null;
MacroCommand.prototype.initializeMacroCommand= function() {}
MacroCommand.prototype.addSubCommand= function(commandClassRef)
{
    this.subCommands.push(commandClassRef);
};
MacroCommand.prototype.execute= function(note)
{
   
    while(this.subCommands.length > 0)
    {
        var ref= this.subCommands.shift();
        var cmd= new ref;
        cmd.initializeNotifier(this.multitonKey);
        cmd.execute(note);
    }
};
function Mediator (mediatorName, viewComponent)
{
    this.mediatorName= mediatorName || this.constructor.NAME;
    this.viewComponent=viewComponent;  
};
Mediator.NAME= "Mediator";
Mediator.prototype= new Notifier;
Mediator.prototype.constructor= Mediator;
Mediator.prototype.getMediatorName= function ()
{
    return this.mediatorName;
};
Mediator.prototype.setViewComponent= function (viewComponent)
{
    this.viewComponent= viewComponent;
};
Mediator.prototype.getViewComponent= function ()
{
    return this.viewComponent;
};
Mediator.prototype.listNotificationInterests= function ()
{
    return [];
};
Mediator.prototype.handleNotification= function (notification)
{
    return;
};
Mediator.prototype.onRegister= function ()
{
    return;
};
Mediator.prototype.onRemove= function ()
{
    return;
};
Mediator.prototype.mediatorName= null;
Mediator.prototype.viewComponent=null;
function Proxy(proxyName, data)
{
    this.proxyName= proxyName || this.constructor.NAME;
    if(data != null)
    {
        this.setData(data);
    }
};
Proxy.NAME= "Proxy";
Proxy.prototype= new Notifier;
Proxy.prototype.constructor= Proxy;
Proxy.prototype.getProxyName= function()
{
    return this.proxyName;
};
Proxy.prototype.setData= function(data)
{
    this.data= data;
};
Proxy.prototype.getData= function()
{
    return this.data;
};
Proxy.prototype.onRegister= function()
{
    return;
};
Proxy.prototype.onRemove= function()
{
    return;
};
Proxy.prototype.proxyName= null;
Proxy.prototype.data= null;
function Facade(key)
{
    if(Facade.instanceMap[key] != null)
    {
        throw new Error(Facade.MULTITON_MSG);
    }
    this.initializeNotifier(key);
    Facade.instanceMap[key] = this;
    this.initializeFacade();
};
Facade.prototype.initializeFacade = function()
{
    this.initializeModel();
    this.initializeController();
    this.initializeView();
};
Facade.getInstance = function(key)
{
	if (null == key)
		return null;
    if(Facade.instanceMap[key] == null)
    {
        Facade.instanceMap[key] = new Facade(key);
    }
    return Facade.instanceMap[key];
};
Facade.prototype.initializeController = function()
{
    if(this.controller != null)
        return;
    this.controller = Controller.getInstance(this.multitonKey);
};
Facade.prototype.initializeModel = function()
{
    if(this.model != null)
        return;
    this.model = Model.getInstance(this.multitonKey);
};
Facade.prototype.initializeView = function()
{
    if(this.view != null)
        return;
    this.view = View.getInstance(this.multitonKey);
};
Facade.prototype.registerCommand = function(notificationName, commandClassRef)
{
    this.controller.registerCommand(notificationName, commandClassRef);
};
Facade.prototype.removeCommand = function(notificationName)
{
    this.controller.removeCommand(notificationName);
};
Facade.prototype.hasCommand = function(notificationName)
{
    return this.controller.hasCommand(notificationName);
};
Facade.prototype.registerProxy = function(proxy)
{
    this.model.registerProxy(proxy);
};
Facade.prototype.retrieveProxy = function(proxyName)
{
    return this.model.retrieveProxy(proxyName);
};
Facade.prototype.removeProxy = function(proxyName)
{
    var proxy = null;
    if(this.model != null)
    {
        proxy = this.model.removeProxy(proxyName);
    }
    return proxy;
};
Facade.prototype.hasProxy = function(proxyName)
{
    return this.model.hasProxy(proxyName);
};
Facade.prototype.registerMediator = function(mediator)
{
    if(this.view != null)
    {
        this.view.registerMediator(mediator);
    }
};
Facade.prototype.retrieveMediator = function(mediatorName)
{
    return this.view.retrieveMediator(mediatorName);
};
Facade.prototype.removeMediator = function(mediatorName)
{
    var mediator = null;
    if(this.view != null)
    {
        mediator = this.view.removeMediator(mediatorName);
    }
    return mediator;
};
Facade.prototype.hasMediator = function(mediatorName)
{
    return this.view.hasMediator(mediatorName);
};
Facade.prototype.sendNotification = function(notificationName, body, type)
{
    this.notifyObservers(new Notification(notificationName, body, type));
};
Facade.prototype.notifyObservers = function(notification)
{
    if(this.view != null)
    {
        this.view.notifyObservers(notification);
    }
};
Facade.prototype.initializeNotifier = function(key)
{
    this.multitonKey = key;
};
Facade.hasCore = function(key)
{
    return Facade.instanceMap[key] != null;
};
Facade.removeCore = function(key)
{
    if(Facade.instanceMap[key] == null)
        return;
    Model.removeModel(key);
    View.removeView(key);
    Controller.removeController(key);
    delete Facade.instanceMap[key];
};
Facade.prototype.controller = null;
Facade.prototype.model = null;
Facade.prototype.view = null;
Facade.prototype.multitonKey = null;
Facade.instanceMap = [];
Facade.MULTITON_MSG = "Facade instance for this Multiton key already constructed!";
function View(key)
{
    if(View.instanceMap[key] != null)
    {
        throw new Error(View.MULTITON_MSG);
    };
    this.multitonKey = key;
    View.instanceMap[this.multitonKey] = this;
    this.mediatorMap = [];
    this.observerMap = [];
    this.initializeView();
};
View.prototype.initializeView = function()
{
    return;
};
View.getInstance = function(key)
{
	if (null == key)
		return null;
    if(View.instanceMap[key] == null)
    {
        View.instanceMap[key] = new View(key);
    };
    return View.instanceMap[key];
};
View.prototype.registerObserver = function(notificationName, observer)
{
    if(this.observerMap[notificationName] != null)
    {
        this.observerMap[notificationName].push(observer);
    }
    else
    {
        this.observerMap[notificationName] = [observer];
    }
};
View.prototype.notifyObservers = function(notification)
{
   
    if(this.observerMap[notification.getName()] != null)
    {
        var observers_ref = this.observerMap[notification.getName()], observers = [], observer
        for(var i = 0; i < observers_ref.length; i++)
        {
            observer = observers_ref[i];
            observers.push(observer);
        }
        for(var i = 0; i < observers.length; i++)
        {
            observer = observers[i];
            observer.notifyObserver(notification);
        }
    }
};
View.prototype.removeObserver = function(notificationName, notifyContext)
{
   
    var observers = this.observerMap[notificationName];
    for(var i = 0; i < observers.length; i++)
    {
        if(observers[i].compareNotifyContext(notifyContext) == true)
        {
            observers.splice(i, 1);
            break;
        }
    }
    if(observers.length == 0)
    {
        delete this.observerMap[notificationName];
    }
};
View.prototype.registerMediator = function(mediator)
{
    if(this.mediatorMap[mediator.getMediatorName()] != null)
    {
        return;
    }
    mediator.initializeNotifier(this.multitonKey);
   
    this.mediatorMap[mediator.getMediatorName()] = mediator;
   
    var interests = mediator.listNotificationInterests();
   
    if(interests.length > 0)
    {
       
        var observer = new Observer(mediator.handleNotification, mediator);
        for(var i = 0; i < interests.length; i++)
        {
            this.registerObserver(interests[i], observer);
        }
    }
    mediator.onRegister();
}
View.prototype.retrieveMediator = function(mediatorName)
{
    return this.mediatorMap[mediatorName];
};
View.prototype.removeMediator = function(mediatorName)
{
    var mediator = this.mediatorMap[mediatorName];
    if(mediator)
    {
       
        var interests = mediator.listNotificationInterests();
        for(var i = 0; i < interests.length; i++)
        {
           
           
            this.removeObserver(interests[i], mediator);
        }
       
        delete this.mediatorMap[mediatorName];
       
        mediator.onRemove();
    }
    return mediator;
};
View.prototype.hasMediator = function(mediatorName)
{
    return this.mediatorMap[mediatorName] != null;
};
View.removeView = function(key)
{
    delete View.instanceMap[key];
};
View.prototype.mediatorMap = null;
View.prototype.observerMap = null;
View.instanceMap = [];
View.prototype.multitonKey = null;
View.MULTITON_MSG = "View instance for this Multiton key already constructed!";
function Model(key)
{
    if(Model.instanceMap[key])
    {
        throw new Error(Model.MULTITON_MSG);
    }
    this.multitonKey= key;
    Model.instanceMap[key]= this;
    this.proxyMap= [];
    this.initializeModel();
};
Model.prototype.initializeModel= function(){};
Model.getInstance= function(key)
{
	if (null == key)
		return null;
    if(Model.instanceMap[key] == null)
    {
        Model.instanceMap[key]= new Model(key);
    }
    return Model.instanceMap[key];
};
Model.prototype.registerProxy= function(proxy)
{
    proxy.initializeNotifier(this.multitonKey);
    this.proxyMap[proxy.getProxyName()]= proxy;
    proxy.onRegister();
};
Model.prototype.retrieveProxy= function(proxyName)
{
    return this.proxyMap[proxyName];
};
Model.prototype.hasProxy= function(proxyName)
{
    return this.proxyMap[proxyName] != null;
};
Model.prototype.removeProxy= function(proxyName)
{
    var proxy= this.proxyMap[proxyName];
    if(proxy)
    {
        this.proxyMap[proxyName]= null;
        proxy.onRemove();
    }
    return proxy;
};
Model.removeModel= function(key)
{
    delete Model.instanceMap[key];
};
Model.prototype.proxyMap= null;
Model.instanceMap= [];
Model.prototype.multitonKey;
Model.MULTITON_MSG= "Model instance for this Multiton key already constructed!";
function Controller(key)
{
    if(Controller.instanceMap[key] != null)
    {
        throw new Error(Controller.MULTITON_MSG);
    }
    this.multitonKey= key;
    Controller.instanceMap[this.multitonKey]= this;
    this.commandMap= new Array();
    this.initializeController();
}
Controller.prototype.initializeController= function()
{
    this.view= View.getInstance(this.multitonKey);
};
Controller.getInstance= function(key)
{
	if (null == key)
		return null;
    if(null == this.instanceMap[key])
    {
        this.instanceMap[key]= new this(key);
    }
    return this.instanceMap[key];
};
Controller.prototype.executeCommand= function(note)
{
    var commandClassRef= this.commandMap[note.getName()];
    if(commandClassRef == null)
        return;
    var commandInstance= new commandClassRef();
    commandInstance.initializeNotifier(this.multitonKey);
    commandInstance.execute(note);
};
Controller.prototype.registerCommand= function(notificationName, commandClassRef)
{
    if(this.commandMap[notificationName] == null)
    {
        this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
    }
    this.commandMap[notificationName]= commandClassRef;
};
Controller.prototype.hasCommand= function(notificationName)
{
    return this.commandMap[notificationName] != null;
};
Controller.prototype.removeCommand= function(notificationName)
{
    if(this.hasCommand(notificationName))
    {
        this.view.removeObserver(notificationName, this);
        this.commandMap[notificationName]= null;
    }
};
Controller.removeController= function(key)
{
    delete this.instanceMap[key];
};
Controller.prototype.view= null;
Controller.prototype.commandMap= null;
Controller.prototype.multitonKey= null;
Controller.instanceMap= [];
Controller.MULTITON_MSG= "controller key for this Multiton key already constructed"
var OopHelp=
{
    
	global: (function(){return this})()
    
    
,   extend: function (child, parent)
    {
        if ('function' !== typeof child)
            throw new TypeError('#extend- child should be Function');            
        
        if ('function' !== typeof parent)
            throw new TypeError('#extend- parent should be Function');
            
        if (parent === child)
            return;
            
        var Transitive= new Function;
        Transitive.prototype= parent.prototype;
        child.prototype= new Transitive;
        return child.prototype.constructor= child;
    }
    
    
,   decorate: function (object, traits)
    {   
        for (var accessor in traits)
        {
            object[accessor]= traits[accessor];
        }    
        
        return object;
    }
};
function declare (qualifiedName, object, scope)
{
    var nodes= qualifiedName.split('.')
    ,   node= scope || OopHelp.global
    ,   lastNode
    ,   newNode
    ,   nodeName;
                
    for (var i= 0, n= nodes.length; i < n; i++)
    {
        lastNode= node;
        nodeName= nodes[i];
        
        node= (null == node[nodeName] ? node[nodeName] = {} : node[nodeName]);
    }
                    
    if (null == object)
        return node;
                        
    return lastNode[nodeName]= object;
};
function define (classInfo, traits, staticTraits)
{
    if (!classInfo)
    {
        classInfo= {}
    }
    var className= classInfo.name
    ,   classParent= classInfo.parent
    ,   doExtend= 'function' === typeof classParent
    ,   classConstructor
    ,   classScope= classInfo.scope || null
    ,   prototype
    if ('parent' in classInfo && !doExtend)
    {
        throw new TypeError('Class parent must be Function');
    }
        
    if (classInfo.hasOwnProperty('constructor'))
    {
        classConstructor= classInfo.constructor
        if ('function' !== typeof classConstructor)
        {
            throw new TypeError('Class constructor must be Function')
        }   
    }
    else
    {
        if (doExtend)
        {
            classConstructor= function ()
            {
                classParent.apply(this, arguments);
            }
        }
        else
        {
            classConstructor= new Function;
        } 
    }
    if (doExtend)
    {
        OopHelp.extend(classConstructor, classParent);
    }
    
    if (traits)
    {
        prototype= classConstructor.prototype
        OopHelp.decorate(prototype, traits);
       
        prototype.constructor= classConstructor;
    }
    
    if (staticTraits)
    {
        OopHelp.decorate(classConstructor, staticTraits)
    }
    
    if (className)
    {
        if ('string' !== typeof className)
        {
            throw new TypeError('Class name must be primitive string');
        }
            
        declare (className, classConstructor, classScope);
    }    
    
    return classConstructor;            
};
 	
 	 
 
 	scope.puremvc=
 	{
 		View: View
 	,	Model: Model
 	,	Controller: Controller
 	,	SimpleCommand: SimpleCommand
 	,	MacroCommand: MacroCommand
 	,	Facade: Facade
 	,	Mediator: Mediator
 	,	Observer: Observer
 	,	Notification: Notification
 	,	Notifier: Notifier
 	,	Proxy: Proxy
 	,	define: define
 	,	declare: declare
 	}; 
 	
})(this);


function LoggerJS() {
    if (LoggerJS._instance != null) {
        throw new ErrorObject(ErrorName.SINGLETON_VIOLATION, this.constructor.name + " instance already constructed.");
    }
    LoggerJS._instance = this;
}
LoggerJS.getInstance = function () {
    if (LoggerJS._instance == null) {
        LoggerJS._instance = new LoggerJS();
    }
    return LoggerJS._instance;
}
LoggerJS.prototype.initialize = function (logFilePath) {
	this._logFilePath = logFilePath;
	this._csInterface = new CSInterface();
	this._log = ["log:"];
    this._write();
}
LoggerJS.prototype.log = function (comment, value) {
    var line = comment;
    if (value !== undefined) {
        try {
			line = line + " : " + JSON.stringify(value);
        } catch (error) {
			line = line + " : " + "can't stringify value";
        }
	}
	this._log.push(line);
	this._write();
}
LoggerJS.prototype._write = function () {
	var lines = [];
	lines.push("var file = File(" + JSON.stringify(this._logFilePath) + ");");
	lines.push("var txt = " + JSON.stringify(this._log.join("\n")) + ";");
	lines.push("file.open(\"w\");");
	lines.push("file.writeln(txt);");
	lines.push("file.close();");
	var extendScript = lines.join("\n");
	try {
		this._csInterface.evalScript(extendScript, function (response) {
			if (response != null) {
			}
		});
	} catch (error) {
		alert(error.message);
	}
}
LoggerJS.prototype._csInterface = null;
LoggerJS.prototype._logFilePath = null;
LoggerJS.prototype._log = null;
LoggerJS.log = function (comment, value) {
	LoggerJS.getInstance().log(comment, value);
}
LoggerJS._instance = null;

function BaseESProxy() {
    puremvc.Proxy.apply(this, [ProxyName.ES]);
}
BaseESProxy.prototype = new puremvc.Proxy;
BaseESProxy.prototype.constructor = BaseESProxy;
BaseESProxy.prototype.onRegister = function () {
	puremvc.Proxy.prototype.onRegister.apply(this, []);
	this._csInterface = new CSInterface();
	var _this = this;
	this._csInterface.addEventListener(ESEventName.NOTIFICATION, function (event) {
		try {
			var args = event.data;
			args[3] = true;
			_this.facade.sendNotification.apply(_this.facade, args);
		} catch (error) {
			alert(error);
		}
	});
}
BaseESProxy.prototype.sendNotification = function (facadeKey, notificationName, body, type) {
	var extendScript = "Facade.getInstance(" + JSON.stringify(facadeKey) + ").sendNotification(" + JSON.stringify(notificationName) + ", " + JSON.stringify(body) + ", " + JSON.stringify(type) + ", true);";
	return this._callES(extendScript);
}
BaseESProxy.prototype.callESProxy = function (facadeKey, proxyName, methodName, methodArguments) {
	if (methodArguments === undefined) {
		methodArguments = [];
	}
	var extendScript = "var proxy Facade.getInstance(" + JSON.stringify(facadeKey) + ").retrieveProxy(" + JSON.stringify(proxyName) + ")";
	extendScript = extendScript + "proxy[" + JSON.stringify(methodName) + "].apply(proxy, " + JSON.stringify(methodArguments) + ", true)";
	return this._callES(extendScript);
}
BaseESProxy.prototype._callES = function (extendScript) {
	var _this = this;
	var promise = new Promise(function (resolve, reject) {
		_this._csInterface.evalScript(extendScript, function (response) {
			if (response instanceof Error) {
				alert(response);
				reject(response);
			} else {
				var data = response;
				resolve(data);
			}
		});
	});
	return promise;
}
BaseESProxy.prototype.getCSInterface = function() {
	return this._csInterface;
}
BaseESProxy.prototype._csInterface = null;

function BaseViewComponentJS() {
	BaseEventTarget.call(this);
}
BaseViewComponentJS.prototype = new BaseEventTarget;
BaseViewComponentJS.prototype.constructor = BaseViewComponentJS;
BaseViewComponentJS.prototype.initializeComponent = function () {
}

function BaseMediatorJS(mediatorName, viewComponent) {
    puremvc.Mediator.apply(this, [mediatorName, viewComponent]);
}
BaseMediatorJS.prototype = new puremvc.Mediator;
BaseMediatorJS.prototype.constructor = BaseMediatorJS;
BaseMediatorJS.prototype._handleViewEvent = function (eventName, eventData) {
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}
BaseMediatorJS.prototype._updateViewComponent = function () {
	throw new ErrorObject(ErrorName.NOT_IMPLEMENTED_INTERFACE, "Not Implemented Interface.");
}