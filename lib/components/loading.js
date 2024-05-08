import {
    View,
    React,
    Dimensions,
  } from "../constants/imports/reactNativeImports";
  
import {
    tw,
    Progress,
} from "../constants/imports/pluginsImports";
import { theme } from "../constants/imports/constantsImports";

const {width, height} = Dimensions.get('window');
export default function Loading() {
  return (
    <View style={[tw`absolute flex-row justify-center items-center`, {height, width}]}>
        <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
    </View>
  )
}