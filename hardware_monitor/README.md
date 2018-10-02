# Hardware monitor

A super bare bones panel extension that shows the current PC load info from a node.js app
that connects with the 3rd party auth system.

## Extension

Frontend code lives in ./extension

This app displays the PC stats that are sent up from the Node.js companion app

The config page lets the streamer input a pin from the Node.js app to authorize it.

##  Node.js APP

Check out the companion app in ./external

This Nodejs app shows an example of handling the Game Auth flow and sends data to the extension state backend.
