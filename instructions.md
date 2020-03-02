MyLocations1ReactRouteLocalStorage
myLocations allows the user to maintain a list of categorized name locations. The domain model contains two main entities: a Category and a Location. A Category has a single property: Name. A Location has the following properties: Name, Address, Coordinates, and Category. All data is saved to the locale storage of the browser (an HTML5 feature) for simplicity. It also uses StateDataManager using React Context Provider and Consumer (createContext, useState, useContext, useEffect hooks). The application uses the react-router module.

Use babel and webpack to support es2015 style jsx syntax and module loading. 

Use Cases:
The user can manage (view, add, remove and edit) the list of Categories. The user can manage (view, add, remove and edit) the list of Locations. The user must fill all properties when saving an item. The user must choose a category from a list of existing categories when defining a Location.

Each screen has a top toolbar with title and action buttons. The user executes an operation on a list item by clicking the appropriate button in the top toolbar.

The application screen has a bottom bar with two iconic buttons: Categories and Locations. The user moves between Categories and Location management by clicking on their respective icons on the bottom button bar.

The user can view all Locations sorted by alphabetical order, either grouped by category or ungrouped by category.

When clicking a location on the list, the user can see the properties of the item and also view it on an actual map (using google maps api: { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps") The Add and Edit menu options allow selecting the coordinates and address from the map service and not entering by hand.

The application uses material-ui look & feel : https://material-ui.com/ and also MaterialTable: https://material-table.com/#/