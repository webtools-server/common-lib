/**
 * util
 */

import leftPad from './left_pad';

const rhashcode = /\d\.\d{4}/;
const UUID_KEY = '__DSTAT_UUID__';

export const slice = Array.prototype.slice;
export const toStr = Object.prototype.toString;
export const hasOwn = Object.prototype.hasOwnProperty;

export function getCustId() {
    return getQuery('userid') || getCookie('userid') || '';
}

export function getQuery(name) {
    // 参数：变量名，url为空则表从当前页面的url中取
    let u = arguments[1] || window.location.search.replace('&amp;', '&'),
        reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
        r = u.substr(u.indexOf('\?') + 1).match(reg);

    return r != null ? r[2] : '';
}

export function getCookie(name) {
    // 读取COOKIE
    let reg = new RegExp('(^| )' + name + '(?:=([^;]*))?(;|$)'),
        val = document.cookie.match(reg);

    return val ? (val[2] ? unescape(val[2]) : '') : null;
}

export function getUUID() {
    try {
        let uuid = window.localStorage.getItem(UUID_KEY);

        if (!uuid) {
            uuid = makeHashCode();
            window.localStorage.setItem(UUID_KEY, uuid);
        }
        return uuid;
    } catch (e) {
        return makeHashCode();
    }
}

export function getTime() {
    const oDate = new Date();
    const year = oDate.getFullYear();
    const month = leftPad(oDate.getMonth() + 1, 2, '0');
    const date = leftPad(oDate.getDate(), 2, '0');
    const hours = leftPad(oDate.getHours(), 2, '0');
    const minutes = leftPad(oDate.getMinutes(), 2, '0');
    const second = leftPad(oDate.getSeconds(), 2, '0');

    return `${year}-${month}-${date} ${hours}:${minutes}:${second}`;
}

export function makeHashCode(prefix) {
    prefix = prefix || 'bimta';
    return String(Math.random() + Math.random()).replace(rhashcode, prefix);
}

export function assign(from, to, ignore = []) {
    let obj = {};

    for (let m in to) {
        if (hasOwn.call(to, m) && !~ignore.indexOf(m)) {
            obj[m] = to[m];
        }
    }

    for (let n in from) {
        if (hasOwn.call(from, n) && obj[n] === void 0) {
            obj[n] = from[n];
        }
    }

    return obj;
}

export function each(obj, cb) {
    if (isArray(obj)) {
        obj.forEach((o, i) => {
            cb && cb(o, i);
        });
    } else if (isObject(obj)) {
        for (let k in obj) {
            if (hasOwn.call(obj, k)) {
                cb && cb(obj[k], k);
            }
        }
    }
}

export function isString(str) {
    return toStr.call(str) === '[object String]';
}

export function isArray(arr) {
    return Array.isArray(arr);
}

export function isObject(obj) {
    return toStr.call(obj) === '[object Object]';
}
