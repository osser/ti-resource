title: Alloy XML Markup
date: 2015-01-27 11:48:02
tags:
---
#### Introduction

In Alloy, the XML markup abstracts the Titanium SDK UI components, so you do not need to code the creation and setup of these components using JavaScript and the Titanium SDK API. All view files must be placed in the app/views folder of your project with the '.xml' file extension. During code compilation, Alloy looks for these markup files in this specific location to transform them into Titanium code, which can be executed by Studio and the CLI.

The following code is an example of a view file:
~~~ xml
app/views/index.xml
 
<Alloy>
    <Window class="container">
        <Label id="label" onClick="doClick">Hello, World</Label>
    </Window>
</Alloy>
~~~

The Alloy tag is the root element for the XML markup and is required in all views. The Window element defines an instance of the Ti.UI.Window object and within that window instance is the Label element, which defines an instance of a Ti.UI.Label object. Almost all of the Alloy XML tags are the class names of the Titanium UI components without the preceding namespace. Exceptions to this rule are listed in the Element table below.

Within a controller, a UI component can be referenced if its ID attribute is defined. For instance, the Label component in the above example has its ID defined as 'label' and can be referenced in the controller using $.label.

If the top-level UI component does not have an ID defined, it can be referenced using the name of the view-controller prefixed with a dollar sign and period ('$.'). For instance, the Window element in the above example can be referenced in the controller using $.index.

The following code is how you would traditionally code the markup example using the Titanium SDK:
~~~
Resources/app.js
var win = Ti.UI.createWindow();
var label = Ti.UI.createLabel({text: 'Hello, World'});
label.addEventListener('click', doClick);
win.add(label);
~~~

In the previous example, the win.open call and implementation of the doClick callback are missing. In Alloy, your JavaScript code and Titanium API calls need to be placed in the associated controller file to the view. For this example, the code would need be placed in app/controllers/index.js.

The following table lists the attributes for the UI components:

* **id**:
  Identifies UI elements in the controller (prefixed with '$.') and style sheet (prefixed with '#'). IDs should be unique per view but are not global, so multiple views can have components with the same ID.
* **class**:
  Applies additional styles (prefixed with '.' in the TSS file). Overwrites the element style but not the id style.
* **autoStyle**:
  Enables the autostyle feature for dynamic styling when adding or removing classes (since Alloy 1.2.0). See Dynamic Styles: Autostyle for more details.
* **formFactor**:
  Acts as a compiler directive for size-specific view components. Value can either be handheld or tablet. See Conditional Code for more details.
* **if**:
  Use a custom query to apply additional styles to the element (since Alloy 1.4.0). See Conditional Code and Alloy Styles and Themes: Custom Query Styles for more details.
* **module**:
  Requires in a CommonJS module (since Alloy 1.2.0). Note that the XML element must be named after a create＜XMLElement＞ method in the module. See Module Attribute for more details.
* **ns**:
  Overrides the default Titanium.UI namespace. See Namespace for more details.
* **platform**:
  Switches the namespace based on the platform and acts as a compiler directive for platform-specific view components. Values can be any combination of platforms. See Conditional Code and Namespace for more details.
* **＜properties＞**:
  Assigns values to UI object properties. See Property Mapping for more details.
* **＜events＞**:
  Assigns callbacks to UI object events. See Event Handling for more details.

The following table lists the special XML elements besides the Titanium UI components:

* **Alloy**:
  Root element for all view XML files. Required in all views.
* **Collection**:
  Creates a singleton or instance of the specified collection. See the Collection Element for more details.
* **Model**:
  Creates a singleton or instance of the specified model. See the Model Element for more details.
* **Module**:
  Imports a module view inside this view (since Alloy 1.2.0). See the Module Element for more details.
* **Require**:
  Imports a widget or includes another view inside this view. See the Require Element for more details.
* **Widget**:
  Imports a widget inside this view. Same as the Require Element with the type specified to 'widget'. See Importing Widgets for more details.

**index.xml is a special case that only accepts the following view components as direct children of the Alloy tag:**

* Ti.UI.Window or ＜Window＞
* Ti.UI.TabGroup or ＜TabGroup＞
* Ti.UI.iOS.NavigationWindow or ＜NavigationWindow＞ (since Alloy 1.2.2)
* Ti.UI.iPad.SplitWindow or ＜SplitWindow＞

Other views do not have any format restrictions.

For examples, refer to the 'Alloy XML Markup' examples in the Titanium API Guides site. Most examples are in the components under the Titanium.UI section and also in Titanium.Android.Menu, Titanium.Facebook.LoginButton, Titanium.Map and Titanium.Media.VideoPlayer.

#### Require Element

The Require XML element has two uses: including external views and importing widgets into the current view.

**Including Views**

