As you know, an Angular application is a tree of components. Some of these components are reusable UI components (for example, list and table), and some are application components, which represent screens or some logical parts of the application. The router cares about application components, or, to be more specific, about their arrangements. Let's call such component arrangements router states. So a router state defines what is visible on the screen.A router state is an arrangement of application components that defines what is visible on the screen.

The router configuration defines all the potential router states of the application.A router state is a subtree of the configuration tree.The router's primary job is to manage navigation between router states, which includes updating the component tree.

 In a well-behaved web application, any application state transition results in a URL change, and any URL change results in a state transition. In other words, a URL is nothing but a serialized router state. The Angular router takes care of managing the URL to make sure that it is always in-sync with the router state.

 The Angular router takes a URL, then does the following:

1. Applying redirects.

2. Recognizing router states.

3. Running guards and resolving data.

4. Activating all the needed components.

5. Managing navigation.

When a component is activated, we say activated instead of instantiated as a component can be instantiated only once but activated multiple times (any time its route's parameters change):


-------------------------------------------------------------------------------------------------------------------------------
Sequence of events from navigating from route A to another route B:

1. NavigationStart event for route B.
2. canDeactivate guard executes for route A
3. If step 2 successfull, then canActivate guard executes for route A.
In case step 2 fails, NavigationCancel event executes for route B.
4. If step 3 is siccessful, then constructor of route B executes.
5. NavigationEnd event executes for route B.
6. ngOnInit executes for route B.
7. NavigationError event executes in our example when the resolver fails i.e when the
task in the resolver fails. So the navigation to the destination route will also not
complete.
8. Resolve always runs after the guard executes. A guard decides if a route can be entered or exited.
If it can be entered, then go ahead and execute the resolver to fetch data for the route.
If guards fail, then resolver wont execute.

9. We have used the Deactivate guard such that it can be reused for any component,
because the logic which decides whether the user can exit the component or not
is inside the component. The guard just calls the method inside the component.

-------------------------------------------------------------------------------------------------------

Angular Routing

https://github.com/DeborahK/Angular-Routing

Setting up Routing
1.Set up base path
2.Import router: Router Service is registered only once using forRoot for entire application. In forChild, router service will not be registered.
3.Configure routes: Order of routes is important. More specific paths must be followed by less specific paths.
4.Place template: temlate corresponding to the route is placed inside the <router-outlet>
5.Activate routes

What is the base path?

www.mySite.com/APM/
Base path is /APM/.

For development:
<base href="/">
This is because the app sub folder is inside the same folder as index.html.

For deployment, the application may be deployed to a subfolder on the server like https://www.mySite.com/APM/.
In that case the base path changes to <base href="/APM/>

How do you automatically change the base path when deploying code to prod after dev.
USing the ng build command.

ng build --base-href /APM/

When you are building the code during deployment, the base path will change from /(defined in index.html) to /APM/

what does it mean base href="."

-----------------------------------------------------------------------------
Route Parameters

Syntax:
[routerLink]="['/welcome']" OR routerLink="/welcome"
In the first method, we can specify the route parameters as well after the path. In the 2nd method, we can specify only the path.

Activating route with code can be done using Router's navigate() method
this.router.navigate(['/welcome']); OR this.router.navigate('/welcome');

Route parameters

/products
/products/:id
/products/:id/edit
/products/:id/delete
/products/0/edit ---- for adding a product. 0 indicates that it is a new product. An existing product will have an id other than 0
/orders/:id/items/:itemId

[routerLink]="['/products',product.id]" to navigate to /products/:id
[routerLink]="['/products',product.id,'edit']" to navigate to /products/:id/edit

If you are doing the navigation using navigate(), then it will be similar to routerLink
this.router.navigate(['/products',this.product.id,'edit']);

-------------------------------------------------------------------------------
Reading the route data: Use the ActivatedRoute

2 ways to read route parameters:

1. Using snapshot of ActivatedRoute: 
this.route.snapshot.paramMap.get('id')   
//this just gives the initial value of the param and not the values on update

//this gives the updated value of the param each time it changes
2. Using observable of Activated route:
this.route.paramMap.subscribe(params=>{
console.log(params.get('id'));
})

When is the observable approach useful?

When i am editing an existing product or adding a new product, the component used is the same.
What changes is the route parameters. For a new product it is 0 and for an existing product it is anything other than 0.
If I switch from Edit existing product to Add new product, the component will not be re-initialised because just route parameters have changed.
If we have defined the route data reading logic inside the ngOnInit, it wont be executed again.
ngOnInit(){
const productId=this.route.snapshot.paramMap.get('id') ;
}
Thus although the browser url changes the route param from eg: 5 to 0 to add a new product, the component view has not changed.
Here the observable approach is required to detect the latest change in param value if you are not navigating to a new component and just re-navigating to the same component with different params.
-----------------------------------------------------------------------------------
Optional Route Parameters

These route params will not appear in the routes object which we pass to RouterModule. What we add in the routes object are required params.
You can add them in the routerLink or the navigate().

[routerLink]="['/products',{name:productName,code:productCode}]"

name and code are the optional params. In the url it will be seperated by semicolons like this: 
/products;name=abc;code=50cd

Optional params must always be specified after the required route params.
Reading optional params is same as how you read required params.

-------------------------------------------------------------------------------------
Query route params
These are not a part of the routes object which we pass to RouterModule just like optional params.

You can add them in the routerLink or the navigate().

[routerLink]="['/products',product.id]" [queryParams]="{filterBy:"ey",showImage:true}"

this.router.navigate(['/products',this.product.id],{queryParams:{filterBy:"ey",showImage:true}});

By default the query params are lost when we navigate away from the component to which we passed
the query params as a part of the route.

Say I navigate to B with the route containing the query params. When I navigate from B to another C, by default, the query params will be lost and not visible in the url . 
To retain it, you need to add queryParamsHandling property in the routerLink or navigate() of
component C( not B).
This means that if the previous route had query params, on navigation to component C it wont be lost.
It will be retained the url.

How do you retain it? Using queryParamsHandling in the component C.

So query params are useful when you want to retain the same data between 2 routes.

[routerLink]="['/products']" queryParamsHandling="preserve"

this.router.navigate(['/products'],{queryParamsHandling:'preserve'});

Reading query parameters using snapshot and observable.
Using snapshot :this.route.snapshot.queryParamMap.get('filterBy');

-------------------------------------------------------------------------------------------------------
Data property:

You can pass data to a component via the route's data property. This is useful for passing static data i.e data that wont change for the lifetime of the application.

 {
    path:"",
    component:UserListComponent,
    data:{pageTitle:"User List"}
  },

Access it in the component like this using ActivatedRoute.
this.title=this.route.snapshot.data['pageTitle'];
--------------------------------------------------------------------------------
Resolvers-for prefetching data for a component.

Component will be activated only after the resolver fetches the data.
Route resolver is created as an angular service that implements the Resolve interface
You can add multiple resolve services for a route.

--------------------------------------------------------------------------------
Child Routes

Child routes can be activated by placing another <router-outlet></router-outlet> inside the parent component.
This is the secondary outlet.The one in the AppComponent is the primary one.

The moment the path begins with / it is an absolute path. There will be no / in relative path.

If the first segment begins with /, the router looks up the route from the root of the app.

If the first segment begins with ./, or doesn't begin with a slash, the router looks in the children of the current activated route.

[routerLink]="['info']" is the relative path

[routerLink]="['/user','edit',userId,'info']" is the absolute path.
You need to get the value of userId from ActivatedRoute

this.router.navigate(['/user','edit',this.userId,'info']) is the absolute path

this.router.navigate(['info],{relativeTo:this.route}) is the relative path. 
this.route refers to ActivatedRoute

How to access the parent component's resolver data in the child component? 
this.route.parent.data.subscribe(x=>{})
--------------------------------------------------------------------------------------

Grouping routes under a component less parent route

Advantages:
1. Better organisation
2. Sharing guards and resolvers
3. Lazy load all the feature routes

RouterModule.forChild({
  path:'products',
  children:[
    {
path:"",
component:ProductListComponent  //default path
    },
    {
path:":id",
component:ProductDetailComponent
    },
    {
      path:":id/edit",
component:ProductEditComponent,
children:[]
    }
  ]
})

The advantage of having a parent route with no component i.e products path is that the child routes
of this product path will be placed inside the primary router-outlet and there is no need for a
secondary router-outlet.

-------------------------------------------------------------------------------
Styling Routes

routerLinkActive attribute will add classes to the element that hosts the attribute
to highlight the activated route.
When the route is inactive, the classes are removed.

routerLinkActive="active" means the active class is added when the route is activated.

active is a class defined in the css file.

<ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['user']"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{exact:true}"
          >User List</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/user/edit',0,'info']" routerLinkActive="active">Add User</a>
        </li>
      </ul>

In the above case both routes have user in them and If I click on Add User, even User List will
show was active.
To avoid that ,we add  [routerLinkActiveOptions]="{exact:true}" to do exact path matching before
adding css class.

-----------------------------------------------------------------------------
Animating Route Transitions

1. Import the BrowserAnimationsModule
2. Define the desired animations
3. Register the animation with a component
4. Trigger the animation from the router-outlet
----------------------------------------------------------------------------
Routing Events

1. NavigationStart => This is triggered when navigation begins.
2. RoutesRecognized => When the router has found a valid path in the configuration.
3. NavigationEnd => When navigation ends successfully.
4. NavigationCancel => When navigation is cancelled by a routing guard or a redirect.
5. NavigationError => When navigation fails.

We can watch these events when we add the object {enableTracing:true} to the RouterModule.forRoot() like
below:
RouterModule.forRoot(routes,{enableTracing:true})
----------------------------------------------------------------------------
Reacting to Routing Events

We subscribe to this.router.events to use the events in our code.

We are using this to show a spinner when the navigation starts and hide when navigation ends/cancels/errors
out.

Instead of spinner, I have just added   <span>Navigating .....</span>

-----------------------------------------------------------------------------
Secondary/Auxillary/Sibling Routes

Primary routes ---> Primary Router outlet or primary child router outlet based on route heirarchy.
Secondary routes ----> Secondary Router outlet.

These secondary routes will be placed in a <router-outlet> which is a sibling to the primary <router-outlet>.
We can have any number of secondary <router-outlet> and each of this will be named uniquely.

We never had to add any name to the child <router-outlet> inside the UserEditComponent because
the router could determine whether to place the route in the primary <router-outlet> or
child <router-outlet> based on route heirarchy.

Secondary <router-outlet> will be placed at the same level as primary <router-outlet> so
it is necessary to name them.

Secondary routes are configured very similar to primary routes. But the difference is in addition to
path and component, there will be another property outlet which will mention the name of the
secondary outlet.

  <router-outlet name="popup"></router-outlet>

{
    path:'message',
    component:MessageComponent,
  }

Secondary route url will look like: localhost:4200/user(popup:message)

user is the primary route path.
(popup:message) is the secondary route path. In this path the format is outlet-name:path-name

Activating Secondary route using routerLink.

          <a class="nav-link" [routerLink]="[{outlets:{popup:['message']}}]" routerLinkActive="active">Messages</a>

Activating Secondary route using navigate.

this.router.navigate([{outlets:{popup:['message']}}])

Clearing Secondary Outlet

this.router.navigate([{outlets:{popup:null}}])
[routerLink]="[{outlets:{popup:null}}]"

------------------------------------------------------------------------------------
Route Guards
1. canActivate: Guard activation to a route
2. canActivateChild: Guard activation to a child route
3. canDeactivate:Guard navigation from a route
4. canLoad: prevents async routing
5. resolve: prefetch data before activating a route

canDeactivate ----> canLoad ---> canActivateChild ---> canActivate ---->resolve

A guard is build as an angular service which implements an interface based on the guard type

canActivate guard will not re-execute if only the child route has changed.
canActivateChild guard will re-execute only if the child route changes.
canDeactivate guard will execute when we navigate to a different route within the same app and
not when the browser is closed/we navigate away from the application.

Lets say I want to navigate to the users page but i am not logged in.
So the guard redirects me to the login page. On login, I want to be redirected to the users
page only and not some default page. How do we share this info with the guard? Using Services.
Create a property redirectUrl in the Service.

In the guard, using the url property of the RouterStateSnapshot ,you can set the value of redirectUrl in
the service.

Once you successfully login, if the redirectUrl property has a value then it will redirect you to that
url. It will have no value in case you directly go to the login page.

------------------------------------------------------------------------------------------

Lazy loading

When the broweser sends a request to the web server, the web server sends back the index.html file.
In case of lazy loading, only the eagerly loaded files are downloaded and the lazily loaded files
are downloaded only on demand. This improves the starting time of the application.

Lazy loading affects how angular builds and serves our files.

When we serve our files using ng serve --prod, the sizes of the main.js and other files reduces
by many times as compared to ng serve.
This is because in --prod, angular uses AOT compiler. This compiler converts our angular template html and component TS code in JS as a part of the build process. This enables faster rendering in the browser. This also prevents the need to include the compiler in the bundle. The angular libraries
we do need are in the main.js file.

Lazy loading reduces the size of main.js so that our start up time is less. We split our
appln into features so that our main bundle contains only the startup code.
The lazily loaded code will be loaded on demand or downloaded asynchronously in the background after
our first page is displayed.

Preparing for lazy loading:
1.Use a feature module.
2. Routes grouped under a single parent
3. Feature module is not imported in any other angular module.

A canLoad guard is used for lazy loaded modules to ensure that the module will not even be downloaded
unless the criteria is met.

--------------------------------------------------------------
Preloading Feature Modules

Steps in absence of preloading:
Launch Application
Download imported modules
Template appears
Navigate to lazy loaded path
Download lazy loaded module
Template appears

The purpose of preloading to avoid the waiting time involved in downloading the lazy loaded module
when demanded.
Preloading is also called "eager lazy loading". Here the featue modules will be downloaded async in
the background when the user is interacting with the application.
Preloading is useful for modules that will be often used and not for modules that will hardly be used.

Steps in presence of preloading:
Launch Application
Download imported modules
Template appears
Preload any featue modules in the background if preloading is enabled
Navigate to lazy loaded path
Template appears immediately without any waiting time
-----------------------------------------------------------------------
Preloading Strategies

1. No Preloading.Lazy Feature modules are loaded on demand.
2. Preload all lazy feature modules
3. Custom to define which modules will preload and when they will preload

Strategy 1 is the default strategy.

For Strategy 2, you need to configure it as below by adding preloadingStrategy:PreloadAllModules

RouterModule.forRoot(routes,
    {enableTracing:true,preloadingStrategy:PreloadAllModules}
    )

What blocks the preloading of lazy feature modules ? canLoad guard !!!
If you want to guard the feature module and also preload it, then go for canActivate guard instead
of canLoad guard because canLoad guard will not allow the lazy feature module to be loaded unless
criteria is met.

Custom Preload Strategy

1. Create a service which implements the PreloadingStrategy
2. The preload() which the interface requires to be defined will be as below

preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if(route.data && route.data['preload']){
      //preload the lazy feature module only if the route has a data property as below:
      // data:{preload:true}
      return fn();
    }
    return of(null)
  }

3. Only those routes which have a data property and the data property is defined as {preload:true}
will be preloaded.

4. Enable the strategy as below. CustomPreloadStrategy is the service which we created earlier.
[RouterModule.forRoot(routes,
    {enableTracing:true,preloadingStrategy:CustomPreloadStrategy}
    )





