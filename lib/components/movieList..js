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
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  debounce,
  tw,
  style,
  Carousel,
} from "../constants/imports/pluginsImports";
import { theme, styles } from "../constants/imports/constantsImports";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

var{width, height} = Dimensions.get('window');
export default function MovieList({title, data}) {
  let movieName = 'Ant-Man and the Wasp: Quantumania';
  const navigation = useNavigation();
  return (
    <View style={tw`mt-8 gap-y-4`}>
      <View style={tw`mx-4 flex-row justify-between items-center`}>
        <Text style={tw`text-white text-xl`}>{title}</Text>
        <TouchableOpacity>
          <Text style={[styles.text, tw`text-lg`]}>See All</Text>
        </TouchableOpacity>
        </View>
        {/* movie row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}>
          {
            data.map((item, index)=> {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={()=> navigation.navigate('MovieDetails', item)}>
                  <View style={tw`gap-y-1 mr-4`}>
                    <Image source={require('../../assets/images/dune.jpg')}
                      style={[{
                      width: width*0.33,
                      height: height*0.22,}, 
                      tw`rounded-3xl`]} />
                  <Text style={tw`text-neutral-300 ml-1`}>{movieName.length>14? movieName.slice(0,14)+'...' : movieName}</Text>

                  </View>
                </TouchableWithoutFeedback>
              )
            })
          }
        </ScrollView>
      </View>
  )
}