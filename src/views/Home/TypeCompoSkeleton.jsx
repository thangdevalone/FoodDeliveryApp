import { View, Text } from 'react-native'
import React from 'react'
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
const TypeCompoSkeleton = (props) => {
  return (
    <View className="mr-3 mt-2">
     <ContentLoader 
    speed={1}
    width={80}
    height={100}
    viewBox="0 0 80 100"
    backgroundColor="#d3c5c5"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Circle cx="48" cy="33" r="30" />
    <Rect x="17" y="79" rx="0" ry="0" width="64" height="9" />
  </ContentLoader>
    </View>
  )
}

export default TypeCompoSkeleton