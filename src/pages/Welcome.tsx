import { getCombinationData, getStockData, getSubcombinationData } from '@/services/ths';
import { PageContainer, ProList } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { ProTable } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import React, { ReactText, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type IInterface = {
  id: number;
};

// 欢迎页面
const Welcome: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly ReactText[]>([]);
  const [combinantionDataSource, setCombinantionDataSource] = useState<any[]>([]);
  const [subCombinantionDataSource, setSubCombinantionDataSource] = useState<any[]>([]);
  const [newDataSource, setNewDataSource] = useState<any[]>([]);
  const [subCombinantionId, setSubCombinantionId] = useState(0); //选中的子组合ID
  const [combinantionId, setCombinantionId] = useState(0); //选中的组合ID

  const navigate = useNavigate();

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

  // 点击子组合更新股票列表
  const updateStockListFromSub = (subCombinantionId: number) => {
    console.log('subCombinantionId', subCombinantionId);
    setSubCombinantionId(subCombinantionId);
    setCombinantionId(0);
    actionRef.current?.reload();
  };

  // 点击组合更新股票列表(全量)
  const updateStockList = (combinantionId: number) => {
    console.log('combinantionId', combinantionId);
    setCombinantionId(combinantionId);
    setSubCombinantionId(0);
    actionRef.current?.reload();
  };

  useEffect(() => {
    // 全量获取组合数据
    getCombinationData({}).then(
      // 返回数据
      (res: any) => {
        const _data = res.data?.data.map((item: any) => {
          // proList 会读取title字段
          return { combinationName: item.combinationName, id: item.id };
        });
        setCombinantionDataSource(_data);
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
    // 全量获取子组合数据
    getSubcombinationData({}).then(
      // 返回数据
      (res: any) => {
        const _dataWithSubconbination = res.data?.data.map((item: any) => {
          // proList 会读取title字段
          return {
            combinationId: item.combinationId,
            id: item.id,
            subCombinationName: item.subCombinationName,
          };
        });
        setSubCombinantionDataSource(_dataWithSubconbination);
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
  }, []);

  useEffect(() => {
    const _newDataSource = combinantionDataSource.map((item) => {
      const subList = subCombinantionDataSource.filter((item2) => {
        return item.id === item2.combinationId;
      });
      return { ...item, subList };
    });

    setNewDataSource(_newDataSource);
  }, [combinantionDataSource, subCombinantionDataSource]);

  // 列信息
  const columns: ProColumns<IInterface>[] = [
    {
      title: '股票名称',
      ellipsis: true,
      dataIndex: 'stockName',
      hideInSearch: true,
      render: (item, record: any) => {
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
    <PageContainer
      header={{
        title: null,
        breadcrumb: {},
      }}
    >
      {/*系统介绍*/}
      <div style={{ display: 'flex', height: '700px', background: '#fff', width: '100%' }}>
        {/* 左侧股票组合 */}
        <div style={{ width: '50%', height: '700px' }}>
          <ProList<{ title: string }>
            rowKey="title"
            headerTitle=""
            expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
            dataSource={newDataSource}
            metas={{
              title: {
                render: (_, row: any) => {
                  return <div onClick={() => updateStockList(row.id)}>{row.combinationName}</div>;
                },
              },
              description: {
                render: (_, row: any) => {
                  console.log('弓少旭想看看render的row', row);
                  return (
                    <div>
                      {row.subList.map((item: any) => {
                        return (
                          <div
                            key={item.id}
                            style={{ color: 'black', fontWeight: 400, cursor: 'pointer' }}
                            onClick={() => updateStockListFromSub(item.id)}
                          >
                            {item.subCombinationName}
                          </div>
                        );
                      })}
                    </div>
                  );
                },
              },
            }}
          />
        </div>
        {/* 右侧股票信息 */}
        <div style={{ width: '50%', background: '#fff' }}>
          <ProTable
            headerTitle="组合信息"
            columns={columns}
            actionRef={actionRef}
            cardBordered
            search={false}
            request={async ({ rows = 10, current }) => {
              return getStockData({
                pageSize: rows,
                pageNo: current,
                subCombinationId: subCombinantionId ? subCombinantionId : null,
                combinantionId: combinantionId ? combinantionId : null,
              }).then(
                (res: any) => {
                  console.log('弓少旭想分辨res', res);
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
        </div>
        {/* 悬浮按钮 */}
        <div style={{ position: 'fixed', bottom: '40px', left: '70px' }}>
          <Button onClick={() => navigate(`/ths/combination`)}>进入后台</Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
