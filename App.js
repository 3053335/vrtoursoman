import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Login from './src/Login';
import PlansScreen from './src/PlansScreen';
import NewAccount from './src/NewAccount';
import Welcome from './src/Welcome';
import FullPlan from './src/FullPlan';
import Intersts from './src/Intersts';
import PlanDetails from './src/PlanDetails';
import MyPlan from './src/MyPlan';
import Details from './src/Details';
import QuickSearch from './src/QuickSearch';
import SearchResults from './src/SearchResults';
import MyProfile from './src/MyProfile';
import FamousPlaces from './src/FamousPlaces';
import PlanChoice from './src/PlanChoice';
import EditPlan from './src/EditPlan';
import AdminstratorScreen from './src/AdminstratorScreen';
import UsersList from './src/UsersList';
import UsersPlans from './src/UsersPlans';
import ViewPanorama from './src/ViewPanorama';
//import FullScreenPanorama from './src/FullScreenPanorama';
import Panorama from './src/Panorama';
import FeedbackScreen from './src/FeedbackScreen';
import NewStatistic from './src/NewStatistic';
import Statistics from './src/Statistics';
import NewPanorama from './src/NewPanorama';
import FeedbackList from './src/FeedbackList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="NewAccount"
            component={NewAccount}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Plans"
            component={PlansScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Full Plan"
            component={FullPlan}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Edit Plan"
            component={EditPlan}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="My Plans"
            component={MyPlan}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Plan Choice"
            component={PlanChoice}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Intersts"
            component={Intersts}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Famous Places"
            component={FamousPlaces}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PlanDetails"
            component={PlanDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Feedback List"
            component={FeedbackList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Panorama"
            component={Panorama}
            options={{
              headerShown: false,
            }}
            initialParams={{adminUser: false}}
          />
          <Stack.Screen
            name="View Panorama"
            component={ViewPanorama}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="New Panorama"
            component={NewPanorama}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Statistic"
            component={Statistics}
            options={{
              headerShown: false,
            }}
            initialParams={{adminUser: false}}
          />
          <Stack.Screen
            name="New Statistic"
            component={NewStatistic}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Quick Search"
            component={QuickSearch}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Search Results"
            component={SearchResults}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Feedback"
            component={FeedbackScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="My Profile"
            component={MyProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Adminstrator"
            component={AdminstratorScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Users List"
            component={UsersList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Users Plans"
            component={UsersPlans}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
