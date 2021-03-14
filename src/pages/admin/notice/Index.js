import React from 'react';
import {Card,List, Typography,Button, Divider} from 'antd'

function Index(){
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];
    return (
        <Card title="通知中心" extra={<Button>全部标为已读</Button>} style={{ width: '100%' }}>
            <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item style={{display:'flex',alignContent:'space-between'}}>
                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        <Button>已读</Button>
                    </List.Item>
                )}
            />
        </Card>
    );
}

export default Index;