import axios from 'axios';

const defaultSound = {
  bass: "https://s3.ap-northeast-2.amazonaws.com/webeat/ch.wav",
  ch: "https://s3.ap-northeast-2.amazonaws.com/webeat/ch.wav",
  kick: "https://s3.ap-northeast-2.amazonaws.com/webeat/kick.wav",
  oh: "https://s3.ap-northeast-2.amazonaws.com/webeat/oh.wav",
  snare: "https://s3.ap-northeast-2.amazonaws.com/webeat/snare.wav",
  Ac_HatCl: "https://s3.ap-northeast-2.amazonaws.com/webeat/Ac_HatCl.WAV",
  Ac_HatOp2: "https://s3.ap-northeast-2.amazonaws.com/webeat/Ac_HatOp2.WAV",
  Ac_KckCym: "https://s3.ap-northeast-2.amazonaws.com/webeat/Ac_KckCym.WAV",
  Ac_Kick1: "https://s3.ap-northeast-2.amazonaws.com/webeat/Ac_Kick1.WAV",
  Ac_Kick2: "https://s3.ap-northeast-2.amazonaws.com/webeat/Ac_Kick2.WAV",
  Ac_Kick3: "https://s3.ap-northeast-2.amazonaws.com/webeat/Ac_Kick3.WAV",
  Ac_KiknRide: "https://s3.ap-northeast-2.amazonaws.com/webeat/Ac_KiknRide.WAV",
  Ac_MidTom: "https://s3.ap-northeast-2.amazonaws.com/webeat/Ac_MidTom.WAV",
  Ac_Snare1: "https://s3.ap-northeast-2.amazonaws.com/webeat/Ac_Snare1.WAV",
  Ac_Snare3: "https://s3.ap-northeast-2.amazonaws.com/webeat/Ac_Snare3.WAV",
  Ac_Snare4: "https://s3.ap-northeast-2.amazonaws.com/webeat/Ac_Snare4.WAV",
}

const defaultSoundArr = [];

Object.keys(defaultSound).forEach((element, index) => {
  defaultSoundArr[index] = new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: defaultSound[element],
      responseType: 'blob'
    })
      .then((result) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(result.data);
        reader.onload = () => {
          resolve({ [element]: reader.result });
        }
      });
  });
});

const soundAsyncAll = Promise.all(defaultSoundArr)
  .then((result) => {
    let _defaultSound = {};
    result.forEach((element, index) => {
      _defaultSound[Object.keys(element)[0]] = element[Object.keys(element)]
    });
    return _defaultSound;
  });
export default soundAsyncAll;
