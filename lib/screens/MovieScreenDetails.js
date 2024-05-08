import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    React,
    useState,
    useEffect,
    Image,
    Dimensions, 
    Platform,
  } from "../constants/imports/reactNativeImports";
  
import {
    ChevronLeftIcon,
    HeartIcon,
    LinearGradient,
    tw,
} from "../constants/imports/pluginsImports";
import { theme, styles } from "../constants/imports/constantsImports";
import { Cast, MovieList, Loading } from '../constants/imports/componentsImports';
import { useNavigation, useRoute } from "../constants/imports/reactNativeNavigationImports";
import { 
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
  fetchRecommendedMovies,
  imageOriginal,
  fallbackPosterImage,
 } from '../constants/imports/apiImports';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios? '': ' mt-3';

export default function MovieScreenDetails() {
    const {params: item} = useRoute();
    const [isFavourite,toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [cast, setCast] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({}); 

    useEffect(()=> {
      console.log('itemId', item.id);
      setLoading(true);
      getMovieDetails(item.id);
      getMovieCredits(item.id);
      getSimilarMovies(item.id);
      getRecommendedMovies(item.id);
    }, [item])
    const getMovieDetails = async id=> {
      const data = await fetchMovieDetails(id);
      console.log('Fetched Movie Details: ', data);
      if(data) setMovie(data);
      setLoading(false);
    }
    const getMovieCredits = async id=> {
      const data = await fetchMovieCredits(id);
      console.log('Fetched Movie Credits: ', data);
      if(data && data.cast) setCast(data.cast);
      setLoading(false);
    }
    const getSimilarMovies = async id=> {
      const data = await fetchSimilarMovies(id);
      console.log('Fetched Similar Movies: ', data);
      if(data && data.results) setSimilar(data.results);
      setLoading(false);
    }
    const getRecommendedMovies = async id=> {
      const data = await fetchRecommendedMovies(id);
      console.log('Fetched Recommended Movies: ', data);
      if(data && data.results) setRecommended(data.results);
      setLoading(false);
    }
  return (
    <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        style={tw`flex-1 bg-neutral-900`} >
        {/* back button & movie poster */}
    <View style={tw`w-full`}>
      <SafeAreaView style={[tw`absolute z-20 w-full flex-row justify-between items-center px-4`, topMargin]}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={[tw`rounded-xl p-1`, styles.background]}>
            <ChevronLeftIcon strokeWidth={3} size={28} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
          <HeartIcon strokeWidth={3} size={28} color={isFavourite? theme.background : 'white'}/>
        </TouchableOpacity>
      </SafeAreaView>

      {
        loading? (
          <Loading />
        ):(
          <View>
            <Image
              source={{uri: imageOriginal(movie?.backdrop_path) || fallbackPosterImage}}
              // source={require('../../assets/images/dune.jpg')}
              style={{width, height: height*0.55}}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={[tw`absolute bottom-0`, {width, height: height*0.40}]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}/>
          </View>
        )
      }
      
    </View>

    {/* movie details */}
    <View style={[tw`gap-y-3`, {marginTop: -(height*0.09)}]}>
      {/* title */}
      <Text style={tw`text-white text-center text-3xl font-bold tracking-wider`}>
        {movie?.title}
      </Text>
      {/* status, release date, runtime */}
      {
        movie?.id? (
          <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>
            {movie?.status} . {movie?.release_date?.split('-')[0]} . {movie?.runtime} min
          </Text>
        ):null
      }
      {/* genres */}
      <View style={tw`flex-row justify-center mx-4 gap-x-2`}>
        {
          movie?.genres?.map((genre, index) => {
            let showDot = index+1 != movie.genres.length;
            return (
              <Text key={index} style={tw`text-neutral-400 font-semibold text-base text-center`}>
                {genre?.name} {showDot? '.' : null}
              </Text>
            )
          })
        }
      </View>
      {/* description */}
      <Text style={tw`text-neutral-400 mx-4 text-sm tracking-wide`}>
        {
          movie?.overview
        }
      </Text>
    </View>

      {/* cast */}
      {cast.length>0 &&<Cast cast={cast} navigation={navigation} />}

      {/* similar movies */}
      {similar.length>0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similar} />}

      {/* similar movies */}
      {recommended.length>0 && <MovieList title="Recommendations" hideSeeAll={true} data={recommended} />}
    </ScrollView>
  )
}