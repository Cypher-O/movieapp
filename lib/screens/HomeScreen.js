import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  React,
  useState,
  useEffect,
  StatusBar,
  Platform,
} from "../constants/imports/reactNativeImports";
import {
  MagnifyingGlassIcon,
  tw,
  Bars3CenterLeftIcon,
} from "../constants/imports/pluginsImports";
import { styles } from "../constants/imports/constantsImports";
import { TrendingMovies, MovieList, Loading } from '../constants/imports/componentsImports';
import { useNavigation } from "../constants/imports/reactNativeNavigationImports";
import { 
  fetchTrendingMovies, 
  fetchUpComingMovies, 
  fetchTopRatedMovies,
 } from '../constants/imports/apiImports';

const ios = Platform.OS == 'ios';
export default function HomeScreen() { 
  const [trending, setTrending] = useState([]); 
  const [upComing, setUpcoming] = useState([]); 
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); 

  useEffect(()=> {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, [])

  const getTrendingMovies = async ()=> {
    const data = await fetchTrendingMovies();
    console.log('Fetched trending movies: ', data);
    if(data && data.results) setTrending(data.results);
    setLoading(false);
  }

  const getUpcomingMovies = async ()=> {
    const data = await fetchUpComingMovies();
    console.log('Fetched upcoming movies: ', data);
    if(data && data.results) setUpcoming(data.results);
    // setLoading(false);
  }

  const getTopRatedMovies = async ()=> {
    const data = await fetchTopRatedMovies();
    console.log('Fetched top rated movies: ', data);
    if(data && data.results) setTopRated(data.results);
    // setLoading(false);
  }


  return (
    <View style={tw`flex-1 bg-neutral-800`}>
      {/* <Text>HomeScreen</Text> */}
      {/* search bar & logo */}
      <SafeAreaView style={ios ? tw`-mb-2` : tw`mb-3`}>
        <StatusBar style="light"/>
        <View style={tw`flex-row justify-between items-center mx-4`}>
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color={"white"}/>
          <Text style={tw`text-white text-3xl font-bold`}>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {
        loading? (
          <Loading />
        ):(
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 10}}>
            {/* trending movies carousel */}
            {trending.length>0 && <TrendingMovies data={trending}/>}

            {/* upcoming movies */}
            {upComing.length>0 && <MovieList title="Upcoming Movies" data={upComing} />}

            {/* top rated movies */}
            {topRated.length>0 && <MovieList title="Top Rated Movies" data={topRated} />}
          </ScrollView>
        )
      }
      
    </View>
  );
}
