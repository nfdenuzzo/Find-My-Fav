# VueJS Developer Test

In this test you'll find a simple pre-prepared VueJS SPA that allows for the
(limited) browsing of Unsplash using the [Unsplash API](https://api.unsplash.com).

Your goal is to add a couple of simple features to this app using best practices.

To use the Unsplash API you will need to register for a **FREE** developer account
at <https://unsplash.com/developers>. You **do not** need to submit your
Unsplash API credentials upon completion.

## Project setup

The first step is to [register a demo application on Unsplash](https://unsplash.com/oauth/applications/new).
Once you have done this make a note of the **Access Key** they provided you. This
is your **Client-ID** when talking to the Unsplash API.

Next install the application just like any other VueJS SPA using:

```
npm install
```

Once this is done you're ready to start working on the new features.

To launch the app with hot-reload during development you can use:

```
npm run serve
```

### Initial launch / Client-ID

When openining the app for the first time you should be redirected from the
apps homepage to its authentication page, where you will be asked to provide
your Unsplash **Client-ID**. This is to provide the app with the required
details to perform public actions against the Unsplash API.

To complete this test you will only need to perform public actions against the
API. At no point should anything more than the **Client-ID** be required to
get data from the API, and you are not expected to set any data using the API.

## Missing features / Project tasks

As mentioned your task is to implement some new features into the application
using whichever methods you deem most suitable. You are encouraged to add any
additional NPM packages that make this easier / quicker for you. However for
each package you add we request you add a note to the bottom of this `README.md`
file explaining what the package is used for, and why you selected it.

_An example of this exists at the end of the file already._

### Feature 1: Favourites

The first of the missing features from the application is the ability to mark
photos as liked or favorited. To complete this feature you need to add the
following functionality.

- Ability to toggle the **fave** state of any photo
- Add a single view which allows for the viewing of all currently **faved** photos
  by the user.
- Ensure **faved** photos are indicated to the user in any view which shows them.

**Important:** This feature should only be implemented locally within the application
and should not require Unsplash user authentication to work.

### Feature 2: Search

The second missing feature from the application is the ability to search Unsplash
for photos by keyword. To complete this feature you need to add the following
functionality.

- Add a single view which allows for searching the Unsplash API for photos based
  on user input.
- Ensure **faved** photos are indicated to the user should they appear in the
  search results.

### Feature 3: User Interface

If you have launched the app already, you may at this point have noticed the
complete lack of styling within the application. As such using the application
is not overly user friendly. Your task is to add any styles (and other user
interface components) to make the app easy to use on both mobile, and desktop
devices alike.

This can be achieved either with completely custom (S)CSS, or by the inclusion
of a front-end library such as [Bootstrap](https://getbootstrap.com/) or
[Foundation](https://foundation.zurb.com/sites/getting-started.html).

Either option is of equal merit. The important part of this feature is the
general usability, rather than the visual styling of the application.

### Bonus: Pagination

Currently the application only ever displays the first page of results from the
Unsplash API, however this could be expanded to include pagination on relevant
views within the application.

## Included Packages

### VueRouter

[Vue Router](https://router.vuejs.org/) is the official router for Vue.js . It
deeply integrates with Vue.js core to make building Single Page Applications with
Vue.js a breeze. As such this package was chosen to provide the core routing
capabilities of the SPA.

### Axios

[Axios](https://github.com/axios/axios) is a Promise based HTTP client for the
browser and node.js which simplifies the process of talking to remote services
such as the Unsplash API. It is one of the most popular libraries for use with
VueJS for consuming APIs and as such is the library of choice in this app.

### babel-polyfill

[babel-polyfill](https://babeljs.io/docs/en/babel-polyfill) is a toolchain that is
mainly used to convert ECMAScript 2015+ code into a backwards compatible version of
JavaScript in current and older browsers or environments.

- Vuetify has a know issues with windowns explorer - babel polyfill fixes this

### element-ui

[element-ui](https://element.eleme.io/#/en-US) Element, a Vue 2.0 based component
library for developers, designers and product managers,
-they have a great pagination component much better than vuetify

### ESLint

[ESLint](https://eslint.org/) The pluggable linting utility for JavaScript and JSX
-Use it for great code formating

### font-awesome

[font-awesome](https://fontawesome.com) The world's most popular and easiest to use icon set
-if i need to implement a specific icon font-awesome is my go to package

### lodash

[lodash](https://lodash.com) is a JavaScript utility library delivering consistency,
modularity, performance, & extras.
-used it for its debounce method -plus lots of other extras when needed, its a must

### material-design-icons + material-icons

[material-design-icons](https://materialdesignicons.com)
[material-icons](https://material.io)
-Both are requirements for vuetify framework - to display optimally

### native-toast

[native-toast](https://github.com/egoist/native-toast#readme)
Native-like toast notification but for the web, i enjoy the customizability of it as well as the look of it
its usually my go to package for toast notifications

### roboto-fontface

[roboto-fontface](https://www.npmjs.com/package/roboto-fontface)
roboto-fontface is a google font

### v-tooltip

[v-tooltip](https://github.com/Akryum/v-tooltip)
Customizable & reactive tooltips/popovers/dropdowns with smart positioning

- i utilize it mostly for buttons as where i dont use text - to ensure users know what each button does.

### stylus-loader

[stylus-loader](https://github.com/shama/stylus-loader)
another requirement in order to use the vuetify framework it is a stylus loader for webpack.

### vuetify

[vuetify](https://vuetifyjs.com/en/getting-started/why-vuetify) is the #1 Material framework and has been in development since 2016. The goal of the project is to provide users with everything that is needed to build rich and engaging web applications using the Material Design specification and Vue. it is my go to framework at the moment although i also enjoy using quasar.

### vuex-persistedstate

[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)
Persist and rehydrate your Vuex state between page reloads.

- i use this so when the user refreshes the page the vuex doesnt clear its data it still holds the data and the user can continue from where he left off

### vuex

[vuex](https://vuex.vuejs.org)
Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application
- This is a must with any vuejs application if you looking to to store data centrally and be able to access it anywhere in the application

### animate.css

[animate.css](https://daneden.github.io/animate.css/)
Animate.css is a light weight css animation pack - Simple and effective with wide selection of animations to use

