import Logo from './Logo_NF.png';
import BgLog from './bg-image.png';
import FF_1 from './ff_1.png';
import FF_3 from './ff_2.png';
import FF_2 from './ff_3.png';

import LogoW from './Logo_NF_W.png';

import { Image } from 'react-native';
export const FF1Image = ({className, style}) => (
  <Image
    resizeMode="contain"
    className={className}
    style={style}
    source={FF_1}
  />
);

export const FF2Image = ({className, style}) => (
  <Image
    resizeMode="contain"
    className={className}
    style={style}
    source={FF_2}
  />
);
export const FF3Image = ({className, style}) => (
  <Image
    resizeMode="contain"
    className={className}
    style={style}
    source={FF_3}
  />
);
export const LogoImage = ({className, style}) => (
  <Image
    resizeMode="contain"
    className={className}
    style={style}
    source={Logo}
  />
);
export const LogoWImage = ({className, style}) => (
  <Image
    resizeMode="contain"
    className={className}
    style={style}
    source={LogoW}
  />
);
export const BgLogImage = ({className, style}) => (
  <Image
    resizeMode="contain"
    className={className}
    style={style}
    source={BgLog}
  />
);
