 var deviceReadyDeferred = $.Deferred();
 var jqmReadyDeferred = $.Deferred();
 var resourcesReady = false;


 var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        //load scripts
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $LAB.script("js/cordova.js").wait(
                function(){
                    document.addEventListener('deviceready', this.onDeviceReady, false);
                    alert('We are on Device');
                }
            );
        }else
        {
            console.log('We are on Browser');
            var _this = this;
            setTimeout(function(){
                _this.onDeviceReady(); 
            }, 1);
        }

        console.log('app.initialize() Called');
        $.when(deviceReadyDeferred, jqmReadyDeferred).then(this.doWhenBothFrameworksReady);
    },

    // deviceready Event Handler
    onDeviceReady: function() {
        console.log("onDeviceReady");
        deviceReadyDeferred.resolve();
    },

    doWhenBothFrameworksReady: function()
    {
        console.log("doWhenBothFrameworksReady");
        resourcesReady = true;
    }
};

$(document).one("mobileinit", function () {
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.phonegapNavigationEnabled = true;
    console.log('MobileInit');
    jqmReadyDeferred.resolve();
 });



function PageShowFunction(e)
{
    // we are sure that both frameworks are ready here
}

function CallPageEvent(funcToCall,e)
{
    if(resourcesReady)
    {
        return funcToCall(e);
    }else
    {
        setTimeout(function() {
            CallPageEvent(funcToCall,e);
        }, 200);
    }
}


$(document).ready(function () {
    console.log("document ready");
    // ALL the jQuery Mobile page events on pages must be attached here otherwise it will be too late 
    // example:
    // I use the CallPageEvent beacause this event could be called before the device ready
    /* 
     $("#page").on("pageshow", function(e) {
                CallPageEvent(PageShowFunction,e);
            }
     */



});

app.initialize();