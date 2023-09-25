import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // version 5.2.0
// 由于HXKline依赖于HXKlineChart，所以此处需要先引用HXKlineChart(会自动挂载到window)，如仍报错无法找到HXKlineChart，请使用`HXKline.setHXKlineChart(HXKlineChart)`方式关联
import HXKlineChart from '@ths-m/HXKlineChart';

import HXKline from '@ths-m/HXKline/lib/HXKline.common';

type StockListItem = {
    // 时间戳，毫秒级别，必要字段
    timestamp: number
    // 开盘价，必要字段
    open: number
    // 收盘价，必要字段
    close: number
    // 最高价，必要字段
    high: number
    // 最低价，必要字段
    low: number
    // 昨收价，非必须字段
    pre: number
    // 成交量，非必须字段
    volume: number
    // 成交额，非必须字段，如果需要展示技术指标'EMV'和'AVP'，则需要为该字段填充数据。
    turnover: number

}


const Index: React.FC = () => {
    const { sc: stockCode, mid: marketId } = useParams(); // 获取父组合id

    useEffect(() => {
        HXKline.setHXKlineChart(HXKlineChart)

        // K线图
        const klineChart = HXKline.init("kline-chart", {
            stockCode,
            marketId,
            chartType: "kline",
            timePeriod: "day_1",
            tradeDate: 0,//当天
        });
        const chart = klineChart.getChart()
        chart.createIndicator(
            'VOL',
            false,
        );
        chart.createIndicator(
            'MACD',
            false,
        );

    }, [])



    return (
        <ErrorBoundary>
        <div style={{
            padding: '0',
            height: '100%',
        }}>
            <div id='kline-chart' style={{
                width: '100%',
                height: '100%',
            }}></div>
        </div>
        </ErrorBoundary>
    );
};
export default Index;
