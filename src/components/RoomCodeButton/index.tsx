import copyImg from '../../assets/images/copy.svg';
import './styles.scss';

interface IRoomCodeButton {
  code: string;
}

export const RoomCodeButton = ({ code }: IRoomCodeButton) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button className='room-code-button' onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt='Copy room code' />
      </div>

      <span>Sala #{code}</span>
    </button>
  );
};
