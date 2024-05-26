This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# MyLocations (dev env : Visual Studio Code, Chrome, create-react-app, npm)
myLocations app allows the user to maintain a list of categorized name locations. The domain model contains two main entities: a Category and a Location. A Category has a single property: Name. A Location has the following properties: Name, Address, Coordinates, and Category. All data is saved to the locale storage of the browser (an HTML5 feature) for simplicity. It also uses StateDataManager using React Context Provider and Consumer (createContext, useState, useContext, useEffect hooks). The application uses the react-router module.

Use babel and create-react-app (over webpack) to support es2015 style jsx syntax and module loading.

Use Cases: The user can manage (view, add, remove and edit) the list of Categories. The user can manage (view, add, remove and edit) the list of Locations. The user must fill all properties when saving an item. The user must choose a category from a list of existing categories when defining a Location.

Each screen has a top toolbar with title and action buttons. The user executes an operation on a list item by clicking the appropriate button in the top toolbar.

The application screen has a bottom bar with two iconic buttons: Categories and Locations. The user moves between Categories and Location management by clicking on their respective icons on the bottom button bar.

The user can view all Locations sorted by alphabetical order, either grouped by category or ungrouped by category.

When clicking a location on the list, the user can see the properties of the item and also view it on an actual map (using google maps api: { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps") The Add and Edit menu options allow selecting the coordinates and address from the map service and not entering by hand.

The application uses material-ui look & feel : https://material-ui.com/ and also MaterialTable: https://material-table.com/#/,
CSS-Grid, Flexbox, styled-components (animations)
react-google-maps, etc.

