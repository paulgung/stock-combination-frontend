import { getStockData } from '@/services/ths';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

type IInterface = {
  id: number;
};

// 辅助方法
const getStockColor = (item: any) => {
  if (item[0] === '+') {
    return { color: 'red' };
  } else if (item[0] === '-') {
    return { color: 'blue' };
  } else {
    return {};
  }
};

const Index: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { subId: subCombinationId } = useParams(); // 获取父组合id
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

  const columns: ProColumns<IInterface>[] = [
    {
      title: '组合ID',
      hideInSearch: false,
      dataIndex: 'combinationId',
    },
    {
      title: '子组合ID',
      hideInSearch: false,
      dataIndex: 'subCombinationId',
    },
    {
      title: '股票ID',
      hideInSearch: true,
      dataIndex: 'id',
    },
    {
      title: '股票名称',
      ellipsis: true,
      dataIndex: 'stockName',
      hideInSearch: true,
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
      hideInSearch: true,
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
        return <div style={getStockColor(item)}>{item}</div>;
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<IInterface>
        headerTitle="股票信息"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async ({ rows = 10, current, subCombinationId: _subCombinationId }) => {
          return getStockData({
            pageSize: rows,
            pageNo: current,
            subCombinationId: _subCombinationId ? _subCombinationId : subCombinationId,
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
            新增
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

      {/* 弹框 */}
      <ModalForm
        labelCol={{ span: 5 }}
        title="新增股票信息"
        layout={'horizontal'}
        width="500px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          console.log('弓少旭想看看value', value);
          const success = await addStockCombination(value);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          label="组合ID"
          width="md"
          name="combinationId"
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          label="子组合ID"
          width="md"
          name="subCombinationId"
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          label="股票名称"
          width="md"
          name="stockName"
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          label="股票编号"
          width="md"
          name="stockCode"
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          label="股票价格"
          width="md"
          name="stockPrice"
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          label="涨跌幅"
          width="md"
          name="stockGains"
        />
        <ProFormText
          rules={[
            {
              required: false,
            },
          ]}
          label="个股页面"
          width="md"
          name="stockUrl"
        />
      </ModalForm>
    </PageContainer>
  );
};
export default Index;
