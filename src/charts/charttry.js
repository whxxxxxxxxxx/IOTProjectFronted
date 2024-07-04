import React, { useEffect, useState } from 'react';  
  
function TimeDisplay() {  
  const [currentTime, setCurrentTime] = useState(new Date());  
  
  useEffect(() => {  
    const timer = setInterval(() => {  
      setCurrentTime(new Date());  
    }, 1000);  
  
    // 清除定时器，防止组件卸载后继续运行  
    return () => clearInterval(timer);  
  }, []); // 空数组表示这个 effect 只在组件首次渲染和卸载时运行  
  
  // 格式化时间字符串  
  const formatTime = (date) => {  
    const year = date.getFullYear();  
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const day = String(date.getDate()).padStart(2, '0');  
    const hours = String(date.getHours()).padStart(2, '0');  
    const minutes = String(date.getMinutes()).padStart(2, '0');  
    const seconds = String(date.getSeconds()).padStart(2, '0');  
    return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;  
  };  
  
  return (  
    <div id="showTime" class='showtime'>{formatTime(currentTime)}</div>  
  );  
}  
  
export default TimeDisplay;