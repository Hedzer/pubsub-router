## PubSub Router

### What is it?
`pubsub-router` is a front or backend library for routing messages between components. Message receivers can accept messages based on templates akin to those used in Express JS. `pusbsub-router` does not launch any external http requests, it is for internal routing only. 

### Installation
```
npm install --save pubsub-router
```

### Quick Example
```javascript
import Router from 'pubsub-router';

let router = new Router();

// Receiver
router
    .receive
    .post('/example/:type')
    .respond((request) => process(request.data));

// Sender
router
    .send
    .post('/example/echo')
    .request({ some: 'data' })
    .receive((response) =>  dothing(response.data));
```
In this example, the receiver is creating a listener for virtual `post` requests. These are not real http methods, but they are meant to mirror them. `get`, `post`, `put`, `patch`, `delete` are available.
The sender in this example is sending a virtual `post` using the `request` method and receiving the response sent from the receiver using the `receive` method. The `request` occurs only once, but `receive` behaves like a subscription and is ongoing. 

### Why?
I was building components using shadow DOM and custom elements for an open-source project. Message passing, pub sub and events were a natural way to have components communicate. I wanted to write a more formal library that could help organize the code, rather than just graft together basic pub sub and loose emitters. It can be argued that this project is exactly that, but slightly more put-together.

### In-Depth Usage
---
#### The HTTP Methods
Senders and receivers can accept and send messages across channels. These channels are named after the http methods `get`, `post`, `put`, `patch`, `delete`. These channels mimic the names of http methods because ideally the senders and receivers on those channels do the same kinds of actions that would be performed when using those methods for an API call. e.g. `get` for getting data, `patch` for partial updates. 
A receiver on one channel will not respond to a request on a different channel. i.e. 
```javascript
router
    .receive
    .post('/example/:type')      // <------ only responds to`post`
    .respond((request) => process(request.data));
```
will not respond to 
```javascript
router
    .send
    .get('/example/echo')        // <------ not a `post`
    .request({ some: 'data' })   // <------ will request on `get`
    .receive((response) =>  dothing(response.data));
```
---
#### Routing
Receivers accept and respond to messages on specific channels based on the route of the message. A receiver with a route of `/example/:type` will receive messages from senders that send to paths such as `/example/one`, `/example/green` or `/example/echo`. A response to a specific path with only reach senders on that specific path. Apart from the data sent, the receiver will also receive any route based parameters.
```javascript

// Receiver
router
    .receive
    .post('/example/:type')
    .respond((request) => process(request.data));
/*
	request.data contains: { some: 'data' }
	request.params contains: { type: 'echo' }
*/


// Sender
router
    .send
    .post('/example/echo')
    .request({ some: 'data' })
    .receive((response) =>  dothing(response.data));
```
In the above example, when the receiver receives the request it will contain, among other things, the data sent by the sender as well as the parameters that are produced from parsing the path from the perspective of a route. e.g. `/example/echo` when parsed by `/example/:type` yields params with a value of `{ type: 'echo' }`. 

When the receiver calls `respond` the response will reach all senders subscribed to `/example/echo` via the `receive` method. 

#### Templating
If you've used the npm package `route-parser` this bit will look familiar. Route parsing is done using this library, so this bit of documentation is somewhat ripped off.
| Example         | Description          |
| --------------- | -------- |
| `:name`         |  a parameter to capture from the route up to `/`, `?`, or end of string  |
| `*splat`        |  a splat to capture from the route up to `?` or end of string |
| `()`            |  Optional group that doesn't have to be part of the query. Can contain nested optional groups, params, and splats
| anything else   | free form literals |

Some examples:

* `/some/(optional/):thing`
* `/users/:id/comments/:comment/rating/:rating`
* `/*a/foo/*b`
* `/books/*section/:title`
* `/books?author=:author&subject=:subject`

What this really translates to in this library is that when a receiver listening on route`/*a/foo/*b` is given a path like `/some/foo/path` it will produce the following params as part of the received request: `{ a: 'some', b: 'path' }`. See the code example below:
```javascript
// Receiver
router
    .receive
    .post('/*a/foo/*b')
    .respond((request) => process(request.data));

/* 
	request.data contains: { some: 'data' }
	request.params contains: { a: 'some', b: 'path' }
*/ 

// Sender
router
    .send
    .post('/some/foo/path')
    .request({ some: 'data' })
    .receive((response) =>  dothing(response.data));
```

