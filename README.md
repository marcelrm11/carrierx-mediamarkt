# React Native MediaMarkt Hackathon 2023

## Brief description

A React application for the Store Staff so they can choose the right Carrier to deliver the goods at customers home.

### Personal note

> This project is the result of 3 days of work, for a hackathon organised by MediaMarkt. The hackathon was announced as "React project Junior-Mid-Senior level". I am junior and I had never coded a React Native - Typescript project before (I did have coded with React and Javascript). I learned a lot about React Native and Typescript; however, the process was slow and I did not meet the requirements for the hackathon on time.

## Running the app

```bash
# install dependencies
yarn install

# run in web mode
yarn web

# run in android
yarn android

# run in ios
yarn ios
```

## Project structure

### Root and Navigation Stack

App.tsx is where the navigation stack is located. It has 3 routes (screens): ParcelList, CarrierList and ItemsList.

### Components

"components" folder has 4 subdirectories: ParcelList, CarrierList, ItemsList and UI Components.

- ParcelList is the first screen and uses a listItem and a Modal components.
- CarrierList uses only a listItem component.
- ItemsList uses a listItem and 2 Modal components.
- UI Components has 4 custom UI components: a button, an input, a listItem and a Modal.

### Hooks

- useIcon is used by the listItem to return an appropriate icon and format the weight string.
- useParcels is used to fetch parcels from storage.

### Storage

ParcelStorage has 3 functions to manage parcel storage.

- initParcels initializes parcels in AsyncStorage if not already present.
- storeParcel stores a new parcel object in AsyncStorage (created but not implemented as event callback yet).
- getParcels retrieves parcels from AsyncStorage.

### Types

The `types.ts` file defines the global types and interfaces used in the project.
It includes interfaces for: RootStackParamList, Item, Parcel and Driver.

### Utils

This file includes 3 basic functions: totalItems(), groupBy() and pastOrFuture().

- totalItems calculates the total items in a group of parcels (passed as parameter).
- groupBy creates an object where the keys are the different values of the group and the values are arrays of parcels.
- pastOrFuture tells you if a specific string date (for a specific format) is past, future or today.

## Contact

You can contact me at marcelrm11@gmail.com

## License

[MIT License](https://opensource.org/license/mit/)
