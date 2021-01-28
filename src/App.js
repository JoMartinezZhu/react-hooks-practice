import React, { useState, useRef, useEffect, useCallback } from "react";
import "./styles.css";

// let index = 0;
// eslint warning :
// React Hook useEffect has a missing dependency: 'count'
// export default function App() {
//   const [count, setCount] = useState(0);
//   const dom = useRef(null);
//   useEffect(() => {
//     dom.current.addEventListener("click", () => {
//       setCount(count + 1);
//     });
//   }, []);
//   return (
//     <div className="demo" ref={dom}>
//       {count}
//     </div>
//   );
// }

// after adding dependency: 'count',
// 相当于每次count变化，都会重新绑定一次事件

// export default function App() {
//   const [count, setCount] = useState(0);
//   const dom = useRef(null);
//   console.log(`out render`, count);
//   useEffect(() => {
//     console.log(`in render`, count);
//     dom.current.addEventListener("click", () => {
//       console.log(++index);
//       setCount(count + 1);
//     });
//   }, [count]);
//   return (
//     <div className="demo" ref={dom}>
//       {count}
//     </div>
//   );
// }

// 解决方案 一
// 消除依赖，使用 useState 的 functional updates
// export default function App() {
//   const [count, setCount] = useState(0);
//   const dom = useRef(null);
//   console.log(`out render`, count);
//   useEffect(() => {
//   // 此处的 count ，只是第一次render时 的count ,
//   // after click 变化后的count不回打印
//     console.log(`in render`, count);
//     dom.current.addEventListener("click", () =>
//       setCount((prevCount) => ++prevCount)
//     );
//   }, []);
//   return (
//     <div className="demo" ref={dom}>
//       {count}
//     </div>
//   );
// }

// 解决方案 二
// 在 绑定的事件中，就是要消费 count （每次变化后的count）
// 则必须添加依赖 count
// 添加后就会出现每次count变化，都会重新绑定一次事件

// export default function App() {
//   const [count, setCount] = useState(0);
//   const dom = useRef(null);
//   console.log(`out render`, count);
//   useEffect(() => {
//     const $dom = dom.current;
//     const event = () => {
//       console.log(`in render`, count);
//       setCount((prevCount) => ++prevCount);
//     };
//     $dom.addEventListener("click", event);
//     return () => {
//       $dom.removeEventListener("click", event);
//     };
//   }, [count]);
//   return (
//     <div className="demo" ref={dom}>
//       {count}
//     </div>
//   );
// }

// 解决方案 三
// 使用useRef

// export default function App() {
//   const [count, setCount] = useState(0);
//   const countRef = useRef(count);
//   const dom = useRef(null);
//   console.log(`out render`, count);
//   useEffect(() => {
//     const $dom = dom.current;
//     const event = () => {
//       console.log(`in render`, countRef.current);
//       setCount((prevCount) => {
//         countRef.current = ++prevCount;
//         return countRef.current;
//       });
//     };

//     $dom.addEventListener("click", event);
//   }, []);
//   return (
//     <div className="demo" ref={dom}>
//       {count}
//     </div>
//   );
// }

// userEfflect、useCallback 和 useMemo
export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="demo" onClick={handleClick}>
      {count}
    </div>
  );
}
