import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './Stepper.module.scss';
import minusIconSrc from '../../Assets/Image/minus_icon.svg';
import plusIconSrc from '../../Assets/Image/plus_icon.svg';

interface Props {
  onChange: (newValue: number) => void;
  valueState: number;
  step?: number;
  min?: number;
  max?: number;
  label?: string;
}

export default function Stepper({
  onChange,
  valueState,
  step,
  min,
  max,
  label
}: Props): ReactElement {
  const [inputValue, setInputValue] = useState(valueState);

  function withStepCount(num: number): number {
    const valueDiv = num % step;
    const offset = valueDiv >= step / 2 ? -(step - valueDiv) : valueDiv;
    return num - offset;
  }

  const changeValue = useCallback(
    (input?: number) => {
      let newValue = withStepCount(input ?? inputValue);
      newValue = newValue > max ? max : newValue < min ? min : newValue;
      setInputValue(newValue);
      onChange(newValue);
    },
    [step, min, max, inputValue, onChange]
  );

  useEffect(() => {
    changeValue(valueState);
  }, [valueState]);

  return (
    <div className={styles.container}>
      <div>{label}</div>
      <div className={styles.stepper}>
        <Button onClick={() => changeValue(inputValue - step)} size='sm' icon={minusIconSrc} />
        <input
          onBlur={() => changeValue()}
          onChange={e => {
            if (Number.isNaN(+e.target.value)) {
              return;
            }
            setInputValue(+e.target.value);
          }}
          value={inputValue}
          className={styles.input}
          size={3}
        />
        <Button onClick={() => changeValue(inputValue + step)} size='sm' icon={plusIconSrc} />
      </div>
    </div>
  );
}

Stepper.defaultProps = {
  min: 0,
  max: Infinity,
  step: 1,
  label: ''
};
