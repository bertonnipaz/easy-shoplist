// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListContext } from "../contexts/ListContext";

export default function Home() {

  const { list, addSubtotal, handleActivePage } = useContext(ListContext);
  const [subtotal, setSubtotal] = useState(getSubtotal());

  useEffect(() => {
    handleActivePage('home');
  }, [handleActivePage])

  function getSubtotal() {
    let total = 0;
    list.forEach(item => {
      total += (item.subtotal * item.quantity);
    });
    return total;
  }

  function calculateSubtotal(e, item) {
    const value = Number(e.target.value);
    const index = list.findIndex(val => val.description === item.description);

    item.subtotal = value;
    addSubtotal(index, item);

    setSubtotal(getSubtotal());
    e.target.value = value.toFixed(2);
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h1 className="text-2xl text-gray-700 mb-2 font-medium">Sua Lista</h1>
      {list.length > 0 &&
        <>
          <div className="max-h-116 overflow-auto rounded w-11/12 border-b-4 border-t-4">
            {list.map((item, index) => {
              const bg = item.subtotal !== 0 ? "bg-gray-500" : "";
              const titleColor = item.subtotal !== 0 ? "text-gray-50" : "text-gray-400";
              const textColor = item.subtotal !== 0 ? "text-gray-100 line-through" : "text-gray-600";
              return (
                <div key={index} className="flex items-center h-14 gap-2">
                  <div className={`pl-3 ${bg} flex flex-col border rounded h-full justify-center
                   flex-grow truncate transition duration-300`}>
                    <div className="flex justify-between">
                      <span className={`${titleColor} text-sm`}>{item.category}</span>
                      <span className={`${titleColor} text-sm pr-2`}>Qnt</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${textColor} font-medium text-sm overflow-hidden truncate`}>
                        {item.description}
                      </span>
                      <span className={`${textColor} font-medium pr-2`}>{item.quantity}</span>
                    </div>
                  </div>
                  <div className="flex border rounded h-full w-14 items-center flex-row-reverse">
                    <input
                      type="number"
                      min={0}
                      placeholder="R$"
                      defaultValue={item.subtotal === 0 ? 0.00.toFixed(2) : item.subtotal.toFixed(2)}
                      className="w-full h-full pl-2 text-sm"
                      onBlur={(e) => calculateSubtotal(e, item)}
                      onFocus={(e) => e.target.select()}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex items-center mt-2 gap-3">
            <span className="font-medium">SubTotal:</span>
            <span className="text-gray-400 font-semibold">R$ {subtotal.toFixed(2)}</span>
          </div>
        </>
      }
      {list.length === 0 &&
        <>
          <h2 className="text-lg text-gray-700">Sua lista está vazia =(</h2>
          <Link
            className={`py-1 px-2 border rounded border-gray-500 text-gray-700`}
            to="/add"
          >
            Adicionar Item
          </Link>
        </>
      }
    </div>
  )
}
