import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Svg, { Path, Defs, ClipPath, Rect } from 'react-native-svg';
import IconBtn from '../UI/IconBttn';
import { BACKEND_LINK } from '../../util/constants';
import { AuthContext } from '../../store/auth-context';
import { Colors } from '../../util/Colors';

type ProfileHeaderProps = {
  showModlalHandler: (value: boolean) => void;
};

export default function ProfileHeader({ showModlalHandler }: ProfileHeaderProps) {
  const authCtx = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
       
        <Svg width="361" height="170" style={styles.svg}>
          <Defs>
            <ClipPath id="clip-left">
              <Path d="M1.21095 2.54664C1.21095 2.54664 26.0002 92 97.5002 29.5C169 -33 301.5 -2.00001 113 92C-75.4998 186 133 67.5 216.5 107C300 146.5 310.5 78.0002 310.5 78.0002L360.211 169.547H0V0H1.21095Z" />
            </ClipPath>
          </Defs>
          <Rect x="0" y="0" width="361" height="170" fill={Colors.primari300} clipPath="url(#clip-left)" />
        </Svg>

     
        <Svg width="361" height="170" style={[styles.svg, styles.rightSvg]}>
          <Defs>
            <ClipPath id="clip-right">
              <Path d="M360.211 169.547C360.211 169.547 310.5 78.0002 310.5 78.0002C310.5 78.0002 300 146.5 216.5 107C133 67.5 -75.4998 186 113 92C301.5 -2.00001 169 -33 97.5002 29.5C26.0002 92 1.21095 2.54664 1.21095 2.54664L360.211 169.547H361V170H360.211Z" />
            </ClipPath>
          </Defs>
          <Rect x="0" y="0" width="361" height="170" fill={Colors.secondary500} clipPath="url(#clip-right)" />
        </Svg>
      </View>
      <View style={styles.circleContainer}>
        <Image
          source={{
            uri: `${BACKEND_LINK}/profileImages/${authCtx.userInfo?.id}.jpg`,
          }}
          style={styles.image}
        />
        <View style={styles.addImageIcon}>
          <IconBtn
            iconName="camera-outline"
            color={Colors.primari300}
            size={24}
            onPress={() => showModlalHandler(true)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    position: 'relative',
    height: 250,
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
  },
  topContainer: {
    height: 230,
    alignItems: 'center',
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
    position: 'relative',
    overflow: 'hidden',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  rightSvg: {
    left: '50%',
  },
  circleContainer: {
    backgroundColor: 'white',
    borderRadius: 70,
    height: 130,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    marginTop: -20, 
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    position: 'absolute',
    top: 165, 
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 70,
  },
  addImageIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});