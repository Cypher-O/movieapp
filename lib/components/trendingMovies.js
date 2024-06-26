import {
  View,
  Text,
  TouchableWithoutFeedback,
  React,
  Image,
  Dimensions,
} from "../constants/imports/reactNativeImports";

import {
  tw,
  Carousel,
} from "../constants/imports/pluginsImports";
import { useNavigation } from "../constants/imports/reactNativeNavigationImports";
import { 
  fallbackPosterImage,
  image500,
 } from '../constants/imports/apiImports';

var{width, height} = Dimensions.get('window');
export default function TrendingMovies({data}) {
  const navigation = useNavigation();
  const handleTap = (item)=> {
    navigation.navigate('MovieDetails', item);
  }
  return (
    <View style={tw`mb-8`}>
      <Text style={tw`text-white text-xl mx-4 mb-5`}>Trending Movies</Text>
      <Carousel 
        data={data}
        renderItem={({item})=> <MovieCard item={item} handleTap={handleTap}/>}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.62}
        slideStyle={{display: 'flex', alignItems: 'center'}} />
    </View>
  )
}

const MovieCard = ({item, handleTap}) =>{
  return (
    <TouchableWithoutFeedback 
      onPress={()=>handleTap(item)}>
      <Image 
        // source={require('../../assets/images/dune.jpg')} style={[{
        source={{uri: image500(item.poster_path) || fallbackPosterImage}} style={[{
        width: width*0.5,
        height: height*0.4,
      }, tw`rounded-3xl`]}/>
    </TouchableWithoutFeedback>
  )
}