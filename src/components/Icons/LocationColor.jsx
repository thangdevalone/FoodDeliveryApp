import React from 'react';
import {Svg, Path,Rect} from 'react-native-svg';

export function LocationColor({size}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect width="18" height="22" transform="translate(1 1)" fill="white" />
      <Path
        d="M19 10C19 17 10 23 10 23C10 23 1 17 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
        fill="#35B6FF"
        stroke="#35B6FF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10 13C12.2091 13 14 11.2091 14 9C14 6.79086 12.2091 5 10 5C7.79086 5 6 6.79086 6 9C6 11.2091 7.79086 13 10 13Z"
        fill="white"
      />
    </Svg>
  );
}
