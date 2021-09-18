import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './Stepper.module.scss';
import minusIconSrc from '../../Assets/Image/minus_icon.svg';
import plusIconSrc from '../../Assets/Image/plus_icon.svg';
import { debounce } from 'lodash';
import { SetStateType } from '../../Contexts/MusicContext';

interface Props {
  setValueState: SetStateType<number>;
  valueState: number;
  step?: number;
  min?: number;
  max?: number;
  label?: string;
  debounceDelay: number;
}

export default function Stepper({
  setValueState,
  valueState,
  step,
  min,
  max,
  label,
  debounceDelay
}: Props): ReactElement {
  const [inputValue, setInputValue] = useState<number | string>(valueState);

  function withStepCount(num: number): number {
    const valueDiv = num % step;
    const offset = valueDiv >= step / 2 ? -(step - valueDiv) : valueDiv;
    return num - offset;
  }

  const changeValue = useCallback(
    (input?: number) => {
      let newValue = withStepCount(input ?? (inputValue as number));
      newValue = newValue > max ? max : newValue < min ? min : newValue;
      setInputValue(newValue);
      setValueState(newValue);
    },
    [step, min, max, inputValue]
  );

  useEffect(() => {
    changeValue(valueState);
  }, [valueState]);

  const changValueDebounce = useCallback(
    debounce(value => {
      changeValue(value);
    }, debounceDelay),
    [debounceDelay]
  );

  return (
    <div className={styles.container}>
      <div>{label}</div>
      <div className={styles.stepper}>
        <Button
          onClick={() => changeValue((inputValue as number) - step)}
          size='sm'
          icon={minusIconSrc}
        />
        <input
          onBlur={e => {
            changValueDebounce(inputValue);
          }}
          onChange={e => {
            if (Number.isNaN(+e.target.value)) {
              return;
            }

            if (e.target.value == '') {
              setInputValue('');
              changValueDebounce.cancel();
              return;
            }

            setInputValue(+e.target.value);
            changValueDebounce(+e.target.value);
          }}
          value={inputValue}
          className={styles.input}
          size={3}
        />
        <Button
          onClick={() => changeValue((inputValue as number) + step)}
          size='sm'
          icon={plusIconSrc}
        />
      </div>
    </div>
  );
}

Stepper.defaultProps = {
  min: 0,
  max: Infinity,
  step: 1,
  label: '',
  debounceDelay: 500
};
