import { FC, useState } from 'react';

import { CrossIcon } from '../index';

import styles from './UserAvatar.module.css';

interface UserAvatarProps {
  user: string,
  logOut: () => void,
}

const UserAvatar: FC<UserAvatarProps> = ({
  user,
  logOut,
}) => {
  const [isTooltipActive, setIsTooltipActive] = useState<boolean>(false);

  const avatarOnClickHandler = () => {
    setIsTooltipActive(!isTooltipActive);
  };

  const avatarLogOutHandler = () => {
    logOut();
    setIsTooltipActive(!isTooltipActive);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.userAvatar}
        onClick = {avatarOnClickHandler}
      >
        {user.charAt(0).toUpperCase()}
      </div>
      <div
        className={styles.userAvatarTooltip}
        data-is-active={`${isTooltipActive}`}
      >
        <div className={styles.tooltipHeader}>
          <div
            className={styles.tooltipIconWrapper}
            onClick = {avatarOnClickHandler}
          >
            <CrossIcon />
          </div>
        </div>
        <p className={styles.tooltipText}>User: {user}</p>
        <button
          className={styles.tooltipBtn}
          onClick = {avatarLogOutHandler}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserAvatar;