The route `/users/:id/comments/:comment/rating/:rating` when triggered by a request from the path `/users/123/comments/hello/rating/5` will produce the parameters `{ id: 123, comment: 'hello', rating: 5 }`. See the code example below:
```javascript
// Receiver
router
    .receive
    .post('/users/:id/comments/:comment/rating/:rating')
    .respond((request) => process(request.data));
    
/*
	request.data contains: { some: 'data' }
	request.params contains: { id: 123, comment: 'hello', rating: 5 }
*/
 
// Sender
router
    .send
    .post('/users/123/comments/hello/rating/5')
    .request({ some: 'data' })
    .receive((response) =>  dothing(response.data));
```

#### Many To Many
`pubsub-router` supports multiple receivers and multiple responders. Any senders with the exact same path will receive the same response.

In this example, both `receive` methods will be triggered after the receiver responds.
```javascript

// Receiver
router
    .receive
    .post('/example/:type')
    .respond((request) => process(request.data));    // <--- will get the request

router
    .receive
    .post('/example/:type')
    .subscribe((request) => process(request.data))   // <--- will also get the request
//	.respond(...)     // if we call respond, two messages will be sent to each

// Sender
router
    .send
    .post('/example/echo')
    .receive((response) =>  dothing(response.data));    // <--- will run

router
    .send
    .post('/example/echo')
    .request({ some: 'data' })
    .receive((response) =>  dothing(response.data));    // <--- will also run
```

#### Receiver Methods

| Method| Description |
|--|--|
|Http Method + Route| Sets the http method / channel in which to receive requests and respond. This should precede other calls for clarity. e.g. `.put('/some/route/:arg')`|
| respond | Responds to requests. Accepts a method `(request:  Request) =>  any` and a `count`. The method is called when a request arrives. The count will only allow that many requests to be responded to. Default count is `Infinity`.|
| respondOnce | Responds to a request only once. Has the same arguments as `respond` without the `count` argument. |
|subscribe|Similar to respond, but does not generate a response. Subscribe accepts a method `(request:  Request) =>  void` and runs this method on every request. Subscribe also accepts a `count` and will only allow that many requests to be listened to. Default count is `Infinity`. |
|subscribeOnce|Does the same thing as subscribe but will only listen to one request. It is missing the `count` argument.|
|remove|Cleans up, and removes all responders and listeners.|
|disable|Disables responding and subscribing methods from executing. Execution counts used by the `count` arguments of `respond\Once` and `subscribe\Once` will also freeze.|
|enable|Re-enables a disabled receiver.|
|disabled|Accepts a boolean and will switch the receiver between `enabled` and `disabled`.|

#### Sender Methods
| Method| Description |
|--|--|
|Http Method + Route| Sets the http method / channel in which sender issues requests and receives responses. This should precede other calls for clarity. e.g. `.put('/some/route/arg')`|
|request|Sends a request to a route. e.g. `sender.get('/some/route/arg').request(data)`. A request only occurs once. A request can contain any kind of data.|
|receive|Subscribes to any response sent to the same route the sender is listening on. Receive accepts a method `(response:  Response) =>  Request  |  void` and a `count`. The method will run when a response is received, and acts as an ongoing subscription. If a `Request` type is returned on the subscribing method, a new request will be made (acts like calling `.request`). The `count` argument can be used to restrict the number of received responses. The default count is `Infinity`. |
|receiveOnce|Does the same as `receive` but only subscribes to a single response.|
|remove|Cleans up, and removes all `receive` listeners.|
|disable|Disables `receive\Once` and `request` methods from executing. Execution counts used by the `count` arguments of `receive\Once` will also freeze.|
|enable|Re-enables a disabled sender.|
|disabled|Accepts a boolean and will switch the sender between `enabled` and `disabled`.|


### Quirks
* Sending data in the `GET` channel. GET requests don't usually act like POST, but this was done for the sake of consistency.
* If no receivers are set up when requests are made, those requests are lost. Some consideration has been made for the idea of a buffer of unsent requests, but this could cause other issues.

### Special Thanks
A special thanks to the authors of `route-parser` and `eventemitter3` . This work is built on top of theirs and would have taken significantly longer without the use of those libraries.