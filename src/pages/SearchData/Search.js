import React,{useEffect,useState, useRef} from "react";
import { SearchOutlined } from '@ant-design/icons';
import {Table,Button, Input, Space,Popconfirm,Pagination} from "antd";
import Highlighter from 'react-highlight-words';
import {$list,$del}from '../../apis/dataApi';

export default function Searchdata(){
    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

   //总数量
   let [count,setCount]=useState(1)
   //页码
   let [pageIndex,setPageIndex]=useState(1)
   //编辑状态
   let [deviceid,setdeviceid]=useState(0)
   //是否打开抽屉
   const [open, setOpen] = useState(false);
   //角色列表数据
   let [dataList,setDataList]=useState([])
   /*useEffect(()=>{
       LoadList()
   },[pageIndexS])*/
   //加载列表数据
   /*const loadList =()=>{
       $list({pageSize:15,pageIndex}).then(({data,count})=>{
           data=data.map(r=>{
               return {
                   ...r,
                   key:r.deviceid
               }
           })
           setDataList(data)
           setCount(count)
       })
   }*/
   //编辑
   const edit=(deviceid)=>{
     setOpen(true)//打开抽屉
     setdeviceid(deviceid)//设置为编辑状态
   }
   //删除
   const del=(deviceid)=>{
     $del({deviceid}).then(({success,message})=>{
       if(success){
         loadList()
       }else{

       }
     })
   }
     const dataSource = [
       {
         key: '1',
         Dname: '高速冲压机de2024',
         deviceid: 12,
         model: 'de2024',
         locate:'100.2,122.2',
         monitor:'速度'
       },
       {
         key: '1',
         Dname: '高速冲压机ms2024',
         deviceid: 13,
         model: 'ms2024',
         locate:'100.2,122.2',
         monitor:'速度'
       },
       {
         key: '1',
         Dname: '高速冲压机co2024',
         deviceid: 25,
         model: 'co2024',
         locate:'100.2,122.2',
         monitor:'速度'
       },
       {
         key: '1',
         Dname: '高速冲压机XJ2024',
         deviceid: 32,
         model: 'XJ2024',
         locate:'100.2,122.2',
         monitor:'速度'
       },
       {
         key: '1',
         Dname: '高速冲压机XJ2024',
         deviceid: 32,
         model: 'XJ2024',
         locate:'100.2,122.2',
         monitor:'速度'
       },
       {
         key: '1',
         Dname: '高速冲压机XJ2024',
         deviceid: 32,
         model: 'XJ2024',
         locate:'100.2,122.2',
         monitor:'速度'
       },
       
     ];
     
     const columns = [
       {
           title: '编号',
           dataIndex: 'deviceid',
           key: 'deviceid',
           width:'100px',
           ...getColumnSearchProps('deviceid'),
       },
       {
         title: '名字',
         dataIndex: 'Dname',
         key: 'Dname',
         width:'200px',
         ...getColumnSearchProps('Dname'),
       },
       {
         title: '型号',
         dataIndex: 'model',
         key: 'model',
         width:'200px',
         ...getColumnSearchProps('model'),
       },
       {
         title: '位置',
         dataIndex: 'locate',
         key: 'locate',
         width:'200px',
         ...getColumnSearchProps('locate'),
       },
       {
         title: '温度',
         dataIndex: 'temperature',
         key: 'temperaturer',
         width:'200px',
         ...getColumnSearchProps('temperature'),
       },
       {
        title: '压力',
        dataIndex: 'pressure',
        key: 'pressure',
        width:'200px',
        ...getColumnSearchProps('pressure'),
      },
      {
        title: '速度',
        dataIndex: 'speed',
        key: 'speed',
        width:'200px',
        ...getColumnSearchProps('speed'),
      },
      {
        title: '输出',
        dataIndex: 'output',
        key: 'output',
        width:'200px',
        ...getColumnSearchProps('output'),
      },
       
     ];
   return (
   <>
       <Table size="small" dataSource={dataSource} columns={columns} pagination={false}/>
       <Pagination size='small' defaultCurrent={pageIndex} total={count} pageSize={15} onChange={(page)=>{setPageIndex(page)}}/>
       
   </>
   )
}