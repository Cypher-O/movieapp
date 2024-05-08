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
import MovieList from "../components/movieList";
import Loading from "../components/loading";

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios? '' : ' my-3';
export default function PersonScreen() {
    const navigation = useNavigation();
    const [isFavourite,toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([1,2,3,4,5]);
    const [loading, setLoading] = useState(false); 
  return (
    <ScrollView
        style={tw`flex-1 bg-neutral-900`}
        contentContainerStyle={{paddingBottom: 20}} >
      {/* back button */}
      <SafeAreaView style={[tw`z-20 w-full flex-row justify-between items-center px-4`]}>
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
                            source={require('../../assets/images/cast.jpg')}
                            style={{height: height*0.43, width: width*0.74}}
                        />
                    </View>
                </View>
                <View style={tw`mt-6`}>
                    <Text style={tw`text-3xl text-white font-bold text-center`}>Margot Robbie</Text>
                    <Text style={tw`text-base text-neutral-500 text-center`}>New York, United States</Text>
                </View>
                <View style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}>
                    <View style={tw`border-r-2 border-neutral-400 px-2 items-center`}>
                        <Text style={tw`text-white font-semibold`}>Gender</Text>
                        <Text style={tw`text-neutral-300 text-sm`}>Female</Text>
                    </View>
                    <View style={tw`border-r-2 border-neutral-400 px-2 items-center`}>
                        <Text style={tw`text-white font-semibold`}>Birthday</Text>
                        <Text style={tw`text-neutral-300 text-sm`}>1964-09-02</Text>
                    </View>
                    <View style={tw`border-r-2 border-neutral-400 px-2 items-center`}>
                        <Text style={tw`text-white font-semibold`}>Known for</Text>
                        <Text style={tw`text-neutral-300 text-sm`}>Acting</Text>
                    </View>
                    <View style={tw`px-2 items-center`}>
                        <Text style={tw`text-white font-semibold`}>Popularity</Text>
                        <Text style={tw`text-neutral-300 text-sm`}>89.65</Text>
                    </View>
                </View>
                <View style={tw`my-6 mx-4 gap-y-2`}>
                    <Text style={tw`text-white text-lg`}>Biography</Text>
                    <Text style={tw`text-neutral-400 text-sm tracking-wide`}>
                        Margot Elise Robbie (born July 2, 1990) is an Australian actress and producer. Known for her work in both blockbuster and independent films, she has received several accolades, including nominations for two Academy Awards, four Golden Globe Awards, and five British Academy Film Awards. Time magazine named her one of the 100 most influential people in the world in 2017 and she was ranked as one of the world's highest-paid actresses by Forbes in 2019.
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