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

var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios? '': ' mt-3';

export default function MovieScreenDetails() {
    const {params: item} = useRoute();
    const [isFavourite,toggleFavourite] = useState(false);
    const navigation = useNavigation();
    useEffect(()=> {

    }, [item])
  return (
    <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        style={tw`flex-1 bg-neutral-900`} >
        {/* back button & movie poster */}
    <View style={tw`w-full`}>
      <SafeAreaView style={[tw`absolute z-20 w-full flex-row justify-between items-center px-4`, topMargin, tw.p1]}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={[tw`rounded-xl p-1`, styles.background]}>
            <ChevronLeftIcon strokeWidth={3} size={28} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
          <HeartIcon strokeWidth={3} size={28} color={isFavourite? theme.background : 'white'}/>
        </TouchableOpacity>
      </SafeAreaView>
      <View>
        <Image
          source={require('../../assets/images/dune.jpg')}
          style={{width, height: height*0.55}}
        />
        <LinearGradient
          colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
          style={[tw`absolute bottom-0`, {width, height: height*0.40}]}
          start={{x: 0.5, y:0}}
          end={{x: 0.5, y: 1}}
          
        />
      </View>
    </View>
    </ScrollView>
    
  )
}