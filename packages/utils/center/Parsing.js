import Moment from "moment";
import {printFn, getStore} from "./index.js";

/** 数据加密 */
export function analysisData(file, filesNum) {
    let AllDataObject = {};
    /*******************数据1*******************/
    let fileData1 = {};
    if (filesNum == 1 && Object.keys(file).length != (0 || null || undefined || "")) {
        if (file.deptCode != undefined) {
            fileData1.deptCode = PrefixZero(file.deptCode, 8);
        } else {
            fileData1.deptCode = PrefixZero("0", 8);
        }
        if (file.groupCode != undefined) {
            fileData1.groupCode = PrefixZero(file.groupCode, 8);
        } else {
            fileData1.groupCode = PrefixZero("0", 8);
        }
        if (file.lineCode != undefined) {
            fileData1.lineCode = PrefixZero(file.lineCode, 8);
        } else {
            fileData1.lineCode = PrefixZero("0", 8);
        }
        if (file.lineName != undefined) {
            fileData1.lineName = file.lineName;
        } else {
            fileData1.lineName = "";
        }
        fileData1.data = file;
        fileData1.tenantId = getStore({name: "opcard"}).tenantId;
        fileData1.tenantName = "";
        fileData1.effectiveDate = DelChar(file.effectiveDate, "-");
    }
    if (filesNum == 11) {
        fileData1.effectiveDate = DelChar(file.effectiveDate, "-");
    }
    /*******************数据2*******************/
    let fileData2 = {};
    if (filesNum == 2 && Object.keys(file).length != (0 || null || undefined || "")) {
        if (file.deptCode != '' && file.groupCode != '' && file.lineCode != '') {
            fileData2.deptCode = PrefixZero(file.deptCode.toString(), 8);
            fileData2.groupCode = PrefixZero(file.groupCode.toString(), 8);
            fileData2.lineCode = PrefixZero(file.lineCode.toString(), 8);
        } else {
            fileData2.deptCode = PrefixZero("0", 8);
            fileData2.groupCode = PrefixZero("0", 8);
            fileData2.lineCode = PrefixZero("0", 8);
        }
    } else {
        fileData2.deptCode = PrefixZero("0", 8);
        fileData2.groupCode = PrefixZero("0", 8);
        fileData2.lineCode = PrefixZero("0", 8);
    }
    fileData2.simpleData = fileData2.deptCode + fileData2.groupCode + fileData2.lineCode;
    /*******************数据3*******************/
    let fileData3 = {};
    if (filesNum == 3 && Object.keys(file).length != (0 || null || undefined || "")) {
        if (file.region != "" && file.lineticket != "") {
            /**车辆类型*/
            fileData3.vehicleType = ToString(file.region) + ToString(file.lineticket);
        } else if (file.region != "" && file.lineticket == "") {
            /**车辆类型*/
            fileData3.vehicleType = ToString(file.region) + "0";
        } else if (file.region == "" && file.lineticket != "") {
            /**车辆类型*/
            fileData3.vehicleType = "0" + ToString(file.lineticket);
        } else if (file.region == "" && file.lineticket == "") {
            /**车辆类型*/
            fileData3.vehicleType = "00";
        }

        if (file.monthly != "") {
            /**月票消费次数*/
            fileData3.monthly = PrefixTwoZero(dec_to_hex(file.monthly));
        }
        if (file.airmonthly != "") {
            /**空调月票消费次数*/
            fileData3.airmonthly = PrefixTwoZero(dec_to_hex(file.airmonthly));
        }
        if (file.benchmarkfare != "") {
            /**基本票价*/
            fileData3.benchmarkfare = PrefixFourZero(dec_to_hex(printFn(Number(file.benchmarkfare) * 100)));
        }
        if (file.conditioningfare != "") {
            /**空调票价*/
            fileData3.conditioningfare = PrefixFourZero(dec_to_hex(printFn(Number(file.conditioningfare) * 100)));
        } else {
            fileData3.conditioningfare = "0000";
        }
        if (file.nightfare != "") {
            /**夜间票价*/
            fileData3.nightfare = PrefixFourZero(dec_to_hex(printFn(Number(file.nightfare) * 100)));
        } else {
            fileData3.nightfare = "0000";
        }
        if (file.discount != "") {
            /**优惠时间限制*/
            fileData3.discount = PrefixTwoZero(dec_to_hex(file.discount));
        }
        if (file.yearly != "") {
            /**请年检天数*/
            fileData3.yearly = PrefixTwoZero(dec_to_hex(file.yearly));
        }
        if (file.minmoney != "") {
            /**请播报最小金额*/
            fileData3.minmoney = PrefixFourZero(dec_to_hex(printFn(Number(file.minmoney) * 100)));
        }
        if (file.quota != "") {
            /**最大充值金额*/
            fileData3.quota = dec_to_hex(printFn(Number(file.quota) * 100));
        }
        /**岛式站台*/
        fileData3.platform = PrefixTwoZero(dec_to_hex(file.platform));
        /**禁用 M1 卡*/
        fileData3.disabledMcard = PrefixTwoZero(dec_to_hex(file.disabledMcard));
    }
    /*******************数据4*******************/
    let fileData4 = {};
    if (filesNum == 4 && Object.keys(file).length != (0 || null || undefined || "")) {
        /**时间参数启用标志*/
        fileData4.timeFlag = bin_to_hex(ToString(file.peakcheck) +
            ToString(file.peakCoolcheck) +
            ToString(file.peakWarmcheck) +
            ToString(file.peakNightcheck) +
            "0000");
        let peakFirst = "";
        let peakSecond = "";
        let peakThird = "";
        let peakFourth = "";
        let peakCool = "";
        let peakWarm = "";
        let peakNight = "";
        /**高峰1 开始时间 - 结束时间*/
        if (Boolean(file.peakcheck)) {
            if (file.peakFirst != null) {
                file.peakFirst.forEach((item) => {
                    peakFirst += DelChar(item, ":");
                });
            } else {
                peakFirst = "00000000"
            }
            /**高峰2 开始时间 - 结束时间*/
            if (file.peakSecond != null) {
                file.peakSecond.forEach((item) => {
                    peakSecond += DelChar(item, ":");
                });
            } else {
                peakSecond = "00000000"
            }
            /**高峰3 开始时间 - 结束时间*/
            if (file.peakThird != null) {
                file.peakThird.forEach((item) => {
                    peakThird += DelChar(item, ":");
                });
            } else {
                peakThird = "00000000"
            }
            /**高峰4 开始时间 - 结束时间*/
            if (file.peakFourth != null) {
                file.peakFourth.forEach((item) => {
                    peakFourth += DelChar(item, ":");
                });
            } else {
                peakFourth = "00000000"
            }
        } else {
            peakFirst = "00000000";
            peakSecond = "00000000";
            peakThird = "00000000";
            peakFourth = "00000000";
        }
        /**空调(冷气)起止日期*/
        if (Boolean(file.peakCoolcheck) && file.peakCool.length != 0) {
            file.peakCool.forEach((item) => {
                peakCool += DelChar(item, "-");
            });
        } else {
            peakCool = "00000000";
        }
        /**空调(暖气)起止日期*/
        if (Boolean(file.peakWarmcheck) && file.peakWarm.length != 0) {
            file.peakWarm.forEach((item) => {
                peakWarm += DelChar(item, "-");
            });
        } else {
            peakWarm = "00000000";
        }
        /**夜间开始时间 - 结束时间*/
        if (Boolean(file.peakNightcheck) && file.peakNight.length != 0) {
            file.peakNight.forEach((item) => {
                peakNight += DelChar(item, ":");
            });
        } else {
            peakNight = "00000000";
        }
        fileData4.peakFirst = peakFirst;
        fileData4.peakSecond = peakSecond;
        fileData4.peakThird = peakThird;
        fileData4.peakFourth = peakFourth;
        fileData4.peakCool = peakCool;
        fileData4.peakWarm = peakWarm;
        fileData4.peakNight = peakNight;
    } else {
        fileData4.timeFlag = "00";
        fileData4.peakFirst = "00000000";
        fileData4.peakSecond = "00000000";
        fileData4.peakThird = "00000000";
        fileData4.peakFourth = "00000000";
        fileData4.peakCool = "00000000";
        fileData4.peakWarm = "00000000";
        fileData4.peakNight = "00000000";
    }
    /*******************数据5*******************/
    let fileData5 = {};
    if (filesNum == 5 && Object.keys(file).length != (0 || null || undefined || "")) {
        /**钱包换乘*/
        if (file.wallet) {
            fileData5.walletLineAllowed = ToString(file.walletLineAllowed)
            fileData5.walletVehiclesAllowed = ToString(file.walletVehiclesAllowed)
            if (file.walletLineTimesAllowed) {
                fileData5.walletLineTimes = PrefixFourZero(dec_to_bin(file.walletLineTimes))
            } else {
                fileData5.walletLineTimes = "1111"
            }
            /**拼接文件数据*/
            fileData5.walletFile = PrefixTwoZero(bin_to_hex(fileData5.walletLineAllowed + fileData5.walletVehiclesAllowed + "00" + fileData5.walletLineTimes));
        } else {
            fileData5.walletLineAllowed = "0"
            fileData5.walletVehiclesAllowed = "0"
            fileData5.walletLineTimes = "0000"
            /**拼接文件数据*/
            fileData5.walletFile = PrefixTwoZero(bin_to_hex(fileData5.walletLineAllowed + fileData5.walletVehiclesAllowed + "00" + fileData5.walletLineTimes));
        }
        /**公共换乘次数*/
        fileData5.publicTimes = PrefixTwoZero(dec_to_hex(file.publicTimes))
        /**公共换乘优惠金额*/
        fileData5.publicAmount = PrefixFourZero(dec_to_hex(file.publicAmount))
        /**月票换乘*/
        if (file.monthly) {
            fileData5.monthlyLineAllowed = ToString(file.monthlyLineAllowed)
            fileData5.monthlyVehiclesAllowed = ToString(file.monthlyVehiclesAllowed)
            if (file.monthlyLineTimesAllowed) {
                fileData5.monthlyLineTimes = PrefixFourZero(dec_to_bin(file.monthlyLineTimes))
            } else {
                fileData5.monthlyLineTimes = "1111"
            }
            /**拼接文件数据*/
            fileData5.monthlyFile = PrefixTwoZero(bin_to_hex(fileData5.monthlyLineAllowed + fileData5.monthlyVehiclesAllowed + "00" + fileData5.monthlyLineTimes));
        } else {
            fileData5.monthlyLineAllowed = "0"
            fileData5.monthlyVehiclesAllowed = "0"
            fileData5.monthlyLineTimes = "0000"
            /**拼接文件数据*/
            fileData5.monthlyFile = PrefixTwoZero(bin_to_hex(fileData5.monthlyLineAllowed + fileData5.monthlyVehiclesAllowed + "00" + fileData5.monthlyLineTimes));
        }
        /**有效时长*/
        let minTransfer = "";
        if (file.minTransfer == "") {
            minTransfer = "0000"
        } else {
            minTransfer = PrefixZero(dec_to_hex(file.minTransfer), 4)
        }
        let maxTransfer = "";
        if (file.maxTransfer == "") {
            maxTransfer = "0000"
        } else {
            maxTransfer = PrefixZero(dec_to_hex(file.maxTransfer), 4)
        }
        fileData5.Transfer = minTransfer.toString() + maxTransfer.toString();
        /**换乘偏差*/
        if (file.seconds == "") {
            fileData5.seconds = "0000"
        } else {
            fileData5.seconds = PrefixZero(dec_to_hex(file.seconds), 4);
        }
        fileData5.newDatafile = "070900" + fileData5.walletFile + fileData5.monthlyFile + fileData5.Transfer + fileData5.seconds;
    }
    /*******************数据6*******************/
    let fileData6 = [];
    if (filesNum == 6 && file.length != (0 || null || undefined || "")) {
        /**卡类型参数*/
        file.forEach((item, index) => {
            /**赋值发卡机构*/
            if ("cardTypeComplex" in item) {
                if (item.recType === 0) {
                    item.CardIssuer = "00";
                } else {
                    item.CardIssuer = PrefixTwoZero(dec_to_hex(Number(item.recType)));
                }
            } else {
                item.CardIssuer = PrefixTwoZero(dec_to_hex(Number(item.value)));
            }
            /**权限位*/
            item.Permissionbit =
                bin_to_hex(ToString(item.wallet) +
                    ToString(item.walletPeople) +
                    ToString(item.month) +
                    ToString(item.monthPeople) +
                    ToString(item.change) +
                    ToString(item.yearly) +
                    ToString(item.exceed) +
                    ToString(item.validity)) +
                bin_to_hex(ToString(item.emcard) +
                    ToString(item.airwallet) +
                    ToString(item.airmonth) +
                    "00000");
            /**优惠参数*/
            if (item.discountType == 0) {
                item.preferential = PrefixTwoZero(dec_to_hex(Number(item.pFeng))) +
                    PrefixTwoZero(dec_to_hex(item.pFengPeople)) +
                    PrefixTwoZero(dec_to_hex(item.gFeng)) +
                    PrefixTwoZero(dec_to_hex(item.gFengPeople)) +
                    PrefixTwoZero(dec_to_hex(ToString(item.discountType))) +
                    PrefixTwoZero(dec_to_hex(item.firstDiscount)) +
                    PrefixTwoZero(dec_to_hex(item.secondDiscount)) +
                    PrefixTwoZero(dec_to_hex(item.multiDiscount)) +
                    PrefixTwoZero(dec_to_hex(item.air)) +
                    PrefixTwoZero(dec_to_hex(item.night)) + "000000";
            } else {
                item.preferential = PrefixTwoZero(dec_to_hex(Number(item.pFeng))) +
                    PrefixTwoZero(dec_to_hex(item.pFengPeople)) +
                    PrefixTwoZero(dec_to_hex(item.gFeng)) +
                    PrefixTwoZero(dec_to_hex(item.gFengPeople)) +
                    PrefixTwoZero(dec_to_hex(ToString(item.discountType))) +
                    PrefixTwoZero(dec_to_hex(item.firstMoney)) +
                    PrefixTwoZero(dec_to_hex(item.secondMoney)) +
                    PrefixTwoZero(dec_to_hex(item.multiMoney)) +
                    PrefixTwoZero(dec_to_hex(item.air)) +
                    PrefixTwoZero(dec_to_hex(item.night)) + "000000";
            }

            /**语音地址*/
            item.vuiceaddress = item.Start + item.End;
            /**拼接卡类型参数

             dataAnalysis.js?032c:306 交通部异地卡消费 c  0000c000  464000000004640000000000000eee
             dataAnalysis.js?032c:306 黑名单刷卡 e  0000c000  400000060000000000000000001010*/
            if (item.cardType != null && item.cardSubType != null) {
                item.cardTypeParam = item.CardIssuer +
                    PrefixTwoZero(dec_to_hex(item.cardType)) +
                    PrefixTwoZero(dec_to_hex(item.cardSubType)) +
                    item.Permissionbit +
                    item.preferential +
                    item.vuiceaddress;
            } else {
                item.cardTypeParam = item.CardIssuer +
                    "00" +
                    "00" +
                    item.Permissionbit +
                    item.preferential +
                    item.vuiceaddress;
            }
        })
        Object.assign(fileData6, file);
    }
    /*******************数据7*******************/
    let fileData7 = {};
    if (filesNum == 7 && file.length != (0 || null || undefined || "")) {
        Object.assign(fileData7, file);
        if (file.username != "") {
            /*用户名长度*/
            fileData7.userlength = PrefixZero(dec_to_hex(file.username.length), 2);
        } else {
            fileData7.userlength = "00"
        }
        if (file.password != "") {
            /*密码长度*/
            fileData7.paswlength = PrefixZero(dec_to_hex(file.password.length), 2);
        } else {
            fileData7.paswlength = "00"
        }
    }
    let fileData8 = {};
    if (filesNum == 8 && file.length != (0 || null || undefined || "")) {
        Object.assign(fileData8, file);
    }
    AllDataObject = {
        fileData1: fileData1,
        fileData2: fileData2,
        fileData3: fileData3,
        fileData4: fileData4,
        fileData5: fileData5,
        fileData6: fileData6,
        fileData7: fileData7,
        fileData8: fileData8,
    };
    return AllDataObject;
}

