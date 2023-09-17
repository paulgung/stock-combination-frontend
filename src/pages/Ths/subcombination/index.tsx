import { getSubcombinationData } from '@/services/ths';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { message } from 'antd';
import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type IInterface = {
  id: number;
};

const Index: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { id: combinationId } = useParams(); // 获取父组合id
  const navigate = useNavigate();

  // 携带子组合id跳转组合列表
  const jumpStocks = (id: number): void => {
    navigate(`/ths/stocks/${id}`);
  };
  const columns: ProColumns<IInterface>[] = [
    {
      title: '组合ID',
      hideInSearch: false,
      dataIndex: 'combinationId',
    },
    {
      title: '子组合ID',
      ellipsis: true,
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '子组合名称',
      ellipsis: true,
      dataIndex: 'subCombinationName',
      hideInSearch: true,
      render: (item, record) => {
        return (
          <div style={{ color: 'red', cursor: 'pointer' }} onClick={() => jumpStocks(record.id)}>
            {item}
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<IInterface>
        headerTitle="子组合信息"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async ({ rows = 10, current, combinationId: _combinationId }) => {
          console.log('_combinationId', _combinationId);
          return getSubcombinationData({
            pageSize: rows,
            pageNo: current,
            combinationId: _combinationId ? _combinationId : combinationId,
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
