import  {React,useEffect,useState} from 'react'
import {Card, Table, Button, Popconfirm, Upload} from 'antd'
import {listApi, delOne, modifyOne} from "../../../services/products";
import "./List.css"

function List(props){

    const [dataSource,setDataSource]=useState([]);
    const [total,setTotal]=useState(0);
    const [currentPage,setCurrentPage]=useState(1);

    useEffect(()=>{
        listApi().then(res=>{
            console.log(res);
            setDataSource(res.products);
            console.log("total",res.total);
            setTotal(res.total);
        });
    },[]);

    const loadData=(page)=>{
        console.log(page);
        setCurrentPage(page);
        listApi(page).then(res=>{
            console.log(res);
            setDataSource(res.products);
            console.log("total",res.total);
            setTotal(res.total);
        });
    }

    // const dataSource=[
    //     {id:1,name:'apple',price:5},
    //     {id:2,name:'banana',price:4},
    //     {id:3,name:'peach',price:3}
    // ];

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
        title:'在售',
        dataIndex:'onsale',
        render:(txt,record,index)=>(record.onsale==1)?"在售":"下架"
    },{
        title:'图片',
        dataIndex:'file',
        render:(txt,record,index)=> record.file ? <img src={record.file } alt="avatar" style={{ width: '100px',height:'100px' }} /> : '暂无图片'
    },{
        title:'操作',
        render:(txt,record,index)=>{
            return (
                <div>
                    <Button type="primary" size="small" onClick={()=>{
                        props.history.push(`/admin/products/edit/${record.id}`)
                    }}>修改</Button>
                    <Popconfirm title="确定要删除此项么?" onCancel={()=>{console.log("用户取消删除")}} onConfirm={()=>{
                        delOne(record.id).then(res=>{
                            loadData(currentPage);
                        });
                        console.log("用户确认删除")
                    }}>
                    <Button type="danger" style={{margin:"0 1rem"}} size="small">删除</Button>
                    </Popconfirm>
                    <Button type="primary" size="small" onClick={()=>{
                        modifyOne(record.id,{onsale:(record.onsale==1?0:1)}).then(res=>{
                            loadData(currentPage);
                        }).catch(err=>{
                            console.log(err);
                        });
                    }}>{(record.onsale==1)?"下架":"上架"}</Button>
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

            <Table  rowClassName={record =>(record.onsale==1)?"":"bg-red"} rowKey="id" pagination={{total,defaultPageSize:3,onChange:loadData}} columns={columns} bordered dataSource={dataSource}/>
        </Card>
    )

}
export default List