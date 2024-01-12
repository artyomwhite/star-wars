import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Colors } from 'utils/styles';
import { typography } from 'utils/typography';


type ActionLeftStateType = 'close';
type ActionRightStateType = 'loading';

interface IUiModalHeader {
  label?: string;
  labelClose?: string;
  actionLeftState?: ActionLeftStateType;
  actionRightState?: ActionRightStateType;
  hideLeftComponent?: boolean;
  LeftComponent?: React.ReactNode | null;
  RightComponent?: React.ReactNode | null;
  containerStyle?: StyleProp<ViewStyle>;
  actionLabelStyle?: StyleProp<TextStyle>;
  onClose?: () => void;
  labelStyle?: StyleProp<TextStyle>;
  load?: boolean;
}

export const UiModalHeader = ({
  label = '',
  labelStyle,
  actionLeftState,
  actionRightState,
  LeftComponent,
  RightComponent,
  containerStyle,
  actionLabelStyle,
  onClose = () => { },
  load,
}: IUiModalHeader) => {

  const LeftActionComponent = useMemo(() => {
    if (LeftComponent) {
      return LeftComponent;
    }

    switch (actionLeftState) {
      case 'close':
        return (
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={onClose}
          >
            <Text
              style={[
                styles.actionLabel,
                actionLabelStyle,
              ]}
            >
              close
            </Text>
          </TouchableOpacity>
        );
      default: {
        return null;
      }
    }
  }, [LeftComponent, actionLeftState, actionLabelStyle, onClose]);

  const RightActionComponent = useMemo(() => {
    if (RightComponent) {
      return RightComponent;
    }

    switch (actionRightState) {
      case 'loading':
        return load ? <ActivityIndicator style={{ paddingBottom: 5 }} /> : null;
      default:
        return null;
    }
  }, [RightComponent, actionRightState, load]);

  return useMemo(() => (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.actionContainer,
          styles.actionContainer__Left,
        ]}
      >
        {LeftActionComponent}
      </View>

      <Text
        numberOfLines={1}
        style={[styles.label, labelStyle]}
      >
        {label}
      </Text>
      <View
        style={[
          styles.actionContainer,
          styles.actionContainer__Right,
        ]}
      >
        {RightActionComponent}
      </View>
    </View>
  ), [containerStyle, LeftActionComponent, labelStyle, label]);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...typography.h3,
    fontSize: 24,
    lineHeight: 27,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    maxWidth: 200,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    bottom: 10,
  },
  actionContainer__Left: {
    left: 20,
  },
  actionContainer__Right: {
    right: 20,
  },
  actionBtn: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 18,
    color: Colors['medium-grey'],
  },
});
