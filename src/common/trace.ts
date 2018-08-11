// Logging utility
// by Sam Dutton
// https://github.com/samdutton/simpl/blob/gh-pages/rtcdatachannel/js/main.js
// Copyright by Google Inc.
// Licenced under Apache Licence, Version 2
// http://www.apache.org/licenses/LICENSE-2.0
//
// Edited by Sascha Englert
export default function trace(...arg: any[]) {
  const now = (Date.now() / 1000).toFixed(3);
  console.log(now + ': ', ...arg);
}
