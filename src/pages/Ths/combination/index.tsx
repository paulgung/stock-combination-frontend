import { getCombinationData } from '@/services/ths';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { message } from 'antd';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // version 5.2.0

type IInterface = {
  id: number;
  combinationName: string;
};

const Index: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();

  // 携带父组合id跳转子组合
  const jumpSubCombination = (id: number): void => {
    navigate(`/ths/subcombination/${id}`);
    console.log('first');
  };
  const columns: ProColumns<IInterface>[] = [
    {
      title: '组合ID',
      hideInSearch: true,
      dataIndex: 'id',
    },
    {
      title: '组合信息',
      ellipsis: true,
      dataIndex: 'combinationName',
      hideInSearch: true,
      render: (item, record: any) => {
        return (
          <div
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => jumpSubCombination(record?.id)}
          >
            {item}
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<IInterface>
        headerTitle="组合信息"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        search={false}
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
