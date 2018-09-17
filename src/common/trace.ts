import * as Moment from 'moment';

export default function trace(...args: any[]) {
  console.log(Moment().format('HH:mm:ss:SSSS'), ...args);
}
