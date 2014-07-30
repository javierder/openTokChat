openTokChat
===========

This jQuery plugin enables a simple chat room using the opentok "signaling" framework:
http://tokbox.com/opentok/libraries/client/js/2.0/reference/Session.html#signal

You'll need an opentok account, and connect to the session as you usually do.

Keep in mind that the signaling framework has a cost.

Usage
======

Include the required css and js file and call the plugin with the div object you want to use as the parent for the chat box:

    $("#chatContainer").openTokChat("init", {session:session});

That's the minimal use.

"init" has several options:
    {
    width: default width of the chat box. Default 640
    height: default height of the chat box. Default 480
    user: name of the user that is accessing the chat from this page. Default Anonymous
    session: opentok session object. No default, required.
    onStart: a function you'd want to call when this is started. Default: doesn't do anything
    }

---
Author: Javyer Derderian
