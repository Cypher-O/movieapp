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
    Progress,
} from "../constants/imports/pluginsImports";
import { useRoute } from '@react-navigation/native';
import { theme, styles } from "../constants/imports/constantsImports";
import { Dimensions, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {Cast} from '../constants/imports/componentsImports';
import MovieList from "../components/movieList";

const {width, height} = Dimensions.get('window');
export default function Loading() {
  return (
    <View style={[tw`absolute flex-row justify-center items-center`, {height, width}]}>
        <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
    </View>
  )
}