title: How do I test on an iPhone 6 Simulator
date: 2015-02-17 14:36:17
tags:
---

#### Studio

Via Studio you can simply select it from the menu.

#### CLI

Via CLI you have 3 options.

1) You can look up a simulator device’s UDID and then use that with -C:

~~~
$ ti info -t ios

$ ti build -p ios -C [UDID]
~~~

2) Or you can instruct the CLI to prompt every time you build:

~~~
$ ti config ios.autoSelectDevice false
~~~

3) Even better is to trigger the prompt only when you need it by passing an invalid value for ~~-C~~:

~~~
$ ti build -p ios -C ?
~~~

参照URL:

http://www.tidev.io/2014/09/10/qa-iphone-6-ios-8-and-apple-watch/
