import React from 'react';
import {PiPlusCircleThin, PiEquals } from "react-icons/pi";
import { getCart } from '../api/firebase';
import { useAuthContext } from '../components/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import CartItem from '../components/CartItem';
import Button from '../components/ui/Button';

const SHIPPING = 3000; //배송액
const MONEY_CLASS = 'text-2xl text-red-700'

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data:products } = useQuery(['carts', uid || ''],()=> getCart(uid),{ staleTime: 1000 });

  if(isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0 ;  
  //쇼핑카트에 아이템이 있는 검사 


const totalPrice =  products && products.reduce(
  (sum, value) =>  sum + (parseInt(value.price) * value.quantity), 0)

  return (
    <section className='w-full max-w-screen-lg m-auto py-24 md:py-40'>
      <div className='flex flex-col'>
        <h2 className='text-center text-2xl font-bold pb-4 border-b border-slate-300'>내 장바구니</h2>
        <div>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
            {!hasProducts && <p className='py-20 '> 장바구니에 상품이 없습니다. </p>}
            { products && products.map((product)=>(
              <CartItem key={product.id} product={product} uid={uid} />
            ))}
          </ul>

          <div className="flex justify-between items-center mb-8 pb-8 px-2 md:px-8 lg:px-20 border-b border-gray-300">
            <div className='text-center'> 상품총액 
              <p className={MONEY_CLASS}>{`₩ ${totalPrice}`} </p>
            </div>
            <PiPlusCircleThin />
            <div className='text-center'>배송액 
              <p className={MONEY_CLASS}>₩ {SHIPPING} </p>
            </div>
            <PiEquals />
            <div className='text-center'>총가격 
              <p className={MONEY_CLASS}>₩ { totalPrice + SHIPPING }</p>
            </div>
          </div>

          <div className="text-center">
            <Button text='주문하기'/>
          </div>

        </div>
      </div>
    </section>
  );
}
