import React from 'react'
import { BsHandbag } from "react-icons/bs";
import { getCart } from '../api/firebase';
import { useAuthContext } from '../components/context/AuthContext';
import { useQuery } from '@tanstack/react-query';

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data:products } = useQuery(['carts', uid || ''],()=> getCart(uid),{ staleTime: 1000 });
  
  return (
    <div className='relative'>
      <BsHandbag className='text-xl' />
      {products && (<p className='absolute -top-1 -right-2 text-sm'>{products.length}</p>)}
    </div>
  )
}
