import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../Config/colors';

const Loader = (props) => {
  const { isLoading } = props;
  return (isLoading ? (
    <View style={styles.loaderBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator
          animating={isLoading}
          color={colors.dark}
        />
      </View>
    </View>
  ) : null);
};

const styles = StyleSheet.create({
  loaderBackground: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backgroundColor: 'rgba(52, 52, 52, 0.4)'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});


const mapStateToProps = state => ({
  isLoading: state.globalVariables.isLoading
});


export default connect(
  mapStateToProps,
  null
)(Loader);
