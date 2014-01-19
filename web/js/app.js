//these are the core addons for sweetERP, but this should be extended to load 
//addOns dynamically
var coreAddOns = [

];

//initalize app
enyo.kind({
    name: "initialize",
    kind: enyo.Component,
    init: function () {
        //check if local storage is enabled
        if (!store.enabled) {
            console.log('Local storage is not supported by your browser. Please disabled "Private Mode", or upgrade to a modern browser')
            //return
        }
        //load apps and render 
        enyo.load(coreAddOns, function () {
            var mainLayout = app.$.gui.$.FittableAppLayout;
            if (mainLayout) {
                mainLayout.renderInto(document.body);
            }
        });
    }
});

//enyo enters at App
enyo.kind({
    name: "App",
    rendered: function () {
        //when rendered
        //set app to the main app container
        app = this;
        app.$.initialize.init();
        app.addNewItem();
        
        
        //this is needed for scroll lists to use bootstrap drop down
        $('.enyo-list-page > div').on('mouseover', function () {
            var group = $('.btn-group', $(this));
            if (!group.hasClass('open')) {
                $(this).click();
            }

        });
    },
    //with-in the enyo framework we will declare all our other components that have been built elsewhere.
    components: [{
        name: "initialize",
        kind: "initialize"
    }, {
        name: "gui",
        kind: "gui"
    }],
    addNewItem: function (inSender, inEvent) {
        var guilist = app.$.gui.$.FittableAppLayout.$.sideList;
        var index = guilist.getCount();
        guilist.setCount(index + 10);
        guilist.reset();
    },
    setupItem: function (inSender, inEvent) {
        item = inSender.$.listItem,
        index = inEvent.index;
        item.$.itemIndex.setContent(index);
    },
});