/**合并解析数据组并分类*/
export function mergeData(newTabData, step) {
    /*step:::::: 1-保存   2-写卡*/
    let saveAllDatas = {};
    /**文件一*/
    let saveData1 = {
        simpleData: newTabData.newTabData2.simpleData +
            newTabData.newTabData1.effectiveDate + "01" + "01" +
            newTabData.newTabData1.deptCode +
            newTabData.newTabData1.groupCode +
            newTabData.newTabData1.lineCode,
        lineName: newTabData.newTabData1.lineName,
        tenantId: newTabData.newTabData1.tenantId,
        tenantName: newTabData.newTabData1.tenantName,
        fareSchemeName: newTabData.newTabData8.fareSchemeName,
        fareSchemeNote: newTabData.newTabData8.fareSchemeNote,
    }
    if(step === 1) {
        saveData1.paramVerDate = Moment().format("YYYYMMDDHHmmss");
    }
    Object.assign(saveData1, newTabData.newTabData1);
    /**运参卡文件*/
    let saveData2 = {}
    let saveData5 = {}
    let saveData6 = {}
    let saveData11 = {}
    let saveData12 = {}
    let saveData13 = {}
    let saveData14 = {}
    let saveData15 = {}
    let saveData16 = {}
    let a = "";
    let b = "";
    let c = "";
    let d = "";
    let e = "";
    let f = "";
    let g = "";
    let h = "";
    let i = "";

    let lengthArray1 = [];
    let lengthArray2 = [];
    let lengthArray3 = [];
    let lengthArray4 = [];
    let lengthArray5 = [];
    let lengthArray6 = [];
    let lengthArray7 = [];
    let lengthArray8 = [];
    let lengthArray9 = [];
    newTabData.newTabData6.forEach((item, index) => {
        if (0 <= index && index < 8) {
            lengthArray1.push(index);
            let length = lengthArray1.length;
            a += item.cardTypeParam;
            saveData2.simpleData = "02A200" + PrefixZero(dec_to_hex(length), 2) + a;
        }
        if (8 <= index && index < 16) {
            lengthArray2.push(index);
            let length = lengthArray2.length;
            b += item.cardTypeParam;
            saveData5.simpleData = "05A200" + PrefixZero(dec_to_hex(length), 2) + b;
        }
        if (16 <= index && index < 24) {
            lengthArray3.push(index);
            let length = lengthArray3.length;
            c += item.cardTypeParam;
            saveData6.simpleData = "06A200" + PrefixZero(dec_to_hex(length), 2) + c;
        }
        if (24 <= index && index < 32) {
            lengthArray4.push(index);
            let length = lengthArray4.length;
            d += item.cardTypeParam;
            saveData11.simpleData = "0BA200" + PrefixZero(dec_to_hex(length), 2) + d;
        }
        if (32 <= index && index < 40) {
            lengthArray5.push(index);
            let length = lengthArray5.length;
            e += item.cardTypeParam;
            saveData12.simpleData = "0CA200" + PrefixZero(dec_to_hex(length), 2) + e;
        }
        if (40 <= index && index < 48) {
            lengthArray6.push(index);
            let length = lengthArray6.length;
            f += item.cardTypeParam;
            saveData13.simpleData = "0DA200" + PrefixZero(dec_to_hex(length), 2) + f;
        }
        if (48 <= index && index < 56) {
            lengthArray7.push(index);
            let length = lengthArray7.length;
            g += item.cardTypeParam;
            saveData14.simpleData = "0EA200" + PrefixZero(dec_to_hex(length), 2) + g;
        }
        if (56 <= index && index < 64) {
            lengthArray8.push(index);
            let length = lengthArray8.length;
            h += item.cardTypeParam;
            saveData15.simpleData = "0FA200" + PrefixZero(dec_to_hex(length), 2) + h;
        }
        if (64 <= index && index < 72) {
            lengthArray9.push(index);
            let length = lengthArray9.length;
            i += item.cardTypeParam;
            saveData16.simpleData = "10A200" + PrefixZero(dec_to_hex(length), 2) + i;
        }
    })
    if (saveData2.simpleData) {
        saveData2.simpleData = PrefixendZero(saveData2.simpleData, "328")
    } else {
        saveData2.simpleData = PrefixendZero("02A200", "328")
    }
    if (saveData5.simpleData) {
        saveData5.simpleData = PrefixendZero(saveData5.simpleData, "328")
    } else {
        saveData5.simpleData = PrefixendZero("05A200", "328")
    }
    if (saveData6.simpleData) {
        saveData6.simpleData = PrefixendZero(saveData6.simpleData, "328")
    } else {
        saveData6.simpleData = PrefixendZero("06A200", "328")
    }
    if (saveData11.simpleData) {
        saveData11.simpleData = PrefixendZero(saveData11.simpleData, "328")
    } else {
        saveData11.simpleData = PrefixendZero("0BA200", "328")
    }
    if (saveData12.simpleData) {
        saveData12.simpleData = PrefixendZero(saveData12.simpleData, "328")
    } else {
        saveData12.simpleData = PrefixendZero("0CA200", "328")
    }
    if (saveData13.simpleData) {
        saveData13.simpleData = PrefixendZero(saveData13.simpleData, "328")
    } else {
        saveData13.simpleData = PrefixendZero("0DA200", "328")
    }
    if (saveData14.simpleData) {
        saveData14.simpleData = PrefixendZero(saveData14.simpleData, "328")
    } else {
        saveData14.simpleData = PrefixendZero("0EA200", "328")
    }
    if (saveData15.simpleData) {
        saveData15.simpleData = PrefixendZero(saveData15.simpleData, "328")
    } else {
        saveData15.simpleData = PrefixendZero("0FA200", "328")
    }
    if (saveData16.simpleData) {
        saveData16.simpleData = PrefixendZero(saveData16.simpleData, "328")
    } else {
        saveData16.simpleData = PrefixendZero("10A200", "328")
    }
    /**文件三*/
    let saveData3 = {}
    if (newTabData.newTabData3.benchmarkfare == undefined) {
        newTabData.newTabData3.benchmarkfare = "0000"
    }
    if (newTabData.newTabData3.conditioningfare == undefined) {
        newTabData.newTabData3.conditioningfare = "0000"
    }
    if (newTabData.newTabData3.nightfare == undefined) {
        newTabData.newTabData3.nightfare = "0000"
    }
    saveData3.simpleData = "03" + "19" + "00" +
        newTabData.newTabData3.benchmarkfare +
        newTabData.newTabData3.conditioningfare +
        newTabData.newTabData3.nightfare +
        PrefixZero("0", 16) +
        newTabData.newTabData5.publicTimes +
        newTabData.newTabData5.publicAmount +
        newTabData.newTabData3.platform +
        PrefixZero(dec_to_hex("1000"), 4) +
        PrefixZero(newTabData.newTabData3.quota, 8);
    /**文件四*/
    let saveData4 = {}
    saveData4.simpleData = "040900" +
        newTabData.newTabData3.discount +
        newTabData.newTabData3.vehicleType +
        newTabData.newTabData3.monthly +
        newTabData.newTabData3.airmonthly +
        newTabData.newTabData3.disabledMcard +
        newTabData.newTabData3.minmoney +
        newTabData.newTabData3.yearly;
    /**文件七*/
    let saveData7 = {}
    saveData7.simpleData = newTabData.newTabData5.newDatafile;
    /**文件八*/
    let saveData8 = {}
    saveData8.simpleData = "082E00" +
        newTabData.newTabData4.timeFlag +
        newTabData.newTabData4.peakFirst +
        newTabData.newTabData4.peakSecond +
        newTabData.newTabData4.peakThird +
        newTabData.newTabData4.peakFourth +
        newTabData.newTabData4.peakCool +
        newTabData.newTabData4.peakWarm +
        newTabData.newTabData4.peakNight;
    saveData8.simpleData = PrefixendZero(saveData8.simpleData, "96");
    /**文件九*/
    let saveData9 = {}
    saveData9 = newTabData.newTabData7;
    /**文件十*/
    // let saveData10 = {}
    // let gateway = ''
    // for (let i = 0; i < saveData9.IPaddress.length; i++) {
    //   const str = saveData9.IPaddress.charAt(i);
    //   let ascii = str.charCodeAt();
    //   gateway += Number(ascii).toString(16)
    // }
    // let gatewayLen = PrefixZero((Number(gateway.length) / 2).toString(16), 2)
    // let port = PrefixZero(Number(saveData9.portNumber).toString(16), 4)
    // let net2 = gatewayLen + gateway + port
    // let part10Length = PrefixZero((Number(gateway.length) / 2 + 4).toString(16), 2)
    // saveData10.simpleData = '0A' + part10Length + '00' + net2;

    saveAllDatas = {
        filePart1: saveData1.simpleData,
        filePart2: saveData2.simpleData,
        filePart3: saveData3.simpleData,
        filePart4: saveData4.simpleData,
        filePart5: saveData5.simpleData,
        filePart6: saveData6.simpleData,
        filePart7: saveData7.simpleData,
        filePart8: saveData8.simpleData,
        filePart9: "",
        filePart10: "",
        filePart11: saveData11.simpleData,
        filePart12: saveData12.simpleData,
        filePart13: saveData13.simpleData,
        filePart14: saveData14.simpleData,
        filePart15: saveData15.simpleData,
        filePart16: saveData16.simpleData,
        lineName: saveData1.lineName,
        deptNo: saveData1.data.deptNo,
        groupNo: saveData1.data.groupNo,
        lineNo: saveData1.data.lineNo,
        tenantId: saveData1.tenantId,
        tenantName: saveData1.tenantName,
        apnVpn: saveData9.apnorvpn,
        apnVpnFlag: saveData9.apnandvpn,
        passWord: saveData9.password,
        user: saveData9.username,
        ipAddres: saveData9.ipAddres,
        fareSchemeName: saveData1.fareSchemeName,
        fareSchemeNote: saveData1.fareSchemeNote,
        paramVerDate: saveData1.paramVerDate,
    }
    return saveAllDatas;
}