Views may be included in other views using the Require element. Specify the type attribute as 'view' and the src attribute should be the view file minus the '.xml' extension, and assign a unique value to the id attribute to reference the UI objects in the controller code. If you omit the type attribute, Alloy assumes it is implicitly set to 'view'.

The example below creates a tab group in the main view file and includes two separate files for each tab.

Contents of the main view file (index.xml) that includes the rss and about views:

~~~
<Alloy>
    <TabGroup>
        <Tab id="leftTab">
            <Require type="view" src="rss" id="rssTab"/>		
        </Tab>
        <Tab id="rightTab">
            <Require type="view" src="about" id="aboutTab"/>		
        </Tab>	
    </TabGroup>
</Alloy>
~~~

Contents of the rss view file (rss.xml):
~~~
<Alloy>
    <Window id='rssWindow'>
        <WebView id='rssView' />
    </Window>
</Alloy>
~~~

Contents of the about view file (about.xml):
~~~
<Alloy>
    <Window id='aboutWindow'>
        <WebView id='aboutView' />
    </Window>
</Alloy>
~~~

To use UI objects from the included views, the controller needs to reference the ID specified in the Require element and use the getView function with the ID of the object as the argument: var object = $.requireId.getView('objectId'). The code below demonstrates how to access the web view object from the about view, in the previous example code, to change the URL property.

~~~
var aboutView = $.aboutTab.getView('aboutView'); 
aboutView.url = 'http://www.google.com'; 
~~~

**Importing Widgets**

Within a view in the regular Alloy project space (app/views), use the ＜Widget＞ tag to import the widget into the application. A ＜Widget/＞ element is equivalent to a ＜Require/＞ element whose type attribute is set to "widget".

**To import a widget:**

1. Copy the widget to the app/widgets folder. The widget must be contained within its own folder.
2. Add the ＜Widget＞ tag in the XML markup and specify its src attribute as the folder name of the widget.
3. Update the dependencies object in the config.json file by adding a key/value pair with the name of the widget as the key and the version number as the value.

You can optionally add the id and name attributes to the Require element:

* The id attribute allows you to reference the widget in the controller code. You can use this reference to call methods exported by the widget.
* The name attribute allows you to import a specific view-controller in the widget rather than the default one (widget.xml/widget.js). Specify the name of the view-controller minus the extension.

For example, to import the mywidget widget in to a project, copy mywidget to the app/widgets folder.

~~~
app
├── config.json
├── controllers
│   └── index.js
├── views
│   └── index.xml
└── widgets
    └── mywidget
        ├── controllers
        │   ├── foo.js
        │   └── widget.js
        ├── views
        │   ├── foo.xml
        │   └── widget.xml
        └── widget.json
~~~

Then, add the ＜Widget＞ tag in the XML markup. Specify the src attribute as mywidget. Additionally, define the id and name attributes. Since the name attribute is defined, the foo view-controller is used instead of the widget view-controller.

~~~
app/views/index.xml
<Alloy>
    <Window>
        <Widget src="mywidget" id="foo" name="foo" />
    </Window>
</Alloy>
~~~

Since the id attribute is defined, the widget can be accessed from the controller.

~~~
app/controllers/index.js
$.index.open();
$.foo.myMethod();
~~~

Finally, update the dependencies object in the config.json file by adding a key/value pair with the mywidget as the key and the 1.0 as the value:

~~~
    ...
 "dependencies": {
 "mywidget":"1.0"
    }
~~~

**Passing Arguments**

You can add any custom attributes to the markup to initialize a widget or controller. For example, consider the following mark-up:

~~~
apps/views/index.xml
<Require id="foobar" src="foo" customTitle="Hello" customImage="hello.png"/> 
~~~

This is equivalent to the following JavaScript:

~~~
apps/controllers/index.js
var foobar = Alloy.createController('foo', { 
    id: "foobar", 
    customTitle: "Hello", 
    customImage: "hello.png" 
});
~~~

In the required view's controller, the custom properties can be referenced using the arguments[0] variable, for example:

~~~
apps/controllers/foo.js
var args = arguments[0] || {}
var title = args.customTitle || 'Foobar';
var image = args.customImage || 'default.png';
~~~

See [Alloy Controllers: Passing Arguments] for more details.

[Alloy Controllers: Passing Arguments]:http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Controllers-section-34636384_AlloyControllers-PassingArguments

**Binding Events**

To bind a callback to an event in a required view using the on attribute as detailed in Event Handling below, add an event listener for the UI component to trigger the event. For example, suppose you want to require a view that only contains a button. In the parent view, you require the button view and assign a callback to the click event:

Parent View:
~~~
 <Require id="fooButton" src="button" onClick="doClick" />
~~~

Button View:
~~~
<Alloy>
    <Button id="button">Click Me!</Button>
