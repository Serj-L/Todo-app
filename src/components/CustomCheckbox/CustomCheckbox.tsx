import { FC } from 'react';

import { CheckIcon } from '../../components/index';
import styles from './CustomCheckbox.module.css';

interface CustomCheckboxProps {
  isChecked?: boolean;
  isTouchDevice: boolean;
  toggleCheckBoxHandler: () => void;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  isChecked = false,
  isTouchDevice,
  toggleCheckBoxHandler,
}) => {

  return (
    <>
      <input
        className={styles.checkBox}
        data-is-touch-device={isTouchDevice}
        id="customCheckbox"
        type="checkbox"
        checked = {isChecked}
        readOnly

      />
      <label
        htmlFor="customCheckbox"
        onClick = {toggleCheckBoxHandler}
      >
        {isChecked && <div className={styles.checkIconWrapper}><CheckIcon /></div>}
      </label>
    </>
  );
};

export default CustomCheckbox;
