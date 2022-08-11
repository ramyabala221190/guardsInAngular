
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


