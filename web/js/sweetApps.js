// this sample app is written using the sweeterp api, enyo and jQuery
// written by the sweetERP Team
$(function () {

    var app = {
        //required application settings
        name: "com_sweeterp_sweetapps",
        author: "SweetERP Team",
        description: "Shows the Collection of Registered Apps",
        //required for tool bar display
        icon: "fa fa-puzzle-piece", //relying on font awesome for now
        displayName: "Add Ons",
        menuLocation: "list",  //list or bar
        //inherit from our super type
        kind: "SweetERPApp",
        //wrapping some local storage routines
        getInstalledApps: function(){
            return store.get('com_sweeterp_sweetapps_config').installed_apps;
        },
        getDefaultApp: function(){
            return store.get('com_sweeterp_sweetapps_config').default_app;
        },
        // all apps are loaded into the ui instance immediately
        // this fires when the app is loaded
        load: function () {
            var config = store.get('com_sweeterp_sweetapps_config');
            if(typeof(config) == 'undefined'){
                store.set('com_sweeterp_sweetapps_config',{
                    installed_apps:{},
                    default_app:''
                });
            };
        },
        //some custom app stuff below here for sweeterp apps
        apps: {},
        applist: [],
        pushApp: function (appid, app) {
            this.apps[appid] = app;
            this.applist.push({'appid':appid});
        },
    };

    //define your apps components
    app.components = [{
        kind: enyo.Component,
        // 
        name: "gui",
        components: [{
            // the gui of your app should always point to MainStage for rendering consistency
            name: "MainStage",
            kind: "SweetERPControl",
            fit: true,
            //the rendered function is called when the apps mainstage is rendered
            rendered: function () {
                //stage population of the list for stying

                
                //add filtering here for displaying apps that should show up in the list
                this.owner.$.mainList.data = sweeterp.appstore.applist;
                this.owner.$.mainList.setCount(Object.keys(sweeterp.appstore.apps).length)
                this.owner.$.mainList.reset();
                
                
                //$('.make-switch')['bootstrapSwitch']();
                
                //using adjust the port for the list size using the api
                this.listPortResize();

                //this animation is getting fired off to frequently
                //get the list items from the list below, in the MainStage container
                //var listItems = $('.list-item', document.getElementById(this.owner.$.MainStage.id));
                //listItems.css('visibility', 'hidden');
                //var time_space = 0;
                //listItems.each(function(){
                //    var $this = $(this);
                //    setTimeout(function(){
                //        $this.css('visibility', 'visible');
                //        $this.addClass('animated fadeIn');
                //    }, time_space)
                //    time_space = time_space + 100;
                //});
                
                
            },
            components: [{
                kind: "List",
                name: "mainList",
                style: "padding-left:15px;",
                fit: true,
                touch: true,
                handlers: {
                    onSetupItem: "setupItem"
                },
                
                setupItem: function(inSender, inEvent) {
                    //setup the display for the list items
                    var applistdata = this.data[inEvent.index];
                    var app = sweeterp.appstore.apps[applistdata.appid];
                    var installedapps = sweeterp.appstore.getInstalledApps();
                    
                    this.owner.$.title.setContent(app.displayName);
                    this.owner.$.description.setContent(app.description);
                    this.owner.$.author.setContent(app.author);
                    this.owner.$.icon.setClasses(app.icon);
                    this.owner.$.installButton.AppID = applistdata.appid;
                    this.owner.$.defaultCheck.setAttribute("data-appid", applistdata.appid);
                    
                    var installed = (installedapps[applistdata.appid] == true);
                    var classes = installed ? "btn-large btn-warning" : "btn-large btn-success";
                    var btntext = installed ? "Remove" : "Install";
                    var defaultshow = installed ? "visibility: visible;margin-top:5px;background-color:#006dcc;width:100%;color:#fff;padding: 5px 0px 5px 0px;" : "visibility: hidden";
                    var isdefault = (applistdata.appid == store.get('com_sweeterp_sweetapps_config').default_app) ? true : false;

                    
                    this.owner.$.installButton.setClasses(classes);
                    this.owner.$.installButton.setContent(btntext);
                    this.owner.$.installButton.setAttribute("data-appid", applistdata.appid);
                    
                    this.owner.$.defaultToggle.setStyle(defaultshow);
                
                    this.owner.$.defaultCheck.setValue(isdefault);
                    

                },

                components: [{
                        name: "item",
                        classes: "list-item",
                        style: "width: 190px;\
                                height: 350px;\
                                padding: 5px;\
                                border: 1px solid #fff;\
                                background-color: #fff;\
                                text-align: center;\
                                margin: 5px;\
                                float: left;\
                                box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);",
                        components: [{
                        name: "icon",
                        tag: "i",
                        style: "font-size:64px;color:#006dcc;",
                        classes: "fa fa-shopping-cart",
                        content: ''
                    }, {
                            tag: "h3",
                            name: "title",
                            content: "Add-On Title"
                        }, {
                            tag: "p",
                            name: "description",
                            content: "Bacon ipsum dolor sit amet meatball brisket pancetta"
                        },{
                            tag: "span",
                            components: [{content:"AddOn Author", 
                            style: "font-size:11px"}, { style:"color:#006dcc;",
                            name: "author"}]
                        },
                               {name:"defaultToggle", components:[
                               {content:"Default Launch App"},
                                       {
                                            tag: "div",
                                            kind: enyo.Button,
                                            classes:"make-switch switch-mini",
                                            attributes:{"data-on" : "success" , "data-off" :"danger"},
                                            components:[
                                                {kind:"enyo.Checkbox", name: "defaultCheck", handlers: {
                                                    onclick: "changeHandler"
                                                }, changeHandler:function(InSender, InEvent){
                                                    if(InEvent.target.checked){
                                                        var config = store.get('com_sweeterp_sweetapps_config');
                                                        config.default_app = InEvent.target.attributes['data-appid'].value;
                                                        store.set('com_sweeterp_sweetapps_config', config);
                                                    }else{
                                                        var config = store.get('com_sweeterp_sweetapps_config');
                                                        if(config.default_app == InEvent.target.attributes['data-appid'].value) {
                                                            config.default_app = '';
                                                            store.set('com_sweeterp_sweetapps_config', config);
                                                        }
                                                    }
                                                }}
                                            ]
                                        }
                               ]},{classes:"clearfix"},
                         {
                             kind: "sweetui.button",
                             name: "installButton",
                             classes: "btn btn-success btn-large",
                             content: "Install",
                             style: "margin-top:10px;",
                             //add click handlers to buttons
                             handlers: {
                                    ontap: "tapHandler"
                             },
                             tapHandler: function(inSender, inEvent) {                 
                                   var config = store.get('com_sweeterp_sweetapps_config');
                                    if(inEvent.target.textContent == 'Install'){
                                        config.installed_apps[inEvent.target.getAttribute('data-appid')] = true;
                                        store.set('com_sweeterp_sweetapps_config', config);
                                        sweeterp.addMenu(inEvent.target.getAttribute('data-appid'), sweeterp.appstore.apps[inEvent.target.getAttribute('data-appid')]);
                                    }else {
                                        config.installed_apps[inEvent.target.getAttribute('data-appid')] = false;
                                        store.set('com_sweeterp_sweetapps_config', config);
                                        sweeterp.removeMenu(inEvent.target.getAttribute('data-appid'));
                                    }
                                    this.owner.$.MainStage.render();
                             },
                         },]
                    },

                ]
            }, ],
        }]
    }];

    //register your app with sweeterp api                                 
    var load_result = sweeterp.register(app);
});