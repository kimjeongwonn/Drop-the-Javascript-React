import React, { ReactElement, useCallback, useState } from 'react';
import styles from './Slider.module.scss';

interface Props {
  max?: number;
  min?: number;
  initialValue: number;
  step?: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Slider({ onChange, initialValue, ...args }: Props): ReactElement {
  const [rangeValue, setRangeValue] = useState<number>(initialValue);
  const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(e => {
    setRangeValue(+e.target.value);
    onChange(e);
  }, []);

  return (
    <input
      value={rangeValue}
      className={styles.slider}
      type='range'
      {...args}
      onChange={onChangeHandler}
    ></input>
  );
}

Slider.defaultProps = {
  max: 100,
  min: 0,
  step: 1
};

export default React.memo(Slider);
