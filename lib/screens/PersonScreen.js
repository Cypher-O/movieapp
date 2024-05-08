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
    Platform 
  } from "../constants/imports/reactNativeImports";
  
import {
    ChevronLeftIcon,
    HeartIcon,
    tw,
} from "../constants/imports/pluginsImports";
import { styles } from "../constants/imports/constantsImports";
import { MovieList, Loading } from '../constants/imports/componentsImports';
import { useNavigation, useRoute } from '../constants/imports/reactNativeNavigationImports'
import {
    fetchPersonDetails,
    fetchPersonMovieDetails,
    image342,
    fallbackPersonImage,
   } from '../constants/imports/apiImports';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios? '' : ' my-3';
export default function PersonScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [isFavourite,toggleFavourite] = useState(false);
    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false); 
    useEffect(() => {
        setLoading(true);
        console.log('Person data: ', item);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item])
    const getPersonDetails = async id=> {
        const data = await fetchPersonDetails(id);
        console.log('Fetched Person Details: ', data);
        if(data) setPerson(data);
        setLoading(false);
      }
      const getPersonMovies = async id=> {
        const data = await fetchPersonMovieDetails(id);
        console.log('Fetched Person Movies: ', data);
        if(data && data.cast) setPersonMovies(data.cast);
        setLoading(false);
      }
  return (
    <ScrollView
        style={tw`flex-1 bg-neutral-900`}
        contentContainerStyle={{paddingBottom: 20}} >
      {/* back button */}
      <SafeAreaView style={[tw`z-20 w-full flex-row justify-between items-center px-4`, verticalMargin]}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={[tw`rounded-xl p-1`, styles.background]}>
            <ChevronLeftIcon strokeWidth={3} size={28} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
          <HeartIcon strokeWidth={3} size={28} color={isFavourite? 'red' : 'white'}/>
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {
        loading? (
            <Loading />
        ):(
            <View>
                <View 
                    style={[tw`flex-row justify-center`, 
                    {
                        shadowColor: 'gray',
                        shadowRadius: 40,
                        shadowOffset: {width: 0, height: 5},
                        shadowOpacity: 1,
                    }]}>
                    <View style={tw`items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500`}>
                        <Image 
                            // source={require('../../assets/images/cast.jpg')}
                            source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                            style={{height: height*0.43, width: width*0.74}}
                        />
                    </View>
                </View>
                <View style={tw`mt-6`}>
                    <Text style={tw`text-3xl text-white font-bold text-center`}>{person?.name}</Text>
                    <Text style={tw`text-base text-neutral-500 text-center`}>{person?.place_of_birth}</Text>
                </View>
                <View style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}>
                    <View style={tw`border-r-2 border-neutral-400 px-2 items-center`}>
                        <Text style={tw`text-white font-semibold`}>Gender</Text>
                        <Text style={tw`text-neutral-300 text-sm`}>{person?.gender==1? 'Female' : "Male"}</Text>
                    </View>
                    <View style={tw`border-r-2 border-neutral-400 px-2 items-center`}>
                        <Text style={tw`text-white font-semibold`}>Birthday</Text>
                        <Text style={tw`text-neutral-300 text-sm`}>{person?.birthday}</Text>
                    </View>
                    <View style={tw`border-r-2 border-neutral-400 px-2 items-center`}>
                        <Text style={tw`text-white font-semibold`}>Known for</Text>
                        <Text style={tw`text-neutral-300 text-sm`}>{person?.known_for_department}</Text>
                    </View>
                    <View style={tw`px-2 items-center`}>
                        <Text style={tw`text-white font-semibold`}>Popularity</Text>
                        <Text style={tw`text-neutral-300 text-sm`}>{person?.popularity?.toFixed(2)} %</Text>
                    </View>
                </View>
                <View style={tw`my-6 mx-4 gap-y-2`}>
                    <Text style={tw`text-white text-lg`}>Biography</Text>
                    <Text style={tw`text-neutral-400 text-sm tracking-wide`}>
                        {person?.biography || 'N/A'}
                    </Text>
                </View>

                {/* movies */}
                <MovieList title="Featured In" hideSeeAll={true} data={personMovies} />
            </View>
        )
      }
    </ScrollView>
  )
}