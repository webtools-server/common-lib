/**
 * onerror
 * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
 */

/**
 * window.onerror
 * @param {Object} options 选项
 * @param {Function} cb 回调
 */
export function onError(options = {}, cb) {
  // 先存下旧的onerror事件处理函数
  const oldOnErrorHandler = window.onerror;

  /* eslint-disable space-before-function-paren */
  window.onerror = function (/* msg, url, line, col, err */) {
    /* eslint-disable prefer-rest-params */
    const args = Array.prototype.slice.call(arguments);

    if (oldOnErrorHandler) {
      oldOnErrorHandler.apply(window, args);
    }

    const error = processError.apply(window, args);
    if (error.msg.indexOf('Script error') > -1 && !error.url) {
      if (options.debug) {
        console.log(error.msg);
      }
      return false;
    }

    cb && cb(error);
    return false;
  };
}

/**
 * 处理错误信息
 * @param {String} msg
 * @param {String} url
 * @param {String} line
 * @param {String} col
 * @param {Object} err
 */
export function processError(msg, url, line, col, err) {
  let stack = '';

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
  url = url || (err && err.fileName) || '';
  line = line || (err && err.lineNumber) || '';
  col = col || (err && err.columnNumber) || '';
  stack = (err && err.stack) || '';

  return {
    msg,
    url,
    line,
    col,
    stack
  };
}

