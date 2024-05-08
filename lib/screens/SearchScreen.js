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
    Image,
    Dimensions,
  } from "../constants/imports/reactNativeImports";
  
import {
    XMarkIcon,
    debounce,
    tw,
} from "../constants/imports/pluginsImports";
import { useNavigation } from "../constants/imports/reactNativeNavigationImports";
import { Loading } from '../constants/imports/componentsImports';
import { 
    fetchSearchedMovies,
    imageOriginal,
    fallbackPosterImage,
   } from '../constants/imports/apiImports';

const {width, height} = Dimensions.get('window');
export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false); 
    
    const handleSearch = value => {
        if(value && value.length>2) {
            setLoading(true);
            fetchSearchedMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US', 
                page: '1',
            }).then(data=> {
                setLoading(false);
                console.log('Fetched Searched movies: ', data);
                if(data && data.results) setResults(data.results);
            })
        }else{
            setLoading(false);
            setResults([]);
        }
        console.log('value: ', value);
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
      <View style={tw`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}>
        <TextInput
            onChangeText={handleTextDebounce}
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
                                        onPress={()=> navigation.push("MovieDetails", item)}>
                                        <View style={tw`gap-y-2 mb-4`}>
                                            <Image 
                                                style={[tw`rounded-3xl`, {width: width*0.44, height: height*0.3}]}
                                                // source={require('../../assets/images/beekeeper.jpg')}
                                                source={{uri: imageOriginal(item.poster_path) || fallbackPosterImage}}
                                            />
                                            <Text style={tw`text-neutral-300 ml-1`}>
                                                {item?.title.length>24? item?.title?.slice(0,24)+'...' : item?.title}
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