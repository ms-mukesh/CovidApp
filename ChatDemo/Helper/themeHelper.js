import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const isIOS = Platform.OS === 'ios';
const isANDROID = Platform.OS === 'android';
const isiPAD = SCREEN_HEIGHT / SCREEN_WIDTH < 1.6;

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const widthPercentageToDP = wp => {
  const widthPercent = wp;
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = hp => {
  const heightPercent = hp;
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 375;

const normalize = size => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const font = {
  robotoRegular: (isIOS && 'Roboto-Regular') || 'Roboto_Regular',
  robotoBold: (isIOS && 'Roboto-Bold') || 'Roboto_Bold',
};

const color = {
  black: '#02152a',
  white: '#ffffff',
  blue: '#002f7f',
  red: '#D12A2F',
  yellow: '#EAD836',
  green: '#228C44',
  lightGray: '#F6F6F7',
  gray: '#A7ACB1',
  darkGray: '#BFBFC0',
  purple: '#3D0078',
  lightRed:'#FFE0E6',
  lightBlue:'#F0F7FF',
  darkBlue:'#75B7FF',
  lightGreen:'#E4F4E7',
  darkGreen:'#85CD95',
};

const headerColorArray = ['orange', 'orange', 'orange', 'orange', 'orange'];

export {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  screenHeight,
  screenWidth,
  normalize,
  isIOS,
  isANDROID,
  isiPAD,
  color,
  font,
  headerColorArray,
};
