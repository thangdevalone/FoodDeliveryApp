import { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
import App from './App';
function Main() {
  useEffect(() => {
    Orientation.lockToPortrait();

    // Đảm bảo mở khóa hướng màn hình khi component bị hủy
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);
  return (
 
        <App/>
     
  );
}

export default Main;