</Alloy>
~~~

The doClick method is defined in the parent's controller.

In the controller of the required view, you need to define an event listener that triggers the event for the parent view to receive:
~~~
$.button.addEventListener('click', function(e) { 
    $.trigger('click', e); 
}); 
~~~

When the button is clicked in the parent view, the controller code in the required view fires a click event, which is caught by the parent view and executes the doClick method.

**Adding Children Views**

Since Alloy 1.3.0, if your Require element is a parent view, you can add children elements to it. These children elements are passed to the parent controller as an array called arguments[0].children. Use this array to access the children views to add them to the parent.

In the example below, you have the index view which is using the Require element to include another view called info. The required view is a yellow box with a brown border. Its controller adds the label view element passed in as the first element of the arguments[0].children array.

~~~
app/views/info.xml
<Alloy>
    <View backgroundColor="yellow" borderWidth="0.5" borderColor="brown"/>
</Alloy>
~~~

~~~
controllers/info.js
var args = arguments[0] || {};
// add children if there are any
_.each(args.children || [], function(child) {
    $.info.add(child);
});
$.info.height = Ti.UI.SIZE; 
~~~

~~~
app/views/index.xml
<Alloy>
    <Window class="container">
        <Require src="info">
            <Label>I am an info box.</Label>
        </Require>
    </Window>
</Alloy>
~~~

#### Namespace

By default, all UI components specified in the views are prefixed with Titanium.UI for convenience. However, to use a component not part of the Titanium.UI namespace, use the ns attribute. For example, to use the Titanium.Map.View, do:
~~~
<View ns="Ti.Map" id="map"/> 
~~~

For UI objects that belong to a specific platform, such as the navigation window. Use the platform attribute to use the object, for example:
~~~
<NavigationWindow platform="ios"/> 
~~~

Many of the Titanium view proxies not part of the Titanium.UI namespace do not require that the ns attribute be explicitly set. The following elements are implicitly mapped to a namespace if one is not defined:

* **Menu**: Ti.Android
* **MenuItem**: Ti.Android
* **Annotation**: Ti.Map
* **VideoPlayer**: Ti.Media
* **MusicPlayer**: Ti.Media
* **AdView**: Ti.UI.iOS
* **CoverFlowView**: Ti.UI.iOS
* **NavigationWindow**: Ti.UI.iOS
* **TabbedBar**: Ti.UI.iOS
* **Toolbar**: Ti.UI.iOS
* **DocumentViewer**: Ti.UI.iPad
* **Popover**: Ti.UI.iPad
* **SplitWindow**: Ti.UI.iPad
* **NavigationGroup**: Ti.UI.iPhone
* **StatusBar**: Ti.UI.iPhone

#### Conditional Code

Add the platform, formFactor and if attributes to apply XML elements based on conditionals.

* To specify a platform-specific element, use the platform attribute and assign it a platform, such as, android, blackberry, ios, or mobileweb.
  Comma separate the values to logically OR the values together, for example, platform='ios,android' indicates both Android and iOS.
  Prepend the value with an exclamation point (!) to negate the value, for example, platform='!ios' indicates all platforms except iOS.
* To specify a device-size-specific element, use the formFactor attribute and assign it a device size–either handheld or tablet.
* To use a custom query (available since Alloy 1.4), assign the if attribute to a conditional statement in the Alloy.Globals namespace. This conditional statement must return a boolean value. You may only assign one query to the if attribute.
* Since Alloy 1.6, the application can also pass custom Boolean properties with the Alloy.createController() method, which can be accessed by the XML. Assign the if attribute to the name of the property prefixed with the $.args namespace, for example, $.args.someProperty.

You can use all the attributes in combination.

In the example below, different Annotation objects are displayed in the view based on the platform and device size.
~~~
<Alloy>
    <Window>
        <Module id="mapview" module="ti.map" method="createView">
            <Annotation title="Cupertino" platform='ios' formFactor='tablet' latitude='37.3231' longitude='-122.0311'/>
            <Annotation title="Redwood City" platform='ios' formFactor='handheld' latitude='37.4853' longitude='-122.2353'/>
            <Annotation title="Mountain View" platform='android' latitude='37.3861' longitude='-122.0828'/>
            <Annotation title="Palo Alto" platform='android,ios,mobileweb' latitude='37.4419' longitude='-122.1419'/>
            <Annotation title="San Francisco" platform='mobileweb' latitude='37.7750' longitude='-122.4183'/>
        </View>
    </Window>
</Alloy>
~~~

You can also create subfolders, named as the platform, in the views directory as another way to create platform-specific views. Refer to [Alloy Concepts: Platform-Specific Resources].

[Alloy Concepts: Platform-Specific Resources]:http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Concepts-section-34636240_AlloyConcepts-Platform-SpecificResources

