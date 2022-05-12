import * as env from '../apis/constants';
const defaultConfig = "height=600, width=1000, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no";

export const openPopUp = (url : string, config=defaultConfig) => {
  return window.open(
    url, 
    "newwindow", 
    config
  );
}

export const createOnePlayerUrl = (loId: string, liId='', oneTimeToken?: string) => {
  const url = `https://${env.PORTAL}/play/${liId?`${liId}/`:''}${loId}${oneTimeToken?`?oneTimeToken=${oneTimeToken}`:''}`;
  return url;
};