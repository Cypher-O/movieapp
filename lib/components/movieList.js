import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  React,
  Image,
  Dimensions,
} from "../constants/imports/reactNativeImports";

import {
  tw,
} from "../constants/imports/pluginsImports";
import { styles } from "../constants/imports/constantsImports";
import { useNavigation } from "../constants/imports/reactNativeNavigationImports";
import {
  image185,
  fallbackPosterImage,
 } from '../constants/imports/apiImports';

var{width, height} = Dimensions.get('window');
export default function MovieList({title, data, hideSeeAll}) {
  const navigation = useNavigation();
  return (
    <View style={tw`mt-8 gap-y-4`}>
      <View style={tw`mx-4 flex-row justify-between items-center`}>
        <Text style={tw`text-white text-xl`}>{title}</Text>
        {
          !hideSeeAll && (
            <TouchableOpacity>
              <Text style={[styles.text, tw`text-lg`]}>See All</Text>
            </TouchableOpacity>
          )
        }
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
                  onPress={()=> navigation.push('MovieDetails', item)}>
                  <View style={tw`gap-y-1 mr-4`}>
                    <Image 
                      source={{uri: image185(item.poster_path) || fallbackPosterImage}}
                      // source={require('../../assets/images/shogun.jpg')}
                      style={[{
                      width: width*0.33,
                      height: height*0.22,}, 
                      tw`rounded-3xl`]} />
                  <Text style={tw`text-neutral-300 ml-1`}>{item.title.length>14? item.title.slice(0,14)+'...' : item.title}</Text>

                  </View>
                </TouchableWithoutFeedback>
              )
            })
          }
        </ScrollView>
      </View>
  )
}