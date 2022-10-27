
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


Reading the route data: Use the ActivatedRoute

2 ways to read route parameters:

Using snapshot: this.route.snapshot.paramMap.get('id')   //this just gives the initial value of the param

//this gives the updated value of the param each time it changes
Using observable:this.route.paramMap.subscribe(params=>{
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
Here the observable approach is required to detect the latest change in param value if you are not navigating to a new component and just
re-navigating to the same component with different params.

Optional Route Parameters

These route params will not appear in the router module config.

You can add them in the routerLink or the navigate().

[routerLink]="['/products',{name:productName,code:productCode}]"

name and code are the optional params. In the url it will be seperated by semicolons like this: /products;name=abc;code=50cd

Optional params must always be specified after the required route params.

Reading optional params is same as how you read required params.

Query route params
These are not a part of the route config just like optional params.

[routerLink]="['/products',product.id]" [queryParams]="{filterBy:"ey",showImage:true}"

this.router.navigate(['/products',this.product.id],{queryParams:{filterBy:"ey",showImage:true}});

By default the query params are lost when we navigate away from the component which required the query params.

Say I navigate from A to B with the route containing the query params. When I navigate from B to another C, by default, the query params
will be lost and not visible in the url. To retain it, you need to add queryParamsHandling property in the routerLink or navigate() of
component C( not B).

How do you retain it? Using queryParamsHandling in the component where we will navigate to and we require the query params to visible.
So query params are useful when you want to retain the same data between 2routes.

[routerLink]="['/products']" queryParamsHandling="preserve"

this.router.navigate(['/products'],{queryParamsHandling:'preserve'});


Reading query parameters using snapshot and observable.
Using snapshot :this.route.snapshot.queryParamMap.get('filterBy');

-------------------------------------------------------------------------------------------------------
You can pass data to a component via the route's data property. This is useful for passing static data i.e data
that wont change for the lifetime of the application.

 {
    path:"",
    component:UserListComponent,
    data:{pageTitle:"User List"}
  },

Access it in the component like this using ActivatedRoute.
this.title=this.route.snapshot.data['pageTitle'];
-------------------------------------------------
Resolvers-for prefetching data for a component.

Component will be activated only after the resolver fetches the data.
Route resolver is created as an angular service that implements the Resolve interface
You can add multiple resolve services for a route.

----------------------------------------------------
Child Routes

Child routes can be activated by placing another <router-outlet></router-outlet> inside the parent component.
This is the secondary outlet.The one in the AppComponent is the primary one.

The moment the path begins with / it is an absolute path. There will be no / in relative path.

[routerLink]="['info']" is the relative path

[routerLink]="['/user','edit',userId,'info']" is the absolute path.
You need to get the value of userId from ActivatedRoute

this.router.navigate(['/user','edit',this.userId,'info']) is the absolute path

this.router.navigate(['info],{relativeTo:this.route}) is the relative path. this.route refers to ActivatedRoute

How to access the parent component's resolver data in the child component? 
this.route.parent.data.subscribe(x=>{})











