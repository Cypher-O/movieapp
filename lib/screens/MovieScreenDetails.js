import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
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
    ChevronLeftIcon,
    HeartIcon,
    LinearGradient,
    debounce,
    tw,
    style,
    Carousel,
} from "../constants/imports/pluginsImports";
import { useRoute } from '@react-navigation/native';
import { theme, styles } from "../constants/imports/constantsImports";
import { Dimensions, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Cast} from '../constants/imports/componentsImports';
import MovieList from "../components/movieList";
import Loading from "../components/loading";

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios? '': ' mt-3';

export default function MovieScreenDetails() {
    const {params: item} = useRoute();
    const [isFavourite,toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [cast, setCast] = useState([1,2,3,4,5]);
    const [similar, setSimilar] = useState([1,2,3,4,5]); 
    const [loading, setLoading] = useState(false);
    let movieName = 'Ant-Man and the Wasp: Quantumania';
    useEffect(()=> {

    }, [item])
  return (
    <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        style={tw`flex-1 bg-neutral-900`} >
        {/* back button & movie poster */}
    <View style={tw`w-full`}>
      <SafeAreaView style={[tw`absolute z-20 w-full flex-row justify-between items-center px-4`]}>
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
              source={require('../../assets/images/dune.jpg')}
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
        {movieName}
      </Text>
      {/* status, release date, runtime */}
      <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>
        Released . 2024 . 170 min
      </Text>
      {/* genres */}
      <View style={tw`flex-row justify-center mx-4 gap-x-2`}>
        <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>
          Action .
        </Text>
        <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>
          Thrill .
        </Text>
        <Text style={tw`text-neutral-400 font-semibold text-base text-center`}>
          Action
        </Text>
      </View>
      {/* description */}
      <Text style={tw`text-neutral-400 mx-4 text-sm tracking-wide`}>
        In Japan in the year 1600, at the dawn of a century-defining civil war, Lord Yoshii Toranaga is fighting for his life as his enemies on the Council of Regents unite against him, when a mysterious European ship is found marooned in a nearby fishing village.
      </Text>
    </View>

    {/* cast */}
    <Cast cast={cast} navigation={navigation} />

    {/* similar movies */}
    <MovieList title="Similar Movies" hideSeeAll={true} data={similar} />
    </ScrollView>
    
  )
}