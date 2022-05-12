import { useEffect } from 'react'
import { useAudio } from 'react-use'
import atkSound from '../../assets/sword.mp3'
import { PlayerAction } from '../common/usePlayerInput'

export const useWhenPlayerAttack = (action: PlayerAction) => {
  const [attackAudio, , attackAudioControls] = useAudio({ src: atkSound, loop: false })
  // const [userInfo, setUserInfo] = useAtom(authAtom)

  useEffect(() => {
    if (action === 'attack') {
      attackAudioControls.seek(0)
      attackAudioControls.play()

      // const { jwt, mail } = userInfo.data;
      // console.log(userInfo.oneTimeToken);
      // if (userInfo.oneTimeToken) {
      //   openPopUp(createOnePlayerUrl('12791396'));
      // } else {
      //   oneTimeLogin(mail || '', jwt || '')
      //   .then(res => {
      //     const { data } = res;
      //     const oneTimeToken = data.one_time_token;
      //     setUserInfo({oneTimeToken, data: userInfo.data});
      //     openPopUp(createOnePlayerUrl('12791396', '', oneTimeToken));
      //   });
      // }
    }
  }, [action])

  return [attackAudio]
}
