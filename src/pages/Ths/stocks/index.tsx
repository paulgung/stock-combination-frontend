import { getStockData } from '@/services/ths';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import React, { useRef } from 'react';

type IInterface = {
  id: number;
};

// 辅助方法
const getStockColor = (item: any) => {
  if (item > 0) {
    return { color: 'red' };
  } else if (item === 0) {
    return {};
  } else {
    return { color: 'blue' };
  }
};

const Index: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<IInterface>[] = [
    {
      title: '子组合ID',
      hideInSearch: false,
      dataIndex: 'subCombinationId',
    },
    {
      title: '股票ID',
      hideInSearch: false,
      dataIndex: 'id',
    },
    {
      title: '股票名称',
      ellipsis: true,
      dataIndex: 'stockName',
      hideInSearch: false,
      render: (item, record: any) => {
        console.log('record', record);
        return (
          <a href={record?.stockUrl} target="_blank" rel="noreferrer">
            {item}
          </a>
        );
      },
    },
    {
      title: '股票编号',
      ellipsis: true,
      dataIndex: 'stockCode',
      hideInSearch: false,
    },
    {
      title: '股票价格',
      dataIndex: 'stockPrice',
      hideInSearch: true,
    },
    {
      title: '涨跌幅',
      dataIndex: 'stockGains',
      hideInSearch: true,
      render: (item: any) => {
        return <div style={getStockColor(item)}>{item}%</div>;
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<IInterface>
        headerTitle="客户信息"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async ({ rows = 10, current }) => {
          return getStockData({
            pageSize: rows,
            pageNo: current,
          }).then(
            (res: any) => {
              return {
                data: res.data?.data,
                success: res.data?.success,
                total: res.data?.total,
              };
            },
            (): any => {
              message.error('网络请求失败！');
              return {
                data: [],
                success: false,
                total: 0,
              };
            },
          );
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            新建
          </Button>,
        ]}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
      />
    </PageContainer>
  );
};
export default Index;
