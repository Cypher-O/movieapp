import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  React,
  useCallback,
  useState,
  useEffect,
  StatusBar,
  Image,
  Progress,
} from "../constants/imports/reactNativeImports";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  debounce,
  tw,
  style,
} from "../constants/imports/pluginsImports";
import {
  Bars3CenterLeftIcon,
} from "../constants/imports/pluginsImports";
import { Platform } from "react-native";
import { theme, styles } from "../constants/imports/constantsImports";
import { TrendingMovies } from '../constants/imports/componentsImports';
import MovieList from "../components/movieList.";

const ios = Platform.OS == 'ios';
export default function HomeScreen() { 
  const [trending, setTrending] = useState([1,2,3]); 
  const [upComing, setUpcoming] = useState([1,2,3]); 
  const [topRated, setTopRated] = useState([1,2,3]); 

  return (
    <View style={tw`flex-1 bg-neutral-800`}>
      {/* <Text>HomeScreen</Text> */}
      {/* search bar & logo */}
      <SafeAreaView style={ios ? tw`-mb-2` : tw`mb-3`}>
        <StatusBar style="light"/>
        <View style={tw`flex-row justify-between items-center mx-4 mb-4`}>
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color={"white"}/>
          <Text style={tw`text-white text-3xl font-bold`}>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}>
        {/* trending movies carousel */}
        <TrendingMovies data={trending}/>

        {/* upcoming movies */}
        <MovieList title="Upcoming Movies" data={upComing} />

        {/* top rated movies */}
        <MovieList title="Top Rated Movies" data={topRated} />
      </ScrollView>
    </View>
  );
}
