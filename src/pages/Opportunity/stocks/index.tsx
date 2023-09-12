import { getStockData } from '@/services/opportunity';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import React, { useRef } from 'react';

type IInterface = {
  id: number;
};

const Index: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<IInterface>[] = [
    {
      title: 'ID',
      hideInSearch: false,
      dataIndex: 'id',
    },
    {
      title: '客户编号',
      ellipsis: true,
      dataIndex: 'customerId',
      hideInSearch: false,
    },
    {
      title: '客户名称',
      ellipsis: true,
      dataIndex: 'customerName',
      hideInSearch: false,
    },
    {
      title: '区域',
      dataIndex: 'area',
      hideInSearch: true,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
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
