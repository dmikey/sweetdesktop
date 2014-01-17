//setup the sweeterp object for extension
window.sweeterp = window.sweeterp || {
    removeMenu: function(appID){
        sweeterp.addMenu(appID, {menuLocation:'none'});
    },
    addMenu : function(appID, enyoDict){
            if(enyoDict.menuLocation){
                var uuid = guid();
                if(enyoDict.menuLocation == 'list'){
                    app.$.gui.$.FittableAppLayout.$.LowerLeftMenu.createComponent({
                        id: uuid,
                        attributes:{"data-appid":appID},
                        handlers: {
                            ontap: "clickHandler"
                        },
                        clickHandler: function(){
                            if($(this).attr('data-appid') == "com_sweeterp_sweetapps"){
                                        sweeterp.appstore.showapp();
                                    } else{
                                        sweeterp.appstore.apps[$(this).attr('data-appid')].showapp();
                            }
                            app.$.gui.$.FittableAppLayout.$.LowerLeftMenu.hide();
                        },
                        components: [{
                            tag: "i",
                            classes: enyoDict.icon,
                            content: ' '
                        }, {
                            tag: "span",
                            style: "margin-left:5px",
                            content: enyoDict.displayName
                        }],
                        
                    })
                    app.$.gui.$.FittableAppLayout.$.LowerLeftMenu.render();
                } else {
                    var installedapps = sweeterp.appstore.getInstalledApps();
                    if(installedapps[appID] == true && enyoDict.menuLocation == 'bar'){
                        app.$.gui.$.FittableAppLayout.$.BottomDockBar.createComponent({
                                kind: "onyx.Button",
                                id: uuid,
                                attributes:{"data-appid":appID},
                                    handlers: {
                                        ontap: "clickHandler"
                                    },
                                    clickHandler: function(){
                                        if($(this).attr('data-appid') == "com_sweeterp_sweetapps"){
                                                    sweeterp.appstore.showapp();
                                                } else{
                                                    sweeterp.appstore.apps[$(this).attr('data-appid')].showapp();
                                        }
                                    },
                                components: [{
                                    tag: "i",
                                    classes: enyoDict.icon,
                                    content: ''
                                },{
                                    tag: "span",
                                    classes: "badge badge-info animated fadeInUp",
                                    style: "position: absolute;margin-top: -15px;visibility:visible;",
                                    content: '2'
                                }]
                        });
                    }else{
                        //remove from the bar
                        for (var i=0;i<app.$.gui.$.FittableAppLayout.$.BottomDockBar.controls.length;i++)
                        { 
                            if($('#' + app.$.gui.$.FittableAppLayout.$.BottomDockBar.controls[i].id).attr('data-appid') == appID)
                            {
                                app.$.gui.$.FittableAppLayout.$.BottomDockBar.controls[i].destroy();
                            }
                           
                        }
                    }
                }
                
                app.$.gui.$.FittableAppLayout.$.BottomDockBar.render();
                
            }
        }    ,
    'register': function (enyoDict) {
        var appID = enyoDict.name;
            
        if (window[enyoDict.name]) {
            return {
                'status': 'error',
                'message': 'error already exists'
            }
        }

        //enyoDict.kind = enyo.Component;
        enyo.kind(enyoDict);
        var pollEnyoLoaded = setInterval(function () {
            if (typeof (window[appID]) == 'function') {
                clearInterval(pollEnyoLoaded);
                if (window['com_sweeterp_sweetapps'] && !sweeterp.appstore) {
                    sweeterp.appstore = new window[appID];
                    sweeterp.appstore.load();
                } else {
                    var installedapps = sweeterp.appstore.getInstalledApps();
                    var new_app = new window[appID]
                    sweeterp.appstore.pushApp(appID, new_app);
                    new_app.load();
                    if(sweeterp.appstore.getDefaultApp() == appID && installedapps[appID]){
                        new_app.showapp();                    
                    }
                }
            }
            sweeterp.addMenu(appID, enyoDict);
        }, 500);

        
        return {
            'status': 'ok',
            'message': 'load routine succedded'
        }
    }
};

//a vanilla SweetERPApp for plugging into sweetERP
enyo.kind({
    name: "SweetERPApp",
    kind: enyo.Component,
    showapp: function () {
        //if a main stage is present then render the main stage
        if (this.$.MainStage) {
            try {
                for(var key in app.$.gui.$.FittableAppLayout.$.MainStage.controls){
                    app.$.gui.$.FittableAppLayout.$.MainStage.removeControl(app.$.gui.$.FittableAppLayout.$.MainStage.controls[key]);
                }
                for(var key in app.$.gui.$.FittableAppLayout.$.MainStage.$){
                    app.$.gui.$.FittableAppLayout.$.MainStage.removeComponent(app.$.gui.$.FittableAppLayout.$.MainStage.$[key]);
                }
                app.$.gui.$.FittableAppLayout.$.MainStage.addComponent(this.$.MainStage);
                app.$.gui.$.FittableAppLayout.$.MainStage.addControl(this.$.MainStage);
            } catch (ex) {
                console.log(ex);
            }

            app.$.gui.$.FittableAppLayout.$.MainStage.render();

        }
    },
    pushApp: function(){
        
    }
});

enyo.kind({
    name: "SweetERPControl",
    kind: enyo.Control,
    listPortResize: function () {
        $(this.owner.$.mainList.$.port.node).height(this.owner.$.mainList.portSize)
    },

});

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}

