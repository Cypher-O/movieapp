import {
    View,
    Text,
    React,
    Image,
  } from "../constants/imports/reactNativeImports";
import {
    tw,
    style,
  } from "../constants/imports/pluginsImports";

const WeatherStats = ({ iconName, value }) => {
  return (
    <View style={tw`flex-row gap-x-2 items-center`}>
      <Image
        source={iconName}
        style={tw`h-6 w-6`}
      />
      <Text style={tw`text-white font-semibold text-base`}>
        {value}
      </Text>
    </View>
  );
};

export default WeatherStats;
