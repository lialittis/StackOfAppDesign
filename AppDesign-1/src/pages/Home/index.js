import { useState, useEffect, useRef } from "react";
import { API_GET_DATA } from "../../global/constants"

import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";

async function fetchData(setData) {
  const res = await fetch(API_GET_DATA)
  const {data} = await res.json()
  setData(data)
}

async function fetchSetData(data) {
  const res = await fetch(API_GET_DATA,{
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({data})
  })
  
}

const Home = () => {
  const [data, setData] = useState([]);
  const submittingStatus = useRef (false); // 不会被渲染修改掉

  useEffect(() => {
    if (!submittingStatus.current){
      return
    } // 目的是预防消除我们希望保留的data
    fetchSetData(data)
      .then(data => submittingStatus.current = false)
  }, [data]) // 每次渲染都会执行； 数据会被重新洗牌， 根据data的内容进行执行

  useEffect(() => {
    // 绑定
    // console.log ('here')
    fetchData(setData)
    /*return ( ) => {
      // 取消绑定
    }*/
  }, []) // 依赖项
  

  return (
    <div className="app">
      <Edit add={setData} submittingStatus = {submittingStatus} />
      <List listData={data} deleteData={setData} submittingStatus = {submittingStatus}/>
    </div>
  );
};

export default Home;
