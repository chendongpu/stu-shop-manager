import  React from 'react'
import {Card,Table,Button,Popconfirm} from 'antd'

function List(props){

    const dataSource=[
        {id:1,name:'apple',price:5},
        {id:2,name:'banana',price:4},
        {id:3,name:'peach',price:3}
    ];

    const columns=[{
        title:'序号',
        key:'id',
        width:80,
        align:'center',
        render:(txt,record,index)=>index+1
    },{
        title:'名字',
        dataIndex:'name'
    },{
        title:'价格',
        dataIndex:'price'
    },{
        title:'操作',
        render:(txt,record,index)=>{
            return (
                <div>
                    <Button type="primary" size="small">修改</Button>
                    <Popconfirm title="确定要删除此项么?" onCancel={()=>{console.log("用户取消删除")}} onConfirm={()=>{console.log("用户确认删除")}}>
                    <Button type="danger" style={{margin:"0 1rem"}} size="small">删除</Button>
                    </Popconfirm>
                </div>
            )
        }
    }];

    return (
        <Card
            title="商品列表" extra={
            <Button type="primary" size="small" onClick={
                ()=>props.history.push('/admin/products/edit')
            }>Add</Button>
        }
        >

            <Table columns={columns} bordered dataSource={dataSource}/>
        </Card>
    )

}
export default List