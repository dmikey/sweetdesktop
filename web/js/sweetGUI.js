enyo.kind({
    name: "FittableAppLayout",
    kind: "enyo.FittableRows",
    classes: "enyo-fit",
    components: [{
            kind: "onyx.Toolbar",
            style: "height:50px;",
            components: [
                {
                    kind: "onyx.Button",
                    classes: "user-icon",
                    components: [{
                        classes: "user-button",
                        kind: "Image",
                        src: "img/derek.jpeg",
                    }]
                }, {
                    classes: "brand",
                    components: [{
                        classes: "brandname",
                        content: "Sweet",
                    }, {
                        classes: "brandsuffix",
                        content: "ERP",
                    }]
                },
            ]
        },

        {
            kind: "enyo.FittableColumns",
            fit: true,
            components: [{
                    kind: "FittableRows",
                    classes: "fittable-sample-shadow4",
                    style: "width: 30%; position: relative; z-index: 1;",
                    components: [{
                        kind: enyo.List,
                        id: "sideListMenu",
                        name: "sideList",
                        style: "background-color:#fff;",
                        fit: true,
                        touch: true,
                        onSetupItem: function(){
                            console.log('hey');
                        },
                        components: [{
                                name: "item",
                                style: "padding: 10px;border-bottom:1px solid #ccc;",
                                classes: "enyo-border-box side-panel-item",
                                components: [{
                                        style: "float:left;margin-right:10px;",
                                        name: "more",
                                        components: [

                                        ]
                                    },

                                    {
                                        tag: "h3",
                                        name: "title",
                                        classes: "panels-sample-flickr-title",
                                        content: "List Item Title"
                                    }, {
                                        tag: "p",
                                        style: "text-align:justify;",
                                        content: "Bacon ipsum dolor sit amet meatball brisket pancetta, short loin salami short ribs tri-tip bacon tail kielbasa drumstick ground round shankle pork belly turkey."
                                    }, {
                                        tag: "div",
                                        classes: "clearboth"
                                    }, {
                                        tag: "div",
                                        classes: "clearboth"
                                    }
                                ]
                            },

                        ]
                    }, {
                        kind: "onyx.Toolbar",
                        style: "height: 57px;",
                        components: [{
                                kind: "onyx.MenuDecorator",
                                onSelect: "itemSelected",
                                components: [{
                                    kind: "onyx.Button",
                                    components: [{
                                        tag: "i",
                                        classes: "fa fa-bars",
                                        content: ''
                                    }]
                                }, {
                                    kind: "onyx.Menu",
                                    name: "LowerLeftMenu",
                                    components: [{
                                            components: [{
                                                tag: "i",
                                                classes: "fa fa-cogs",
                                                content: ' '
                                            }, {
                                                tag: "span",
                                                style: "margin-left:5px",
                                                content: 'Settings'
                                            }]
                                        }, {
                                            components: [{
                                                tag: "i",
                                                classes: "fa fa-sign-out",
                                                content: ' '
                                            }, {
                                                tag: "span",
                                                style: "margin-left:5px",
                                                content: 'Log Out'
                                            }]
                                        }, {
                                            classes: "onyx-menu-divider"
                                        },

                                    ]
                                }]
                            },


                        ],

                    }],

                },

                {
                    kind: "FittableRows",
                    fit: true,
                    components: [{
                        style: "height:200px;",
                        classes: "fittable-sample-fitting-color",
                        kind: "Scroller",
                        fit: true,
                        id: "thescroller",
                        touch: true, 
                        components: [{
                            tag: "div",
                            kind: enyo.Control,
                            name: "MainStage",
                            fit: true,
          
                            components: [],
                        }]
                    }, {
                        kind: "onyx.Toolbar",
                        name: "BottomDockBar",
                        style: "height: 57px;",
                        components: []
                    }]
                }
            ]
        }
    ],
});


enyo.kind({
    name:"sweetui.toggle",
    tag: "div",
    kind: enyo.Button,
    classes:"make-switch switch-mini",
    attributes:{"data-on" : "success" , "data-off" :"danger"},
    components:[
        {kind:"enyo.Input", name: "checkbox",  attributes:{"type":"checkbox"}}
    ]
});

enyo.kind({
    name: "sweetui.button",
    kind: enyo.Button,
    classes: 'btn',
    tag: 'div',
    content: 'Set Content',
});


enyo.kind({
    name: "sweetui.dropdownbutton",
    kind: enyo.Control,
    rendered: function(){
        console.log('button');
    },
    components:[{
                tag: "div",
                classes: "btn-group",
                components: [{
                    tag: "a",
                    classes: "btn btn-success dropdown-toggle",
                    attributes: {
                        'data-toggle': 'dropdown'
                    },
                    components: [{
                        name: "icon",
                        tag: "i",
                        style: "font-size:34px;float:left;margin-right: 10px;",
                        classes: "fa fa-shopping-cart",
                        content: ''
                    }, {
                        content: "",
                        style: "display:inline;margin-right:2px;"
                    }, {
                        tag: "span",
                        classes: "caret"
                    }]
                },{
                    tag: "ul",
                    classes: "dropdown-menu",
                    components: [{
                        tag: "li",
                        components: [{
                            tag: "a",
                            content: "Remove"
                        }]
                    }, {
                        tag: "li",
                        components: [{
                            tag: "a",
                            content: "Reply"
                        }]
                    }, {
                        tag: "li",
                        components: [{
                            tag: "a",
                            content: "More Info"
                        }]
                    }, ]
                }, ]
            },]
})

                             


//define all GUI components here
enyo.kind({
    name: "gui",
    kind: enyo.Component,
    components: [{
        name: "FittableAppLayout",
        kind: "FittableAppLayout"
    }]
});