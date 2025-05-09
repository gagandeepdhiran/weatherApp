import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const shared = {
  container: {
    flex: 1,
  },
  inputWrapper: {
    borderWidth: 1,
    padding: 10,
    width: screenWidth - 36,
    borderRadius: 10,
  },
  inputText: {
    fontSize: 24,
  },
  errorText: {
    marginTop: 2,
    fontSize: 13,
    textTransform: 'capitalize',
  },
  button: {
    width: screenWidth - 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },
  card: {
    marginVertical: 10,
    width: screenWidth - 32,
    borderWidth: 2,
    height: 180,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
};

export const styles = StyleSheet.create({
  light: {
    root: {
      ...shared.container,
      backgroundColor: '#FFFFFF',
    },
    heading: {
      fontSize: 32,
      fontWeight: '700',
      color: '#000000',
    },
    toggleText: {
      color:'#000000'
    },
    highlight: {
      color: '#CDFB47',
    },
    inputWrapper: {
      ...shared.inputWrapper,
      borderColor: '#444444',
    },
    inputText: {
      ...shared.inputText,
      color: '#000000',
    },
    errorText: {
      ...shared.errorText,
      color: 'red',
    },
    button: {
      ...shared.button,
      backgroundColor: '#CDFB47',
    },
    buttonText: {
      color: '#000000',
      fontSize: 20,
      fontWeight: '500',
    },
    cityCard: {
      ...shared.card,
      backgroundColor: '#F9F9F9',
      borderColor: '#CCCCCC',
    },
    cityName: {
      color: '#000000',
      fontWeight: '500',
      fontSize: 24,
    },
    updatedText: {
      color: '#555555',
      fontSize: 14,
      marginTop: 1,
    },
    tempText: {
      color: '#000000',
      fontSize: 40,
      fontWeight: '700',
    },
    weatherText: {
      color: '#000000',
      fontSize: 24,
      fontWeight: '700',
    },
    sectionTitle: {
      color: '#000000',
      fontSize: 18,
      fontWeight: '500',
      marginTop: 20,
    },
  },
  dark: {
    root: {
      ...shared.container,
      backgroundColor: '#000000',
    },
    heading: {
      fontSize: 32,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    toggleText: {
      color:'#FFFFFF'
    },
    highlight: {
      color: '#CDFB47',
    },
    inputWrapper: {
      ...shared.inputWrapper,
      borderColor: '#AAAAAA',
    },
    inputText: {
      ...shared.inputText,
      color: '#FFFFFF',
    },
    errorText: {
      ...shared.errorText,
      color: 'red',
    },
    button: {
      ...shared.button,
      backgroundColor: '#CDFB47',
    },
    buttonText: {
      color: '#000000',
      fontSize: 20,
      fontWeight: '500',
    },
    cityCard: {
      ...shared.card,
      backgroundColor: '#000000',
      borderColor: '#FFFFFF',
    },
    cityName: {
      color: '#FFFFFF',
      fontWeight: '500',
      fontSize: 24,
    },
    updatedText: {
      color: '#AAAAAA',
      fontSize: 14,
      marginTop: 1,
    },
    tempText: {
      color: '#FFFFFF',
      fontSize: 40,
      fontWeight: '700',
    },
    weatherText: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: '700',
    },
    sectionTitle: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '500',
      marginTop: 20,
    },
  }
});
