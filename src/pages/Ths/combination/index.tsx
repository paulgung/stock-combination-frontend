import { getCombinationData } from '@/services/ths';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { message } from 'antd';
import React, { useRef } from 'react';

type IInterface = {
  id: number;
  combinationName: string;
};

const Index: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<IInterface>[] = [
    {
      title: '组合ID',
      hideInSearch: false,
      dataIndex: 'id',
    },
    {
      title: '组合信息',
      ellipsis: true,
      dataIndex: 'combinationName',
      hideInSearch: false,
    },
  ];

  return (
    <PageContainer>
      <ProTable<IInterface>
        headerTitle="组合信息"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (search) => {
          const { rows = 10, current, id, combinationName } = search;
          console.log(rows, current);

          return getCombinationData({
            pageSize: rows,
            pageNo: current,
            id,
            combinationName,
          }).then(
            // 返回数据
            (res: any) => {
              console.log('res', res);
              return {
                data: res.data?.data,
                success: res.data?.success,
                total: res.data?.total,
              };
            },
            // 失败处理
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
