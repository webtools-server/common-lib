/**
 * BI统计
 */

import * as _ from '../util/index';
import os from '../util/env';

const custId = _.getCustId();
const uuid = _.getUUID();

// 上报地址
const reportURL = {
    test: '//172.16.1.16:8890',
    prod: '//report.jyblife.com'
};

// 默认配置
const defaultOptions = {
    ak: 'KVQiUTJf',
    cmd: '65010000'
};

// 平台
let platformStr = '';

if (os.android) {
    platformStr = 'android';
} else if (os.ios) {
    platformStr = 'ios';
}

const bi = {
    env: 'test',
    options: {},
    init: function(env, options) {
        this.env = env;
        this.options = _.assign(defaultOptions, options || {});
    },
    pageview: function(ids, params) {
        this._track(ids, params);
    },
    event: function(ids, params) {
        this._track(ids, params);
    },
    _track: function(ids, params) {
        if (!ids) {
            return;
        }

        // set params
        params = params || {};

        /* eslint-disable camelcase */
        const oImg = new Image();
        const url = reportURL[this.env];
        const oParam = {
            ak: this.options.ak,
            body: JSON.stringify({
                cmd: this.options.cmd,
                data: [{
                    sid: '', // 会话id（可选）
                    op_type: params.op_type || 'click', // click，touch，share
                    op_result: '', // （可选）
                    op_time: _.getTime(), // 事件发生的时间（时间戳）
                    op_object: ids, // 操作对象，格式1000.1.1
                    op_page: '', // h5为空（可选）
                    op_params: _.assign({
                        platform: platformStr, // 平台
                        in_app: os.jyb ? 1 : 0, // 1为加油宝app内，0为app外
                        cust_id: custId, // 客户id
                        uniq_id: custId || uuid, // 如果未登录设置此id,如果登录与custId一致
                        source: _.getQuery('channel') || _.getQuery('from') || '', // baidu
                        act_id: '', // 活动ID
                        group: '' // 用户群
                    }, params, ['op_type'])
                }]
            })
        };
        let aParam = [];

        for (let k in oParam) {
            aParam.push(`${encodeURIComponent(k)}=${encodeURIComponent(oParam[k])}`);
        }

        oImg.src = `${url}?${aParam.join('&')}`;
    }
};

export default bi;
