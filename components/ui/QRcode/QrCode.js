import {StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QrCode = ({value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
          value={` ${value}`}
          size={200}
          backgroundColor="white"
          color="black"
        />
      </View>
    </View>
  );
};

export default QrCode;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
    overflow: 'hidden',
    padding: 4,
  },
});
