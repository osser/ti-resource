title: Alloyサンプル
date: 2015-01-23 12:03:51
tags:
---

#### Alloy URL

http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_Framework

#### 共通スタイル(app.tss)

~~~
"Window": {
    backgroundColor: "#fff"
}
"Label": {
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    color: "#000",
    font: {
        fontSize: "18",
    },
    textAlign: 'center'
}
'Label[platform=android]': {
    color: '#000' // Android default to black
}
'Window[platform=android]': {
    modal: false // android windows all heavyweight
}
'TextField': {
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED, // default style
    borderColor : 'black'
}
'TextField[platform=android]': {
    borderRadius: 6, // common default style
    borderColor : 'black',
    borderWidth : 1
}
'ImageView[platform=ios]': {
    preventDefaultImage: true // never image while loading remote
}
~~~

#### index画面例

~~~
<!-- index.xml -->
<Alloy>
    <TabGroup>
    <!-- Tabs included via <Require> tag -->
    <Require id="feedController" src="feed"/>
    <Require id="friendsController" src="friends"/>
    <Require id="settingsController" src="settings"/>
    </TabGroup>
</Alloy>
~~~

