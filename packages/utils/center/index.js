/**删除字符串中的指定字符串*/
export function DelChar(str, char) {
    return str.split(char).join('');
}

/**字符转字符串格式*/
export function ToString(str) {
    return str.toString();
}

/**字符串长度不够补0(前补位)（N位）*/
export function PrefixZero(num, N) {
    return (Array(N).join(0) + num).slice(-N);
}

/**字符串长度不够补0(后补位)（N位）*/
export function PrefixendZero(num, N) {
    return num.padEnd(N, '0');
}

/**字符串长度不够补0（2位）*/
export function PrefixTwoZero(num) {
    return (Array(2).join(0) + num).slice(-2);
}

/**字符串长度不够补0（4位）*/
export function PrefixFourZero(num) {
    return (Array(4).join(0) + num).slice(-4);
}

/** 10进制转2进制位 */
export function dec_to_bin(data) {
    return Number(data).toString(2);
}

/** 10进制转16进制位 */
export function dec_to_hex(data) {
    return Number(data).toString(16);
}

export function printFn(value) {
    const precision = 14
    return Number(math.format(value, precision))
}
export const getStore = (params = {}) => {
    let {
        name,
        debug
    } = params
    name = keyName + name
    let obj = {}
    let content
    obj = window.sessionStorage.getItem(name)
    if (validatenull(obj)) obj = window.localStorage.getItem(name)
    if (validatenull(obj)) return
    try {
        obj = JSON.parse(obj)
    } catch (e) {
        return obj
    }
    if (debug) {
        return obj
    }
    if (obj.dataType === 'string') {
        content = obj.content
    } else if (obj.dataType === 'number') {
        content = Number(obj.content)
    } else if (obj.dataType === 'boolean') {
        content = eval(obj.content)
    } else if (obj.dataType === 'object') {
        content = obj.content
    }
    return content
}