/*******
 *
 * 模板名称
 */
export function splicTemplate(lineNo, fareSchemeSerial, paramVerDate) {
    if (fareSchemeSerial) {
        fareSchemeSerial = fareSchemeSerial
    } else {
        fareSchemeSerial = ''
    }
    let verNo = paramVerDate;
    let versions = "";
    let lineCode = "";
    if (getStore({name: 'Editdata'})) {
        versions = getStore({name: 'Editdata'}).templateName;
        lineCode = getStore({name: 'Editdata'}).lineCode;
    } else {
        lineCode = getStore({name: 'Builddata'}).lineCode;
    }
    if (versions != undefined || versions != '') {
        const temvarNo = Moment().format("YYYYMMDD") + versions.slice(versions.length - 4, versions.length);
        if (Number(temvarNo) >= Number(verNo)) {
            verNo = Number(temvarNo) + 1;
        }
    }
    let name = 'Line' + lineCode + '_L' + lineNo + "_P" + fareSchemeSerial + "_" + verNo
    return name
}

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

/** 2进制转16进制位 */
export function bin_to_hex(str) {
    let hex_array = [{key: 0, val: "0000"}, {key: 1, val: "0001"}, {key: 2, val: "0010"}, {key: 3, val: "0011"}, {
        key: 4,
        val: "0100"
    }, {key: 5, val: "0101"}, {key: 6, val: "0110"}, {key: 7, val: "0111"},
        {key: 8, val: "1000"}, {key: 9, val: "1001"}, {key: 'a', val: "1010"}, {key: 'b', val: "1011"}, {
            key: 'c',
            val: "1100"
        }, {key: 'd', val: "1101"}, {key: 'e', val: "1110"}, {key: 'f', val: "1111"}]
    let value = ''
    let list = []
    if (str.length % 4 !== 0) {
        let a = "0000"
        let b = a.substring(0, 4 - str.length % 4)
        str = b.concat(str)
    }
    while (str.length > 4) {
        list.push(str.substring(0, 4))
        str = str.substring(4);
    }
    list.push(str)
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < hex_array.length; j++) {
            if (list[i] == hex_array[j].val) {
                value = value.concat(hex_array[j].key)
                break
            }
        }
    }
    return value
}
