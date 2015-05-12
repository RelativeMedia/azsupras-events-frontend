"use strict";angular.module("frontend",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap","LocalStorageModule","angularPayments","gavruk.card"]).config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("home",{url:"/",data:{pageTitle:"Event Schedule",pageHeading:"Event Schedule"},templateUrl:"app/main/main.html",controller:"MainCtrl"}).state("event",{url:"/event/:id",templateUrl:"app/event/event.html",controller:"EventCtrl"}).state("checkout",{url:"/checkout",templateUrl:"app/checkout/index.html",controller:"CheckoutCtrl"}).state("checkoutSuccess",{url:"/checkout/success",templateUrl:"app/checkout/success.html",controller:"CheckoutSuccessCtrl"}),t.otherwise("/")}]).run(["$rootScope","localStorageService","Cart",function(e,t,a){e.title="AZSupras Events",e.api={endPoint:"https://api.azsupras.com/v1"},e.calculateTotal=function(){return a.calculateTotal()},e.clearCart=function(){a.clear()},e.calculateCartCount=function(){var t=0;return angular.forEach(e.cart,function(e){angular.forEach(e.items,function(e){t+=e.qty})}),t},e.cart=t.get("event.cart")||[]}]),angular.module("frontend").controller("NavbarCtrl",["$scope",function(e){e.date=new Date}]),angular.module("frontend").controller("MainCtrl",["$state","$scope","Event",function(e,t,a){var n=a.query(function(){console.log(e),t.hover=function(e){return e.showDetails=!e.showDetails},t.parseDate=function(e){var t=new Date(e.startDate),a=new Date(e.endDate);if(864e5>=(a-t)/1e3)var n=moment(t).format("MMM Do, YYYY hh:mm A")+" - "+moment(a).format("hh:mm A");return console.log(n),n},t.events=n,t.title="Event Schedule"})}]),angular.module("frontend").controller("EventCtrl",["$state","$rootScope","$scope","$filter","Event","Cart",function(e,t,a,n,r,s){r.get({id:e.params.id},function(e){t.pageTitle=e.name,t.pageHeading=e.name,a.event=e}),a.addItem=function(e,t){s.addItem(e,t)},a.dateDiff=function(e,t){t=new Date(t),e=new Date(e);var a=e-t;return 24>=a/1e3/60/60&&a/1e3/60/60>=2?a/1e3/60/60+" Hours":1>=a/1e3/60/60?a/1e3/60+" Minutes":void 0}}]),angular.module("frontend").controller("CheckoutSuccessCtrl",["$state","$rootScope","$scope",function(){}]),angular.module("frontend").controller("CheckoutCtrl",["$state","$rootScope","$scope","Checkout","Cart",function(e,t,a,n,r){t.pageTitle="Checkout",t.pageHeading="Checkout",a.checkout={},a.deleteItem=function(e,t){r.removeItem(e,t)},a.stripeCallback=function(t,s){a.processing=!0,s.error?window.alert("it failed! error: "+s.error.message):n.process({amount:r.calculateTotal(),currency:"usd",cart:r.items(),details:a.checkout,token:s.id},function(t,n){t?(console.error(t),a.hasError=!0,a.processing=!1,a.message=t):(r.clear(),e.go("checkoutSuccess"),console.log(t,n))})}}]),angular.module("frontend").factory("Event",["$resource","$rootScope",function(e,t){return e(t.api.endPoint+"/event/:id",{id:"@_id"})}]).service("Cart",["$rootScope","localStorageService","$filter",function(e,t,a){return{items:function(){return e.cart},addItem:function(n,r){var s=a("filter")(e.cart,{id:n.id},!0);if(s.length<=0)e.cart.push({name:n.name,id:n.id,items:[{slug:r.name.toLowerCase(),name:r.name,qty:1,cost:r.amount}]});else{var o=a("filter")(s[0].items,{slug:r.name.toLowerCase()},!0);o.length<=0?s[0].items.push({slug:r.name.toLowerCase(),name:r.name,qty:1,cost:r.amount}):o[0].qty++}t.set("event.cart",e.cart)},findItem:function(){},removeItem:function(t,a){console.log(e.cart),angular.forEach(e.cart,function(e){e.id===t.id&&angular.forEach(e.items,function(t,n){t.slug===a.name.toLowerCase()&&e.items.splice(n,1)})}),console.log(e.cart)},updateQty:function(){},calculateTotal:function(){var t=0;return angular.forEach(e.cart,function(e){angular.forEach(e.items,function(e){var a=parseFloat(e.cost)*e.qty;t=parseFloat(t)+parseFloat(a)})}),parseFloat(t).toFixed(2)},clear:function(){e.cart.length=0,t.remove("event.cart")}}}]).factory("Checkout",["$http","$rootScope",function(e,t){return{process:function(a,n){e.post(t.api.endPoint+"/checkout",a).success(function(e){n(null,e)}).error(function(e,t,a){console.error("Uhoh looks like there was a server error!",e,t,a),n(e)})}}}]),angular.module("frontend").filter("getByProperty",function(){return function(e,t,a){console.log(e,t,a);for(var n=0,r=a.length;r>n;n++)if(a[n][e]==+t)return a[n];return null}}),angular.module("frontend").directive("title",["$rootScope","$timeout",function(e,t){return{link:function(){var a=function(a,n){t(function(){e.title=n.data&&n.data.pageTitle?e.title+" | "+n.data.pageTitle:e.title})};e.$on("$stateChangeSuccess",a)}}}]).directive("numCartItems",["$rootScope",function(e){return{link:function(){var t=0;return angular.forEach(e.cart,function(e){angular.forEach(e.items,function(){t++})}),t}}}]),angular.module("frontend").run(["$templateCache",function(e){e.put("app/checkout/index.html",'<div class="container"><div class="row"><div class="col-lg-8"><table class="table table-striped"><thead><tr><th>Item</th><th>Qty</th><th>Sub Total</th><th></th></tr></thead><tbody ng-repeat="event in cart"><tr><td colspan="4"><strong>{{event.name}}</strong></td></tr><tr class="event-item" ng-repeat="item in event.items"><td>{{ item.name }}</td><td><input type="number" min="0" max="9" ng-model="item.qty" required=""></td><td>{{ (item.cost * item.qty) | currency}}</td><td><button class="btn btn-danger" ng-click="deleteItem(event, item)"><i class="fa fa-trash"></i></button></td></tr><tr><td><strong>Total Cost</strong></td><td colspan="2">{{ calculateTotal() | currency }}</td><td><button class="btn btn-danger btn-md" ng-click="clearCart()" ng-show="cart.length > 0">Clear Cart</button></td></tr></tbody></table></div><div class="col-lg-4"><div><h1>Payment Details</h1><div class="row"><div class="col-lg-12"><form stripe-form="stripeCallback" role="form" id="ccForm" name="ccForm"><div class="row"><div class="form-group" ng-class="{ \'has-error\': (ccForm.firstname.$invalid || ccForm.lastname.$invalid) && ccForm.email.$dirty }"><div class="col-lg-6"><label for="firstname">FIRST NAME</label> <input type="text" ng-model="checkout.firstname" name="firstname" id="firstname" placeholder="First Name" class="form-control" required=""></div><div class="col-lg-6"><label for="lastname">LAST NAME</label> <input type="text" ng-model="checkout.lastname" name="lastname" id="lastname" placeholder="Last Name" class="form-control" required=""></div></div></div><div class="row"><div class="col-lg-12"><div class="form-group" ng-class="{ \'has-error\': ccForm.phonenumber.$invalid && ccForm.phonenumber.$dirty }"><label for="phonenumber">PHONE NUMBER</label> <input type="number" ng-model="checkout.phone" name="phonenumber" id="phonenumber" placeholder="Phone Number" class="form-control" required="" ng-minlength="10" ng-maxlength="10"></div></div></div><div class="row"><div class="col-lg-12"><div class="form-group" ng-class="{ \'has-error\': ccForm.emailaddress.$invalid && ccForm.emailaddress.$dirty }"><label for="emailaddress">EMAIL ADDRESS</label> <input type="email" ng-model="checkout.email" name="emailaddress" id="emailaddress" placeholder="your@email.com" class="form-control" required=""></div></div></div><div class="row"><div class="col-lg-12"><div class="form-group" ng-class="{ \'has-error\': ccForm.username.$invalid && ccForm.username.$dirty }"><label for="username">FORUM USERNAME</label> <input type="text" ng-model="checkout.username" name="username" id="username" placeholder="YourUsername" class="form-control"></div></div></div><div class="row"><hr><div class="col-xs-12"><div class="form-group" ng-class="{ \'has-error\': (ccForm.cardNumber.$invalid && ccForm.cardNumber.$dirty) || hasError }"><label for="cardNumber">CARD NUMBER</label><div class="input-group"><input type="text" class="form-control" name="cardNumber" placeholder="Valid Card Number" required="" ng-model="number" payments-validate="card" payments-format="card" payments-type-model="type" ng-class="myForm.number.$card.type"> <span class="input-group-addon"><i class="fa fa-credit-card"></i></span></div></div></div></div><div class="row"><div class="col-xs-7 col-md-7"><div class="form-group" ng-class="{ \'has-error\': (ccForm.expiry.$invalid && ccForm.expiry.$dirty) || hasError }"><label for="expiry">EXPIRATION DATE</label> <input type="text" class="form-control" name="expiry" placeholder="MM/YY" required="" ng-model="expiry" payments-validate="expiry" payments-format="expiry"></div></div><div class="col-xs-5 col-md-5 pull-right"><div class="form-group" ng-class="{ \'has-error\': (ccForm.cvCode.$invalid && ccForm.cvCode.$dirty) || hasError }"><label for="cvCode">CV CODE</label> <input type="password" class="form-control" name="cvCode" placeholder="CV" required="" ng-model="cvc" payments-validate="cvc" payments-format="cvc" payments-type-model="type"></div></div></div><div class="row"><div class="col-xs-3"><button type="submit" class="btn btn-success" ng-disabled="{{processing}}">Pay Now</button></div><div class="col-xs-9"><div class="alert alert-danger" role="alert" ng-show="message"><strong>Uhoh!</strong><br>{{message.message}}</div></div></div></form></div></div></div></div></div></div>'),e.put("app/checkout/success.html",'<div class="container"><div class="row"><div class="col-xs-12"><h1>Success!</h1></div></div><div class="row"><div class="col-xs-12"><p>You have paid for the event, you should receive an email confirmation shortly. Print out the email and bring it to the event, it\'s your way in!</p></div></div></div>'),e.put("app/event/event.html",'<section class="singleEvent"><div class="container"><div class="row"><div class="col-lg-12"><img ng-src="{{ event.titleImage.extra.Location }}" class="img-responsive"></div></div></div></section><section class="singleEventDetails"><div class="container"><div class="row"><div class="col-lg-12"><h1>Event Description</h1></div></div><div class="row"><div class="col-lg-8"><div class="row"><div class="col-lg-12" ng-bind-html="event.content"></div></div><hr><div class="row"><div class="col-lg-12"><h3>Get More Info</h3><div class="moreInfoBox"><ul class="forumLinks"><li><a href="https://azsupras.com" target="_blank">Checkout the Forums</a></li><li><a href="{{event.forumLink}}" target="_blank">Forum Event Thread</a></li></ul><ul class="socialMedia"><li><a href="{{event.facebookEvent}}" target="_blank"><i class="fa fa-facebook-official fa-3x"></i></a></li></ul></div></div></div></div><div class="col-lg-4"><aside class="when"><h2>When</h2><ul class="dateList"><li><strong>Starts on</strong> {{event.startDate | date: \'medium\'}}</li><li><strong>Ends on</strong> {{event.endDate | date: \'medium\'}}</li><li><strong>Event lasts {{ dateDiff(event.endDate, event.startDate) }}</strong></li></ul></aside><aside class="pricing"><h2>Pricing</h2><ul class="pricingList" ng-hide="!event.prices.length"><li ng-repeat="price in event.prices"><span ng-bind="price.name"></span> <span ng-bind="price.amount | currency"></span> <button class="btn btn-success btn-md" ng-click="addItem(event, price)"><i class="fa fa-lg fa-cart-plus"></i>Add to Cart</button></li><li class="seperator" ng-show="cart.length"><strong>Total</strong> <span ng-bind="calculateTotal() | currency"></span></li><button class="btn btn-danger btn-md" ng-click="clearCart()" ng-show="cart.length > 0">Clear Cart</button> <a ui-sref="checkout" class="btn btn-primary btn-md" ng-show="cart.length > 0">Checkout</a></ul><p ng-show="!event.prices.length">This event is totally free!</p></aside><aside><h2>Where</h2><address><strong>{{event.location.name}}</strong><br>{{event.location.address}}<br>{{event.location.city}}, {{event.location.state}} {{event.location.zipCode}}</address><img src="{{event.staticMap}}" class="img-responsive"></aside></div></div></div></section>'),e.put("app/main/main.html",'<div class="container"><div class="row"><div class="col-xs-12"><h2>Upcoming Events</h2></div></div><section class="eventsList" ng-hide="!events"><div class="row"><div ng-class="{ \'col-xs-12 col-sm-12 col-md-4 col-lg-4 events\':!$first, \'col-xs-12 firstEvent\':$first }" ng-repeat="event in events" ng-mouseenter="hover(event)" ng-mouseleave="hover(event)"><div class="eventTitleContainer"><div class="event"><div class="col-xs-8"><h3 class="eventTitle">{{event.name}}</h3></div><div class="col-xs-4"><ul class="eventDates"><li><h4 class="eventDate" ng-bind="parseDate(event)"></h4></li></ul></div></div><div class="eventDetails" ng-show="event.showDetails"><div class="col-lg-6"><div class="pricing" ng-hide="!event.prices.length"><strong>Pricing</strong><ul><li ng-repeat="price in event.prices">{{price.name}} - ${{price.amount}}</li><li></li></ul></div></div><div class="col-lg-6 readMore"><span class="label label-default" ng-show="event.attendeeCount">{{event.attendeeCount}} People Going</span> <a href="{{event.facebookEvent}}" target="_blank" class="btn btn-primary"><i class="fa fa-facebook-official fa-lg" data-toggle="tooltip" data-placement="top" title="Check Out the Facebook Event!"></i></a> <a href="{{event.forumLink}}" target="_blank" class="btn btn-primary"><i class="fa fa-external-link-square fa-lg" data-toggle="tooltip" data-placement="top" title="Talk about it in the forums!"></i></a> <button class="btn btn-primary" ui-sref="event({ id: event.id })">Read More...</button> <button class="btn btn-success" ui-sref="event({ id: event.id })" ng-hide="!event.prices.length">Order Now</button></div></div><div class="eventTitleImage"><img ng-src="{{ event.titleImage.extra.Location }}" class="img-responsive"></div></div></div></div><hr></section><section class="pastEventsList" ng-show="pastEvents.length"><div class="row"><div class="col-xs-12"><h2>Past Events</h2></div></div><div class="row"><div class="col-xs-12 col-sm-12 col-md-3 col-lg-3" ng-repeat="event in pastEvents"></div></div></section></div>'),e.put("components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse" ng-controller="NavbarCtrl"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right"><li>Current date: {{ date | date:\'yyyy-MM-dd\' }}</li></ul></div></div></nav>')}]);