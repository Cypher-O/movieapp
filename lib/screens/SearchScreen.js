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
    XMarkIcon,
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

const {width, height} = Dimensions.get('window');
export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false); 
    let movieName = 'Ant-Man and the Wasp: Quantumania';
  return (
    <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
      <View style={tw`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}>
        <TextInput
            placeholder="Search Movies, shows, series & person"
            placeholderTextColor={'lightgray'}
            style={tw`pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider`} />
        <TouchableOpacity
            // onPress={()=> {navigation.goBack()}}
            onPress={()=> {navigation.navigate('Home')}}
            style={tw`rounded-full p-3 m-1 bg-neutral-500`}>
            <XMarkIcon strokeWidth={2} size={20 } color={"white"}  />
        </TouchableOpacity>
      </View>

      {/* search results */}
      {
        loading? (
            <Loading />
        ):
        results.length>0? (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
                style={tw`gap-y-3`}>
                    <Text style={tw`text-white font-semibold ml-1 mb-3`}>Results({results.length})</Text>
                    <View style={tw`flex-row justify-between flex-wrap`}>
                        {
                            results.map((item, index)=> {
                                return(
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={()=> navigation.push("Movie", item)}>
                                        <View style={tw`gap-y-2 mb-4`}>
                                            <Image 
                                                style={[tw`rounded-3xl`, {width: width*0.44, height: height*0.3}]}
                                                source={require('../../assets/images/beekeeper.jpg')}
                                            />
                                            <Text style={tw`text-neutral-300 ml-1`}>
                                                {movieName.length>24? movieName.slice(0,24)+'...' : movieName}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
            </ScrollView>
        ):(
            <View style={tw`flex-row justify-center mt-10`}>
                <Image 
                    source={require('../../assets/images/watchmovies.png')} 
                    style={tw`h-76 w-76`}
                    />
            </View>
        )
      }
    </SafeAreaView>
  )
}