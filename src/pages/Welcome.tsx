import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';

const texts = [
  '股票组合：就是把某一些有相关属性的股票定义成一个股票组合。 ',
  '股票代码：股票发行代码+同花顺股票市场代码。',
  '管理平台需求：需要做一个系统，维护这样的组合（组合里面可以包含组合），可以通过一个树来维护。 ',
  '1、叶子结点就是股票代码。',
  '2、非叶子结点就是组合。',
  '3、树只有三层，组合、子组合。 ',
  '4、每一个组合就是一棵树。',
  '5、每一个组合里面同一个股票代码只能出现一次（子组合也不能重复）。',
];

// 欢迎页面
const Welcome: React.FC = () => {
  return (
    <PageContainer>
      {/*系统介绍*/}
      <div>
        <Card
          style={{
            borderRadius: 8,
          }}
        >
          <div>
            <div
              style={{
                fontSize: '22px',
              }}
            >
              欢迎使用股票组合信息系统
            </div>
            <div
              style={{
                marginTop: 14,
                marginBottom: 32,
              }}
            >
              {texts.map((str, index) => (
                <div 
                  key={index} 
                  style={ index > 2 ? {textIndent: '32px',color:'red'} : {}}
                >
                  {str}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Welcome;
