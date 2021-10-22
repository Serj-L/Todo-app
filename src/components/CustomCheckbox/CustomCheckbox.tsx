import { FC } from 'react';

import { CheckIcon } from '../../components/index';
import styles from './CustomCheckbox.module.css';

interface CustomCheckboxProps {
  isChecked?: boolean;
  toggleIsChecked: () => void;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  isChecked = false,
  toggleIsChecked,
}) => {

  return (
    <>
      <input
        className={styles.checkBox}
        id="customCheckbox"
        type="checkbox"
        onClick = {toggleIsChecked}
        checked = {isChecked}
        readOnly
      />
      <label htmlFor="customCheckbox">
        {isChecked && <div className={styles.checkIconWrapper}><CheckIcon /></div>}
      </label>
    </>
  );
};

export default CustomCheckbox;
