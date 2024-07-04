import React,{useEffect,useState, useRef} from "react";
import { SearchOutlined } from '@ant-design/icons';
import {Table,Button, Input, Space,Popconfirm,Pagination} from "antd";
import Highlighter from 'react-highlight-words';
import {$list,$del}from '../../apis/dataApi';
import AddData from '../../AddData'
import DataDetail from '../../Detail'
import {request} from "@/utils";
export default function Data(){
    //搜索
    //获取数据
    const fetchSearchData = async (query) => {  
      try {  
        const response = await request.post('/device/search/page2', query, {  
          headers: {  
            'Content-Type': 'application/json', // 设置请求头为JSON格式  
          },  
        });
        return response.data; // 直接返回解析后的数据对象  
      } catch (error) {  
        // 处理错误情况  
        console.error('Error fetching data:', error);  
        throw error; // 可以选择重新抛出错误以便在调用处处理  
      }  
    };
    //搜索 
      const [query, setQuery] = useState({  
        page_req: {  
          page: 1,  
          page_size: 12,  
        },  
        device_id: '',  
        name: '',  
        model: '',  
        serial_number: '',  
      });  
      const [data, setData] = useState([]);
      //处理数据  
      const handleSearch = async () => {  
        try {  
          let data = await fetchSearchData(query);  
          // 使用返回的数据更新组件状态或执行其他操作
          console.log(data);
          console.log(data.data.total*data.data.total_page);
          setCount(12*data.data.total_page);
          data=data.data.list.map((r)=>{
            return {
                ...r,
                key:r.id
            }
        }) 
          
          setData(data);  
          
        } catch (error) {  
          // 处理错误的逻辑 
          console.error('Error during search:', error);   
        }  
      };
      //分页
      const handlePageChange = (page) => {  
        setPage({page});  
        setQuery((prevQuery) => ({  
          ...prevQuery,  
          page_req: {  
            page,  
            page_size: 12,  
          },  
        }));  
        handleSearch();  
      };  
      //名字
      const handleInputChange = (e) => {  
        setQuery((prevQuery) => ({  
          ...prevQuery,  
          [e.target.name]: e.target.value,  
        }));  
      
      };
        
    //总数量
    let [count,setCount]=useState(1)
    //页码
    let [page,setPage]=useState(1)
    //编辑状态
    let [deviceid,setdeviceid]=useState(0)
    //是否打开抽屉
    let [deviceidd,setdeviceidd]=useState(0)
    //是否打开抽屉
    const [open, setOpen] = useState(false);
    //是否打开抽屉
    const [opend, setOpend] = useState(false);
    //角色列表数据
    let [dataList,setDataList]=useState([])
    useEffect(() => {  
      handleSearch(); // 组件挂载时执行搜索  
    }, [query]); // 仅在query改变时执行搜索  
    
    //加载列表数据
   const loadList =()=>{
        $list({page,page_size:13}).then(({data})=>{
            console.log(data.total) 
            setCount(data.total*data.total_page)
            data=data.list.map((r)=>{
                return {
                    ...r,
                    key:r.id
                }
            })
            console.log(data)
            
            setDataList(data)
            
        })
    }
    //查看详情
    const detail=(id)=>{
      setOpend(true)//打开抽屉
      setdeviceidd(id)
    }
    //编辑
    const edit=(id)=>{
      setOpen(true)//打开抽屉
      setdeviceid(id)//设置为编辑状态
    }
    //删除
    const del=(id)=>{
      $del(id).then(()=>{
        handleSearch();
      })
    }
      const columns = [
        {
            title: '编号',
            dataIndex: 'SerialNumber',
            key: 'SerialNumber',
            width:'220px',
        },
        {
          title: '名字',
          dataIndex: 'Name',
          key: 'Name',
          width:'220px',
        },
        {
          title: '型号',
          dataIndex: 'ModelData',
          key: 'ModelData',
          width:'220px',
        },
        {
          title: '操作',
          key: 'action',
          render: (ret) => (
            <>
            <Button size="small" style={{borderColor:'blue',color:'blue'}} onClick={()=>{
              detail(ret.id)
            }}>查看详情</Button>
            <Button size="small" style={{borderColor:'orange',color:'orange',marginLeft:'5px'}} onClick={()=>{
              edit(ret.id)
            }}>编辑</Button>
            <Popconfirm
              title="提示"
              description="确定删除吗?"
              onConfirm={()=>{del(ret.id)}}
              okText="确定"
              cancelText="取消"
            >
              <Button danger style={{marginLeft:'5px'}} size="small" >删除</Button>
            </Popconfirm>
            </>
            
          ),
        },
      ];
    return (
    <>
        <div className="search">
        <Input  
          placeholder="编号" 
          size="small" 
          name="serial_number"  
          value={query.serial_number}  
          onChange={handleInputChange}  
          style={{ marginRight: '8px',width:'400px' }}  
        />  
        <Input  
          placeholder="名字" 
          size="small" 
          name="name"  
          value={query.name}  
          onChange={handleInputChange}  
          style={{ marginRight: '8px',width:'400px' }}  
        />  
        <Button size="small" type="primary" onClick={handleSearch} style={{ marginRight: '8px'}}>搜索</Button>   
        <Button size="small" onClick={()=>{setOpen(true)}}>添加</Button>
        
        </div>
        <Table size="small" dataSource={data} columns={columns} pagination={false}/>
        <Pagination size='small' onChange={(currentPage) => handlePageChange(currentPage)} defaultCurrent={page} total={count} pageSize={12}  hideOnSinglePage={true}/>
        <AddData open={open} setOpen={setOpen} handleSearch={handleSearch} deviceid={deviceid} setdeviceid={setdeviceid}/>
        <DataDetail opend={opend} setOpend={setOpend} loadList={loadList} deviceidd={deviceidd} setdeviceidd={setdeviceidd} />
    </>
    )
}
/*<Pagination size='small' defaultCurrent={pageIndex} total={count} pageSize={15} onChange={(page)=>{setPageIndex(page)}}/>*/
