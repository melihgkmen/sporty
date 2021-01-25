import { NavigationActions, StackActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function navigateAndReset(routeName) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
  );
}
function back(key) {
  navigator.dispatch(
    NavigationActions.back({
      key
    })
  );
}
export default {
  back,
  navigate,
  navigateAndReset,
  setTopLevelNavigator
};
